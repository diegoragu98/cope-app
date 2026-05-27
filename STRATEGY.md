# STRATEGY.md
## Cope — Biblia ejecutiva de estrategia

> Documento maestro: visión, usuario, experiencia, modelo de negocio y roadmap.
> Sesión: Diego × Claude — Mayo 2026
> Versión: 1.0
> Estado: Estrategia cerrada, listo para construir Tier 1.

---

## 0. Resumen ejecutivo (TL;DR)

**Cope** es una app de educación financiera personalizada para México. No es una app de presupuesto ni una app de inversión; es **un copiloto que organiza tu vida financiera por metas reales** y te enseña sobre la marcha lo que nadie te enseñó.

**Su diferenciador real:** Cope **crece con el usuario** desde "no sé qué hacer con mi sueldo" (Andrea, 23 años) hasta "tengo 9 metas en paralelo y mi Excel ya no aguanta" (Diego, 28 años casándose).

**Su mecánica central:** saldo manual + metas como hubs + educación contextual.

**Su modelo de negocio inicial:** gratis con referidos a productos financieros verificados.

**Su roadmap:** construir el Tier 1 del MVP en las próximas 4 semanas con Andrea como validadora principal.

---

## 1. La promesa de Cope (Capa 1)

### Frase oficial — formato largo (para sitio web, pitch, App Store)

> Cope es la app que enseña a los mexicanos lo que nadie nos enseñó: qué hacer con nuestro dinero. Te ayuda a entender tu sueldo, organizar tu presupuesto y dar tus primeros pasos en inversión — todo en lenguaje normal, sin tecnicismos.

### Frase oficial — formato medio (hero de landing)

> Tu dinero, sin tecnicismos.
> Cope te enseña lo que nadie te enseñó: qué hacer con tu sueldo, cómo ahorrar y cómo invertir, paso a paso.

### Frase oficial — formato corto (tagline, botones)

> Cope. Tu copiloto financiero.

### Pitch del Uber

> *"Es una app para mexicanos que nunca nos enseñaron de dinero. Te dice qué hacer con tu sueldo, te enseña a ahorrar e invertir, y todo en lenguaje normal, sin tecnicismos."*

### Momento "ajá"

Cuando un usuario, en su primera sesión, ingresa su sueldo y Cope le muestra al instante una propuesta visual de cómo repartirlo en cubetas (necesidades, gustos, ahorro/inversión) con cantidades exactas en pesos, y le explica el porqué de cada cubeta como lo haría un amigo. En ese momento dice: *"wow, nadie me había explicado mi propio dinero así"*.

### Transformación

**Antes de Cope:** sentía que el dinero se me iba sin saber en qué, y cada quincena empezaba con la misma angustia: "¿voy a llegar?". Nunca aprendí esto en la escuela ni en mi casa, y me daba pena preguntar.

**Después de Cope:** abro la app y sé exactamente cuánto tengo, cuánto puedo gastar y cuánto va a mi ahorro. Aprendí lo que es un CETE, abrí mi primera cuenta, y por primera vez siento que mi dinero trabaja para mí, no al revés.

---

## 2. El usuario (Capa 2)

### Usuario ancla: Andrea (23 años)

**Perfil resumido**
- 23 años, recién egresada de la universidad
- Primer trabajo formal, sueldo $8,000-$15,000 al mes
- Vive con sus papás (cubren lo grande) o renta cuarto
- Cuenta de débito del banco que le abrió la empresa
- **NO tiene tarjeta de crédito** (le da miedo o no sabe cómo conseguirla)
- Pasa 4-6 horas al día en el celular (Instagram, TikTok, WhatsApp, Spotify)
- Si una app no la engancha en 30 segundos, la borra

**Lo que NO sabe**
- Qué es un presupuesto y cómo armarlo
- Diferencia entre cuenta de débito y de ahorro
- Qué es un CETE
- Cómo funcionan las TDC y sus beneficios
- Cómo planear para sus metas

**Dolores emocionales**
- Le da pena no saber de dinero a su edad
- Le angustia depender de sus papás
- Le frustra ver opciones financieras y no entender ninguna
- Le da miedo "hacerlo mal" y perder dinero

