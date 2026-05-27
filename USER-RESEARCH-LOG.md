# USER-RESEARCH-LOG.md
## Bitácora de research con usuarios reales

> Documento vivo: cada conversación con usuarios potenciales o reales se documenta aquí.
> Objetivo: extraer insights accionables que guían decisiones de producto.
> Mantenido por: Diego (fundador)
> Iniciado: Mayo 2026

---

## Cómo usar este documento

Cada vez que Diego (o eventualmente alguien del equipo) tenga una conversación o sesión de uso con un usuario real, debe documentarla aquí con la siguiente estructura:

1. **Fecha y contexto**
2. **Quién es el usuario** (perfil breve)
3. **Qué pasó** (lo más objetivo posible, qué se hizo, qué se dijo, frases textuales)
4. **Insights extraídos** (qué aprendimos)
5. **Decisiones de producto derivadas** (qué cambia en Cope por esto)

Este documento es **oro puro**. Vale más que cualquier libro de teoría de producto. Mantenerlo actualizado es prioridad alta.

---

## Sesión 1 — Mayo 2026

### Diego le explica su sistema financiero a Andrea + le ayuda a abrir CETES y solicitar TDC

#### Contexto

- **Fecha:** Mayo 2026 (segunda quincena)
- **Lugar:** En casa de Andrea, en la noche
- **Duración:** ~45 minutos
- **Participantes:** Diego (explicando) + Andrea (recibiendo)
- **Objetivo de Diego:** Enseñarle a Andrea su sistema financiero personal y ayudarle a dar sus primeros pasos (TDC + CETES)

#### Quién es Andrea

- 23 años
- Recién empezando a trabajar formalmente
- Sin TDC previa
- Sin experiencia de inversión
- Sin sistema financiero personal
- Prometida/novia de Diego
- Sueño principal: hacer una maestría en el futuro

#### Qué pasó (relato objetivo)

1. **Diego llenó manualmente los formularios** de CetesDirecto y de Nu para Andrea. Ella "solo iba ayudando".

2. **Diego le explicó su dinámica completa:**
 - Cómo recibe sueldo y lo manda parte a CETES, parte a Nu
 - Cómo paga todo con TDC
 - Cómo retira de CETES para pagar la TDC
 - Por qué esa "doble pista" maximiza rendimientos

3. **Diego le mostró la calculadora de CETES** con ejemplos:
 - Ejemplo: "Mira, con $1,000 en un año tienes $100 extra sin hacer nada"
 - Reacción de Andrea: poco interés / no se emocionó

4. **Andrea dijo textualmente:**
 > *"Ya sobre la marcha le iré agarrando"*

5. **Estado al terminar la sesión:**
 - ✅ Andrea solicitó su TDC Nu → esperando que llegue (7-10 días)
 - ⏳ Andrea inició proceso de CetesDirecto → pendiente subir documentos (INE, comprobante de domicilio)
 - ❓ Andrea no completó el aprendizaje conceptual de la sesión

#### Insights extraídos (orden de importancia)

##### Insight #1: La frase "Ya sobre la marcha le iré agarrando" es el principio rector de Cope

Cuando Andrea dijo esta frase, articuló sin saber el principio de diseño más importante:

> **No enseñes todo de golpe. Enseña justo cuando se necesita hacer algo.**

Esto valida con evidencia real el concepto de **Just-in-Time Learning** que ya estaba en STRATEGY.md, pero ahora no es teoría: es respuesta directa de la usuaria ancla.

**Implicación:** Cope no debe tener "módulos educativos". Debe tener lecciones que aparecen justo en el momento de actuar.

##### Insight #2: 45 minutos de teoría es agotador, incluso con la mejor intención

Andrea no es floja ni desatenta. **El proceso es agotador para alguien que no entiende los conceptos.** Es como si alguien te explicara 45 minutos de maquillaje profesional cuando no piensas maquillarte mañana: te desconectas.

**Implicación:** Cope debe estar diseñada para **sesiones de 2-3 minutos máximo**. Andrea va a entrar:
- 5 minutos antes de dormir
- En el Uber al trabajo
- En el baño
- Entre TikToks

Si un flujo dura más, se abandona.

