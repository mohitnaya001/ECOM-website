const cloudinary = require("../config/cloudinary");
const Product = require("../model/Product");

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// Get Product By ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// Create Product
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;

        let imageUrl = "";

        // Upload image to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        console.log("CREATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;

        if (name !== undefined) {
            product.name = name;
        }

        if (description !== undefined) {
            product.description = description;
        }

        if (price !== undefined) {
            product.price = price;
        }

        if (category !== undefined) {
            product.category = category;
        }

        if (stock !== undefined) {
            product.stock = stock;
        }

        // Update image
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            product.imageUrl = result.secure_url;
        }

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log("UPDATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        await Product.deleteOne({
            _id: req.params.id
        });

        res.status(200).json({
            message: "Product Removed Successfully"
        });

    } catch (error) {
        console.log("DELETE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};