import React, { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // 🧩 Fetch products from API
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);

        const uniqueCategories = [
          ...new Set(response.data.products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  // 🧠 Handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleWishlist = (product) => {
    console.log("Added to wishlist:", product);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // 🔍 Filter logic
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 💰 Total amount calculation
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Featured Products</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />

          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            🛒 Cart: {cart.length} | ₹{totalAmount.toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            onClick={() => handleProductClick(item.id)}
            className="cursor-pointer"
          >
            <ProductCard
              product={item}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleWishlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
