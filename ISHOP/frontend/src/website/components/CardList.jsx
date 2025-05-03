import React from 'react';

const CardList = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      description: "Noise-cancelling over-ear headphones with 20h battery life.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Electronics"
    },
    {
      id: 2,
      title: "Smart Watch",
      description: "Track your health, messages, and workouts.",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Wearables"
    },
    {
      id: 3,
      title: "Running Shoes",
      description: "Lightweight and durable shoes for daily running.",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Footwear"
    },
    {
      id: 4,
      title: "Laptop Stand",
      description: "Ergonomic adjustable laptop stand for desks.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Accessories"
    },
    {
      id: 5,
      title: "Bluetooth Speaker",
      description: "Portable speaker with deep bass and 10h playtime.",
      price: 45.5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Audio"
    }
  ];

  // Card UI for each product
  const Card = ({ product }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-md mb-2">${product.price.toFixed(2)}</p>
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );

  // Render all cards
  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CardList;
