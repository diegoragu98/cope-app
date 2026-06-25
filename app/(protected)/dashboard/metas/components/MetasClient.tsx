'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { deleteGoal, type Goal, type GoalType } from '@/lib/goals/actions'
import GoalModalForm from './GoalModalForm'

interface MetasClientProps {
  initialGoals: Goal[]
}

type Tab = 'metas' | 'proyectos'

export default function MetasClient({ initialGoals }: MetasClientProps) {
  const router = useRouter()

  // useState SOLO para estado de UI. La lista se renderiza DIRECTO de props.
  const [activeTab, setActiveTab] = useState<Tab>('metas')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<GoalType>('meta')
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Separación por tipo, directo de props.
  const metas = initialGoals.filter((g) => g.type === 'meta')
  const proyectos = initialGoals.filter((g) => g.type === 'proyecto')

  const formatCurrency = (amount: number) =>
    `$${amount.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  const openCreate = (type: GoalType) => {
    setModalType(type)
    setEditingGoal(null)
    setShowModal(true)
  }

  const openEdit = (goal: Goal) => {
    setModalType(goal.type)
    setEditingGoal(goal)
    setShowModal(true)
  }

  const handleDelete = async (goal: Goal) => {
    const label = goal.type === 'meta' ? 'meta' : 'proyecto'
    const confirmed = window.confirm(
      `¿Eliminar la ${label} "${goal.title}"? Se borrarán también todos sus registros. Esta acción no se puede deshacer.`
    )
    if (!confirmed) return

    setDeletingId(goal.id)
    const result = await deleteGoal(goal.id)
    setDeletingId(null)

    if (result.error) {
      window.alert(result.error)
      return
    }
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-cope-bg py-8">
      <Container size="lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-cope-text">Metas y Proyectos</h1>
          <Button
            onClick={() => openCreate(activeTab === 'metas' ? 'meta' : 'proyecto')}
            className="flex items-center gap-2"
          >
            <span>+</span>
            <span>{activeTab === 'metas' ? 'Nueva meta' : 'Nuevo proyecto'}</span>
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('metas')}
            className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === 'metas'
                ? 'border-cope-primary text-cope-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🎯 Metas
          </button>
          <button
            onClick={() => setActiveTab('proyectos')}
            className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === 'proyectos'
                ? 'border-cope-primary text-cope-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🚗 Proyectos
          </button>
        </div>

        {/* TAB: METAS */}
        {activeTab === 'metas' &&
          (metas.length === 0 ? (
            <EmptyState
              emoji="🎯"
              title="Aún no tienes metas"
              subtitle="Crea una meta con un monto objetivo y ve tu progreso conforme aportas."
              buttonLabel="+ Nueva meta"
              onClick={() => openCreate('meta')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metas.map((goal) => (
                <MetaCard
                  key={goal.id}
                  goal={goal}
                  formatCurrency={formatCurrency}
                  onEdit={() => openEdit(goal)}
                  onDelete={() => handleDelete(goal)}
                  deleting={deletingId === goal.id}
                />
              ))}
            </div>
          ))}

        {/* TAB: PROYECTOS */}
        {activeTab === 'proyectos' &&
          (proyectos.length === 0 ? (
            <EmptyState
              emoji="🚗"
              title="Aún no tienes proyectos"
              subtitle="Lleva el registro de cuánto llevas gastado en algo sin presupuesto fijo."
              buttonLabel="+ Nuevo proyecto"
              onClick={() => openCreate('proyecto')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proyectos.map((goal) => (
                <ProyectoCard
                  key={goal.id}
                  goal={goal}
                  formatCurrency={formatCurrency}
                  onEdit={() => openEdit(goal)}
                  onDelete={() => handleDelete(goal)}
                  deleting={deletingId === goal.id}
                />
              ))}
            </div>
          ))}

        {/* Modal Crear/Editar */}
        {showModal && (
          <GoalModalForm
            type={modalType}
            goal={editingGoal}
            onClose={() => {
              setShowModal(false)
              setEditingGoal(null)
            }}
          />
        )}
      </Container>
    </div>
  )
}

// =====================================================
// EMPTY STATE
// =====================================================
function EmptyState({
  emoji,
  title,
  subtitle,
  buttonLabel,
  onClick,
}: {
  emoji: string
  title: string
  subtitle: string
  buttonLabel: string
  onClick: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-80">
      <div className="text-center max-w-sm">
        <div className="text-7xl mb-6">{emoji}</div>
        <h2 className="text-2xl font-bold text-cope-text mb-3">{title}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">{subtitle}</p>
        <Button onClick={onClick} size="lg" className="w-full">
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}

// =====================================================
// CARD META (con barra de progreso)
// =====================================================
function MetaCard({
  goal,
  formatCurrency,
  onEdit,
  onDelete,
  deleting,
}: {
  goal: Goal
  formatCurrency: (n: number) => string
  onEdit: () => void
  onDelete: () => void
  deleting: boolean
}) {
  const target = goal.target_amount || 0
  const pct = goal.progreso !== null ? Math.min(goal.progreso * 100, 100) : 0
  const pctLabel = goal.progreso !== null ? Math.round(goal.progreso * 100) : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: (goal.color || '#0F766E') + '20' }}
        >
          {goal.icon || '🎯'}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-cope-text truncate">{goal.title}</h3>
          {goal.description && (
            <p className="text-sm text-gray-500 truncate">{goal.description}</p>
          )}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-gray-600">
            {formatCurrency(goal.aportado)} / {formatCurrency(target)}
          </span>
          <span className="text-sm font-bold text-cope-primary">{pctLabel}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${pct}%`,
              backgroundColor: goal.color || '#0F766E',
            }}
          />
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-3 mt-auto pt-2 text-sm">
        <button
          onClick={onEdit}
          className="text-cope-primary hover:text-cope-primary/80 font-medium"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
        >
          {deleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  )
}

// =====================================================
// CARD PROYECTO (sin target, solo acumulado)
// =====================================================
function ProyectoCard({
  goal,
  formatCurrency,
  onEdit,
  onDelete,
  deleting,
}: {
  goal: Goal
  formatCurrency: (n: number) => string
  onEdit: () => void
  onDelete: () => void
  deleting: boolean
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: (goal.color || '#0F766E') + '20' }}
        >
          {goal.icon || '🚗'}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-cope-text truncate">{goal.title}</h3>
          {goal.description && (
            <p className="text-sm text-gray-500 truncate">{goal.description}</p>
          )}
        </div>
      </div>

      {/* Total acumulado */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Total acumulado</p>
        <p className="text-3xl font-bold text-cope-text">
          {formatCurrency(goal.aportado)}
        </p>
      </div>

      {/* Acciones */}
      <div className="flex gap-3 mt-auto pt-2 text-sm">
        <button
          onClick={onEdit}
          className="text-cope-primary hover:text-cope-primary/80 font-medium"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
        >
          {deleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  )
}
