# TEST API de Star Wars con serverless
La API de Star Wars es un proyecto Serverless basado en Node.js y Express que utiliza DynamoDB para almacenar información sobre los personajes y consulta la API de SWAPI para obtener datos adicionales de los personajes.

## Configuración
Antes de utilizar la API de Star Wars, debes configurar algunas cosas:

Instala las dependencias necesarias ejecutando `npm install`.

Configura tus credenciales de AWS en tu entorno local o en el archivo de configuración de AWS `(~/.aws/credentials)`.

Ejecutar el comando `serverless deploy`

Despues de ejecutar este comando deberas ver una respuesta similar a:

```bash
Deploying aws-node-express-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-express-api-project-dev

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-api-project-dev-api 
```

Asegúrate de haber creado una tabla de DynamoDB con el nombre "BiographyTable". Puedes utilizar la consola de AWS o la CLI para crear la tabla.

## Endpoints
La API de Star Wars proporciona los siguientes endpoints:

GET / (biography and character data)

POST /
Almacena una nueva biografía en la base de datos DynamoDB.

GET /swapi/characters/:page
Recupera información detallada de un personaje de la API de SWAPI y muestra la paginación de este.

## Conclusiones
La API de Star Wars te permite consultar y almacenar información de los personajes utilizando DynamoDB y SWAPI. Puedes aprovechar estos endpoints para crear aplicaciones o servicios que necesiten acceder a datos relacionados con los personajes de Star Wars.

¡Eso es todo! Esta es una documentación básica para tu proyecto. Asegúrate de personalizarla según tus necesidades específicas y agregar cualquier información adicional que consideres relevante para los usuarios de tu API.
