import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import AddProductLine from "../../components/AddProductLine";

jest.mock("../../components/Dropdown", () => ({
                                   options,
                                   initialValue,
                                   onChange
                               }: any) => (
    <select
        data-testid="dropdown"
        defaultValue={initialValue}
        onChange={(e) => onChange(e.target.value)}
    >
        {options.map((option: string) => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
));

describe("AddProductLine Component", () => {
    const products = ["Product 1", "Product 2", "Product 3"];
    const initialValue = "Product 1";
    const getUnitOf = (product: string) => (product === "Product 1" ? "kg" : "ltr");
    const getProduct = () => ({id: 1, productName: "Product 1", amount: 0 });

    test("renders with initial values", () => {
        const handleChange = jest.fn();
        const handleRemove = jest.fn();

        const {asFragment} = render(
            <AddProductLine
                products={products}
                initialValue={initialValue}
                onChange={handleChange}
                onRemove={handleRemove}
                getUnitOf={getUnitOf}
                getProduct={getProduct}/>
        );

        expect(screen.getByTestId("dropdown")).toHaveValue(initialValue);
        expect(screen.getByRole("spinbutton")).toHaveValue(0);
        expect(asFragment()).toMatchSnapshot();
    });

    test("updates product selection", () => {
        const handleChange = jest.fn();
        const handleRemove = jest.fn();

        render(
            <AddProductLine
                products={products}
                initialValue={initialValue}
                onChange={handleChange}
                onRemove={handleRemove}
                getUnitOf={getUnitOf}
                getProduct={getProduct}
            />
        );

        const dropdown = screen.getByTestId("dropdown");
        fireEvent.change(dropdown, { target: { value: "Product 2" } });

        expect(dropdown).toHaveValue("Product 2");
        expect(handleChange).toHaveBeenCalledWith("Product 2", 0);
        expect(screen.getByText("ltr")).toBeInTheDocument();
    });

    test("updates amount", () => {
        const handleChange = jest.fn();
        const handleRemove = jest.fn();

        render(
            <AddProductLine
                products={products}
                initialValue={initialValue}
                onChange={handleChange}
                onRemove={handleRemove}
                getUnitOf={getUnitOf}
                getProduct={getProduct}
            />
        );

        const amountInput = screen.getByRole("spinbutton");
        fireEvent.change(amountInput, { target: { value: "5" } });

        expect(amountInput).toHaveValue(5);
        expect(handleChange).toHaveBeenCalledWith("Product 1", 5);
    });

    test("calls onRemove callback", () => {
        const handleChange = jest.fn();
        const handleRemove = jest.fn();

        render(
            <AddProductLine
                products={products}
                initialValue={initialValue}
                onChange={handleChange}
                onRemove={handleRemove}
                getUnitOf={getUnitOf}
                getProduct={getProduct}
            />
        );

        const removeButton = screen.getByRole("button");
        fireEvent.click(removeButton);

        expect(handleRemove).toHaveBeenCalledTimes(1);
    });
});
