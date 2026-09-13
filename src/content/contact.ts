/**
 * EDIT HERE: Contact page questions and answers.
 * Keep each answer useful; it is shown when a visitor opens the question.
 */
export const CONTACT_FAQS = [
  "How long does a website project usually take to complete?",
  "How much does a website cost?",
  "We have a limited budget, will you still work with us?",
  "Do you outsource any work?",
  "What services do you offer?",
  "What are your payment terms?",
  "How many meetings can we have?",
  "Can we arrange a phone call to discuss?",
] as const;

export const CONTACT_FAQ_ANSWERS: Record<string, string> = {
  "How long does a website project usually take to complete?":
    "Timelines depend on the spec of the website project, but here are some guidelines. Shopify projects usually take around four weeks. Craft CMS projects usually take a minimum of five weeks. Craft Commerce projects usually take a minimum of eight weeks. Branding projects usually take around four weeks.",
  "How much does a website cost?":
    "Unfortunately, we don't have set project prices. Every brief we work on has different requirements which alters the spec of the job. So, once we've received the brief, we can give you an indication of the cost and timescale. We wrote this article about the importance of a website budget a while back and it's still relevant.",
  "We have a limited budget, will you still work with us?":
    "We work with a range of clients, from start-up brands to large global organisations such as the NHS and Blackberry. Our mindset is that we want to work with clients of the same vision. If you want to improve your brand online and understand the way we work (and the discussions are of mutual understanding) then we want to work with you. In terms of budget, the easiest way to find out if a project is possible is to let us know what your budget is. That way we can advise the best way of spending your money. We wrote this article about the importance of a website budget a while back and it's still relevant.",
  "Do you outsource any work?":
    "The only aspects we outsource (but offer full project management to the client on) are: Photography, Videography & Social Media Campaigns",
  "What services do you offer?":
    "We offer a full branding service in-house here at Shape. We win awards for our websites, and in particular specialise in building websites in Craft CMS and Shopify. We also offer SEO, hosting, and Shape Support to look after your site once live. We also have content writers who understand tone of voice, messaging, and SEO.",
  "What are your payment terms?":
    "We usually do 50% upfront, 25% on design sign-off, and 25% on build. But these terms can be discussed if need be. We are flexible. We just want to work with the right partner.",
  "How many meetings can we have?":
    "As many as you want. But we guide you through this process and ask for your feedback at certain stages. We have vast experience in delivering brand + website projects. We will go through multiple stages in a hierarchy so that you never get to a stage where you don't feel comfortable with the progress.",
  "Can we arrange a phone call to discuss?":
    "Yes of course, we can schedule a traditional phone call or zoom meeting into the diary that convenient for both parties. All of our staff work from home at the moment, and occasionally go into the studio. So it's quicker to email us and organise a time for a discussion, rather than just ringing the studio number.",
};

/** UI-only forms never send visitor data. Change this only with a real delivery integration. */
export const CONTACT_FORM_NOTICE =
  "Thanks for your interest. Online form delivery is not enabled yet.";
