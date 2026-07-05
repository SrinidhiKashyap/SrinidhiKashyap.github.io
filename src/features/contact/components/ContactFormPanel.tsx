import { ASSETS } from "../../../shared/lib/assets";
import { useContactForm } from "../hooks/useContactForm";
import { InputField } from "./InputField";

export function ContactFormPanel() {
  const { formData, handleChange, handleSubmit } = useContactForm();

  return (
    <section className="contact-panel">
      <img
        src={ASSETS.contactPhoto}
        alt="Bee concept team discussion"
        decoding="async"
        className="h-40 w-full rounded-2xl object-cover md:h-56"
      />

      <h2 className="mt-6 text-2xl font-bold md:mt-8 md:text-3xl">Tell us about your project</h2>

      <form className="mt-4 space-y-4 md:mt-6 md:space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <InputField
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <InputField
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          name="howDidYouHear"
          placeholder="How did you hear about us?"
          value={formData.howDidYouHear}
          onChange={handleChange}
        />

        <textarea
          name="projectDetails"
          placeholder="Tell us about your project"
          value={formData.projectDetails}
          onChange={handleChange}
          className="contact-form-field h-24 md:h-28 touch-target"
        />

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80 touch-target">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="h-5 w-5 accent-bee-accent touch-target"
            />
            Subscribe to our newsletter for all the latest Bee concept news!
          </label>
          <p className="text-xs text-white/50">
            By submitting this form I accept the Privacy Policy of this site.
          </p>
        </div>

        <button type="submit" className="contact-submit-btn touch-target tap-highlight-transparent py-3">
          Submit
        </button>
      </form>
    </section>
  );
}
