import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ImageUpload from "../../components/ImageUpload";

describe("ImageUpload Component", () => {
    const initialValue = "data:imgUri/png;base64,initialImage";
    const handleChange = jest.fn();

    beforeEach(() => {
        handleChange.mockClear();
    });

    test("renders with initial value", () => {
        const {asFragment} = render(<ImageUpload initialValue={initialValue} onChange={handleChange} />);

        expect(screen.getByAltText("Selected")).toHaveAttribute("src", initialValue);
        expect(asFragment()).toMatchSnapshot();
    });

    test("uploads an imgUri and displays the preview", async () => {
        render(<ImageUpload initialValue={null} onChange={handleChange} />);

        const file = new File(["dummy content"], "example.png", { type: "imgUri/png" });
        const input = screen.getByLabelText("Wähle ein Bild aus:");

        Object.defineProperty(input, "files", {
            value: [file],
        });

        fireEvent.change(input);

        await waitFor(() => expect(handleChange).toHaveBeenCalledWith(expect.any(String)));

        expect(screen.getByAltText("Selected")).toBeInTheDocument();
    });

    test("removes the uploaded imgUri", async () => {
        render(<ImageUpload initialValue={initialValue} onChange={handleChange} />);

        expect(screen.getByAltText("Selected")).toHaveAttribute("src", initialValue);

        const removeButton = screen.getByRole("button", { name: /remove imgUri/i });
        fireEvent.click(removeButton);

        expect(screen.queryByAltText("Selected")).not.toBeInTheDocument();
        expect(handleChange).toHaveBeenCalledWith(null);
    });
});