**Sueños y metas**
- **Maestría en el extranjero en 1-3 años** ($150-300k)
- Viajar al extranjero con amigas
- Mudarse sola
- Sentirse independiente y adulta

**Frases típicas**
> *"Sí ahorro, pero no es como que tenga un plan ni nada"*
> *"No tengo TDC porque me da miedo endeudarme"*
> *"Sí quiero hacer la maestría pero no sé ni cuánto necesito"*

### Usuario secundario: Diego (28-32 años)

**Perfil resumido**
- 28-32 años, profesionista con 5+ años de carrera
- Ingreso estable $40k+ al mes
- Ya tiene sistema financiero sofisticado (Excel propio, CETES, GBM, fondo emergencia)
- Múltiples metas paralelas (boda, casa, coche, GNP)
- Su Excel ya no aguanta la complejidad de su vida

**Por qué es importante**
Diego es el "destino" al que Andrea quiere llegar. La existencia de Diego justifica la propuesta de "Cope crece contigo".

### Modelo de niveles

Los usuarios de Cope progresan por niveles:

**Nivel 1 — Principiante (Andrea hoy)**
- Todo en débito, sin TDC, cero inversiones
- Objetivo: presupuesto, primer ahorro, primera TDC, primer CETE

**Nivel 2 — En camino**
- Presupuesto activo, TDC sin deuda, fondo emergencia parcial
- Objetivo: completar fondo, CetesDirecto, primera inversión RV

**Nivel 3 — Optimizando (Diego hoy)**
- Fondo completo, CETES como hub operativo, inversiones diversificadas
- Objetivo: optimizar timing, planes de largo plazo, metas grandes

**Nivel 4 — Avanzado**
- Inversiones internacionales, bienes raíces, planeación fiscal
- Objetivo: patrimonio en construcción

**Cope acompaña al usuario del Nivel 1 al 4 a lo largo de los años. Esa progresión es el ADN del producto.**

---

## 3. La experiencia core (Capa 3)

### 5 verbos centrales que rigen Cope

1. **ENTENDER** — ver tu dinero con claridad por primera vez
2. **APRENDER** — adquirir conocimiento financiero en porciones digeribles
3. **ACTUAR** — tomar decisiones reales (ahorrar, invertir, sacar TDC)
4. **ACTUALIZAR** — registrar movimientos cuando suceden
5. **PLANEAR** — proyectar metas futuras y modelar escenarios

Estos 5 verbos están **entretejidos**, no son módulos separados. Cuando Andrea actualiza, automáticamente entiende. Cuando entiende, naturalmente actúa. Cuando actúa, eventualmente planea.

### Mecánica central: Saldo manual + Metas como hubs

**Saldo manual (no Open Banking)**
- El usuario actualiza saldos cuando mueve dinero (no requiere conectar bancos)
- Resuelve el problema #1 de retención de apps de finanzas (no tedioso registrar gastos)
- Liberación de costos de Open Banking
- Educativo por diseño: cada actualización es un momento de conciencia financiera

**Metas como hubs (no categorías abstractas)**
- La vida real se piensa por metas (boda, coche, maestría), no por categorías (entretenimiento, comida)
- Cada meta es un "contenedor" con: monto, fecha, tipo, cuenta vinculada, historial, proyección
- 4 tipos de meta: Crecer / Conservar / Proyecto / Obligatorio

### Onboarding: el "Check-up de Andrea"

Primera sesión de 7 minutos que transforma:

1. **Bienvenida** (5 seg)
2. **Diagnóstico conversacional** (2 min) — 6 preguntas tipo amiga
3. **Tu Diagnóstico Cope** (90 seg) — situación + Cope Score inicial + plan a trabajar
4. **Tu primer mes simulado** (90 seg) — sueldo repartido visualmente en cubetas (50/30/20)
5. **Primera meta activada** (60 seg) — basada en lo que dijo en diagnóstico
6. **Bienvenida al dashboard**

**Aquí ocurre el momento "ajá":** la pantalla del sueldo repartido en cubetas.

### Diferenciador real

