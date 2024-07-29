import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import TextArea from "../../components/TextArea";

describe("TextArea Component", () => {
    test("renders with initial value", () => {
        const initialValue = "Initial Text";
        const handleChange = jest.fn();

        render(<TextArea initialValue={initialValue} onChange={handleChange} />);

        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveValue(initialValue);
    });

    test("calls onChange callback when value changes", () => {
        const initialValue = "";
        const handleChange = jest.fn();

        render(<TextArea initialValue={initialValue} onChange={handleChange} />);

        const textarea = screen.getByRole("textbox");
        userEvent.type(textarea, "New Value");

        expect(handleChange).toHaveBeenCalledTimes(9); // "New Value" is 9 characters long
        expect(handleChange).toHaveBeenCalledWith("N");
        expect(handleChange).toHaveBeenCalledWith("Ne");
        expect(handleChange).toHaveBeenCalledWith("New");
        expect(handleChange).toHaveBeenCalledWith("New ");
        expect(handleChange).toHaveBeenCalledWith("New V");
        expect(handleChange).toHaveBeenCalledWith("New Va");
        expect(handleChange).toHaveBeenCalledWith("New Val");
        expect(handleChange).toHaveBeenCalledWith("New Valu");
        expect(handleChange).toHaveBeenCalledWith("New Value");
    });

    test("updates value when initialValue prop changes", () => {
        const initialValue = "Initial Text";
        const newValue = "New Initial Text";
        const handleChange = jest.fn();

        const { rerender } = render(<TextArea initialValue={initialValue} onChange={handleChange} />);

        let textarea = screen.getByRole("textbox");
        expect(textarea).toHaveValue(initialValue);

        rerender(<TextArea initialValue={newValue} onChange={handleChange} />);
        textarea = screen.getByRole("textbox");
        expect(textarea).toHaveValue(newValue);
    });
});
