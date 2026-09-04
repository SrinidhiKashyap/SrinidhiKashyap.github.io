import { act, renderHook } from "@testing-library/react";
import type { SyntheticEvent } from "react";
import { describe, expect, it } from "vitest";
import { useContactForm } from "./useContactForm";

describe("useContactForm", () => {
  it("rejects an empty required form without sending data", () => {
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.handleSubmit({
        preventDefault: () => undefined,
      } as SyntheticEvent<HTMLFormElement>);
    });
    expect(result.current.errors.firstName).toBeDefined();
    expect(result.current.status).toBe("idle");
  });
});
