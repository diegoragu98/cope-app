# STRATEGY.md
## Cope — Biblia ejecutiva de estrategia

> Documento maestro: visión, usuario, experiencia, modelo de negocio y roadmap.
> Sesión: Diego × Claude — Mayo 2026
> Versión: 1.2 (arquitectura multidispositivo + pivote a producto-primero)
> Estado: Estrategia cerrada, listo para construir Estudio Desktop.

---

## 0. Resumen ejecutivo (TL;DR)

**Cope** es una app de educación financiera personalizada para México. No es una app de presupuesto ni una app de inversión; es **un copiloto que organiza tu vida financiera por metas reales** y te enseña sobre la marcha lo que nadie te enseñó.

**Su diferenciador real:** Cope **crece con el usuario** desde "no sé qué hacer con mi sueldo" (Andrea, 23 años) hasta "tengo 9 metas en paralelo y mi Excel ya no aguanta" (Diego, 28 años casándose).

**Su arquitectura:** **Estudio Desktop + Copiloto Mobile**, dos contextos de uso coordinados que comparten datos.

**Su modelo de negocio inicial:** gratis con referidos a productos financieros verificados.

**Su roadmap actualizado:** construir primero las pantallas operativas del Estudio Desktop (basadas en el Excel de Diego), después adaptar la versión Copiloto Mobile, y después rediseñar el onboarding con el producto ya funcionando.

### ¿Qué cambió en v1.2?

Después de la Sesión 2 (founder testing del onboarding inicial) se incorporaron 3 cambios estratégicos:

1. **Pivote de "onboarding-primero" a "producto-primero".** El onboarding no se puede diseñar bien sin saber a qué se está dando bienvenida. Construir primero el core operativo.

2. **Arquitectura multidispositivo coordinada: Estudio + Copiloto.** Cope es una sola web app responsive con dos experiencias coordinadas según contexto y propósito.

3. **Diego como primer beta tester serio del producto.** Reconocer explícitamente que el fundador será el primer usuario del Estudio Desktop (replicando su Excel), y Andrea entrará después con el Copiloto Mobile.

### ¿Qué cambió en v1.1 (mantenido)?

Sigue vigente todo lo aprendido en la primera sesión de research con Andrea:

1. Sesiones de 2-3 minutos como diseño base
2. Recorridos guiados (Walkthroughs paso a paso)
3. Procesos abiertos (Open Loops)
4. Anclaje emocional
5. La meta como hilo conductor

---

## 1. La promesa de Cope (Capa 1)

### Frase oficial — formato largo

> Cope es la app que enseña a los mexicanos lo que nadie nos enseñó: qué hacer con nuestro dinero. Te ayuda a entender tu sueldo, organizar tu presupuesto y dar tus primeros pasos en inversión — todo en lenguaje normal, sin tecnicismos.

### Frase oficial — formato medio (hero de landing)

> Tu dinero, sin tecnicismos.
> Cope te enseña lo que nadie te enseñó: qué hacer con tu sueldo, cómo ahorrar y cómo invertir, paso a paso.

### Frase oficial — formato corto (tagline)

> Cope. Tu copiloto financiero.

### Pitch del Uber

> *"Es una app para mexicanos que nunca nos enseñaron de dinero. Te dice qué hacer con tu sueldo, te enseña a ahorrar e invertir, y todo en lenguaje normal, sin tecnicismos."*

### Momento "ajá"

Cuando un usuario, en su primera sesión, ingresa su sueldo y Cope le muestra al instante una propuesta visual de cómo repartirlo en cubetas, anclada a su meta principal, y le explica el porqué de cada cubeta como lo haría un amigo.

### Transformación

**Antes de Cope:** sentía que el dinero se me iba sin saber en qué, y cada quincena empezaba con la misma angustia: "¿voy a llegar?". Nunca aprendí esto en la escuela ni en mi casa, y me daba pena preguntar.

**Después de Cope:** abro la app y sé exactamente cuánto tengo, cuánto puedo gastar y cuánto va a mi ahorro. Aprendí lo que es un CETE, abrí mi primera cuenta (Cope me llevó de la mano), y por primera vez siento que mi dinero trabaja para mí.

