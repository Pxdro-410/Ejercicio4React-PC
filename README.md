# Ejercicio 4 React Fortnite Blog - Pedro Caso

Mini-blog de skins y cosméticos de Fortnite construido con **Vite + React + React Router**.

## Nivel declarado: Senior (100 pts)


## Tecnologías utilizadas

- [Vite](https://vitejs.dev/) — Bundler y entorno de desarrollo
- [React 19](https://react.dev/) — Librería de UI
- [React Router DOM v6](https://reactrouter.com/) — Enrutamiento SPA
- [Fortnite API](https://fortnite-api.com/) — API REST gratuita (base de datos externa)
- [PropTypes](https://www.npmjs.com/package/prop-types) — Validación de props


## Requisitos cubiertos

### Base
- Proyecto generado con `npm create vite@latest`
- Uso de `react-router-dom` v6 (`^6.30.3`).
- React Router DOM con rutas: `/`, `/items`, `/items/:id`
- Datos obtenidos desde API externa, nunca hardcodeados en componentes
- `useParams` en la página de detalle (`ItemDetail.jsx`)
- Navegación exclusivamente con `<Link>` y `useNavigate`
- Repositorio publico
- Página 404 para rutas no encontradas

### Mid
- Búsqueda por nombre y filtro por rareza en el listado
- Página 404 para rutas no encontradas
- Botón "Skin aleatoria" usando `useNavigate`
- Componente reutilizable `SkinCard` con props documentadas

### Senior
- Estado global con **Context API**: tema claro/oscuro + favoritos
- PropTypes definidos en 4 componentes: `SkinCard`, `SearchBar`, `RandomButton`
- Base de datos implementada mediante consumo de **API REST externa** (fortnite-api.com)


## Estructura del proyecto
<img width="695" height="478" alt="image" src="https://github.com/user-attachments/assets/4aeaf323-70d2-4267-ac81-456e4dadfde0" />



## Componente reutilizable: `SkinCard`

El componente `SkinCard` es el bloque visual principal del blog. Recibe una skin y renderiza su imagen, nombre, rareza y acciones.

### Props

| Prop | Tipo | Requerida | Descripción |
|------|------|-----------|-------------|
| `skin` | `object` | si | Objeto de skin proveniente de la API |
| `skin.id` | `string` | si | ID único de la skin |
| `skin.name` | `string` | si | Nombre de la skin |
| `skin.images.icon` | `string` | no | URL de la imagen icono |
| `skin.rarity.value` | `string` | no | Valor interno de rareza (ej. `epic`) |
| `skin.rarity.displayValue` | `string` | no | Nombre legible de rareza (ej. `Épico`) |

### Uso

```jsx
import SkinCard from './components/SkinCard'

<SkinCard skin={skin} />
```


## API utilizada

**[fortnite-api.com](https://fortnite-api.com/)** — API REST gratuita, sin registro ni API key.

| Endpoint | Uso |
|----------|-----|
| `GET /v2/cosmetics/br` | Lista completa de skins |
| `GET /v2/cosmetics/br/:id` | Detalle de una skin por ID |
| `GET /v2/news/br` | Noticias del modo Battle Royale |


## Cómo correr el proyecto

### Requisitos previos
- Node.js 20 o superior
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Pxdro-410/Ejercicio4React-PC

# 2. Entrar a la carpeta del proyecto
cd Ejercicio4React-PC/fortnite-blog

# 3. Instalar dependencias
npm install

# 4. Correr en modo desarrollo
npm run dev
```

Luego abrir [http://localhost:5173](http://localhost:5173) en el navegador.

## Rutas de la aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Home con noticias y skins destacadas |
| `/items` | Listado completo con búsqueda y filtros |
| `/items/:id` | Detalle de una skin específica |
| `*` | Página 404 personalizada |


## Demo

El video de demostración mostrando las 3 rutas funcionando se encuentra en la carpeta `/demo` del repositorio.
