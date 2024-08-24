import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Footer from "../../components/Footer";

describe("Footer Component", () => {
    test("renders the correct text", () => {
        render(<Footer  owner={"user"} timestamp={"01.01.1999"}/>);

        const footerElement = screen.getByText(/user/);
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveTextContent("user");

        const timestampElement = screen.getByText(/01.01.1999/);
        expect(timestampElement).toBeInTheDocument();
        expect(timestampElement).toHaveTextContent("01.01.1999");
    });
});