import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeDetailView from "../../views/RecipeDetailView";
import { request } from "../../services/Requests";

jest.mock("../../services/Requests");

const mockRequest = request as jest.Mock;

describe("RecipeDetailView Component", () => {

    it("matches snapshot when recipe is found", async () => {
        mockRequest.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "1",
                title: "Test Recipe",
                description: "Description of the recipe",
                imgUri: "/image/...",
                isPrivate: false,
                creationDate: new Date().toISOString(),
                ownerUri: "/owneruri/1",
                likedByUserUris: [],
                productQuantities: {
                    "/products/1": 100,
                },
            }),
        } as Response);

        const { asFragment } = render(
            <Router>
                <Routes>
                    <Route path="/recipes/:id" element={<RecipeDetailView />} />
                </Routes>
            </Router>
        );

        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });

    it("matches snapshot when recipe is not found", async () => {
        mockRequest.mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        } as Response);

        const { asFragment } = render(
            <Router>
                <Routes>
                    <Route path="/recipes/:id" element={<RecipeDetailView />} />
                </Routes>
            </Router>
        );

        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
