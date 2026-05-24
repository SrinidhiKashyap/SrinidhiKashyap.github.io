import { processSteps } from "../data/serviceContent";

export function ProcessSection() {
  return (
    <section className="service-process">
      <h2 className="text-3xl font-bold">How we work</h2>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {processSteps.map((step, index) => (
          <div key={step.title} className="service-process-step">
            {/* Step number in brand accent colour */}
            <p className="text-sm font-semibold text-bee-accent">Step {index + 1}</p>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-white/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}