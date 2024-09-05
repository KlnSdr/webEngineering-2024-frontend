import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ImageUrl from "../../components/ImageUrl";

describe("ImageUrl Component", () => {
    test("renders with correct image", () => {
        const origin = "https://via.placeholder.com/150";

        const {asFragment} = render( <ImageUrl url={origin} />);

        const imageElement = screen.getByRole("img");
        expect(imageElement).toHaveAttribute("src", origin);
        expect(imageElement).toHaveAttribute("alt", "dish");
        expect(asFragment()).toMatchSnapshot();
    });
});