# EXCEL-MAPPING.md
## Cómo el "MVP Cope" (Excel de Diego) se traduce a Cope (la app)

> Documento de mapeo: cada pestaña del Excel actual de Diego se traduce a una pantalla/feature de Cope.
> Sesión: Diego × Claude — Mayo 2026
> Versión: 1.1 (actualizada con metas Bochito Amarillo y Plan GNP)
> Nota: Todas las cifras son ficticias.

---

## 1. Filosofía general del mapeo

El Excel actual de Diego es un sistema funcional pero manual. Cope hereda la inteligencia del sistema y elimina la fricción. Tres principios rigen el mapeo:

1. **No replicar el Excel tal cual.** Replicar las decisiones que el Excel ayuda a tomar.
2. **2 niveles de visualización.** Vista cotidiana (simple) + Vista análisis (detallada).
3. **Lo que falta en el Excel es la oportunidad real.** Metas, proyecciones, reminders, educación contextual.

### Hallazgo crítico

El Excel de Diego YA tiene metas activas (Bochito Amarillo, Plan GNP, Fondo Emergencia), pero están dispersas en columnas sueltas porque el Excel no fue diseñado para metas. **Esto valida el concepto de "Metas como hubs" de Cope.** Cope estructura lo que el usuario ya hace artesanalmente.

---

## 2. Pestaña "Portafolio" → Cope Home + Vista Análisis

### Vista Cotidiana (Home de Cope)

Responde 4 preguntas en menos de 5 segundos:
1. ¿Cuál es mi patrimonio total?
2. ¿Cuánto está disponible (líquido)?
3. ¿Cuánto debo en TDC?
4. ¿Cómo voy con mis metas?

### Vista Análisis (segundo nivel)

Cuando Diego profundiza:
- Distribución del patrimonio (gráfico pie)
- Distribución Renta Fija vs Renta Variable
- Rendimientos por instrumento
- Efectivo líquido como % del patrimonio
- Multi-moneda MXN/USD
- Detección de instrumentos inactivos

### Features clave
- Auto-cálculo de patrimonio
- Tracking de "mínimo Santander" con alerta automática
- Variación mensual
- Toggle MXN/USD

---

## 3. Pestaña "Estrategia" → Plan de Aportaciones

Diego configura su estrategia (ej. 60% CETES, 20% acciones, 10% GBM Patrimonio, 10% Nu). Cope lo automatiza:

- Templates para Andrea (50/30/20), personalizable para Diego
- Validación automática (suma 100%)
- Día de cobro configurable
- Reminder automático el día de cobro
- Botón "Marcar como aportado"
- Historial de cumplimiento mes a mes

**Diferenciador vs Excel:** Excel muestra el plan estático. Cope lo activa, te avisa, te recuerda.

---

## 4. Pestaña "Acciones" → Detalle de Instrumento

Vista resumida por defecto (Diego no necesita ver detalle de cada acción siempre). Tap para detalle granular.

Features:
- Filtros por país, tipo, estatus
- Registrar movimiento desde aquí
- Conexión futura con APIs de precios (Yahoo Finance, etc.)

**Diferenciador:** Excel actualiza precios manual. Cope lo hace automático.

---

## 5. Google Form → Registrar Movimiento (botón flotante)

**LA FEATURE MÁS IMPORTANTE DE COPE.**

Innovaciones sobre el Form actual:
1. Tipo "Transferencia" además de Depósito/Retiro (elimina trabajo duplicado)
2. Vinculación con meta (sube en 2 lugares: cuenta + meta)
3. Notas libres con sugerencias inteligentes ("Refacciones 1" sugiere "Refacciones 2")
4. Atajos contextuales (sugiere aportación programada en día de pago)
5. Modo "Pago de TDC" (reduce saldo de TDC automáticamente)
6. Modo de pago: Efectivo / Transferencia / Tarjeta

---

## 6. NUEVO: Metas como hubs (4 tipos)

### Metas en el Excel (dispersas, sin estructura)
- 🚗 **Bochito Amarillo** ($95,920 en 5 aportaciones)
- 🛡️ **Plan GNP** ($279,725 en 3 aportaciones de 5)
- 🐷 **Fondo emergencia Nu** ($50,000)

### Metas mencionadas en chat (no en Excel)
- 💍 Boda
- ✈️ Luna de miel
- 🏠 Enganche de casa
- 📈 Patrimonio CETES
- 📊 Acciones GBM
- 📋 Plan GBM personalizado

### Tipos de meta

**Tipo 1: Crecer** (acumular hasta objetivo)
- Boda, Luna miel, Enganche casa
- Monto objetivo + fecha + progreso + proyección

**Tipo 2: Conservar** (mantener saldo)
- Fondo emergencia
- Alerta si baja del objetivo

**Tipo 3: Proyecto/Gastar** (inversión progresiva)
- Bochito Amarillo
- NO hay monto objetivo
- Tracking de lo invertido + historial + notas tipadas
- Opción de cerrar proyecto

**Tipo 4: Obligatorio** (compromisos fijos)
- Plan GNP
- Número de aportaciones requeridas
- Cope avisa 60 días antes
- Calcula reserva mensual necesaria

