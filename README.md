# HIDE backend

HIDE es un sistema de software con el propósito de ayudar a las personas involucradas en el proceso de ventas de mostrador al registro de las ventas, registro de clientes, visualización de las existencias de los productos y el manejo de las ordenes. El objetivo de HIDE es ayudar a las personas que colaboran en microempresas a gestionar la información de las ventas de manera efectiva y sencilla.

## Tabla de contenidos

- [Presentación](#presentación)
- [Instrucciones de uso](#instrucciones-de-uso)
- [Roles y permisos](#roles-y-permisos)
- [Base de datos](#base-de-datos)
- [Usuarios](#usuarios)
- [Productos](#productos)  
- [Clientes](#clientes) 
- [Ordenes](#ordenes) 
- [Login](#login) 
- [Reinicio de contraseña](#reinicio-de-contraseña) 
- [Actualizar contraseña](#actualizar-contraseña) 
- [Autenticar usuario](#autenticar-usuario) 
- [Contáctame](#contáctame)

## Presentación
Esta aplicación fue desarrollada por Rooster Software, el nombre del sistema "HIDE" se debe a la participación de cada uno de los integrantes listados a continuación:

- La H por [Héctor Elías Burgos Amaya](https://github.com/Soft-masta)
- La I por [Iván Alberto Aguilar Castillo](https://github.com/Ivan12273)
- La D por [Daniel Alejandro Álvarez Ramírez](https://github.com/Dannyell001)
- La E por [Edwin Román Fajardo Barrera](https://github.com/EdwinFajardoBarrera)

Gracias chicos, por su amistad y su apoyo durante todo mi trayecto universitario.

## Instrucciones de uso
Descargue el proyecto y ejecute el comando "npm install" para instalar todas las dependecias utilizadas en este proyecto, para ejecutar la api utilice el comando "npm start".
La api está configurada para ejecutarse en el puerto 3700.

## Roles y permisos
Los roles y permisos de los usuarios se listan a continuación:

| Rol | Función | Acceso a clientes | Acceso a productos | Acceso a usuarios | Acceso a pedidos |
| ------ |---------|---------|---------|---------| :------ |
| ```Administrador``` | Gestor de usuarios con acceso total a las funcionalidades y datos del sistema para la administración del mismo. | Crear, leer, actualizar y eliminar. | Crear, leer, actualizar y eliminar. | Crear, leer, actualizar y eliminar. | Crear, leer, actualizar y eliminar. |
| ```Ventas```  | Usuario encargado del área de ventas por pedido o menudeo. | Crear, leer, actualizar y eliminar. | Leer. | Ninguno. | Crear, leer, actualizar y eliminar. |
| ```Repartidor``` | Se encarga de repartir pedidos por la ciudad. | Leer. | Ninguno. | Ninguno. | Leer. |
| ```Existencias o Almacén``` | Encargado del almacén que ingresa producto terminado, surte pedidos de ventas en línea y carga camioneta de menudeo. | Ninguno. | Crear, leer, actualizar y eliminar. | Ninguno. | Leer. |
| ```Preparador``` | Transforma materia prima en producto terminado. | Ninguno. | Leer. | Ninguno. | Leer y actualizar. |

## Base de datos
En el proyecto se añadió una carpeta llamada "base de datos de ejemplo" con el propósito de que pueda visualizarse la estructura con la que se almacenan los datos del sistema, dentro se encuentra un archivo de texto con los accesos de un usuario administrador.

## Usuarios
Para el uso de la API es requerido poner de prefijo http://localhost:3700. Por ejemplo: http://localhost:3700/user

### POST ```/user```

#### Descripción
Agrega un usuario al sistema, creando un registro de su nombre, función, fecha de nacimiento y contraseña.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
    {
          "role": string,
          "name": string,
          "birthday": string,
          "email": string,
          "password": string
    }

#### Regresa
    {
          "role": string,
          "name": string,
          "birthday": string,
          "email": string,
          "password": string
    }

### GET ```/users```

#### Descripción
Obtiene la lista de todos los usuarios del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
Todos los usuarios.

    {
          "role": string,
          "name": string,
          "birthday": string,
          "email": string,
          "password": string
    }

### GET ```/user/:user_id```

#### Descripción
Obtiene los datos específicos de un usuario del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
    {
          "role": string,
          "name": string,
          "birthday": string,
          "email": string,
          "password": string
    }

### PUT ```/user/:user_id```

#### Descripción
Actualiza la información de un usuario del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
    {
          "role": string, (opcional)
          "name": string, (opcional)
          "birthday": string, (opcional)
          "email": string, (opcional)
          "password": string (opcional)
    }

#### Regresa
    {
          "role": string,
          "name": string,
          "birthday": string,
          "email": string,
          "password": string
    }

### DELETE ```/user/:user_id```

#### Descripción
Elimina a un usuario del sistema.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
    {
          "role": string,
          "name": string,
          "birthday": string,
          "email": string,
          "password": string
    }

## Productos

### POST ```/product```

#### Descripción
Registra un nuevo producto, debe proporcionar una descripción, precio unitario y stock.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
    {
          "name": string,
          "description": string,
          "stock": number,
          "price": number
    }

#### Regresa
    {
          "name": string,
          "description": string,
          "stock": number,
          "price": number
    }

### GET ```/products```

#### Descripción
Regresa todos los productos del sistema.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
Todos los productos.

    {
          "name": string,
          "description": string,
          "stock": number,
          "price": number
    }

### GET ```/product/:product_id```

#### Descripción
Obtiene los datos específicos de un producto.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
    {
          "name": string,
          "description": string,
          "stock": number,
          "price": number
    }

### PUT ```/product/:product_id```

#### Descripción
Actualiza la información de un producto del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
    {
          "name": string, (opcional)
          "description": string, (opcional)
          "stock": number, (opcional)
          "price": number (opcional)
    }

#### Regresa
    {
          "name": string,
          "description": string,
          "stock": number,
          "price": number
    }

### DELETE ```/product/:product_id```

#### Descripción
Elimina un producto del sistema.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
    {
          "name": string,
          "description": string,
          "stock": number,
          "price": number
    }

## Clientes

### POST ```/client```

#### Descripción
Registra un nuevo cliente, debe proporcionar un nombre, numero(s) de teléfono y la(s) localización(es).

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
    {
          "name": string,
          "phone": [number],
          "location": [
              {
                  "address": string,
                  "addressDescription": string,
                  "coordinates": string
              }
          ]
    }

#### Regresa
    {
          "name": string,
          "phone": [number],
          "location": [
              {
                  "address": string,
                  "addressDescription": string,
                  "coordinates": string
              }
          ]
    }

### GET ```/clients```

#### Descripción
Obtiene la lista de todos los clientes del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
Todos los clientes.

    {
          "name": string,
          "phone": [number],
          "location": [
              {
                  "address": string,
                  "addressDescription": string,
                  "coordinates": string
              }
          ]
    }

### GET ```/client/:client_id```

#### Descripción
Obtiene los datos específicos de un cliente del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
    {
          "name": string,
          "phone": [number],
          "location": [
              {
                  "address": string,
                  "addressDescription": string,
                  "coordinates": string
              }
          ]
    }

### PUT ```/client/:client_id```

#### Descripción
Actualiza la información de un cliente del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
    {
          "name": string, (opcional)
          "phone": [number], (opcional)
          "location": [
              {
                  "address": string, (opcional)
                  "addressDescription": string, (opcional)
                  "coordinates": string (opcional)
              }
          ]
    }

#### Regresa
    {
          "name": string,
          "phone": [number],
          "location": [
              {
                  "address": string,
                  "addressDescription": string,
                  "coordinates": string
              }
          ]
    }

### DELETE ```/client/:client_id```

#### Descripción
Elimina a un cliente del sistema.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
    {
          "name": string,
          "phone": [number],
          "location": [
              {
                  "address": string,
                  "addressDescription": string,
                  "coordinates": string
              }
          ]
    }

## Ordenes

### POST ```/order```

#### Descripción
Agrega una orden al sistema, incluye el id del usuario y el cliente, el estado de la orden, la fecha, los detalles del producto, la dirección y el número de teléfono.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
    {
        "user_id": string,
        "client_id": string,
        "status": string,
        "date": string,
        "details": [
            {
                "product_id": string,
                "quantity": number
            }
        ],
        "address": string,
        "phone": string
    }

#### Regresa
    {
        "user_id": string,
        "client_id": string,
        "status": string,
        "date": string,
        "details": [
            {
                "product_id": string,
                "quantity": number
            }
        ],
        "address": string,
        "phone": string
    }

### GET ```/orders```

#### Descripción
Obtiene la lista de todas las ordenes del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
Todas las ordenes.

    {
        "user_id": string,
        "client_id": string,
        "status": string,
        "date": string,
        "details": [
            {
                "product_id": string,
                "quantity": number
            }
        ],
        "address": string,
        "phone": string
    }

### GET ```/order/:order_id```

#### Descripción
Obtiene los datos específicos de una orden del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
    {
        "user_id": string,
        "client_id": string,
        "status": string,
        "date": string,
        "details": [
            {
                "product_id": string,
                "quantity": number
            }
        ],
        "address": string,
        "phone": string
    }

### GET ```/order-history```

#### Descripción
Regresa el historial de ordenes en formato CSV.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
El archivo CSV con los datos del historial de ordenes.

### GET ```/order-history-pdf```

#### Descripción
Regresa el historial de ordenes en formato PDF.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
El archivo PDF con los datos del historial de ordenes.

### PUT ```/order/:order_id```

#### Descripción
Actualiza la información de una orden del sistema HIDE.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
    {
        "user_id": string, (opcional)
        "client_id": string, (opcional)
        "status": string, (opcional)
        "date": string, (opcional)
        "details": [
            {
                "product_id": string, (opcional)
                "quantity": number (opcional)
            }
        ],
        "address": string, (opcional)
        "phone": string (opcional)
    }

#### Regresa
    {
        "user_id": string,
        "client_id": string,
        "status": string,
        "date": string,
        "details": [
            {
                "product_id": string,
                "quantity": number
            }
        ],
        "address": string,
        "phone": string
    }

### DELETE ```/order/:order_id```

#### Descripción
Elimina una orden del sistema.

#### Privilegios
El usuario necesita un token de autorización.

#### Parámetros
Ninguno.

#### Regresa
    {
        "user_id": string,
        "client_id": string,
        "status": string,
        "date": string,
        "details": [
            {
                "product_id": string,
                "quantity": number
            }
        ],
        "address": string,
        "phone": string
    }

## Login

### POST ```/login```

#### Descripción
Devuelve el token de inicio de sesión enviando los parámetros de nombre de usuario y contraseña.

#### Privilegios
Ninguno.

#### Parámetros
    {
        "email": string,
        "password": string
    }

#### Regresa
    {
       "user": {
              "role": string,
              "name": string,
              "birthday": string,
              "email": string,
              "password": string
        }
        "token": string
    }

## Reinicio de contraseña

### POST ```/reset-password```

#### Descripción
Envía un correo electrónico registrado de usuario, luego el usuario recibirá un correo electrónico con las instrucciones para restaurar su contraseña.

#### Privilegios
Ninguno.

#### Parámetros
    {
        "email": string
    }

#### Regresa
    {
         message: "¡Email de recuperación enviado exitosamente!"
    }

## Actualizar contraseña

### POST ```/update-password```

#### Descripción
Cuando el usuario hace clic en el enlace de restauración de contraseña enviado a su correo electrónico, completará un formulario con una nueva contraseña y lo enviará con esta
solicitud. Necesita la nueva contraseña, el token de restauración y el correo electrónico.

#### Privilegios
Ninguno.

#### Parámetros
    {
        "password": string,
        "userId": string,
        "token": string
    }

#### Regresa
    {
         "user": {
              "role": string,
              "name": string,
              "birthday": string,
              "email": string,
              "password": string
        }
    }

## Autenticar usuario

### GET ```/auth-user```

#### Descripción
Verifica si el usuario está autenticado.

#### Privilegios
Ninguno.

#### Parámetros
Ninguno.

#### Regresa
    {
         "user": {
              "role": string,
              "name": string,
              "birthday": string,
              "email": string,
              "password": string
    }

## Contáctame
Si tienes alguna duda con respecto a este proyecto puedes mandarme un mail a esta dirección: [ivanalberto.agca@gmail.com](mailto:ivanalberto.agca@gmail.com)
