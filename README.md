# Clon Inicial de MercadoLibre - Trabajo Colaborativo con Git y GitHub

Landing page básica inspirada en [`mercadolibre.com.co`](https://www.mercadolibre.com.co/), pensada para un **taller universitario** de trabajo colaborativo usando **Git** y **GitFlow**.

Tecnologías usadas:

- **HTML**
- **CSS**
- **JavaScript (vanilla)**

No se utilizan frameworks pesados para que el foco sea el flujo de trabajo en equipo y la organización del código.

---

## Descripción del proyecto

Estructura base de una landing page con:

- **Navbar** con logo estilo MercadoLibre y buscador principal.
- **Buscador de productos** (input + botón) conectado a un filtro de productos en JavaScript.
- **Productos destacados** cargados desde un arreglo de datos JS y mostrados en un grid de tarjetas.
- **Sección de servicios** (compra segura, envíos, garantía, atención al cliente).
- **Portafolio de desarrolladores** con hasta 4 tarjetas (una por integrante).
- **Footer** con información del proyecto, autores, año y enlaces útiles.

El código está organizado en secciones para que cada integrante pueda trabajar en su parte desde una rama `feature/*`.

---

## Estructura de carpetas

```text
mercadolibre-clone/
├── index.html
├── styles/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── images/      # Imágenes generales de la landing
│   └── avatars/     # Avatares de los desarrolladores
└── sections/
    ├── navbar.html
    ├── search.html
    ├── products.html
    ├── services.html
    ├── dev-portfolio.html
    └── footer.html
```

- **`index.html`**: versión integrada de la landing que usa todas las secciones.
- **`sections/*.html`**: archivos modulares para que cada rama de funcionalidad trabaje su propia parte.
- **`js/app.js`**: lógica de filtrado de productos, manejo de botones y comportamiento básico.
- **`styles/styles.css`**: estilos globales, diseño responsive, tarjetas, navbar y portafolio.

---

## Integrantes (ejemplo)

Completar con los datos reales del equipo:

- **Integrante 1**: Nombre completo · Rol (ej. Frontend) · GitHub: `https://github.com/usuario1`
- **Integrante 2**: Nombre completo · Rol · GitHub: `https://github.com/usuario2`
- **Integrante 3**: Nombre completo · Rol · GitHub: `https://github.com/usuario3`
- **Integrante 4**: Nombre completo · Rol · GitHub: `https://github.com/usuario4`

Se recomienda que cada integrante tenga asociada una rama de portafolio:

- `feature/dev-portfolio-1`
- `feature/dev-portfolio-2`
- `feature/dev-portfolio-3`
- `feature/dev-portfolio-4`

---

## Uso de GitFlow

Este proyecto está pensado para trabajar con la siguiente estructura de ramas:

- **`main`**: rama estable, lista para producción (deploy).
- **`develop`**: rama de integración de funcionalidades en desarrollo.
- **Ramas de feature** (una por sección o sub-tarea):
  - `feature/navbar`
  - `feature/product-search`
  - `feature/product-list`
  - `feature/services`
  - `feature/dev-portfolio`
    - `feature/dev-portfolio-1`
    - `feature/dev-portfolio-2`
    - `feature/dev-portfolio-3`
    - `feature/dev-portfolio-4`

### Paso 1: Inicializar repositorio

```bash
git init
git add .
git commit -m "feat: crea estructura del proyecto"
git branch -M main
```

Subir a GitHub (crear repo vacío antes):

```bash
git remote add origin https://github.com/USUARIO/mercadolibre-clone.git
git push -u origin main
```

### Paso 2: Crear rama develop

```bash
git checkout -b develop
git push -u origin develop
```

### Paso 3: Inicializar GitFlow (opcional, si usan la extensión / git-flow-cli)

```bash
git flow init
```

Configuración típica al responder las preguntas:

- Branch de producción: `main`
- Branch de desarrollo: `develop`
- Prefijo de features: `feature/`

### Paso 4: Crear ramas de features

Con GitFlow:

```bash
git checkout develop
git flow feature start navbar
git flow feature start product-search
git flow feature start product-list
git flow feature start services
git flow feature start dev-portfolio
```

O con Git "normal":

```bash
git checkout develop
git checkout -b feature/navbar
git checkout -b feature/product-search
git checkout -b feature/product-list
git checkout -b feature/services
git checkout -b feature/dev-portfolio
```

Para el portafolio de desarrolladores:

```bash
git checkout develop
git checkout -b feature/dev-portfolio-1
git checkout -b feature/dev-portfolio-2
git checkout -b feature/dev-portfolio-3
git checkout -b feature/dev-portfolio-4
```

---

## Ejemplos de commits

Ejemplos recomendados de mensajes de commit:

- `feat: crea estructura del proyecto`
- `feat: agrega navbar`
- `feat: implementa buscador de productos`
- `feat: agrega productos destacados`
- `feat: agrega sección de servicios`
- `feat: crea estructura del portafolio`
- `style: agrega estilos a tarjetas`
- `feat: agrega portafolio desarrollador 1`

---

## Flujo de trabajo recomendado con Pull Requests

1. **Partir desde `develop`**:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/navbar
   ```

2. **Trabajar en la rama de feature** (por ejemplo, `feature/navbar`), editar únicamente los archivos relacionados:

   - `sections/navbar.html`
   - parciales de estilos en `styles/styles.css` relacionados con `.navbar-*`

3. **Hacer commits pequeños y descriptivos**:

   ```bash
   git add sections/navbar.html styles/styles.css
   git commit -m "feat: agrega navbar responsiva"
   ```

4. **Subir la rama y abrir Pull Request hacia `develop`**:

   ```bash
   git push -u origin feature/navbar
   ```

   Ejemplo de título y descripción del PR:

   - **Título**: `feat: agrega navbar`
   - **Descripción**:
     - Agrega estructura HTML de la barra de navegación.
     - Integra buscador principal.
     - Aplica estilos responsivos inspirados en MercadoLibre.

5. **Revisión y merge**:
   - Otro integrante revisa el PR.
   - Si todo está correcto, se hace merge a `develop`.

6. **Integración final a `main`**:
   - Cuando todas las features estén integradas y probadas en `develop`, se hace un PR de `develop` → `main`.
   - Este merge normalmente dispara el **deploy** (GitHub Pages / Vercel).

---

## Cómo correr el proyecto en local

Este proyecto es 100 % estático, no requiere backend ni instalación de dependencias.

Opciones:

- **Opción 1 (sencilla)**: abrir `index.html` directamente en el navegador (doble click).
- **Opción 2 (recomendada)**: usar una extensión de servidor estático:
  - VS Code: extensión **Live Server**.
  - Node: instalar `serve` global y ejecutar:

    ```bash
    npx serve .
    ```

Luego ir a la URL indicada (`http://localhost:3000` o similar).

---

## Cómo desplegar en GitHub Pages

1. Asegúrate de que el proyecto está en GitHub en la rama `main`.
2. Ve a **Settings → Pages** en el repositorio.
3. En **Source**, selecciona:
   - Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
4. Guarda los cambios.
5. GitHub generará una URL del estilo:

   `https://USUARIO.github.io/mercadolibre-clone/`

Puede tardar unos minutos en estar disponible.

---

## Cómo desplegar en Vercel

1. Entra a [`https://vercel.com`](https://vercel.com) e inicia sesión con GitHub.
2. Haz clic en **"New Project"** y selecciona el repositorio.
3. Acepta la configuración por defecto (es un proyecto estático).
4. Haz clic en **Deploy**.
5. Vercel generará una URL del estilo:

   `https://mercadolibre-clone-XXXX.vercel.app`

Cada push a `main` o `develop` puede configurarse para desplegar automáticamente.

---

## Notas para el docente

- La sección **Portafolio de desarrolladores** está preparada para dividirse en:
  - Rama `feature/dev-portfolio`
  - Subramas `feature/dev-portfolio-1` a `feature/dev-portfolio-4` (una por estudiante).
- Se puede usar este proyecto para:
  - Explicar **GitFlow** y buenas prácticas de branching.
  - Practicar Pull Requests y revisiones entre pares.
  - Observar cómo se resuelven conflictos sencillos en HTML/CSS/JS.

