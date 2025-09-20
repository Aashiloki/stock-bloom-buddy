import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductListItem } from "@/components/ProductListItem";
import { StyledButton } from "@/components/StyledButton";
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowLeft,
  Package,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductsListScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data - in real app this would come from API
  const products = [
    {
      id: "1",
      name: "iPhone 15 Pro",
      price: 999.99,
      stock: 25,
      category: "Electronics",
    },
    {
      id: "2",
      name: "Samsung Galaxy S24",
      price: 899.99,
      stock: 8,
      category: "Electronics",
    },
    {
      id: "3",
      name: "AirPods Pro",
      price: 249.99,
      stock: 0,
      category: "Accessories",
    },
    {
      id: "4",
      name: "MacBook Air M3",
      price: 1199.99,
      stock: 15,
      category: "Electronics",
    },
    {
      id: "5",
      name: "iPad Pro 12.9",
      price: 1099.99,
      stock: 12,
      category: "Electronics",
    },
    {
      id: "6",
      name: "Apple Watch Series 9",
      price: 399.99,
      stock: 6,
      category: "Accessories",
    },
  ];

  const categories = ["all", "Electronics", "Accessories"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: any) => {
    console.log("Product clicked:", product);
    // Navigate to product detail or open edit modal
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Products</h1>
                <p className="text-white/80">Manage your inventory</p>
              </div>
            </div>
            <StyledButton variant="secondary" size="sm" onClick={() => navigate("/add-product")}>
              <Plus className="w-4 h-4" />
              Add Product
            </StyledButton>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Search and Filters */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <StyledButton variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </StyledButton>
          </div>
        </div>

        {/* Products Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Package className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{products.length}</p>
            <p className="text-sm text-muted-foreground">Total Products</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{products.filter(p => p.stock > 10).length}</p>
            <p className="text-sm text-muted-foreground">In Stock</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <XCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{products.filter(p => p.stock === 0).length}</p>
            <p className="text-sm text-muted-foreground">Out of Stock</p>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
            </h3>
          </div>
          <div className="p-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <StyledButton variant="primary" onClick={() => navigate("/add-product")}>
                <Plus className="w-4 h-4" />
                Add Your First Product
              </StyledButton>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProducts.map(product => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListScreen;