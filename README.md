# Proyecto Tecno

Este proyecto incluye un **Servicio de Perfil** y un **Servicio de Autenticación**, desarrollado con Node.js, Sequelize y PostgreSQL, diseñado para gestionar información de usuarios, autenticación y autorización. Utiliza Docker para facilitar el desarrollo y despliegue.

## Tabla de Contenidos

- [Proyecto Tecno](#proyecto-tecno)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Tecnologías](#tecnologías)
  - [Características](#características)
    - [Servicio de Perfil](#servicio-de-perfil)
    - [Servicio de Autenticación](#servicio-de-autenticación)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Migraciones](#migraciones)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)

## Tecnologías

- **Node.js**: Plataforma para ejecutar JavaScript en el servidor.
- **Sequelize**: ORM para manejar la base de datos de manera eficiente.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **Docker**: Contenerización para facilitar el desarrollo y despliegue.

## Características

### Servicio de Perfil
- Registro de usuarios con validación de datos.
- Manejo de estudios y experiencia laboral.
- Registro de habilidades blandas e idiomas.
- API RESTful para interactuar con los datos de perfil.

### Servicio de Autenticación
- Registro y autenticación de usuarios.
- Gestión de sesiones y tokens JWT.
- Protege las rutas que requieren autenticación.

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/ElianFRagozo/proyecto_tecno.git
   cd proyecto_tecno
   ```

2. **Instalar dependencias**:

   Asegúrate de tener Node.js y npm instalados. Luego, ejecuta:

   ```bash
   npm install
   ```

3. **Configurar la base de datos**:

   Crea un archivo `.env` en la raíz del proyecto y define la URL de conexión a la base de datos:

   ```plaintext
   DATABASE_URL=postgres://usuario:contraseña@db:5432/nombre_basedatos
   ```

   Reemplaza `usuario`, `contraseña` y `nombre_basedatos` con tus credenciales de PostgreSQL.

## Uso

1. **Iniciar los contenedores de Docker**:

   Ejecuta el siguiente comando para iniciar la aplicación y la base de datos:

   ```bash
   docker-compose up --build
   ```

2. **Acceder a la API**:

   La API estará disponible en `http://localhost:4001` para el Servicio de Perfil y `http://localhost:4000` para el Servicio de Autenticación (si es que has configurado un puerto diferente para el servicio de autenticación). Puedes utilizar herramientas como Postman o cURL para interactuar con la API.

## Migraciones

Para crear las tablas necesarias en la base de datos, ejecuta:

```bash
npx sequelize-cli db:migrate
```

Esto ejecutará las migraciones definidas en el proyecto.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-característica`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva característica'`).
4. Envía un pull request.

## Licencia

Copyright © 2025 JobConnection – Propiedad de Andrés Prada Reyes

Todos los derechos reservados.

Este software y su código fuente asociado (el "Software") están protegidos por leyes de propiedad intelectual y tratados internacionales.

El acceso y uso del Software se rigen estrictamente por los términos de un acuerdo de licencia separado. A menos que se autorice expresamente en un acuerdo de licencia válido firmado por Andrés Prada Reyes, está prohibida cualquier reproducción, distribución, modificación o uso no autorizado del Software, y puede resultar en sanciones civiles y penales severas.

Para obtener información sobre la concesión de licencias, póngase en contacto con:

- Andrés Prada Reyes
- Correo electrónico: gerencia@aprecot.co
- Teléfono: 310-6868695

Ninguna parte de este Software puede ser copiada, reproducida, distribuida, republicada, descargada, mostrada, publicada o transmitida de ninguna forma o por ningún medio, incluidos, entre otros, electrónicos, mecánicos, fotocopias, grabaciones o de otro tipo, sin el permiso previo por escrito de Andrés Prada Reyes.
