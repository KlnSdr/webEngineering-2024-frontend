import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Dropdown from "../../components/Dropdown"; // Adjust the import if the path is different

describe("Dropdown Component", () => {
    const options = ["Option 1", "Option 2", "Option 3"];

    test("renders with correct initial value and options", () => {
        const initialValue = "Option 2";
        const handleChange = jest.fn();

        render(<Dropdown options={options} initialValue={initialValue} onChange={handleChange} />);

        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toHaveValue(initialValue);

        const optionElements = screen.getAllByRole("option");
        expect(optionElements).toHaveLength(options.length);
        optionElements.forEach((option, index) => {
            expect(option).toHaveTextContent(options[index]);
        });
    });

    test("calls onChange callback when value changes", () => {
        const initialValue = "Option 1";
        const handleChange = jest.fn();

        render(<Dropdown options={options} initialValue={initialValue} onChange={handleChange} />);

        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: "Option 3" } });

        expect(selectElement).toHaveValue("Option 3");
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith("Option 3");
    });
});
