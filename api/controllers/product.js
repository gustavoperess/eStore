
const Product = require("../models/product")

const createPost = async (req, res) => {
    const product = req.body.message;
    const productImage = req.file ? req.file.path : ''; // Get the file path from Multer// multer is a lirary that we will need to add on our api end. 

    try {
        const newProduct = new Product({
            name: req.body.content
        });
        await newProduct.save()
        res.status(201).json({ message: 'Product created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}