const arrProductos = [
    {
        "title": "Escuadra",
        "price": "123.45",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": "234.56",
        "id": 2
    },
    {
        "title": "Globo terraqueo",
        "price": "345.67",
        "id": 3
    },    {
        "title": "camisa",
        "price": "345.67",
        "id": 4
    },
        {
        "title": "pantalon",
        "price": "345.67",
        "id": 5
    }
]
//Importamos el modulo express
const express = require('express');
const { get } = require('express/lib/response');
//Creamos el servidor 
const app = express();
//Levantamos el servidor 
const PORT = 8081
app.listen(PORT, () => console.log('server enlistado en el puerto 8081'))
//Definimos las rutas
app.get('/', (req, res) => {
    res.send('Hola')
})
// const Contenedor = require('./manejoArchivos')
// const contenedorProductos = new Contenedor ('productos.txt')
app.get('/productos', (req, res) => {
    res.send(arrProductos)
})
app.get('/ProductoRandom', (req, res) => {
    const aleatorio = arrProductos[Math.floor(Math.random() * arrProductos.length)]
    res.send(aleatorio)
})
