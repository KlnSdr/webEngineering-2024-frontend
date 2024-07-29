import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Heading from "../../components/Heading"; // Adjust the import if the path is different

describe("Heading Component", () => {
    test("renders with correct heading text", () => {
        const headingText = "Test Heading";

        render(<Heading headingText={headingText} />);

        const headingElement = screen.getByRole("heading", { level: 1 });
        expect(headingElement).toHaveTextContent(headingText);
        expect(headingElement).toHaveClass("headline-with-lines");
    });
});
