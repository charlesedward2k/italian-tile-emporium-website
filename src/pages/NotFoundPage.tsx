
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/30 px-4 py-16 text-center">
      <div className="border-b border-tile-blue pb-6 mb-6">
        <span className="text-6xl font-serif font-medium text-tile-blue">404</span>
      </div>
      <h1 className="text-2xl font-serif mb-4">Page Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved.
        Please check the URL or navigate back to our homepage.
      </p>
      <Button size="lg" asChild>
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
