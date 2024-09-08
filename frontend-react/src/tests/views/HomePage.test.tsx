import React from "react";
import HomePage from "../../views/HomePage";
import { render } from "@testing-library/react";

describe("HomePage Component", () => {

        it('matches snapshot for HomePage component', () => {
            const { asFragment } = render(<HomePage />);
            expect(asFragment()).toMatchSnapshot();
        });

})

