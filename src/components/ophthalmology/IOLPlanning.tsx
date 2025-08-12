import React, { useEffect } from "react";

const IOLPlanning: React.FC = () => {
  useEffect(() => {
    document.title = "IOL Planning | Ophthalmology";
  }, []);

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Biometry & IOL Planning</h1>
        <p className="text-muted-foreground">Enter biometry, select formulas (SRK/T, Barrett, Haigis), and plan toric alignment.</p>
      </header>
      <section className="rounded-lg border bg-card p-6">
        <p>Planning workspace placeholder with calculators and templates.</p>
      </section>
    </main>
  );
};

export default IOLPlanning;
