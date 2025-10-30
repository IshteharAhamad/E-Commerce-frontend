import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    })();
  }, [id]);

  if (!product) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card className="overflow-hidden shadow-md">
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-cover w-full h-80 rounded-lg"
          />

          <CardContent className="space-y-4">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <p className="text-gray-500 text-sm">{product.brand}</p>
            <p className="text-sm text-gray-600">{product.description}</p>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-emerald-600">
                ₹{product.price}
              </span>
              {product.discountPercentage && (
                <span className="text-red-500 text-sm">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500">
              Rating: ⭐ {product.rating} / 5
            </p>

            <p className="text-sm text-gray-500">
              Availability:{" "}
              <span className="font-medium">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <Button className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
