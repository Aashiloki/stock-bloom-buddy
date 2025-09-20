import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "@/components/StyledButton";
import { TextInputField } from "@/components/TextInputField";
import { useToast } from "@/hooks/use-toast";
import { Package } from "lucide-react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Inventory Manager</h1>
          <p className="text-white/80 text-lg">Sign in to manage your inventory</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-premium">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back</h2>
          </div>
          
          <div className="space-y-6">
            <TextInputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
              required
            />
            <TextInputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              required
            />
            <StyledButton
              fullWidth
              variant="primary"
              size="lg"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </StyledButton>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-white/70 text-sm">
            Demo credentials: admin@example.com / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;