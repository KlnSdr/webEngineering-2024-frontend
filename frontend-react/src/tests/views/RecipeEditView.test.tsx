import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductsService } from "../../services/ProductService";
import { request } from "../../services/Requests";
import EditRecipeView from "../../views/RecipeEditView";
import PageTitle from "../../components/PageTitle";

jest.mock("../../services/ProductService");
jest.mock("../../services/Requests");

const mockRequest = request as jest.Mock;
const mockGetAll = ProductsService.getAll as jest.Mock;

describe("EditRecipeView with PageTitle Component", () => {

    mockGetAll.mockResolvedValue([
        { id: 1, name: "One", unit: "g" },
        { id: 2, name: "Two", unit: "ml" }
    ]);

    it("matches snapshot when recipe data is successfully fetched", async () => {

        mockRequest.mockResolvedValue({
            ok: true,
            json: async () => ({
                id: "1",
                title: "Test Recipe",
                description: "Test Description",
                imgUri: "/test-image.jpg",
                isPrivate: false,
                creationDate: "2024-01-01T00:00:00.000Z",
                ownerUri: "/owneruri/1",
                likedByUserUris: [],
                productQuantities: {
                    "/products/1": 500,
                    "/products/2": 200,
                },
            }),
        } as Response);

        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/edit/1"]}>
                <Routes>
                    <Route
                        path="recipe/:id"
                        element={
                            <>
                                <PageTitle title="Rezept bearbeiten" />
                                <EditRecipeView />
                            </>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });

    it("matches snapshot when recipe is not found", async () => {

        mockRequest.mockResolvedValue({
            ok: false,
            json: async () => ({}),
        } as Response);

        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/1"]}>
                <Routes>
                    <Route
                        path="edit/:id"
                        element={
                            <>
                                <PageTitle title="Rezept bearbeiten" />
                                <EditRecipeView />
                            </>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
