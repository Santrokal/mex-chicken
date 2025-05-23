import React, { useState } from "react";

const ProductCreate = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      price: parseFloat(product.price),
    };

    try {
      const res = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        alert("Product created successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          image: "",
          category: "",
        });
      } else {
        alert("Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
          type="number"
          step="0.01"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded">
          <option value="">Select Category</option>
          <option value="Burgers">Burgers</option>
          <option value="Fried Chicken">Fried Chicken</option>
          <option value="Kids Meals">Kids Meals</option>
          <option value="Wraps">Wraps</option>
          <option value="Peri Peri Chicken">Peri Peri Chicken</option>
          <option value="Peri Peri Burgers">Peri Peri Burgers</option>
          <option value="Peri Peri Family Meals">Peri Peri Family Meals</option>
          <option value="Family Bucket">Family Bucket</option>
          <option value="Extras">Extras</option>
        </select>
        <button
          type="submit"
          className="bg-red text-white px-5 py-2 rounded hover:bg-red-700">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
