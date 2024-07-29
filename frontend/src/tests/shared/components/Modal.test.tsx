import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Modal from "../../../shared/components/Modal";
import { useState } from "react";

describe("Modal component", () => {
  const ModalTestWrapper = ({ openState, handleCallback }: {
    openState?: boolean, handleCallback?: (open: boolean) => void
  }) => {
    const [open, setOpen] = useState(openState ?? true);

    const handleClose = vi.fn().mockImplementation(() => {
      setOpen(false)
      if (handleCallback) handleCallback(open);
    });

    return <Modal closeButtonCallback={handleClose} open={open}>Hello</Modal>;
  };

  it("renders the button with the given child", () => {

    const { getByRole } = render(<ModalTestWrapper />);

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('dialog')).toHaveTextContent("Hello");
    expect(getByRole('dialog')).toHaveStyle('display: block');
  });

  it("modal vanish if open is false", () => {
    const { getByRole } = render(<ModalTestWrapper openState={false}/>);
    
    expect(getByRole('dialog')).not.toHaveStyle('display: none');
  });

  test("handles closeButtonCallback", async () => {
    const verifyState = vi.fn().mockImplementation((open: boolean) => {
      waitFor(() => expect(open).toBe(false), { timeout: 1000 });
    });
    const { getByRole } = render(
      <ModalTestWrapper handleCallback={verifyState}/>
    );

    fireEvent.click(getByRole("button"));

    waitFor(() => {
      expect(verifyState).toHaveBeenCalled();
      expect(getByRole('dialog')).toHaveStyle('display: none');
    }, { timeout: 1000 });
  });
});