---

## 2. El usuario (Capa 2)

### Usuario ancla a largo plazo: Andrea (23 años)

**Perfil resumido**
- 23 años, primer trabajo formal
- Sueldo $8k-$15k, vive con sus papás
- Sin TDC (acaba de pedir Nu, esperando que llegue)
- CetesDirecto en trámite (pendiente subir documentos)
- Meta ancla: MAESTRÍA en 1-3 años

**Frase textual de research:**
> *"Ya sobre la marcha le iré agarrando"*

### Usuario primario del MVP: Diego (28 años, fundador)

**Por qué Diego es el primer usuario del producto:**

Anteriormente describimos a Diego como "usuario secundario". En v1.2 reconocemos que **Diego es el primer beta tester serio** porque:

- Tiene un sistema financiero personal sofisticado (Excel propio)
- Está en transición de vida (boda, casa, GNP, restauración de coche)
- Su Excel ya no aguanta la complejidad
- Va a meter sus datos reales en Cope
- Su feedback constante guía el producto

**El producto se construye primero para Diego (Estudio Desktop), después se adapta para Andrea (Copiloto Mobile).** Esto NO cambia la visión a largo plazo (Andrea sigue siendo el usuario ancla del producto maduro), pero ordena la construcción.

### Modelo de niveles (sin cambios)

- **Nivel 1 — Principiante** (Andrea hoy)
- **Nivel 2 — En camino**
- **Nivel 3 — Optimizando** (Diego hoy)
- **Nivel 4 — Avanzado**

Cope acompaña al usuario del Nivel 1 al 4 a lo largo de los años.

---

## 3. La experiencia core (Capa 3)

### NUEVA: Arquitectura multidispositivo coordinada

Cope es **una sola web app responsive** que se manifiesta como **dos experiencias coordinadas**:

#### Estudio Desktop (la "compu del domingo")

**Cuándo se usa:**
- Sesiones de 30-60 minutos
- Planeación, configuración, análisis profundo
- Captura inicial de cuentas e instrumentos
- Setup de plan de aportaciones, metas, etc.
- Revisar progreso mensualmente

**Características de diseño:**
- Layout amplio (multi-columna)
- Tablas tipo Excel
- Drag and drop donde aplique
- Vista de dashboard con múltiples paneles simultáneos
- Gráficos amplios
- Atajos de teclado

**Quién lo usa principalmente:**
- Diego (fundador, Nivel 3)
- Profesionistas Nivel 2-3-4 en sus momentos de planeación
- Andrea cuando "se sienta a ver sus cosas" (raro al inicio, más frecuente al avanzar)

**Sensación:** *"estoy trabajando en serio mis finanzas"*

#### Copiloto Mobile (el "acompañante diario")

**Cuándo se usa:**
- Sesiones de 2-3 minutos
- Registros rápidos cuando estás en el banco / app del banco
- Consultas rápidas (¿cuánto tengo? ¿cómo voy?)
- Recibir reminders y notificaciones
- Ver tutoriales paso a paso mientras ejecutas en compu
- Lecciones cortas

**Características de diseño:**
- Una acción por pantalla
- Botones grandes (touch-friendly)
- Vista vertical optimizada
- Navegación simplificada
- Botón flotante de "Registrar movimiento" siempre visible

**Quién lo usa principalmente:**
- Andrea (usuaria ancla a largo plazo)
- Cualquier usuario en su uso diario
- Diego cuando está en el banco actualizando saldos

**Sensación:** *"Cope me acompaña en mi día"*

#### La conexión mágica entre los dos

Los datos viven en la **misma cuenta**. Lo que se hace en compu se ve en cel, y viceversa. Pero la **interfaz se adapta al contexto y al propósito**.

**Caso de uso poderoso (el que motivó el pivote):**
> Andrea quiere abrir su cuenta de CetesDirecto.
> - En su compu: tiene el sitio de CetesDirecto abierto, ejecutando la acción
> - En su celular: tiene Cope abierto mostrándole el recorrido guiado paso a paso
> - El celular = manual; la compu = ejecución
> - Cope acompaña en tiempo real sin necesidad de que Diego (u otro humano) esté presente

