import { useState, type ChangeEvent, type SyntheticEvent } from "react";

export type ContactFormData = {
  firstName: string;
  phone: string;
  email: string;
  howDidYouHear: string;
  projectDetails: string;
  newsletter: boolean;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
export type ContactSubmitStatus = "idle" | "unavailable";

const initialContactFormData: ContactFormData = {
  firstName: "",
  phone: "",
  email: "",
  howDidYouHear: "",
  projectDetails: "",
  newsletter: false,
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialContactFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactSubmitStatus>("idle");

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value,
    }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setStatus("idle");
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: ContactFormErrors = {};
    if (!formData.firstName.trim()) nextErrors.firstName = "Please enter your name.";
    if (!formData.email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      nextErrors.email = "Enter a valid email address.";
    if (!formData.projectDetails.trim())
      nextErrors.projectDetails = "Tell us a little about your project.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Deliberately no network call: this site does not yet have a form delivery service.
    setStatus("unavailable");
  }

  return {
    formData,
    errors,
    status,
    handleChange,
    handleSubmit,
  };
}