##### Insight #3: El pitch racional NO funciona. Solo el pitch emocional engancha.

Cuando Diego le mostró: *"Mira, $100 extra sin hacer nada con CETES"* → Andrea no se emocionó.

**Por qué:** $100 no le cambia la vida. No conecta con nada que ella quiera.

**Pitch que SÍ habría funcionado** (hipótesis a validar):
> *"Andrea, si guardas $2,000 al mes en CETES, en 2 años tienes $52,000. Eso es la mitad del costo de tu maestría. Y solo necesitas no gastarte $2,000 al mes — que probablemente se te van en cosas que ni recuerdas."*

**Implicación:** Cope NUNCA presenta rendimientos en abstracto. Siempre los traduce a la meta del usuario. *"+$416 este mes = 1/3 de un boleto a Cancún ✈️"* en lugar de *"Rendimiento mensual del 10.5%"*.

##### Insight #4: Andrea no llenó los formularios sola. Diego lo hizo por ella.

Esto es revelador. Andrea probablemente no habría llenado los formularios sola por:
1. Es intimidante para alguien sin experiencia
2. Miedo a equivocarse
3. Procrastinación

**Implicación:** Cope debe sentirse como "alguien me está acompañando" al hacer trámites. Recorridos paso a paso con:
- Capturas de pantalla anotadas: *"Toca aquí donde dice 'Continuar'"*
- Tranquilizadores emocionales: *"Si te equivocas, no pasa nada"*
- Validaciones positivas: *"¡Listo! Paso 3 de 7 completado"*

Concepto que se incorpora oficialmente al producto: **Recorridos Guiados (Walkthroughs)**.

##### Insight #5: Quedaron procesos abiertos sin "cerrar"

Al terminar la sesión, Andrea quedó con:
- TDC Nu por llegar (7-10 días) → ¿cuándo activarla? ¿cómo? ¿qué hacer primero?
- CetesDirecto a medio trámite → ¿quién le va a recordar subir documentos? ¿quién le va a explicar qué documentos necesita?

**Quién le va a dar seguimiento? Nadie.** Diego no puede ser asistente personal 24/7.

**Implicación:** Cope debe acompañar los procesos hasta cerrarlos completamente. Concepto que se incorpora oficialmente al producto: **Procesos Abiertos (Open Loops)**.

Ejemplos de cómo se vería:
- *"Andrea, ya pasaron 7 días. ¿Ya te llegó tu TDC Nu?"*
- *"Hoy lunes, ¿podrías subir tu INE a CetesDirecto? Te toma 3 minutos."*
- *"¡Te llegó la TDC! Hoy te enseño a activarla en 2 minutos."*

##### Insight #6: La maestría es el ancla emocional confirmada

Cuando Diego le preguntó sobre metas/sueños, Andrea repite: maestría. Es **su gran sueño**.

**Implicación:** En Cope, la maestría no es "una meta más en una lista". Es **EL hilo conductor** de toda su experiencia. Cada pantalla, cada cálculo, cada lección debe referenciar la maestría.

#### Decisiones de producto derivadas (qué cambia en Cope)

**Cambios al STRATEGY.md (versión 1.1):**

1. ✅ Nuevo principio rector: *"Cope se diseña para 2-3 minutos."*
2. ✅ Nuevo principio rector: *"Cope ancla emocionalmente todo."*
3. ✅ Nuevo concepto: **Recorridos Guiados** (Walkthroughs paso a paso)
4. ✅ Nuevo concepto: **Procesos Abiertos / Open Loops**
5. ✅ Onboarding refactorizado: la **meta ancla** es paso #4 explícito, no enterrada
6. ✅ Nuevo riesgo identificado: *"Sobre-educar sin acción"*
7. ✅ Nuevo riesgo identificado: *"Pitch racional que no engancha"*

**Cambios al EXCEL-MAPPING.md (a actualizar en próxima sesión):**

Pendientes:
- Agregar sección sobre "Recorridos Guiados" con ejemplos:
 - Recorrido: "Abre tu cuenta CetesDirecto en 15 min"
 - Recorrido: "Solicita tu primera TDC sin que te rechacen"
 - Recorrido: "Activa tu Nu y haz tu primera compra inteligente"