### 5 verbos centrales (sin cambios)

1. **ENTENDER** — ver tu dinero con claridad por primera vez
2. **APRENDER** — adquirir conocimiento en porciones digeribles
3. **ACTUAR** — tomar decisiones reales
4. **ACTUALIZAR** — registrar movimientos cuando suceden
5. **PLANEAR** — proyectar metas futuras

### Mecánica central (actualizada v1.2)

1. **Saldo manual** (no Open Banking)
2. **Metas como hubs** (4 tipos: Crecer/Conservar/Proyecto/Obligatorio)
3. **Recorridos guiados** (mejor implementados ahora con la lógica Estudio+Copiloto)
4. **Procesos abiertos / Open Loops**
5. **Anclaje emocional** (todo se traduce a meta personal)
6. **NUEVO: Coordinación multidispositivo** (compu hace, celular guía/consulta)

### Onboarding: pendiente de rediseño

El onboarding actual (knowledge-based diagnostic con 7 preguntas y perfiles tipo "Explorador") **queda como WIP en el repo** pero **NO es prioridad inmediata**.

Lógica del pivote: el onboarding no se puede diseñar bien sin saber concretamente a qué está dando bienvenida. Una vez que el Estudio Desktop tenga las pantallas core (Cuentas, Movimientos, Metas, Dashboard), regresamos al onboarding con claridad.

---

## 4. Modelo de negocio (Capa 4)

Sin cambios respecto a v1.1.

**Mentalidad:** Diego no tiene meta de income forzada ni de tiempo. Construir una empresa propia con flexibilidad de operación y monetización.

**Fases:**
- **Año 1 (Validación):** Cope gratis total
- **Año 2 (Monetización ligera):** Referidos a productos verificados + productos educativos transaccionales
- **Año 3 (Modelo robusto):** Cope Pro suscripción + comunidad

**Cliente eventual de paga:** "Andrea 2.0" (25-32 años, gana $25-40k, profesionista con metas urgentes).

---

## 5. Hoja de ruta REORDENADA (Capa 5)

### Roadmap actualizado tras pivote v1.2

**Mes 1 (anterior plan):** ~~Onboarding completo~~ → **Estudio Desktop core**
**Mes 2:** Adaptación a Copiloto Mobile
**Mes 3:** Rediseño del onboarding (con producto ya funcionando)
**Mes 4-6:** Recorridos guiados, reminders, modo planeación
**Mes 6:** Evaluación honesta (mismas métricas de éxito)

### Roadmap micro: Estudio Desktop primero

Construcción ordenada de las pantallas core basadas en el Excel de Diego:

**Sprint 1: Portafolio + Cuentas (estimado 1-2 sesiones)**
- Pantalla principal del Estudio: dashboard de portafolio
- CRUD de cuentas multi-tipo (bancos, instrumentos, efectivo)
- Vista de patrimonio total + concentrado de instrumentos
- Equivalente a pestaña "Portafolio" del Excel
- Multi-moneda MXN/USD

**Sprint 2: Movimientos**
- Captura de movimientos (depósito, retiro, transferencia)
- Notas libres con sugerencias
- Vinculación a cuentas
- Vista de historial
- Equivalente al Google Form + sheets de Diego

**Sprint 3: Metas**
- CRUD de metas (4 tipos: Crecer, Conservar, Proyecto, Obligatorio)
- Vinculación movimientos ↔ metas
- Proyecciones básicas
- Vista detalle por meta

**Sprint 4: Estrategia / Plan de Aportaciones**
- Distribución de sueldo por %
- Templates y plan personalizado
- Equivalente a pestaña "Estrategia" del Excel

**Sprint 5: Análisis y refinamiento Desktop**
- Gráficos amplios
- Vista de rendimientos por instrumento
- Distribución RF/RV
- Pulido visual del Estudio

**Sprint 6: Adaptación a Copiloto Mobile**
- Reorganización de las pantallas para móvil
- Botón flotante de registrar movimiento
- Vista compacta de dashboard
- Optimización táctil

**Sprint 7: Rediseño del onboarding**
- Con el producto ya conocido, diseñamos la mejor entrada
- Probablemente más simple que la versión actual (perfil-based)
- Posibles "Recorridos guiados" desde el onboarding

