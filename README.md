# 📦 Sistema de Gestión de Pedidos - MailAméricas

Sistema web desarrollado en React con Vite para la gestión de pedidos de tiendas online. Permite visualizar, filtrar y crear pedidos con validaciones de negocio integradas.

## 🚀 Características

### Dashboard Principal
- **Vista general** con lista completa de pedidos
- **Filtros por estado**: Pendiente, Enviado, Entregado
- **Estadísticas en tiempo real**: Total de pedidos y cantidad por estado
- **Diseño responsivo** y atractivo

### Componentes Principales

#### 📊 OrderStats
Muestra estadísticas generales:
- Total de pedidos
- Cantidad de pedidos pendientes
- Cantidad de pedidos enviados
- Cantidad de pedidos entregados

#### 🔍 OrderFilter
Permite filtrar pedidos por estado:
- Todos los pedidos
- Pendientes (⏳)
- Enviados (🚚)
- Entregados (✅)

#### 📋 OrderList
Renderiza la lista de pedidos filtrados con información detallada.

#### 📄 OrderItem
Muestra información completa de cada pedido:
- ID del pedido
- Nombre del cliente
- Fecha de creación
- Estado actual
- Lista de productos con cantidad y precio
- Total del pedido
- Validaciones en tiempo real

#### ➕ OrderForm
Formulario para crear nuevos pedidos con:
- Campo para nombre de cliente
- Gestión dinámica de productos
- Validaciones en tiempo real
- Estados por defecto aplicados

## ✅ Validaciones de Negocio

### Validaciones Integradas en OrderItem:
- **Cliente**: Mínimo 3 caracteres
- **Cantidad de productos**: Debe ser mayor a 0
- **Fecha**: Por defecto, fecha actual
- **Estado**: Por defecto, "pending"

### Validaciones en OrderForm:
- **Cliente**: Obligatorio, mínimo 3 caracteres
- **Productos**: Al menos un producto requerido
- **Nombre de producto**: Obligatorio
- **Cantidad**: Mayor a 0
- **Precio**: Mayor a 0

## 🛠️ Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de interfaz de usuario
- **Vite 7.1.8** - Herramienta de build rápida
- **PropTypes** - Validación de tipos de props
- **CSS3** - Estilos modernos con gradientes y animaciones

## 📁 Estructura del Proyecto

```
gestion-pedidos/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Componente principal
│   │   ├── OrderStats.jsx      # Estadísticas
│   │   ├── OrderFilter.jsx     # Filtros
│   │   ├── OrderList.jsx       # Lista de pedidos
│   │   ├── OrderItem.jsx       # Detalle de pedido
│   │   └── OrderForm.jsx       # Formulario nuevo pedido
│   ├── styles/
│   │   ├── Dashboard.css
│   │   ├── OrderStats.css
│   │   ├── OrderFilter.css
│   │   ├── OrderList.css
│   │   ├── OrderItem.css
│   │   └── OrderForm.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

## 🚦 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173/
```

### Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter ESLint

## 🎨 Características de Diseño

- **Gradientes modernos** en header y botones
- **Cards con hover effects** para mejor interacción
- **Colores diferenciados** por estado de pedido:
  - 🟡 Amarillo - Pendiente
  - 🔵 Azul - Enviado
  - 🟢 Verde - Entregado
- **Tablas responsivas** para listado de productos
- **Alertas visuales** para errores de validación
- **Layout adaptativo** para dispositivos móviles

## 📊 Datos de Ejemplo

La aplicación incluye 4 pedidos de ejemplo para demostración:
1. Juan Pérez - Laptop HP y Mouse Logitech (Pendiente)
2. María García - Teclado Mecánico y Monitor Samsung (Enviado)
3. Carlos López - Auriculares Sony (Entregado)
4. Ana Martínez - Webcam y Micrófono (Pendiente)

## 🔄 Flujo de Uso

1. **Ver Dashboard**: Al iniciar, se muestran todos los pedidos con estadísticas
2. **Filtrar**: Usar los botones de filtro para ver pedidos por estado
3. **Ver Detalles**: Cada tarjeta muestra información completa del pedido
4. **Crear Pedido**: Click en "➕ Nuevo Pedido"
5. **Completar Formulario**: 
   - Ingresar nombre de cliente
   - Agregar productos con cantidad y precio
   - Las validaciones se aplican en tiempo real
6. **Guardar**: El nuevo pedido aparece en la lista con estado "Pendiente"

## ⚠️ Validaciones Visuales

- **Bordes rojos**: Indican campos con errores
- **Fondo rojo claro**: Productos con cantidad inválida
- **Alertas de error**: Lista detallada de problemas de validación
- **Mensajes informativos**: Guías sobre valores por defecto

## 👨‍💻 Autor

Desarrollado como Trabajo Práctico para MailAméricas

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
