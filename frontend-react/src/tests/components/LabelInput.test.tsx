import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import LabelInput from "../../components/LabelInput";
import Heading from "../../components/Heading";

jest.mock("../../components/Heading", () => ({ headingText }: { headingText: string }) => <div>{headingText}</div>);

describe("LabelInput Component", () => {
    test("renders with initial value and label text", () => {
        const labelText = "Test Label";
        const initialValue = "Initial Text";
        const handleChange = jest.fn();

        render(<LabelInput labelText={labelText} initialValue={initialValue} onChange={handleChange} />);

        const heading = screen.getByText(labelText);
        const input = screen.getByRole("textbox");

        expect(heading).toBeInTheDocument();
        expect(input).toHaveValue(initialValue);
    });

    test("calls onChange callback when value changes", () => {
        const labelText = "Test Label";
        const initialValue = "";
        const handleChange = jest.fn();

        render(<LabelInput labelText={labelText} initialValue={initialValue} onChange={handleChange} />);

        const input = screen.getByRole("textbox");
        userEvent.type(input, "New Value");

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
        const labelText = "Test Label";
        const initialValue = "Initial Text";
        const newValue = "New Initial Text";
        const handleChange = jest.fn();

        const { rerender } = render(<LabelInput labelText={labelText} initialValue={initialValue} onChange={handleChange} />);

        let input = screen.getByRole("textbox");
        expect(input).toHaveValue(initialValue);

        rerender(<LabelInput labelText={labelText} initialValue={newValue} onChange={handleChange} />);
        input = screen.getByRole("textbox");
        expect(input).toHaveValue(newValue);
    });
});
