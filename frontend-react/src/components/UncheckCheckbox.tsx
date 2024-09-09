import React from "react";

/**
 * Props for the UncheckCheckbox component.
 * @typedef {Object} UncheckCheckboxProps
 * @property {function} voteChange - Callback function to handle the change in vote.
 */
interface UncheckCheckboxProps {
    voteChange: () => void;
}

/**
 * Props for the IsPrivateCheckbox component.
 * @typedef {Object} isPrivateCheckbox
 * @property {function} isPrivate - Callback function to handle the change in privacy status.
 * @property {boolean} checked - Indicates whether the checkbox is checked.
 */
interface isPrivateCheckbox {
    isPrivate: () => void;
    checked: boolean;
}

/**
 * UncheckCheckbox component renders a checkbox that unchecks all other checkboxes when checked.
 * @param {UncheckCheckboxProps} props - The props for the component.
 * @returns {JSX.Element} The rendered UncheckCheckbox component.
 */
const UncheckCheckbox: React.FC<UncheckCheckboxProps> = ({ voteChange }) => {

    /**
     * Retrieves all checkbox elements in the document.
     * @returns {HTMLInputElement[]} An array of checkbox elements.
     */
    function getAllCheckboxes(): HTMLInputElement[] {
        return Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
    }

    /**
     * Handles the change event for the checkbox.
     * Unchecks all other checkboxes and checks the current one.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const index = getAllCheckboxes();
        for (let i = 0; i < index.length; i++) {
            if (index[i].checked) {
                index[i].checked = false;
            }
        }
        event.target.checked = true;
        voteChange();
    }

    return (
        <div className="form-check m-lg-4">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleChange} />
            <label className="form-check-label" htmlFor="flexCheckChecked"></label>
        </div>
    );
}

/**
 * IsPrivateCheckbox component renders a checkbox to toggle privacy status.
 * @param {isPrivateCheckbox} props - The props for the component.
 * @returns {JSX.Element} The rendered IsPrivateCheckbox component.
 */
const IsPrivateCheckbox: React.FC<isPrivateCheckbox> = ({ isPrivate, checked }) => {
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={checked} onChange={isPrivate} />
            <label className="form-check-label" htmlFor="flexCheckChecked">Privat</label>
        </div>
    );
}

export default UncheckCheckbox;
export { IsPrivateCheckbox };