| App | Lo que ofrece |
|---|---|
| Fintonic | "Te muestro tus gastos" |
| Stori/Klar/Albo | "Te doy una tarjeta" |
| Cursos YouTube | "Te explico conceptos" |
| CetesDirecto | "Te dejo invertir" |
| **Cope** | **"Te conozco, te entiendo, te enseño y te guío a tu meta — todo en una conversación"** |

Cope no es una app de finanzas. **Cope es una experiencia personal de educación financiera con tu propio dinero como ejemplo.**

### Educación contextual (Just-in-Time Learning)

Las lecciones aparecen en el momento que el usuario las necesita, no en un módulo aparte. Cada lección 2-5 minutos, con quiz opcional.

### Cope Score

Métrica única 1-100 que resume salud financiera. Permite tracking de progreso, motivación, gamificación responsable.

---

## 4. Modelo de negocio (Capa 4)

### Mentalidad fundadora

**Diego no tiene meta de income forzada ni de tiempo.** El objetivo es construir una "empresa propia" que genere ingreso adicional, con apertura a:
- Operación solo o con socios
- Crecimiento orgánico
- Pivotear según evidencia

**Esto es saludable.** Permite construir algo bueno sin atajos.

### Realidad del mercado

**El modelo $99/mes es brutalmente difícil en México:**
- Andrea (gana $12k/mes) NO va a pagar $99/mes por una app
- Apps de finanzas personales por suscripción tienen historia muy difícil en México
- Mint (gratis) era líder en USA y Intuit la mató
- YNAB ($99 USD/año) es nicho

**Pero hay caminos reales hacia ingresos.**

### Estrategia por fases

**Fase 1 — Validación (Año 1, meses 1-12)**
- **Cope gratis total**
- Objetivo: construir audiencia, validar producto, generar confianza
- Métricas que importan: usuarios activos diarios/mensuales (DAU/MAU), retención día 7/30/90, referidos orgánicos
- **Ingreso esperado: $0**

**Fase 2 — Monetización ligera (Año 2)**
- Cope sigue gratis
- **Referidos a productos financieros verificados**: CetesDirecto, GBM+, Hey Banco, Nu, Stori, etc.
- Cada referido genera $100-$2,000 MXN
- Total transparencia: *"Cope solo recomienda lo que ya verificó"*
- Posible: **productos educativos transaccionales** (guías de $99-499 MXN sobre temas específicos)
- **Ingreso esperado: $5,000-$25,000 MXN/mes** (con tracción)

**Fase 3 — Modelo robusto (Año 3+)**
- Cope sigue gratis
- **Cope Pro** ($99-149/mes) con: AI coach ilimitado, planes detallados, modo familia, automatizaciones avanzadas
- Posible: **comunidad de pago** ($149/mes) con sesiones en vivo
- Referidos consolidados
- **Ingreso esperado: $30,000-$80,000 MXN/mes** (con tracción real)

### Modelos alternativos a explorar

Si la suscripción no funciona:
- **Comisiones por referidos** (modelo NerdWallet)
- **Comunidad de pago** (Discord/Circle con $99-149/mes)
- **Newsletter de pago** (Substack/Beehiiv)
- **B2B2C**: empresas pagan Cope para sus empleados como prestación
- **Marca personal + Cope como vehículo**

### Quién paga por Cope (importante)

**Diego (el fundador) NO es cliente de paga.** Su Excel ya funciona. Cope tiene que ahorrarle tiempo y decisiones reales para que él valore pagar.

**Andrea (la usuaria ancla) tampoco es cliente de paga inicialmente.** No tiene ingresos para suscripciones.

**El cliente de paga eventual es "Andrea 2.0"** — Andrea convertida en Nivel 2-3 con 2-3 años más en el mercado laboral, gana $25-40k, tiene metas urgentes (casa, boda), y ya paga por Spotify/Netflix. **Ese es el segmento monetizable.**

Cope debe ser construido para Andrea hoy, pero pensando en quién será Andrea en 3 años.

---

## 5. Hoja de ruta (Capa 5)

### Roadmap macro (12 meses)

**Mes 1: Tier 1 — MVP Esencial**
- Onboarding completo
- Cuentas (saldo manual)
- Registrar Movimiento (botón flotante)
- Home con patrimonio + metas
- Metas como hubs (4 tipos)
- **Hito:** Andrea hace su primer presupuesto en Cope

