import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
    Link: string;
}

interface CreateButtonProps {
    Link: string;
}

const EditButton: React.FC<EditButtonProps> = ({Link}) => {
    const navigate = useNavigate();
    return(
        <div className="EditButton">
            <Button className="bi bi-pencil" onClick= {() => navigate(Link)}> Edit</Button>
        </div>
    );
}

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
