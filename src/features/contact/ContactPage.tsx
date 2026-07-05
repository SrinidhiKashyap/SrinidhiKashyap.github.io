import { PageLayout } from "../../shared/components/layout/PageLayout";
import { ContactFormPanel } from "./components/ContactFormPanel";
import { ContactInfoPanel } from "./components/ContactInfoPanel";
import "./contact.css";

export function ContactPage() {
  return (
    <PageLayout>
      <main className="contact-page-main">
        <section className="contact-panel mb-8">
          <p className="text-xl text-white/80 md:text-2xl lg:text-3xl">
            For general enquiries, please fill out the form to get in touch.
          </p>
        </section>

        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <ContactInfoPanel />
          <ContactFormPanel />
        </div>
      </main>
    </PageLayout>
  );
}
