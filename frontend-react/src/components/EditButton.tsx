import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

/**
 * Props for the EditButton component.
 * @typedef {Object} EditButtonProps
 * @property {string} Link - The URL to navigate to when the button is clicked.
 */
interface EditButtonProps {
    Link: string;
}

/**
 * EditButton component renders a button that navigates to a specified link when clicked.
 * @param {EditButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered EditButton component.
 */
const EditButton: React.FC<EditButtonProps> = ({Link}) => {
    const navigate = useNavigate();
    return(
        <div className="EditButton">
            <Button className="bi bi-pencil" onClick= {() => navigate(Link)}> Edit</Button>
        </div>
    );
}

/**
 * Props for the CreateButton component.
 * @typedef {Object} CreateButtonProps
 * @property {string} Link - The URL to navigate to when the button is clicked.
 */
interface CreateButtonProps {
    Link: string;
}

/**
 * CreateButton component renders a button that navigates to a specified link when clicked.
 * @param {CreateButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered CreateButton component.
 */
const CreateButton: React.FC<CreateButtonProps> = ({Link}) => {
    const navigate = useNavigate();
    return (
        <div className="CreateButton">
            <Button className="bi bi-plus" onClick={() => navigate(Link)}>Erstelle neue Umfrage</Button>
        </div>
    );
}

export default EditButton;
export {CreateButton};