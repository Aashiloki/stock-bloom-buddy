import { useNavigate } from "react-router-dom";
import { StyledButton } from "@/components/StyledButton";
import { Package, ShoppingCart, BarChart3, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Inventory Management",
      description: "Track your products, stock levels, and categories",
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Sales Processing",
      description: "Quick and easy point-of-sale transactions",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Real-time insights into your business performance",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Management",
      description: "Keep track of customer information and history",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <Package className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Inventory Manager
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Streamline your small business inventory management with our intuitive mobile-first solution
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <StyledButton variant="secondary" size="lg" onClick={() => navigate("/login")}>
                Get Started
              </StyledButton>
              <StyledButton variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
                View Demo
              </StyledButton>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to manage your inventory
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for small businesses that need powerful yet simple tools
            </p>
          </div>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent/20 py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of small businesses already using Inventory Manager to streamline their operations
            </p>
            <StyledButton
              variant="primary"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Start Free Trial
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
