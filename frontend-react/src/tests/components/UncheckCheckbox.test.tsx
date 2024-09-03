import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import UncheckCheckbox from "../../components/UncheckCheckbox";

describe("UncheckCheckbox Component", () => {

    test("renders with initial value", () => {
        const voteChange = jest.fn();
        const {asFragment} = render(<UncheckCheckbox voteChange={voteChange} />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
        expect(asFragment()).toMatchSnapshot();
    });

    test("calls voteChange callback when checkbox is clicked", () => {
        const voteChange = jest.fn();
        render(<UncheckCheckbox voteChange={voteChange} />);
        const checkbox = screen.getByRole("checkbox");
        userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        expect(voteChange).toHaveBeenCalledTimes(1);
    });

    test(" check checkbox when clicked", () => {
        const voteChange = jest.fn();
        render(<UncheckCheckbox voteChange={voteChange} />);
        const checkbox = screen.getByRole("checkbox");
        userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });
});