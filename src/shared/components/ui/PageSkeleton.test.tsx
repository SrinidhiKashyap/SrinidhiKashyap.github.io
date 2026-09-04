import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudySkeleton, PageSkeleton } from "./PageSkeleton";

describe("loading skeletons", () => {
  it("announces generic page loading", () => {
    const { getByRole, unmount } = render(<PageSkeleton />);
    expect(getByRole("status").textContent).toBe("Loading page");
    unmount();
  });

  it("announces case-study loading", () => {
    const { getByRole, unmount } = render(<CaseStudySkeleton />);
    expect(getByRole("status").textContent).toBe("Loading project");
    unmount();
  });
});
