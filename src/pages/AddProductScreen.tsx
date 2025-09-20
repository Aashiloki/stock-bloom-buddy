import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "@/components/StyledButton";
import { TextInputField } from "@/components/TextInputField";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Package, Tag, BarChart3 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddProductScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    sku: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Electronics", "Accessories", "Clothing", "Home & Garden", "Books", "Sports"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Product added successfully!",
        description: `${formData.name} has been added to your inventory`,
      });
      navigate("/products");
    }, 1000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/products")}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Add New Product</h1>
              <p className="text-white/80">Add a new product to your inventory</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Product Information</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    label="Product Name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(value) => updateFormData("name", value)}
                    error={errors.name}
                    required
                  />
                  <TextInputField
                    label="SKU"
                    placeholder="Enter SKU"
                    value={formData.sku}
                    onChange={(value) => updateFormData("sku", value)}
                    error={errors.sku}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Category *
                  </label>
                  <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive font-medium mt-1">{errors.category}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    label="Price (₹)"
                    placeholder="0.00"
                    type="number"
                    value={formData.price}
                    onChange={(value) => updateFormData("price", value)}
                    error={errors.price}
                    required
                  />
                  <TextInputField
                    label="Stock Quantity"
                    placeholder="0"
                    type="number"
                    value={formData.stock}
                    onChange={(value) => updateFormData("stock", value)}
                    error={errors.stock}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
                  <textarea
                    placeholder="Enter product description (optional)"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className="w-full p-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground min-h-24"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Product Image
              </h3>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="space-y-3">
                <StyledButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding Product..." : "Add Product"}
                </StyledButton>
                <StyledButton
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => navigate("/products")}
                >
                  Cancel
                </StyledButton>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Products</span>
                  <span className="font-semibold text-foreground">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Categories</span>
                  <span className="font-semibold text-foreground">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Low Stock</span>
                  <span className="font-semibold text-destructive">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductScreen;