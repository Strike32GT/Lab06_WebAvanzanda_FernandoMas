# Social Media con Node.js, Express y MongoDB

Aplicacion web desarrollada con `Node.js`, `Express`, `EJS` y `MongoDB` para gestionar publicaciones tipo red social.

Permite:

- Visualizar la lista de posts
- Crear nuevos posts
- Editar posts existentes
- Eliminar posts
- Relacionar cada post con un usuario registrado en MongoDB

## Tecnologias usadas

- Node.js
- Express
- EJS
- MongoDB
- Mongoose
- Dotenv
- Nodemon

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- `Node.js`
- `npm`
- `MongoDB Community Server` o un servidor MongoDB activo
- `MongoDB Compass` opcional, para visualizar la base de datos

## Instalacion

1. Clona el repositorio o descarga el proyecto.
2. Abre una terminal dentro de la carpeta del proyecto.
3. Instala las dependencias:

```bash
npm install
```

## Configuracion

Crea un archivo `.env` en la raiz del proyecto con un contenido similar a este:

```env
MONGO_URI=mongodb://localhost:27017/socialmedia
PORT=3001
```

### Significado de las variables

- `MONGO_URI`: cadena de conexion a MongoDB
- `PORT`: puerto donde se ejecutara la aplicacion

## Ejecucion del proyecto

Para iniciar en modo desarrollo:

```bash
npm run dev
```

Para iniciar en modo normal:

```bash
npm start
```

Si todo esta correcto, veras un mensaje similar a este:

```bash
MongoDB conectado
Servidor en http://localhost:3001
```

## Rutas principales

- `/` : pagina de inicio
- `/posts` : listado de publicaciones
- `/posts/new` : formulario para crear un nuevo post
- `/posts/:postId/edit` : formulario para editar un post

## Uso de la aplicacion

### 1. Ingresar al inicio

Abre en el navegador:

```text
http://localhost:3001
```

Desde ahi podras navegar hacia la seccion de posts.

### 2. Ver publicaciones

Ingresa a:

```text
http://localhost:3001/posts
```

En esta vista se muestran todas las publicaciones registradas.

### 3. Crear un nuevo post

Ingresa a:

```text
http://localhost:3001/posts/new
```

Completa el formulario con:

- Titulo
- Contenido
- Autor
- Hashtags separados por comas
- URL de imagen opcional

Si el post tiene `imageUrl`, la tarjeta mostrara esa imagen.
Si no tiene `imageUrl`, se mostrara un fondo decorativo por defecto.

### 4. Editar un post

Desde la lista de posts, presiona el boton de editar.

Esto abrira una pantalla independiente donde podras modificar:

- titulo
- contenido
- usuario
- hashtags
- URL de imagen

### 5. Eliminar un post

Desde la lista de publicaciones, presiona el boton de eliminar.

## Importante sobre los usuarios

Los posts necesitan estar asociados a un usuario existente.

Actualmente el proyecto no incluye una interfaz web para crear usuarios, por lo que primero debes registrar usuarios directamente en MongoDB.

Puedes hacerlo desde:

- MongoDB Compass
- Mongo Shell

## Estructura del proyecto

```text
mongo-node/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── views/
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Modelos

### User

Campos principales:

- `name`
- `lastName`
- `email`
- `age`
- `phoneNumber`
- `password`
- `createdAt`

Restricciones:

- `email` unico
- `age` minimo `18`
- `password` minimo `8` caracteres

### Post

Campos principales:

- `title`
- `content`
- `hashtags`
- `imageUrl`
- `createdAt`
- `updatedAt`
- `user`

Restricciones:

- `title` minimo `5` y maximo `30` caracteres
- `content` minimo `10` caracteres
- `user` obligatorio

## Scripts disponibles

```bash
npm run dev
```

Ejecuta la aplicacion con `nodemon`.

```bash
npm start
```

Ejecuta la aplicacion con `node`.

## Posibles errores comunes

### Error al conectar con MongoDB

Verifica que:

- MongoDB este encendido
- `MONGO_URI` sea correcta
- el puerto de MongoDB este disponible

### Cannot GET /posts/new

Si aparece este error, normalmente el servidor esta corriendo con una version anterior del codigo.

Solucion:

1. Deten el servidor actual.
2. Ejecuta nuevamente:

```bash
npm run dev
```

### No aparece la imagen del post

Verifica que la URL ingresada en `imageUrl` sea una URL valida y publica.

## Autor

Proyecto academico desarrollado para practicar:

- arquitectura MVC
- integracion con MongoDB
- uso de Mongoose
- CRUD web con Express y EJS
