import React from "react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

interface ProductListItemProps {
  product: Product;
  onClick?: (product: Product) => void;
  className?: string;
}

export const ProductListItem = ({
  product,
  onClick,
  className,
}: ProductListItemProps) => {
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (stock < 10) return { label: "Low Stock", variant: "warning" as const };
    return { label: "In Stock", variant: "success" as const };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className={cn("bg-gradient-card border border-border rounded-xl shadow-card", className)}>
      <div
        className="p-4 cursor-pointer hover:bg-accent/50 transition-all duration-200 rounded-xl"
        onClick={() => onClick?.(product)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
            ) : (
              <Package className="w-6 h-6 text-primary" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground font-medium">{product.category}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-lg font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-full",
                  stockStatus.variant === "success" && "text-success bg-success-light",
                  stockStatus.variant === "warning" && "text-warning bg-warning-light",
                  stockStatus.variant === "destructive" && "text-destructive bg-destructive-light"
                )}
              >
                {stockStatus.label}
              </span>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
              Stock
            </p>
            <p className="text-lg font-bold text-foreground">{product.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};