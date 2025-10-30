import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

export const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const { title, price, thumbnail, rating = 0, reviews = [], brand } = product;

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-52 transition-transform duration-300 hover:scale-105"
        />

        {/* Wishlist Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 bottom-3 bg-white/90 hover:bg-white rounded-full shadow"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
        >
          <Heart className="h-4 w-4 text-rose-500" />
        </Button>
      </div>

      {/* Product Info */}
      <CardHeader className="px-4 pt-4 pb-0">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <p className="text-xs text-muted-foreground">{brand}</p>
      </CardHeader>

      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold text-emerald-600">
            ₹{price}
          </span>
          <p className="text-xs text-muted-foreground mt-1">
            {rating} ★ · {reviews.length} reviews
          </p>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation(); // prevents card click
            onAddToCart(product);
          }}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" /> Add
        </Button>
      </CardContent>
    </Card>
  );
};
