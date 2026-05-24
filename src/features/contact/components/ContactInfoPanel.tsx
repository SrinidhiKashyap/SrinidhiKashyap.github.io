export function ContactInfoPanel() {
  return (
    <section className="contact-panel">
      <h1 className="text-5xl font-bold leading-tight">Let&apos;s make your brand stand out.</h1>
      <p className="mt-6 text-lg text-white/80">For general enquiries, fill out the form to get in touch.</p>
      <p className="mt-2 text-white/60">Hate contact forms? Drop us a direct line.</p>

      <address className="mt-10 space-y-4 text-lg text-white/90 not-italic">
        <p>Phone: 6362260862</p>
        <p>
          Email:{" "}
          <a className="hover:underline" href="mailto:hellobeeconcept@gmail.com">
            hellobeeconcept@gmail.com
          </a>
        </p>
        <p>
          Website:{" "}
          <a className="hover:underline" href="https://www.beeconcept.in" target="_blank" rel="noreferrer">
            www.beeconcept.in
          </a>
        </p>
      </address>
    </section>
  );
}
