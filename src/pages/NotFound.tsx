
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-futuristic-dark">
      <div className="text-center p-8 glass-morphism rounded-2xl max-w-md">
        <h1 className="text-7xl font-bold mb-4 purple-gradient">404</h1>
        <p className="text-xl text-white mb-6">This page does not exist in our universe.</p>
        <Button asChild className="bg-futuristic-purple hover:bg-futuristic-purple-light">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
