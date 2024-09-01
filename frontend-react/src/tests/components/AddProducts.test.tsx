import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import AddProducts from "../../components/AddProducts"; // Adjust the import if the path is different
import { NeededProduct, Product } from "../../types/Products"; // Adjust the import if the path is different
import exp from "constants";

jest.mock("../../components/AddProductLine", () => ({
                                                        initialValue,
                                                        onChange,
                                                        onRemove
                                                    }: any) => (
    <div>
        <input
            data-testid="product-input"
            defaultValue={initialValue}
            onChange={(e) => onChange(e.target.value, 1)}
        />
        <button data-testid="remove-button" onClick={onRemove}>Remove</button>
    </div>
));

describe("AddProducts Component", () => {
    const availableProducts: Product[] = [
        { name: "Product 1", unit: "kg", id: 0 },
        { name: "Product 2", unit: "ltr", id: 1 },
    ];

    const initialValue: NeededProduct[] = [
        { id: 1, productName: "Product 1", amount: 2 },
    ];

    test("renders with initial values", () => {
        const handleChange = jest.fn();

        const {asFragment} = render(<AddProducts initialValue={initialValue} onChange={handleChange} availableProducts={availableProducts} />);

        const productInput = screen.getByTestId("product-input");
        expect(productInput).toHaveValue(initialValue[0].productName);
        expect(asFragment()).toMatchSnapshot();
    });

    test("adds a new product line", () => {
        const handleChange = jest.fn();

        render(<AddProducts initialValue={initialValue} onChange={handleChange} availableProducts={availableProducts} />);

        const addButton = screen.getByTestId("add-product");
        fireEvent.click(addButton);

        const productInputs = screen.getAllByTestId("product-input");
        expect(productInputs).toHaveLength(initialValue.length + 1);
        expect(handleChange).toHaveBeenCalledWith(expect.arrayContaining([
            ...initialValue,
            expect.objectContaining({ productName: "Product 1", amount: 0 })
        ]));
    });

    test("updates a product's name and amount", () => {
        const handleChange = jest.fn();

        render(<AddProducts initialValue={initialValue} onChange={handleChange} availableProducts={availableProducts} />);

        const productInput = screen.getByTestId("product-input");
        fireEvent.change(productInput, { target: { value: "Product 2" } });

        expect(handleChange).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ productName: "Product 2", amount: 1 })
        ]));
    });

    test("removes a product line", () => {
        const handleChange = jest.fn();

        render(<AddProducts initialValue={initialValue} onChange={handleChange} availableProducts={availableProducts} />);

        const removeButton = screen.getByTestId("remove-button");
        fireEvent.click(removeButton);

        expect(screen.queryByTestId("product-input")).not.toBeInTheDocument();
        expect(handleChange).toHaveBeenCalledWith([]);
    });
});
