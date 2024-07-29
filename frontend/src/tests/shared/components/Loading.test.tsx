import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoadingComponent from "../../../shared/components/Loading";

describe("Loading component", () => {
  it("renders the button", () => {
    const { baseElement } = render(<LoadingComponent />);

    expect(baseElement).toBeInTheDocument();
  });
});
