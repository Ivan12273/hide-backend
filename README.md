# HIDE backend

HIDE es un sistema de software con el propósito de ayudar a las personas involucradas en el proceso de ventas de mostrador al registro de las ventas, registro de clientes, visualización de las existencias de los productos y el manejo de las ordenes. El objetivo de HIDE es ayudar a las personas que colaboran en microempresas a gestionar la información de las ventas de manera efectiva y sencilla.

## Tabla de contenidos

- [Introducción](#introducción)
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

## Introducción

## Instrucciones de uso

## Roles y permisos

## Base de datos

## Usuarios

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
          "description": [number],
          "stock": number,
          "price": number
    }

#### Regresa
    {
          "name": string,
          "description": [number],
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
          "description": [number],
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
          "description": [number],
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
          "description": [number], (opcional)
          "stock": number, (opcional)
          "price": number (opcional)
    }

#### Regresa
    {
          "name": string,
          "description": [number],
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
          "description": [number],
          "stock": number,
          "price": number
    }

## Clientes

### POST ```/client```

#### Descripción
Registra un nuevo producto, debe proporcionar una descripción, precio unitario y stock.

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

### GET ```/client/:client_id```

### PUT ```/client/:client_id```

### DELETE ```/client/:client_id```

## Ordenes

### POST ```/order```

### GET ```/orders```

### GET ```/order/:order_id```

### GET ```/order-history```

### GET ```/order-history-pdf```

### PUT ```/order/:order_id```

### DELETE ```/order/:order_id```

## Login

### POST ```/login```

## Reinicio de contraseña

### POST ```/reset-password```

## Actualizar contraseña

### POST ```/update-password```

## Autenticar usuario

### GET ```/auth-user```

## Contáctame
