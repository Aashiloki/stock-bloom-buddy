import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardMetricCard } from "@/components/DashboardMetricCard";
import { StyledButton } from "@/components/StyledButton";
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  AlertTriangle,
  Plus,
  CreditCard,
  List,
  Search,
  Bell
} from "lucide-react";

const DashboardScreen = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Today's Sales",
      value: "₹2,847",
      subtitle: "↗ 12% from yesterday",
      icon: <TrendingUp />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Total Products",
      value: "156",
      subtitle: "5 added this week",
      icon: <Package />,
      trend: { value: 3.2, isPositive: true },
    },
    {
      title: "Orders Today",
      value: "23",
      subtitle: "↗ 8% from yesterday",
      icon: <ShoppingCart />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Low Stock Items",
      value: "8",
      subtitle: "Needs attention",
      icon: <AlertTriangle />,
      trend: { value: -2, isPositive: false },
    },
  ];

  const quickActions = [
    { title: "Add Product", icon: <Plus />, onClick: () => navigate("/add-product") },
    { title: "New Sale", icon: <CreditCard />, onClick: () => navigate("/new-sale") },
    { title: "View Products", icon: <List />, onClick: () => navigate("/products") },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="p-6 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
              <p className="text-white/80">Welcome back! Here's your business overview</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bell className="w-5 h-5" />
              </div>
              <div className="bg-white/20 p-2 rounded-full">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <DashboardMetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <StyledButton
                key={index}
                variant="outline"
                className="h-16 flex-col gap-2"
                onClick={action.onClick}
              >
                {action.icon}
                <span className="text-sm">{action.title}</span>
              </StyledButton>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "Product added", item: "iPhone 15 Pro", time: "2 hours ago" },
              { action: "Sale completed", item: "₹245.00", time: "4 hours ago" },
              { action: "Stock updated", item: "Samsung Galaxy S24", time: "6 hours ago" },
              { action: "Low stock alert", item: "AirPods Pro", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.item}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;