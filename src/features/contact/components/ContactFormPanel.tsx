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
        className="h-56 w-full rounded-2xl object-cover"
      />

      <h2 className="mt-8 text-3xl font-bold">Tell us about your project</h2>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
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
          className="contact-form-field h-28"
        />

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="h-4 w-4 accent-bee-accent"
            />
            Subscribe to our newsletter for all the latest Bee concept news!
          </label>
          <p className="text-xs text-white/50">
            By submitting this form I accept the Privacy Policy of this site.
          </p>
        </div>

        <button type="submit" className="contact-submit-btn">
          Submit
        </button>
      </form>
    </section>
  );
}