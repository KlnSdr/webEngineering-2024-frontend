import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import NotFoundView from "../../views/NotFoundView";

describe("NotFoundView Component", () => {

    it("renders 404 NotFoundView for unknown routes and matches snapshot", () => {
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <App />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot for NotFoundView component alone', () => {
        const { asFragment } = render(<NotFoundView />);
        expect(asFragment()).toMatchSnapshot();
    });

});
