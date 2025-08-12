import React, { useEffect } from "react";

const OphthalmologyDashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Ophthalmology Dashboard | AI Medical Platform";
  }, []);

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Ophthalmology Dashboard</h1>
        <p className="text-muted-foreground">Visual acuity, IOP, imaging and care plans at a glance.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article className="p-4 rounded-lg border bg-card">
          <h2 className="text-sm font-medium">Today’s Appointments</h2>
          <p className="text-3xl font-semibold">18</p>
        </article>
        <article className="p-4 rounded-lg border bg-card">
          <h2 className="text-sm font-medium">Imaging Pending</h2>
          <p className="text-3xl font-semibold">7</p>
        </article>
        <article className="p-4 rounded-lg border bg-card">
          <h2 className="text-sm font-medium">Critical IOP Alerts</h2>
          <p className="text-3xl font-semibold">3</p>
        </article>
      </section>
    </main>
  );
};

export default OphthalmologyDashboard;
