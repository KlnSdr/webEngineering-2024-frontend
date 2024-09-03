import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ImageArea from "../../components/ImageArea";

describe("ImageArea Component", () => {
    test("renders with correct imgUri", () => {
        const origin = "https://via.placeholder.com/150";

       const {asFragment} = render( <ImageArea origin={origin} />);

        const imageElement = screen.getByRole("img");
        expect(imageElement).toHaveAttribute("src", origin);
        expect(imageElement).toHaveAttribute("alt", "dish");
        expect(asFragment()).toMatchSnapshot();
    });
});