### Atributos comunes
- Nombre + icono + categoría
- Tipo (4 tipos arriba)
- Cuenta vinculada
- Aportación sugerida
- Frecuencia
- Saldo/progreso actual
- Proyección (solo tipo Crecer)
- Historial completo
- Notas en cada movimiento

---

## 7. NUEVO: Calendario Financiero

Eventos automáticos:
- Cortes de TDC
- Fechas límite de pago
- Cobro de sueldo
- Aportación anual GNP
- Plan de aportaciones programadas
- **Pago Óptimo de TDC** (calcula día exacto para maximizar rendimiento en CETES)

---

## 8. NUEVO: Educación contextual (Just-in-Time)

Lecciones aparecen en el momento exacto que se necesitan:

- Andrea entra a Plan de Aportaciones → lección 50/30/20
- Diego crea meta Boda → consejos de instrumentos a 1-3 años
- Andrea registra primer CETE → lección "¿qué es un CETE?"
- Diego cerca de corte TDC → recordatorio de beneficios AMEX

### Lecciones por nivel
- **Nivel 1 (Andrea):** Presupuesto, 50/30/20, CETES, TDC básico, fondo emergencia
- **Nivel 2:** Metas a 1-3 años, RF vs RV, fondos, GBM/Fintual/Kuspit
- **Nivel 3 (Diego):** Float arbitrage, planeación paralela, USD para mexicanos, seguros
- **Nivel 4:** Bienes raíces, fiscal, internacional, herencia

---

## 9. NUEVO: Cope Score

Métrica única 1-100 que resume salud financiera:

```
1. Patrimonio neto y crecimiento (25%)
2. Fondo de emergencia (20%)
3. Diversificación (15%)
4. Consistencia (15%)
5. Educación (10%)
6. Metas activas (10%)
7. Salud de deuda (5%)
```

Andrea hoy: ~25 | Diego hoy: ~78

---

## 10. NUEVO: Modo Planificación

Simulador de metas grandes. Templates: Boda+Luna miel, Casa, Posgrado, Hijos, Retiro.

Calcula:
- Tiempo disponible vs objetivo
- Aportación necesaria al mes
- Compara con plan actual
- Sugiere ajustes (aumentar aportación / mover fecha / reducir presupuesto)

**Diferenciador único:** Ninguna app de finanzas en México hace esto. Cope se vuelve asesor financiero personal.

---

## 11. NUEVO: Detección de inactividad

Cuando instrumento lleva 12+ meses sin movimientos (ej. Smart Cash de 2022), Cope sugiere:
- Activar de nuevo
- Archivar (no eliminar)
- Consolidar saldo a otra cuenta

Mantiene el dashboard limpio sin perder historial.

---

## 12. Resumen: Hereda + Agrega

### Hereda del Excel
| Excel | Cope |
|---|---|
| Portafolio multi-cuenta MXN/USD | Home + Análisis |
| Concentrado de instrumentos | Detalle por instrumento |
| Plan por % | Plan activo |
| Tracking de acciones | Detalle de Acciones |
| Google Form | Registrar Movimiento |
| Saldo TDC | Sección Deudas |
| Mínimo Santander | Alerta automática |
| Bochito Amarillo | Meta tipo Proyecto |
| Plan GNP | Meta tipo Obligatorio |
| Fondo Emergencia Nu | Meta tipo Conservar |
| Notas en aportaciones | Notas libres con sugerencias |

### Agrega (lo que NO está en Excel)
- Metas formalizadas (Boda, Casa, Luna miel, etc.)
- Calendario Financiero con eventos automáticos
- Reminders inteligentes
- Modo Planeación
- Educación contextual
- Cope Score
- Proyecciones
- Niveles de usuario
- APIs futuras de precios
- Multi-dispositivo nativo
- Detección de inactividad

---

## 13. Priorización para construcción

### Tier 1 — MVP Esencial (semanas 1-4)
1. Onboarding (Diagnóstico + Primer Mes)
2. Cuentas (saldo manual, multi-cuenta)
3. Registrar Movimiento (botón flotante)
4. Home con patrimonio + metas
5. Metas como hubs (4 tipos)

### Tier 2 — MVP Robusto (semanas 5-8)
6. Plan de Aportaciones
7. Calendario Financiero básico
8. Detalle de Instrumento
9. Cope Score v1
10. 5 lecciones core Nivel 1

### Tier 3 — Diferenciador (semanas 9-12)
11. Modo Planeación
12. Reminders automáticos
13. Pago Óptimo de TDC
14. Vista Análisis (gráficos)
15. Lecciones Nivel 2-3

### Tier 4 — Polish y escala
16. APIs de precios automáticos
17. Open Banking (si decidimos)
18. Comunidad/foro
19. Cope Pro features

---

## 14. Nota final

Diego: tu Excel resultó ser un mockup funcional de Cope. La diferencia entre "Excel de Diego" y "Cope" no es lo que muestra, es lo que **hace por el usuario**:

- Excel te muestra el estado.
- Cope te muestra el estado, te recuerda, te enseña, te proyecta y te guía.

Si construimos Cope bien, en 6 meses tú mismo vas a cerrar tu Excel y abrir Cope. Ese es el mejor termómetro de éxito posible.

---

*Fin del EXCEL-MAPPING.md v1.1*
