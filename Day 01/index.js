const http = require('http');
const url = require("url");


const product = [
    {
        name: "Wireless Headphones",
        discount_price: "2999",
        finalPrice: "1999",
        category: "Electronics",
        color: "Black"
    },
    {
        name: "Men's Running Shoes",
        discount_price: "3999",
        finalPrice: "2499",
        category: "Footwear",
        color: "Blue"
    },
    {
        name: "Stainless Steel Water Bottle",
        discount_price: "999",
        finalPrice: "699",
        category: "Home & Kitchen",
        color: "Silver"
    },
    {
        name: "Cotton T-Shirt",
        discount_price: "799",
        finalPrice: "499",
        category: "Clothing",
        color: "White"
    },
    {
        name: "Smartwatch Series 5",
        discount_price: "5999",
        finalPrice: "4299",
        category: "Electronics",
        color: "Rose Gold"
    },
    {
        name: "Backpack for Laptops",
        discount_price: "1999",
        finalPrice: "1499",
        category: "Bags & Luggage",
        color: "Grey"
    }
];

const categories = [
    {
        name: "Electronics",
        slug: "electronics",
        status: "active"
    },
    {
        name: "Footwear",
        slug: "footwear",
        status: "active"
    },
    {
        name: "Home & Kitchen",
        slug: "home-kitchen",
        status: "active"
    },
    {
        name: "Clothing",
        slug: "clothing",
        status: "inactive"
    },
    {
        name: "Bags & Luggage",
        slug: "bags-luggage",
        status: "active"
    },
    {
        name: "Accessories",
        slug: "accessories",
        status: "inactive"
    }
];

const colors = [
    {
        name: "Black",
        slug: "black",
        status: true
    },
    {
        name: "White",
        slug: "white",
        status: true
    },
    {
        name: "Blue",
        slug: "blue",
        status: true
    },
    {
        name: "Grey",
        slug: "grey",
        status: false
    },
    {
        name: "Rose Gold",
        slug: "rose-gold",
        status: true
    },
    {
        name: "Silver",
        slug: "silver",
        status: true
    }
];




const server = http.createServer(
    (req, res) => {
        const URLParse = url.parse(req.url, true);
        if (URLParse.pathname == "/product") {
            res.end(JSON.stringify(product))
        } else if (URLParse.pathname === "/category") {
            res.end(JSON.stringify(categories))
        } else if (URLParse.pathname === "/color") {
            res.end(JSON.stringify(colors))
        } else {
            res.end("404 Request fail")
        }


    }
)

server.listen(
    5000,
    () => {
        console.log("Server Started")
    }
)