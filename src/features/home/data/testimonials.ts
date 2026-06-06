/**
 * Client testimonials and partner logos displayed in the
 * Clients & Testimonials section of the home page.
 */

import { ASSETS } from "../../../shared/lib/assets";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TestimonialItem {
  /** Unique identifier (used as React key and for tab selection) */
  id: string;
  /** Full name of the person giving the testimonial */
  name: string;
  /** Role / title of the person */
  role: string;
  /** Quoted testimonial text */
  quote: string;
  /** Avatar image path */
  avatar: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const MARQUEE_LOGOS: readonly string[] = [
  ASSETS.brand1,
  ASSETS.brand2,
  ASSETS.brand3,
  ASSETS.brand4,
  ASSETS.brand5,
  ASSETS.brand6,
  ASSETS.brand7,
  ASSETS.brand8,
];

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    id: "shridhar",
    name: "ಶ್ರೀಧರ್ ಬನಾವಾಸಿ ಬಿ.ಸಿ",
    role: "ಮುಖ್ಯಸ್ಥರು, ಪಂಚಮಿ ಮೀಡಿಯಾ ಪಬ್ಲಿಕೇಷನ್ಸ್",
    quote:
      "ಬೀ ಕಾನ್ಸೆಪ್ಟ್, ನಮ್ಮ ಕಲ್ಪನೆಗೆ ರೂಪ ಕೊಡುವ ವಿಷಯ ಬಂದರೆ, ನಮ್ಮ ಅವಶ್ಯಕತೆ, ಸೃಜನಶೀಲತೆಗೆ ಅನುಗುಣವಾಗಿ ಉತ್ತಮ ಸೇವೆಯನ್ನು ನೀಡುತ್ತಿದ್ದಾರೆ. ಅವರ ಕ್ರಿಯಾಶೀಲತೆ, ಬದ್ಧತೆಯ ಗುಣಗಳು ನನಗೆ ತುಂಬಾ ಇಷ್ಟವಾಗಿವೆ. ಈ ತಂಡದ ಜೊತೆ ನಮ್ಮ ಸಂಸ್ಥೆಯು ಸದಾ ಕೆಲಸ ಮಾಡಲಿದೆ.",
    avatar: ASSETS.contactPhoto,
  },
  {
    id: "prakesh",
    name: "Prakash S Mudulkar",
    role: "CEO of STERKROS",
    quote:
      "Thanks for the impressive Sterkros logo design! It perfectly captures our brand essence with elegance and simplicity. The choice of colors is brilliant, and the scalability and versatility are outstanding. Thanks for your hard work and creating a logo that stands out and resonates with our brand. Looking forward to more collaborations in the future!",
    avatar: "/assets/home1-DuxIdUgA.png",
  },
  {
    id: "sunil",
    name: "Sunil D",
    role: "Founder of Om Enterprise",
    quote:
      "(Rain Water Harvesting System) Well-known trustworthy Advertising agency, More Reliable & Well Service Provider, I Suggest Bee concept For website creation and logo Designs.",
    avatar: "/assets/t2-iUX6M5gu.jpg",
  },
];