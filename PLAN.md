# Cope — Tu copiloto financiero

> Documento de visión y plan del MVP
> Versión 0.1 — Mayo 2026
> Autor: Diego

---

## 1. Visión del producto

**Cope** es una app de educación financiera interactiva para México que no solo te muestra dónde está tu dinero, sino que **te enseña qué hacer con él y te guía paso a paso**. Es el copiloto que la mayoría de los mexicanos nunca tuvo: la figura amigable y paciente que te acompaña en cada decisión financiera, desde tu primer sueldo hasta tu boda, tu primera casa y el retiro.

### El problema

- Solo el 36% de los mexicanos planifica sus gastos con un presupuesto.
- El 68% no ahorra de forma regular; los que ahorran prefieren tandas, cajas de ahorro o guardar dinero en casa.
- El 60% no entiende cómo funciona una tarjeta de crédito ni cómo calcular intereses.
- El 76.5% tiene al menos un producto financiero formal, pero no sabe usarlo bien.

La gente **ya tiene cuentas bancarias** y **ya tiene ingresos**. Lo que no tienen es a alguien que les explique qué hacer con su dinero.

### La solución

Una app que combina tres cosas que hoy están separadas:

1. **Educación interactiva** estilo Duolingo (lecciones cortas de finanzas personales).
2. **Presupuesto y seguimiento** de gastos con propuestas inteligentes de reparto.
3. **Guía paso a paso para invertir** (CETES, fondos, bolsa) explicada como si te lo contara un amigo.

### Diferenciador clave

- **Fintonic** te muestra tus gastos, pero no te enseña.
- **Condusef / cursos online** te enseñan, pero no se conectan con tu dinero real.
- **Stori / Albo / Klar** te dan productos, pero no te guían.

**Cope hace las tres cosas, integradas en una sola experiencia conversacional.**

---

## 2. Visión a largo plazo

Cope no es una app para 6 meses, es una relación de 20+ años con el usuario. Evoluciona con cada etapa de vida:

- **Etapa 1 — Primer sueldo (18-25 años):** entender el dinero, hacer un presupuesto, empezar a ahorrar e invertir desde poco.
- **Etapa 2 — Metas grandes (25-32 años):** boda, viaje, enganche para auto, primer departamento.
- **Etapa 3 — Vida en pareja / familia (30-40 años):** presupuesto familiar, decisiones compartidas, hipoteca, hijos.
- **Etapa 4 — Patrimonio (40+ años):** inversiones más complejas, retiro, herencia.

El usuario empieza con Cope a los 22 y se queda 20 años. Esto cambia totalmente la economía del producto.

### Slogans posibles

- *Cope. Tu copiloto financiero.*
- *El amigo que te explica cómo funciona el dinero.*
- *Aprende, ahorra, invierte. Sin complicarte.*

---

## 3. MVP — Alcance del prototipo visual

Para el primer prototipo NO vamos a construir todo. Vamos a enfocarnos en **una sola experiencia muy bien hecha**: *"Tu primer mes con Cope"*.

### Flujo principal del MVP

1. **Landing / Pantalla de bienvenida**
   - Logo de Cope
   - Frase clara de propuesta de valor
   - Botón "Empezar"

2. **Onboarding educativo (3-4 pantallas)**
   - ¿Qué es un presupuesto? (1 pantalla)
   - La regla 50/30/20 explicada con ejemplos mexicanos (1 pantalla)
   - ¿Para qué sirve ahorrar? (1 pantalla)
   - "Listo, vamos a crear el tuyo" (call to action)

3. **Configuración inicial**
   - Pregunta: ¿Cuánto ganas al mes?
   - Pregunta: ¿Cuáles son tus gastos fijos? (renta, transporte, etc.)
   - Pregunta: ¿Tienes alguna meta? (ahorrar para X, viajar, etc.)

4. **Dashboard principal**
   - Tarjeta del mes actual con sueldo, gasto y ahorro
   - "Cubetas" visuales del presupuesto (necesidades 50%, gustos 30%, ahorro/inversión 20%)
   - Botón flotante de chat con Cope para preguntar cosas

5. **Módulo educativo "Aprende con Cope"**
   - 5 lecciones cortas de muestra (5-7 minutos cada una)
     - Lección 1: ¿Qué es el dinero?
     - Lección 2: Presupuesto en 5 pasos
     - Lección 3: Tarjetas de crédito sin morir en el intento
     - Lección 4: ¿Qué son los CETES?
     - Lección 5: Tu primera inversión

6. **Módulo "Invertir con Cope"**
   - Explicación interactiva: cuenta de ahorro vs CETES vs fondos vs bolsa
   - Simulador: "Si ahorras X al mes a tasa Y, en Z años tendrás..."
   - Guía paso a paso: cómo abrir cuenta en CetesDirecto (capturas + texto)

7. **Chat conversacional con Cope** (lo más ambicioso del MVP)
   - El usuario escribe "Me llegaron $15,000 de sueldo, ¿qué hago?"
   - Cope responde con propuesta personalizada de reparto
   - Para el prototipo: respuestas hardcodeadas o conectadas a la API de Claude

