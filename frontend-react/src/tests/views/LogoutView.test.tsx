import React from "react";
import { render } from "@testing-library/react";
import LogoutView from "../../views/LogoutView";

describe("LogoutView Component", () => {
    it("matches the snapshot", () => {
        const { asFragment } = render(<LogoutView />);
        expect(asFragment()).toMatchSnapshot();
    });
});
