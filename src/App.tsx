// src/App.tsx
import { Routes, Route } from "react-router-dom";

// Import all your screen components
import LoginScreen from "./screens/LoginScreen.tsx";
import DashboardScreen from "./screens/DashboardScreen.tsx";
import ProductsListScreen from "./screens/ProductsListScreen.tsx";
import AddProductScreen from "./screens/AddProductScreen.tsx";
import NewSaleScreen from "./screens/NewSaleScreen.tsx";
// If you have a landing page component, import it too. Let's assume it's Index.tsx
import Index from "./screens/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/products" element={<ProductsListScreen />} />
      <Route path="/add-product" element={<AddProductScreen />} />
      <Route path="/new-sale" element={<NewSaleScreen />} />
    </Routes>
  );
}

export default App;
