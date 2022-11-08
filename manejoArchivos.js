const fs = require('fs');
class Contenedor {
    constructor(nombre){
        this.nombre = nombre;
    }
    async save (produ){
        try {
           const productos = await this.getAll();
           if (productos.length > 0){
            const lastId = productos[productos.length - 1].id + 1;
            produ.id = lastId;
            productos.push(produ);
            await fs.promises.writeFile(this.nombre, JSON.stringify(productos, null, 2));
           } else {
            produ.id = 1;
            await fs.promises.writeFile(this.nombre, JSON.stringify([produ], null, 2));
           }

        } catch (error) {
            console.log(error);
        }
    }
    async getById (id){
        try {
            const productos = await this.getAll()
            const prod = productos.find(elemento => elemento.id === id);
            return prod
        } catch (error) {
            console.log(error)
        }
    }
    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.nombre, 'utf-8')

            if (contenido){
                const productos = JSON.parse(contenido)
                console.log(productos)
            } else {
                return 'archivo vacio'
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById (id){
        try {
            const productos = await this.getById()
            const newProductos = productos.filter(elemento => elemento.id !== id)
            await fs.promises.writeFile(this.nombre, JSON.stringify(newProductos, null, 2));
            return `El producto ${id} fue eliminado`
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAll (){
        await fs.promises.writeFile(this.nombre, JSON.stringify([], null, 2));
    }
}
const productoUno = {
    title: "Camisa",
    price: "789.89",
}
const manejadorProductos = new Contenedor ('productos.txt')
const getData = async () => {
     const prod = await manejadorProductos.getAll()
     console.log(prod)
    //  await manejadorProductos.save(productoUno)
    //  const productoEncontrado = await manejadorProductos.getById(2)
    //  console.log('prodocto encontrado ' + productoEncontrado)
    //  const productoEliminado = await manejadorProductos.deleteById(1)
    //  await manejadorProductos.deleteAll()
}

getData();

module.exports = Contenedor;