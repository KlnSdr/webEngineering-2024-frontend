import React from "react";
import {render} from "@testing-library/react";
import SurveyHub from "../../views/SurveyHub";

describe("SurveyHub Component", () => {

    it('matches snapshot for SurveyHub component', () => {
        const { asFragment } = render(<SurveyHub />);
        expect(asFragment()).toMatchSnapshot();
    });
})