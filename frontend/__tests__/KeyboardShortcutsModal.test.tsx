import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import GlobalKeyboardOverlays from "../components/GlobalKeyboardOverlays";

describe("Keyboard shortcuts modal", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("opens with ? when focus is not inside an input", () => {
    render(<GlobalKeyboardOverlays />);

    expect(screen.queryByRole("dialog", { name: /keyboard shortcuts/i })).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "?", shiftKey: true });

    expect(screen.getByRole("dialog", { name: /keyboard shortcuts/i })).toBeInTheDocument();
  });

  it("does not open with ? when typing in an input field", () => {
    render(
      <div>
        <input aria-label="search-input" />
        <GlobalKeyboardOverlays />
      </div>,
    );

    const input = screen.getByLabelText("search-input");
    input.focus();
    fireEvent.keyDown(input, { key: "?", shiftKey: true });

    expect(screen.queryByRole("dialog", { name: /keyboard shortcuts/i })).not.toBeInTheDocument();
  });

  it("opens from command palette and closes with Escape", () => {
    render(<GlobalKeyboardOverlays />);

    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const paletteInput = screen.getByPlaceholderText(/type a command or invoice number/i);
    fireEvent.change(paletteInput, { target: { value: "keyboard" } });
    fireEvent.keyDown(window, { key: "Enter" });

    expect(screen.getByRole("dialog", { name: /keyboard shortcuts/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: /keyboard shortcuts/i })).not.toBeInTheDocument();
  });
});
