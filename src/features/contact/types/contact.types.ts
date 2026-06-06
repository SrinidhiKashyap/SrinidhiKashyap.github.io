/**
 * Contact page types.
 *
 * Shared between the contact form components and the useContactForm hook.
 */

/** Form field name keys for the contact form. */
export type ContactFormField = "name" | "email" | "phone" | "message";

/** Shape of the contact form state. */
export type ContactFormData = Record<ContactFormField, string>;