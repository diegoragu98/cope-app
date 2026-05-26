# Cope — Tu copiloto financiero

> Educación financiera interactiva para México. Aprende, ahorra, invierte. Sin complicarte.

## 🎯 ¿Qué es Cope?

Cope es una app de educación financiera que no solo te muestra dónde está tu dinero, sino que te enseña qué hacer con él y te guía paso a paso. Combina:

- **Educación interactiva** estilo Duolingo para aprender finanzas personales
- **Presupuesto inteligente** basado en la regla 50/30/20
- **Chat con IA** que responde preguntas sobre dinero y te da consejos personalizados

## 🛠 Stack técnico

- **Framework:** Next.js 15 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **UI:** Componentes propios + Lucide React para iconos
- **Gráficas:** Recharts
- **Deploy:** Vercel (auto-deploy en cada push a main)
- **PWA:** Manifest + Service Worker para instalación en celular

## 📁 Estructura del proyecto

```
cope-app/
├── app/
│   ├── (routes)/          # Rutas de la app (onboarding, dashboard, etc.)
│   ├── layout.tsx         # Layout global
│   ├── page.tsx           # Home
│   └── globals.css        # Estilos globales
├── components/
│   ├── ui/                # Componentes reutilizables (Button, Card, etc.)
│   ├── features/          # Componentes grandes (LandingPage, OnboardingFlow)
│   └── layout/            # Componentes de navegación (Header, Footer, PWA)
├── lib/
│   ├── utils.ts           # Funciones utilidad
│   ├── constants.ts       # Constantes globales (colores, rutas)
│   └── types.ts           # Tipos de TypeScript
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service Worker
│   └── icon.svg           # Ícono de la app
└── tailwind.config.ts     # Configuración de Tailwind
```

## 🚀 Cómo correr el proyecto localmente

### Requisitos

- Node.js 18+
- npm o yarn

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/diegoragu98/cope-app.git
   cd cope-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (opcional por ahora):**
   ```bash
   cp .env.example .env.local
   # Edita .env.local con tus valores
   ```

4. **Correr el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 🌐 Deploy

La app está configurada para deploy automático con Vercel:

- **Rama principal:** `main`
- **Deploy automático:** Cada push a `main` dispara un deploy automático
- **URL en vivo:** https://cope-app.vercel.app
- **Repositorio:** https://github.com/diegoragu98/cope-app

### Hacer deploy manualmente:

```bash
git push origin main
# Vercel detectará el cambio y hará deploy automáticamente
```

## 🎨 Sistema de diseño

### Colores Cope

- **Primario:** Verde menta `#0F766E`
- **Secundario:** Durazno `#FED7AA`
- **Acento:** Amarillo mostaza `#EAB308`
- **Fondo:** Crema `#FAFAF5`
- **Texto:** Gris carbón `#1F2937`

### Tipografía

- **Font:** Inter (desde Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700, 800

Usa las clases de Tailwind: `text-cope-primary`, `bg-cope-secondary`, etc.

## 📝 Componentes base disponibles

### Button

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg">
  Click me
</Button>
```

Variantes: `primary`, `secondary`, `ghost`  
Tamaños: `sm`, `md`, `lg`

### Card

```tsx
import { Card } from '@/components/ui/Card';

<Card variant="default">
  Contenido
</Card>
```

Variantes: `default`, `highlight`

### Container

```tsx
import { Container } from '@/components/ui/Container';

<Container size="lg">
  Tu contenido aquí
</Container>
```

Tamaños: `sm`, `md`, `lg`

### PageHeader

```tsx
import { PageHeader } from '@/components/ui/PageHeader';

<PageHeader
  title="Título"
  subtitle="Subtítulo"
  description="Descripción"
  icon="🎉"
/>
```

## 📱 PWA (Instalable en celular)

Cope es una PWA (Progressive Web App), lo que significa:

- ✅ Se puede instalar en la pantalla de inicio del celular
- ✅ Funciona offline (con caché básico)
- ✅ Tiene ícono personalizado
- ✅ Se ve como una app nativa

Para probar en tu celular:
1. Abre https://cope-app.vercel.app en Safari (iPhone) o Chrome (Android)
2. Toca "Compartir" → "Agregar a pantalla de inicio"
3. ¡Listo! Ya tienes Cope como app

## 🔧 Comandos útiles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Build para producción
npm run build        # Compila la app
npm start            # Inicia el servidor de producción

# Linting
npm run lint         # Verifica el código

# Actualizar dependencias
npm update           # Actualiza las dependencias
```

## 🚨 Variables de entorno

Por ahora no hay variables de entorno requeridas. En futuras fases cuando integremos con Claude API:

```bash
# Copia .env.example a .env.local
cp .env.example .env.local

# Edita .env.local y agrega tu clave
CLAUDE_API_KEY=sk-...
```

**Nunca commits variables sensibles.** `.env.local` está en `.gitignore`.

## 📚 Estructura de commits

Usamos conventional commits:

```
feat: add onboarding flow
fix: correct Button component styling
refactor: restructure project folders
docs: update README
```

## 🔄 Flujo de trabajo

1. Crea una rama desde `main`
2. Haz cambios y commits
3. Push a GitHub
4. Abre un PR (si trabajas en equipo)
5. Merge a `main`
6. Vercel hace deploy automático

## 📖 Documentación

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Recharts](https://recharts.org)

## 🤝 Contribuciones

Este es un proyecto personal de Diego para aprender y validar una idea de educación financiera en México.

## 📄 Licencia

Propietario — No es open source (por ahora).

---

**Hecho con ❤️ para México**

Última actualización: Mayo 2026
