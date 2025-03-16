import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProducts = async (req, res) => {
    try{
        const product = await Product.find({}); // pass in empty object so means find all
        res.status(200).json({success: true, data: product})
    }catch(error){
        console.log("Error in fetching products", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct}); // 201 means something created

    }catch(error){
        console.error("Error in Creating product: ", error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Product ID"})
    }
    try{
        const updatedProducts = await Product.findByIdAndUpdate(id, product, {new: true})
        res.status(200).json({success:true, data: updatedProducts});

    }catch(error){
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Product ID"})
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    }catch(error){
        console.log("Error in deleting products", error.message)
        res.status(500).json({success: false, message: "Internal server error"})
    }
    // whatever number u type in, will print at console
    // console.log("id: ", id);

}