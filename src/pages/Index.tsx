import { useSEO } from "@/hooks/useSEO";
const Index = () => {
  useSEO({
    title: "Home | AI Medical Portal",
    description: "Modern AI-powered medical portal.",
    canonicalUrl: `${window.location.origin}/`,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;
