import React from "react";
import {render} from "@testing-library/react";
import HomePage from "../../views/HomePage";
import SurveyEditView from "../../views/SurveyEditView";

describe("SurveyEditView Component", () => {

    it('matches snapshot for SurveyEditView component', () => {
        const { asFragment } = render(<SurveyEditView />);
        expect(asFragment()).toMatchSnapshot();
    });
})