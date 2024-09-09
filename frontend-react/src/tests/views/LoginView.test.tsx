import React from "react";
import { render } from "@testing-library/react";
import LoginView from "../../views/LoginView";

describe("LoginView Component", () => {

    it("matches the snapshot", () => {
        const { asFragment } = render(<LoginView />);
        expect(asFragment()).toMatchSnapshot();
    });
});
