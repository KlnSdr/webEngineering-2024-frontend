import React, {act} from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Dropdown from "../../components/Dropdown";
import userEvent from "@testing-library/user-event"; // Adjust the import if the path is different

describe("Dropdown Component", () => {
    const options = ["Option 1", "Option 2", "Option 3"];

    test("renders with correct initial value", () => {
        const initialValue = "Option 2";
        const handleChange = jest.fn();

        const {asFragment} = render(<Dropdown options={options} initialValue={initialValue} onChange={handleChange} />);

        const selectElement = screen.getByRole("textbox");
        expect(selectElement).toHaveValue(initialValue);

        expect(asFragment()).toMatchSnapshot();
    });

    test("calls onChange callback when value changes", () => {
        const handleChange = jest.fn();

        render(<Dropdown options={options} initialValue={""} onChange={handleChange} />);

        const selectElement = screen.getByRole("textbox");
        userEvent.type(selectElement, "Option 3");
        screen.findByText("Option 3").then((option) => {
            console.log(option);
            fireEvent.click(option);
            expect(selectElement).toHaveValue("Option 3");
            expect(handleChange).toHaveBeenCalledTimes(1);
            expect(handleChange).toHaveBeenCalledWith("Option 3");
        });
    });
});
