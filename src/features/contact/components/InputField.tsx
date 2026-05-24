import type { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

export function InputField(props: InputFieldProps) {
  return <input {...props} className="contact-form-field" />;
}
