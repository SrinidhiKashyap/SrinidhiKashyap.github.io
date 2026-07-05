const BASE_PATH = "/assets/work-magazine-detail";

export const magazineAssets = {
  hero: `${BASE_PATH}/frame-01.webp`,
  gallery: [
    { src: `${BASE_PATH}/bird-table-02.webp`, alt: "Magazine books on a sculptural table" },
    { src: `${BASE_PATH}/bird-table-03.webp`, alt: "Editorial books on a wooden table" },
    { src: `${BASE_PATH}/the-ways.webp`, alt: "The Ways editorial book mockup" },
    { src: `${BASE_PATH}/telugu-kannada.webp`, alt: "Telugu Kannada magazine mockup" },
  ],
  scrollFrames: [
    `${BASE_PATH}/frame-06.webp`,
    `${BASE_PATH}/frame-03.webp`,
    `${BASE_PATH}/frame-05.webp`,
    `${BASE_PATH}/frame-04.webp`,
  ],
} as const;
