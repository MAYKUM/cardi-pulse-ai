import React, { useEffect } from "react";

const TeleScreeningPortal: React.FC = () => {
  useEffect(() => {
    document.title = "Tele-Screening Portal | Ophthalmology";
  }, []);

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Tele‑Ophthalmology Screening</h1>
        <p className="text-muted-foreground">Batch upload, automatic triage, and referral workflow.</p>
      </header>
      <section className="rounded-lg border bg-card p-6">
        <p>Store-and-forward pipeline placeholder with queue and status.</p>
      </section>
    </main>
  );
};

export default TeleScreeningPortal;
