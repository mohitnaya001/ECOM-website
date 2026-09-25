const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

dotenv.config();

const seedDatabase = async () => {
    try {

        // MongoDB connection
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Clear old data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

        console.log("Old data deleted");

        // =========================
        // USERS
        // =========================

        const hashedPassword = await bcrypt.hash("123456", 10);

        const users = await User.create([
            {
                name: "Admin User",
                email: "admin@gmail.com",
                phone: "9876543210",
                password: hashedPassword,
                role: "admin",
                verified: true
            },
            {
                name: "Mohit User",
                email: "user@gmail.com",
                phone: "9876543211",
                password: hashedPassword,
                role: "user",
                verified: true
            },
            {
                name: "Test User",
                email: "test@gmail.com",
                phone: "9876543212",
                password: hashedPassword,
                role: "user",
                verified: true
            }
        ]);

        console.log("Users created");


        // =========================
        // PRODUCTS
        // =========================

        const products = await Product.create([
            {
                name: "iPhone 15",
                description: "Apple iPhone 15 with 128GB storage",
                price: 69999,
                category: "Electronics",
                stock: 20,
                imageUrl: "https://example.com/iphone15.jpg"
            },
            {
                name: "Samsung Galaxy S24",
                description: "Samsung Galaxy S24 smartphone",
                price: 74999,
                category: "Electronics",
                stock: 15,
                imageUrl: "https://example.com/samsung-s24.jpg"
            },
            {
                name: "Wireless Headphones",
                description: "Bluetooth wireless headphones",
                price: 2499,
                category: "Accessories",
                stock: 50,
                imageUrl: "https://example.com/headphones.jpg"
            },
            {
                name: "Running Shoes",
                description: "Comfortable running shoes",
                price: 1999,
                category: "Fashion",
                stock: 30,
                imageUrl: "https://example.com/shoes.jpg"
            },
            {
                name: "Smart Watch",
                description: "Fitness and smart watch",
                price: 3999,
                category: "Electronics",
                stock: 25,
                imageUrl: "https://example.com/smartwatch.jpg"
            }
        ]);

        console.log("Products created");


        // =========================
        // ORDERS
        // =========================

        const orders = await Order.create([
            {
                user: users[1]._id,

                items: [
                    {
                        product: products[0]._id,
                        quantity: 1,
                        price: products[0].price
                    },
                    {
                        product: products[2]._id,
                        quantity: 2,
                        price: products[2].price
                    }
                ],

                totalAmount:
                    products[0].price +
                    products[2].price * 2,

                address: {
                    fullName: "Mohit User",
                    street: "Main Road",
                    city: "Ahmedabad",
                    postalCode: "380001",
                    country: "India"
                },

                paymentId: "pay_test_001",

                status: "delivered"
            },

            {
                user: users[2]._id,

                items: [
                    {
                        product: products[1]._id,
                        quantity: 1,
                        price: products[1].price
                    }
                ],

                totalAmount: products[1].price,

                address: {
                    fullName: "Test User",
                    street: "CG Road",
                    city: "Ahmedabad",
                    postalCode: "380009",
                    country: "India"
                },

                paymentId: "pay_test_002",

                status: "shipped"
            },

            {
                user: users[1]._id,

                items: [
                    {
                        product: products[3]._id,
                        quantity: 2,
                        price: products[3].price
                    },
                    {
                        product: products[4]._id,
                        quantity: 1,
                        price: products[4].price
                    }
                ],

                totalAmount:
                    products[3].price * 2 +
                    products[4].price,

                address: {
                    fullName: "Mohit User",
                    street: "Main Road",
                    city: "Ahmedabad",
                    postalCode: "380001",
                    country: "India"
                },

                paymentId: "pay_test_003",

                status: "pending"
            }
        ]);

        console.log("Orders created");

        console.log("\n==============================");
        console.log("DATABASE SEEDED SUCCESSFULLY");
        console.log("==============================");

        console.log("\nAdmin Login:");
        console.log("Email: admin@gmail.com");
        console.log("Password: 123456");

        console.log("\nUser Login:");
        console.log("Email: user@gmail.com");
        console.log("Password: 123456");

        console.log("\nUsers:", users.length);
        console.log("Products:", products.length);
        console.log("Orders:", orders.length);

        process.exit(0);

    } catch (error) {

        console.error("Seed Error:", error.message);

        process.exit(1);
    }
};

seedDatabase();