- Agregar sección sobre "Procesos Abiertos" en el Home/Dashboard
- Refactorizar diseño de "Detalle de Instrumento" con anclaje emocional (no porcentajes)

#### Acciones pendientes con Andrea

Estas acciones tienen valor para el research, no solo para Andrea:

- [ ] Cuando llegue la TDC Nu, **documentar la experiencia de activación**:
 - ¿Cuánto tarda?
 - ¿Qué pasos confusos?
 - ¿Qué preguntas hace?
 - ¿Qué se siente "torpe"?
- [ ] Cuando suba documentos a CetesDirecto, **documentar:**
 - ¿Cuánto tarda?
 - ¿Cuántos intentos requiere?
 - ¿Qué errores aparecen?
- [ ] Después de 1 mes de uso de Cope (cuando esté listo el MVP):
 - ¿Lo abre? ¿Cuántas veces a la semana?
 - ¿Qué pantalla le gusta más? ¿Cuál no entiende?
 - ¿Recomienda Cope a alguien?

#### Preguntas abiertas para validar después

1. ¿Andrea conecta más con "tu maestría te espera" o con "tu independencia te espera"?
2. ¿Las notificaciones le ayudan o le molestan? ¿Con qué frecuencia?
3. ¿Prefiere "Cope te recuerda hacer X" o "Cope te pregunta cómo te fue con X"?
4. ¿Qué amigas de Andrea estarían dispuestas a probar Cope cuando esté listo?
5. ¿Hay otros conceptos que dio por sentado Diego y que Andrea no entiende? (Ej. RFC, CURP, comprobante de domicilio, etc.)

---

## Sesión 2 — [Pendiente]

*Próxima sesión a documentar: cuando llegue la TDC de Andrea y se active.*

---

## Sesión 3 — [Pendiente]

*Próxima sesión a documentar: cuando Andrea complete su registro en CetesDirecto.*

---

## Metodología recomendada para futuras sesiones

### Antes de la sesión
- Definir objetivo: ¿qué quiero aprender?
- Tener libreta o notas listas
- Decidir si grabar (con permiso) o solo tomar notas

### Durante la sesión
- Observar más que hablar
- Anotar **frases textuales** (oro puro)
- No corregir al usuario (deja que se equivoque y observa qué pasa)
- No "vender" Cope, dejar que el usuario reaccione genuinamente
- Notar **lenguaje corporal y tono**: ¿se aburre? ¿se emociona? ¿se confunde?

### Después de la sesión (dentro de 24 horas, mientras está fresco)
- Documentar en este archivo
- Extraer 3-5 insights principales
- Decidir qué cambia en Cope
- Listar acciones pendientes con el usuario

---

## Lista de usuarios para reclutar

A medida que el MVP esté listo, reclutar:

### Tier 1 — Círculo cercano (gratis, alta confianza)
- [ ] Andrea (usuaria ancla principal)
- [ ] 2-3 amigas de Andrea (mismo perfil)
- [ ] 1-2 amigos de Diego (Nivel 2-3, profesionistas)

### Tier 2 — Conocidos (gratis, validación moderada)
- [ ] Compañeros de trabajo de Diego
- [ ] Amigos de la universidad
- [ ] Familiares jóvenes (primos en sus 20s)

### Tier 3 — Desconocidos (validación real)
- [ ] Reclutamiento por redes sociales (TikTok, Instagram)
- [ ] Reclutamiento por comunidades (Reddit r/mexico, Facebook groups de finanzas)
- [ ] Incentivos: acceso temprano gratis + agradecimiento personal

---

## Mantenimiento

**Frecuencia objetivo:** mínimo 1 sesión documentada cada 2 semanas.

**Si no hay sesiones recientes:** alerta. El producto se está construyendo en burbuja. Salir a hablar con usuarios YA.

**Cada 5 sesiones:** revisar este documento completo y extraer patrones. ¿Qué insights se repiten? ¿Qué decisiones de producto son consistentemente validadas? ¿Cuáles habría que reconsiderar?

---

*Fin del USER-RESEARCH-LOG.md*
*Versión 1.0 — Mayo 2026*