---

## 6. Principios rectores (v1.2)

### 13 principios

1. Cope habla como amiga, no como banco
2. Cope se adapta al nivel del usuario
3. Cope enseña en el momento, no en cursos
4. Cope organiza por metas, no por categorías
5. Cope actualiza por evento, no por ritual
6. Cope guía, no opina
7. Cope crece con el usuario
8. Cope es transparente
9. Cope mide tiempo recuperado, no minutos en app
10. Cope nunca avergüenza al usuario
11. Cope se diseña para 2-3 minutos (en mobile)
12. Cope ancla emocionalmente todo
13. **NUEVO v1.2: Cope respeta el contexto del usuario** (Estudio Desktop para trabajo profundo; Copiloto Mobile para acompañamiento diario; los dos coordinados con los mismos datos)

---

## 7. Riesgos y mitigaciones

Sin cambios mayores. Se agrega un riesgo nuevo:

### Riesgo 9 (NUEVO v1.2): Construir solo para Diego, perder a Andrea

Al priorizar Estudio Desktop primero (para Diego beta tester), existe el riesgo de hacer un producto "para sofisticados" que después no funcione para Andrea.

**Mitigación:**
- Mantener visión clara: el destino final es servir a Andrea
- Cada feature del Estudio debe poder reducirse a una versión simple en Mobile
- Cuando lleguemos a Copiloto Mobile, evaluar críticamente cada pantalla con la lente de Andrea
- Eventualmente retomar research con Andrea cuando tengamos algo concreto que probar

---

## 8. Recursos del proyecto

### Documentos
- **PLAN.md** — visión original
- **STRATEGY.md** — biblia ejecutiva v1.2 (este documento)
- **EXCEL-MAPPING.md** — blueprint funcional
- **USER-RESEARCH-LOG.md** — bitácora de research

### Próximo documento a crear
- **PRODUCT-SPECS.md** — especificaciones técnicas del Estudio Desktop, sprint por sprint, basadas en el Excel de Diego

### Infraestructura técnica
- **GitHub:** https://github.com/diegoragu98/cope-app
- **Vercel:** https://cope-app.vercel.app
- **Stack:** Next.js 15 + TypeScript + Tailwind + shadcn/ui

---

## 9. Próximos pasos inmediatos

### Para Diego (cerrar sesión actual)
1. Guardar STRATEGY.md v1.2 en `cope-app/`
2. Commit final del onboarding actual (WIP) en Claude Code
3. Push a GitHub
4. Cerrar sesión y descansar

### Para próxima sesión (planeación + construcción)

**Paso 1: Sesión de planeación en claude.ai (15-30 min)**
Mensaje sugerido para arrancar:

> Hola Claude. Regreso a Cope. Vamos a arrancar el Sprint 1 (Portafolio + Cuentas del Estudio Desktop). Antes de pasar a Claude Code, hagamos una sesión de planeación aquí donde definamos exactamente qué pantallas construir, basándonos en mi Excel.

En esa sesión:
- Revisaremos juntos el Excel pestaña por pestaña
- Definiremos qué pantalla del Estudio Desktop se construye primero
- Armaremos un brief técnico súper detallado para Claude Code

**Paso 2: Construcción en Claude Code**
Con el brief listo, pasarlo a Claude Code y construir.

---

## 10. Cierre

Esta versión v1.2 captura **3 pivotes estratégicos** importantes hechos en la sesión 2:

1. **Knowledge-based diagnostic** (intermedio) — quedó documentado pero no es prioridad
2. **Producto-primero, onboarding-después** — reorden de construcción
3. **Arquitectura Estudio + Copiloto** — reconocimiento de los dos contextos de uso

Cope NO cambia su visión. Cambia su orden de construcción y reconoce explícitamente cómo se vive en distintos dispositivos.

> "Tu Excel resultó ser el blueprint funcional de Cope. Andrea es el destino. El camino: construir tu Estudio primero, después adaptar para Andrea, después diseñar la entrada."

**A construir.**

---

*Fin del STRATEGY.md v1.2*
*Mayo 2026*
