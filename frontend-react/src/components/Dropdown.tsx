import React, {useState} from "react";
import "../style/Dropdown.css";


interface DropdownProps {
    options: string[],
    initialValue: string,
    onChange: (value: string) => void,
}
const Dropdown: React.FC<DropdownProps> = ({
                                               options,
                                               initialValue,
                                               onChange,
                                           }) => {
    const [value, setValue] = useState(initialValue);
    const [open, setOpen] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    return (
        <div>
            <input
                className="form-control"
                type="text"
                value={filterValue}
                onChange={(e) => {
                    setFilterValue(e.target.value);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 200)}
            />
            {open && (
                <div className="dropdownOptionsContainer">
                    {options.filter((option: string) => option.toLowerCase().includes(filterValue.toLowerCase())).map((option: string) => {
                        return (
                            <div
                                className="dropdownOption"
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setValue(option);
                                    setOpen(false);
                                    setFilterValue(option);
                                    onChange(option);
                                }}
                            >
                                {option}
                            </div>
                        );
                    })}
                </div>)
            }
        </div>
    );
};

export default Dropdown;
