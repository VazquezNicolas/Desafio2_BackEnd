const fs = require('fs');
const { runInThisContext } = require('vm');

class ProductManager{
    constructor(path){
        this.path = path;
        this.products = this.readFile();
    }

    readFile(){
        const data = JSON.parse(fs.readFileSync(`./${this.path}`), "utf-8")
        return data;
    }

    writeData(data){
        let dataString = JSON.stringify(data)
        fs.writeFileSync (`./${this.path}`, dataString)
        return dataString
    }

    idGenerator(){
        if(this.products.length > 0){
            let id = this.products.map(product => product.id)
            return Math.max(...id)+1;
        }else{
            let id = 1
            return id
        }
    }

    getAllProducts(){
        let data = this.readFile();
        console.log(data);
        return data;
    }

    addProduct(product){
        if(this.products.find(item => item.code === product.code)){
            return console.log("Ya existe un producto con ese codigo")
        }else if (!!!product.title || !!!product.description || !!!product.price || !!!product.thumbnail || !!!product.code || !!!product.stock) {
            console.log("Complete todos los campos");
        }else{
            let data = this.readFile();
            product.id = this.idGenerator();
            data.push(product);
            this.writeData(data);
        }
    }

    getProductById(id){

        let data = this.readFile();
        let productToGet = data.find(product => product.id == id)
        if(productToGet){    
            console.log(productToGet)
            return productToGet
        }
            console.log("No se encontro un producto con esa id");    
    }

    UpdateProduct(id, product){
        let data = this.readFile();
        if(data.find(product => product.id === id)){
            let productDeleted = data.filter(product => product.id !== id)
            product.id = id
            productDeleted.push(product);
            this.writeData(productDeleted)
            return productDeleted
        }
            console.log("No se encontro la ID del producto a actualizar")     
    }

    deletedProduct(id){
        let data = this.readFile();
        if(data.find(product => product.id === id)){
            let products = data.filter(product => product.id !== id)
            this.writeData(products)
            console.log(products)
            return products;
        }
            console.log("No se encontro la ID del producto a actualizar")       
    }
}

const productManager = new ProductManager("products.json");

const product1 = {title:"Siempre Listo",description:"Pasapañuelos",price: "$500",code:145546,thumbnail:"imgRout",stock: 10};
const product2 = {title:"manada",description:"Pasapañuelos",price: "$800",code:14554456,thumbnail:"imgRout",stock: 50};
const product3 = {title:"Rovers",description:"Pasapañuelos",price: "$900",code:137546,thumbnail:"imgRout",stock: 84};
const product4 = {title:"Darzee",description:"Pasapañuelos",price: "$800",code:1842356,thumbnail:"imgRout",stock: 10}
// productManager.addProduct(product1)
// productManager.addProduct(product2)
// productManager.addProduct(product3)
// productManager.addProduct(product4)

//productManager.getProductById(2)
//productManager.deletedProduct(1)
//productManager.UpdateProduct(2, {title:"Darzee",description:"Pasapañuelos",price: "$800",code:1412356,thumbnail:"imgRout",stock: 10});

module.exports = {
    productManager
}