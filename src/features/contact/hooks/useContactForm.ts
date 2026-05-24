import { useState, type ChangeEvent, type FormEvent } from "react";

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  howDidYouHear: string;
  projectDetails: string;
  newsletter: boolean;
};

const initialContactFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  howDidYouHear: "",
  projectDetails: "",
  newsletter: false,
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialContactFormData);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Form submitted:", formData);
  }

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}
