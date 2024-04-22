const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.port
const Product = require('./product')

const app = express()

app.use(express.json())
app.use(cors())

require('./db')

app.get('/product', async(req, res) => {
    try{
        const product = await Product.find()
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json(error)
    }
})

app.get('/products/:id', async(req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(!product) throw new Error('Product not found')
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json(error)
    }
})

app.post('/products', async(req, res) => {
    try{
        const {name, price, quantity} = req.body
        const product = new Product({name, price, quantity})
        await product.save()
        res.status(200).json("Product saved")
    }
    catch(error){
        res.status(500).json(error)
    }
})

app.put('/products/:id', async(req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!product) throw new Error('Product not found')
        res.status(200).json('Product updated')
    }
    catch(error){
        res.status(500).json(error)
    }
})

app.delete('/products/:id', async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product) throw new Error('Product not found')
        res.status(200).json('Product deleted')
    }
    catch(error){
        res.status(500).json(error)
    }
})

app.listen(port, () => {
    console.log('Server started')
})