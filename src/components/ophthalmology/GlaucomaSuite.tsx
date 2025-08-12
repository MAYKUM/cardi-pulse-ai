import React, { useEffect } from "react";

const GlaucomaSuite: React.FC = () => {
  useEffect(() => {
    document.title = "Glaucoma Suite | Ophthalmology";
  }, []);

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Glaucoma Suite</h1>
        <p className="text-muted-foreground">Track IOP logs, RNFL/OCT progression, visual fields and staging.</p>
      </header>
      <section className="rounded-lg border bg-card p-6">
        <p>Progression charts and alerts placeholder.</p>
      </section>
    </main>
  );
};

export default GlaucomaSuite;