**Mes 2: Validación con primeros usuarios**
- 5-10 amigas de Andrea usan Cope
- Iteración basada en feedback
- Refinamiento de UX
- **Hito:** 10 usuarios activos no-Diego

**Mes 3: Tier 2 — MVP Robusto**
- Plan de Aportaciones
- Calendario Financiero
- Detalle de Instrumento
- Cope Score v1
- 5 lecciones core
- **Hito:** Andrea cumple su primer mes de plan

**Mes 4-6: Tier 3 — Diferenciador**
- Modo Planeación (simulador de metas grandes)
- Reminders automáticos
- Pago Óptimo de TDC
- Vista Análisis
- Lecciones Nivel 2-3
- **Hito:** Diego cierra su Excel y abre Cope

**Mes 6: Evaluación honesta**

Métricas de éxito a 6 meses:
- ≥ 100 usuarios activos mensuales (no solo descargas, ACTIVOS)
- ≥ 50% retención día 30
- ≥ 30 usuarios completaron al menos 1 meta
- ≥ 5 testimonios genuinos no solicitados
- ≥ 1 referido orgánico por usuario (k-factor > 1)

**Si se cumple:** seguir, considerar monetización (referidos + producto educativo).
**Si no se cumple:** pivotar o revisar a fondo.

### Roadmap micro (semanas 1-4, Tier 1)

**Semana 1: Onboarding**
- Pantalla de bienvenida
- 6 preguntas conversacionales
- Pantalla de Diagnóstico Cope
- Pantalla de Primer Mes Simulado
- Pantalla de Primera Meta Activada
- Entrada al dashboard

**Semana 2: Cuentas y Movimientos**
- CRUD de cuentas (BBVA, Banorte, CETES, Nu, GBM, efectivo, etc.)
- Botón flotante "Registrar Movimiento"
- Modal de registrar movimiento (con tipo, cuenta, monto, meta, nota)
- Historial de movimientos por cuenta

**Semana 3: Metas**
- CRUD de metas
- 4 tipos: Crecer / Conservar / Proyecto / Obligatorio
- Vista detalle de cada meta
- Aportaciones vinculadas a metas
- Proyecciones básicas

**Semana 4: Home y polish**
- Dashboard principal con patrimonio total
- Lista de metas activas con progreso
- Variación mensual
- Indicador de deuda TDC
- Pulido visual, mobile-first
- Deploy a Vercel final del Tier 1

---

## 6. Principios rectores de Cope

Cuando haya duda sobre cualquier decisión, consultar estos principios:

### 1. Cope habla como amiga, no como banco
Tono: cercano, claro, sin jerga. Si Andrea no lo entiende, está mal escrito.

### 2. Cope se adapta al nivel del usuario
Misma app, distintas vistas. Andrea no debe ver complejidad de Diego, Diego no debe ver simplificaciones de Andrea.

### 3. Cope enseña en el momento, no en cursos
Just-in-Time Learning. La lección aparece cuando el usuario la necesita.

### 4. Cope organiza por metas, no por categorías
La vida se piensa por metas (boda, casa, maestría), no por buckets contables.

### 5. Cope actualiza por evento, no por ritual
El usuario actualiza cuando mueve dinero, no en un día de la semana arbitrario.

### 6. Cope guía, no opina
Cope sugiere opciones basadas en buenas prácticas, no recomienda inversiones específicas (regulación).

### 7. Cope crece con el usuario
La app de Andrea de hoy debe seguir sirviéndole cuando sea Diego en 5 años.

### 8. Cope es transparente
Si Cope gana por referidos, lo dice. No vende fingiendo ser neutral.

### 9. Cope mide tiempo recuperado, no minutos en app
Éxito = el usuario abre la app 2 minutos y resuelve algo. Éxito ≠ pasar 30 minutos en la app.

### 10. Cope nunca avergüenza al usuario
Cero juicio sobre gastos, deudas, decisiones pasadas. Empatía total.

---

## 7. Riesgos y mitigaciones

### Riesgo 1: Retención baja (problema universal de apps de finanzas)
**Mitigación:** Mecánica de saldo manual + metas como hubs + reminders inteligentes.

