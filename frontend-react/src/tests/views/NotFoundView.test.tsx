import React from "react";
import { render } from "@testing-library/react";
import NotFoundView from "../../views/NotFoundView";

describe("NotFoundView Component", () => {

    it('matches snapshot for NotFoundView component', () => {
        const { asFragment } = render(<NotFoundView />);
        expect(asFragment()).toMatchSnapshot();
    });

});
