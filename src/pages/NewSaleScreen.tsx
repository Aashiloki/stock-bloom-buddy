import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "@/components/StyledButton";
import { TextInputField } from "@/components/TextInputField";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Search, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

const NewSaleScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock products for search
  const products = [
    { id: "1", name: "iPhone 15 Pro", price: 999.99, stock: 25 },
    { id: "2", name: "Samsung Galaxy S24", price: 899.99, stock: 8 },
    { id: "3", name: "AirPods Pro", price: 249.99, stock: 15 },
    { id: "4", name: "MacBook Air M3", price: 1199.99, stock: 12 },
    { id: "5", name: "iPad Pro 12.9", price: 1099.99, stock: 10 },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !cart.find(item => item.id === product.id)
  );

  const addToCart = (product: any) => {
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
    setSearchQuery("");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.min(quantity, item.stock) } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const processSale = async () => {
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add products to the cart",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Sale completed!",
        description: `Sale of ₹${calculateTotal().toFixed(2)} processed successfully`,
      });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">New Sale</h1>
              <p className="text-white/80">Process a new sale transaction</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Add Products</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products to add..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">
                        No products found
                      </div>
                    ) : (
                      filteredProducts.map(product => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:bg-accent cursor-pointer"
                          onClick={() => addToCart(product)}
                        >
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">₹{product.price}</p>
                            <Plus className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-card rounded-xl border border-border">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Cart ({cart.length} items)</h3>
                </div>
              </div>
              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Cart is empty</h3>
                    <p className="text-muted-foreground">Search and add products above</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium text-foreground">
                          {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="w-20 text-right">
                          <p className="font-semibold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 p-0 text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Customer Information
              </h3>
              <div className="space-y-4">
                <TextInputField
                  label="Customer Name"
                  placeholder="Enter customer name (optional)"
                  value={customerInfo.name}
                  onChange={(value) => setCustomerInfo(prev => ({ ...prev, name: value }))}
                />
                <TextInputField
                  label="Email"
                  type="email"
                  placeholder="Enter email (optional)"
                  value={customerInfo.email}
                  onChange={(value) => setCustomerInfo(prev => ({ ...prev, email: value }))}
                />
                <TextInputField
                  label="Phone"
                  type="text"
                  placeholder="Enter phone (optional)"
                  value={customerInfo.phone}
                  onChange={(value) => setCustomerInfo(prev => ({ ...prev, phone: value }))}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-foreground">₹{(calculateTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-xl font-bold text-primary">
                        ₹{(calculateTotal() * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <StyledButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={processSale}
                  disabled={isProcessing || cart.length === 0}
                >
                  {isProcessing ? "Processing..." : "Complete Sale"}
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSaleScreen;