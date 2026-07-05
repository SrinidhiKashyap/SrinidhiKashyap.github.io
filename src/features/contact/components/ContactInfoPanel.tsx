export function ContactInfoPanel() {
  return (
    <section className="contact-panel">
      <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">Let's make your brand stand out.</h1>
      <p className="mt-4 text-base text-white/80 md:mt-6 md:text-lg">For general enquiries, fill out the form to get in touch.</p>
      <p className="mt-2 text-white/60">Hate contact forms? Drop us a direct line.</p>

      <address className="mt-8 space-y-3 text-base text-white/90 not-italic md:mt-10 md:space-y-4 md:text-lg">
        <p>Phone: 6362260862</p>
        <p>
          Email:{" "}
          <a className="hover:underline touch-target tap-highlight-transparent" href="mailto:hellobeeconcept@gmail.com">
            hellobeeconcept@gmail.com
          </a>
        </p>
        <p>
          Website:{" "}
          <a className="hover:underline touch-target tap-highlight-transparent" href="https://www.beeconcept.in" target="_blank" rel="noreferrer">
            www.beeconcept.in
          </a>
        </p>
      </address>
    </section>
  );
}
