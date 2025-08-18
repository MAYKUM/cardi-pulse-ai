import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function LogoutPage() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    document.title = "Logged Out | AI Medical Portal";
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Successfully Logged Out</CardTitle>
          <CardDescription>
            You have been safely logged out of the AI Medical Portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            onClick={handleBackToLogin}
          >
            Back to Login Page
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}