### Qué NO entra en el MVP

- Conexión real con bancos (eso es una fase 2 con Belvo o similar y requiere regulación).
- App móvil nativa (vamos a hacer web app responsive, se ve bien en celular).
- Sistema de cuentas / login real (para el prototipo, datos en memoria).
- Pagos, transferencias, productos financieros reales.
- Comunidad, foros, gamificación compleja.

---

## 4. Stack técnico recomendado

Como Diego no tiene experiencia programando y vamos a usar Claude Code para construir:

- **Framework:** Next.js 15 con App Router (web app moderna y rápida)
- **Lenguaje:** TypeScript (más seguro que JavaScript puro)
- **Estilos:** Tailwind CSS (rápido de iterar)
- **Componentes UI:** shadcn/ui (componentes pre-hechos bonitos)
- **Estado:** React state local (no necesitamos base de datos en el prototipo)
- **Iconos:** Lucide React
- **Gráficas:** Recharts (para el dashboard)
- **Deploy del prototipo:** Vercel (gratis, un click para publicarlo)

### Por qué este stack

- Es el stack más común para prototipos modernos.
- Claude Code lo conoce perfectamente.
- Si decides ir más en serio después, no hay que tirar nada: este mismo stack escala a producción.
- Vercel te da una URL pública gratis para enseñarle el prototipo a amigos, family, investors.

---

## 5. Identidad visual inicial

### Personalidad de marca

- **Cercano** (no formal ni bancario)
- **Mexicano** (sin caer en estereotipos)
- **Calmado** (no ansioso, no agresivo de ventas)
- **Joven pero serio** (puedes confiarle tu dinero)
- **Educativo** (explica todo, nunca asume que sabes)

### Paleta de colores (propuesta inicial — se ajusta después)

- Color primario: verde menta oscuro `#0F766E` (confianza + frescura, no es el verde típico bancario)
- Color secundario: durazno suave `#FED7AA` (calidez, mexicano)
- Color de acento: amarillo mostaza `#EAB308` (atención sin gritar)
- Fondo: crema cálido `#FAFAF5`
- Texto: gris carbón `#1F2937`

### Tipografía

- Encabezados: Geist o Inter (sans-serif moderna)
- Cuerpo: Inter
- Tono cariñoso, voz en segunda persona ("tú", no "usted")

---

## 6. Plan de ejecución con Claude Code

### Fase 0 — Setup (día 1)
- Crear carpeta del proyecto
- Inicializar Next.js + TypeScript + Tailwind
- Instalar shadcn/ui
- Subir a GitHub (opcional pero recomendado)

### Fase 1 — Landing + Onboarding (día 2-3)
- Pantalla de bienvenida
- 4 pantallas de onboarding educativo
- Navegación entre pantallas

### Fase 2 — Configuración + Dashboard (día 4-5)
- Formulario de sueldo, gastos fijos, metas
- Dashboard con cubetas del 50/30/20
- Gráfica simple de distribución

### Fase 3 — Módulo educativo (día 6-7)
- Estructura de lecciones
- 5 lecciones de muestra con texto e ilustraciones

### Fase 4 — Módulo de inversión (día 8-9)
- Comparador visual: ahorro vs CETES vs fondos
- Simulador de interés compuesto
- Guía paso a paso CetesDirecto

### Fase 5 — Chat con Cope (día 10-12)
- UI del chat
- Integración con API de Claude
- Prompts de sistema para que "actúe" como Cope

### Fase 6 — Pulido y deploy (día 13-14)
- Revisar todas las pantallas en móvil
- Animaciones suaves
- Deploy a Vercel
- Enseñarlo a 5-10 amigos para feedback inicial

---

## 7. Métricas de éxito del prototipo

El MVP no es para ganar dinero, es para **validar la idea**. Considéralo exitoso si:

- 10 amigos lo usan y al menos 7 dicen "yo usaría esto".
- Al menos 3 personas terminan el onboarding completo y crean su presupuesto.
- Recibes ideas concretas de qué agregar (no críticas vagas).
- Tú mismo lo usas para tu propio dinero al menos 2 semanas.

Con eso, ya tienes munición para decidir si vale la pena ir por la fase 2 (versión funcional real).

---

## 8. Notas finales para Claude Code

- **No tengo experiencia programando.** Explícame las decisiones técnicas en cristiano.
- **Antes de escribir código complejo**, mostrame el plan y pídeme aprobación.
- **Si hay que instalar algo**, dime exactamente qué comando correr y qué espero ver.
- **Si algo no funciona**, ayúdame a debuggear paso a paso sin asumir conocimiento previo.
- **Vamos por fases.** No quiero todo de golpe, prefiero ver una pantalla bien hecha antes que diez a medias.

---

*Fin del PLAN.md — Si lees este documento, ya sabes todo lo necesario para empezar a construir Cope conmigo.*