### Riesgo 2: Competencia rápida (bancos, ChatGPT)
**Mitigación:** Velocidad de iteración + comunidad + acceso directo a Andrea para feedback.

### Riesgo 3: Regulación CNBV/CONDUSEF
**Mitigación:** No dar asesoría específica de inversión. Cope educa y guía a productos verificados, no recomienda valores específicos.

### Riesgo 4: Fundador construyendo para usuario que no es él
**Mitigación:** Andrea es validadora #1. Cope eventualmente sirve a Diego también (Nivel 3-4 features).

### Riesgo 5: Tiempo limitado del fundador (side project)
**Mitigación:** Roadmap por tiers chicos, no perfeccionismo, momento "ajá" en MVP.

### Riesgo 6: Modelo de negocio incierto
**Mitigación:** Año 1 gratis (validar primero). Múltiples modelos a probar en Año 2.

---

## 8. Recursos del proyecto

### Documentos
- **PLAN.md** — visión original (subido al repo)
- **EXCEL-MAPPING.md** — blueprint funcional (este documento)
- **STRATEGY.md** — biblia ejecutiva (este documento)

### Infraestructura técnica
- **GitHub:** https://github.com/diegoragu98/cope-app
- **Vercel (app pública):** https://cope-app.vercel.app
- **Stack:** Next.js 15 + TypeScript + Tailwind + shadcn/ui

### Personas clave
- **Diego:** fundador, usuario semilla Nivel 3
- **Andrea:** validadora principal Nivel 1, prometida de Diego

---

## 9. Próximos pasos inmediatos

### Para Diego
1. Descargar este STRATEGY.md y el EXCEL-MAPPING.md actualizado
2. Guardarlos en la carpeta `cope-app` (junto a PLAN.md)
3. Hacer git commit con: *"docs: add strategy and excel mapping documents"*
4. (Opcional) Compartir Cope actual (cope-app.vercel.app) con Andrea para early feedback
5. (Opcional) Pensar nombres concretos de metas que Diego ya tiene (Boda Andrea+Diego, Casa CDMX, Bochito Amarillo, Plan GNP, etc.)

### Para próxima sesión con Claude Code
Mensaje sugerido para arrancar:

> Hola Claude. Vamos a empezar a construir el Tier 1 del MVP de Cope. En el proyecto hay 3 documentos importantes que quiero que leas con calma antes de empezar:
>
> 1. **PLAN.md** — la visión estratégica original
> 2. **EXCEL-MAPPING.md** — el blueprint funcional detallado
> 3. **STRATEGY.md** — la biblia ejecutiva con las 5 capas de estrategia
>
> El más importante es STRATEGY.md, porque consolida todas las decisiones tomadas.
>
> Una vez que los hayas leído, hagamos esto:
>
> 1. Confírmame que entendiste la visión y la estrategia.
> 2. Propón un plan detallado de la **Semana 1: Onboarding completo** (las 6 pantallas: Bienvenida + Diagnóstico + Cope Score + Primer Mes + Primera Meta + Dashboard).
> 3. Espera mi aprobación antes de programar.
> 4. Una vez aprobado, ve pantalla por pantalla, mostrándome el avance en localhost antes de seguir a la siguiente.
>
> Recuerda: no tengo experiencia programando. Ve paso por paso, explícame en cristiano.

---

## 10. Cierre

Diego: este documento representa el resultado de una sesión estratégica intensa y honesta. Cope ya no es una idea genérica de "app de finanzas para mexicanos". Es un producto con visión clara, usuario definido, experiencia diferenciada, modelo de negocio realista y roadmap accionable.

**Lo más valioso de esta sesión no fueron los documentos. Fue el insight:**

> Tu Excel resultó ser un mockup funcional de Cope. La diferencia entre "Excel de Diego" y "Cope" no es lo que muestra, es lo que hace por el usuario:
> 
> - Excel te muestra el estado.
> - Cope te muestra el estado, te recuerda, te enseña, te proyecta y te guía.

Si construimos Cope bien, en 6 meses tú mismo vas a cerrar tu Excel y abrir Cope. **Y ese es el mejor termómetro de éxito posible.**

A construir.

---

*Fin del STRATEGY.md*
*Versión 1.0 — Mayo 2026*
