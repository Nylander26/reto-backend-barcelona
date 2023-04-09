# Nombre del Proyecto.
Reto Backend JOBarcelona.

# Descripción.
Creación de un servidor básico que implementa el sistema de social login de GitHub, almacena data del perfil en una base de datos (MongoDB) y la muestra la misma en un endpoint configurado para ello.

# Uso e Instalación
```javascript
# 'npm install'
Instalara todas las dependencias necesarias del proyecto.

# 'npm start' 
Inicia el servidor local.
```

# API/Endpoint
### GET "/"
Muestra la homepage del proyecto.
```javascript
# GET `http://localhost:3000/`
```

### POST /GITHUB/CALLBACK/
Crea la solicitud que pide autorizacion para vincular el acceso a la cuenta de Github, retorna el access_token.
```javascript
# POST `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`
```

### GET /SUCCESS/
Al vincular la cuenta te redirecciona a la pagina que muestra parte de la informacion del perfil vinculado.
```javascript
# GET `https://api.github.com/user`
```

### GET /USERS/
Muestra un listado de los usuarios que se han registrado, haciendo una consulta a la base de datos.
```javascript
# GET `mongodb+srv://USERNAME:PASSWORD@cluster0.sdlkg2q.mongodb.net/?retryWrites=true&w=majority`
```

### GET /REPOS/
Muestra un listado de los repositorios almacenados en la cuenta del perfil autorizado o logueado.
```javascript
# GET `https://api.github.com/users/USERNAME/repos`
```