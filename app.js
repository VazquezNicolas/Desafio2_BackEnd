const express = require('express');
const {productManager} = require ('./index');

const app = express();
const port = 8080;

app.get ("/products/:id", (req,res) => {
    const id = req.params.id;
    const respuesta = productManager.getProductById(id);
    res.send(respuesta);
})

app.get("/products", (req,res) => {
    const limit = req.query.limit;
    const productos = productManager.getAllProducts();

    if(limit && !isNaN(Number(limit))){
        respuesta = productos.slice(0,limit)
    }
    else{
        respuesta = productos;
    }
    res.send(respuesta);
});

app.listen(port, ()=> {
    console.log('Servidor levantado en el puerto', port)
});