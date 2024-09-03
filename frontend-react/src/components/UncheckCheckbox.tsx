import React from "react";
interface UncheckCheckboxProps {
    voteChange: ()=> void;
}

const  UncheckCheckbox: React.FC<UncheckCheckboxProps> = ({ voteChange}) => {

    function getAllCheckboxes(): HTMLInputElement[] {
        return Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const index = getAllCheckboxes()
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
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"  onChange={handleChange}/>
            <label className="form-check-label" htmlFor="flexCheckChecked"></label>
         </div>

    );
}

export default UncheckCheckbox;