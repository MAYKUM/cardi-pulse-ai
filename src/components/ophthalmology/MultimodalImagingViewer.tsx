import React, { useEffect } from "react";

const MultimodalImagingViewer: React.FC = () => {
  useEffect(() => {
    document.title = "Multimodal Imaging Viewer | Ophthalmology";
  }, []);

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Multimodal Imaging Viewer</h1>
        <p className="text-muted-foreground">Load fundus photos, OCT/OCT-A, FA/ICG, and overlays.</p>
      </header>
      <section className="rounded-lg border bg-card p-6">
        <p>Viewer placeholder. Supports tiling, annotations, and AI overlays.</p>
      </section>
    </main>
  );
};

export default MultimodalImagingViewer;
