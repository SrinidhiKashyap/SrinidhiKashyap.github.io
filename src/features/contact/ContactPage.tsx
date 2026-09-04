import { useState } from "react";
import { PageLayout } from "../../shared/components/layout/PageLayout";
import { useContactForm } from "./hooks/useContactForm";
import { CONTACT_FAQS, CONTACT_FORM_NOTICE } from "../../content/contact";
import "./contact.css";

export function ContactPage() {
  const { formData, errors, status, handleChange, handleSubmit } = useContactForm();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <PageLayout>
      <main className="bg-[#181818] text-white">
        <section className="px-section-x-sm py-10 sm:px-section-x-md sm:py-14 lg:px-section-x-lg lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-[1fr_250px] md:items-start lg:grid-cols-[1fr_310px]">
              <div>
                <p className="text-section-label">
                  <span aria-hidden>&bull;</span> Contact
                </p>
                <h1 className="mt-7 text-[clamp(3.4rem,9.2vw,8.4rem)] font-semibold leading-[0.86]">
                  It&apos;s nice to
                  <br />
                  meet you{" "}
                  <span
                    className="inline-grid h-[0.72em] w-[0.72em] translate-y-[-0.04em] place-items-center rounded-pill bg-bee-accent text-[0.34em] font-normal text-black"
                    aria-hidden
                  >
                    &darr;
                  </span>
                </h1>
              </div>
              <div className="relative ml-auto aspect-[0.73] w-full max-w-[310px] rounded-[26px] bg-[#d9d9d9]">
                <span
                  className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-pill bg-bee-accent text-black"
                  aria-hidden
                >
                  &rarr;
                </span>
              </div>
            </div>

            <div className="mt-7 border-t border-white/15 pt-12 sm:mt-10 sm:pt-16">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                <div className="max-w-sm text-copy-lg text-white/90">
                  <p>For general enquirers, please fill out the form to get in touch.</p>
                  <p className="mt-8">
                    Hate contact forms?
                    <br />
                    www.beeconcept.in
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <input
                        aria-invalid={Boolean(errors.firstName)}
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Name"
                        className="contact-input"
                      />
                      {errors.firstName && (
                        <p id="firstName-error" className="mt-1 text-xs text-red-300">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="contact-input"
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-300">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone (Optional)"
                      className="contact-input"
                    />
                    <input
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                      placeholder="How did you hear about Bee concept?"
                      className="contact-input"
                    />
                  </div>
                  <textarea
                    aria-invalid={Boolean(errors.projectDetails)}
                    aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined}
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    placeholder="Tell us about your project"
                    className="contact-input mt-3 h-32 resize-none"
                  />
                  {errors.projectDetails && (
                    <p id="projectDetails-error" className="mt-1 text-xs text-red-300">
                      {errors.projectDetails}
                    </p>
                  )}
                  <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-white/80">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="h-3.5 w-3.5 accent-bee-accent"
                    />
                    Subscribe to our newsletter for all the latest Shape post
                  </label>
                  <p className="mt-1 text-[0.65rem] text-white/55">
                    By submitting this form I accept the Privacy Policy of this site.
                  </p>
                  <button
                    type="submit"
                    className="mt-5 rounded-pill bg-[#45474d] px-6 py-3 text-sm transition hover:bg-bee-accent hover:text-black"
                  >
                    Send message
                  </button>
                  {status === "unavailable" && (
                    <p role="status" className="mt-3 text-sm text-white/75">
                      {CONTACT_FORM_NOTICE}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="px-section-x-sm pb-20 pt-12 sm:px-section-x-md sm:pb-28 lg:px-section-x-lg lg:pb-36 lg:pt-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-section-label">
                <span aria-hidden>&bull;</span> Anything else?
              </p>
              <h2 className="mt-4 max-w-lg text-heading-md font-semibold">
                The Answers To Your Questions.
              </h2>
              <a
                href="/#works"
                className="mt-8 inline-flex rounded-pill bg-bee-accent px-6 py-3 text-sm font-medium text-black transition hover:bg-white"
              >
                view our work
              </a>
            </div>
            <div className="space-y-4">
              {CONTACT_FAQS.map((question, index) => {
                const open = openQuestion === index;
                return (
                  <div key={question} className="rounded-[8px] bg-[#242424]">
                    <button
                      type="button"
                      onClick={() => setOpenQuestion(open ? null : index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-base"
                    >
                      <span>{question}</span>
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-pill bg-[#181818] text-white"
                        aria-hidden
                      >
                        {open ? "-" : "+"}
                      </span>
                    </button>
                    {open && (
                      <p className="px-5 pb-5 text-sm leading-relaxed text-white/70">
                        Tell us about your goals and timeline. We will reply with the right next
                        step.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
