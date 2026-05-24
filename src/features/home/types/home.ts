export type WorkCategory =
  | "Branding"
  | "Package"
  | "3D Renders"
  | "Animation"
  | "Ui/Ux"
  | "Web Design"
  | "Interface"
  | "Magazines"
  | "Cover Page"
  | "Layout"
  | "Title Design";

export type WorkItem = {
  id: string;
  categories: WorkCategory[];
  title: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  year: string;
  caption: string;
  pagePath: string;
};

export type NavLinkItem = {
  label: string;
  targetId: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type HomeWorkFilter = "All Work" | "Branding" | "Package" | "3D Renders" | "Ui/Ux" | "Web Design";
