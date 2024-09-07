import React, {useState} from "react";

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
                type="text"
                value={filterValue}
                onChange={(e) => {
                    setFilterValue(e.target.value);
                }}
                onFocus={() => setOpen(true)}
            />
            {open && (
                <div style={
                    {
                        position: "relative",
                        backgroundColor: "white",
                        border: "1px solid black",
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "scroll",
                        zIndex: 9001
                    }
                }>
                    {options.filter((option: string) => option.toLowerCase().includes(filterValue.toLowerCase())).map((option: string) => {
                        return (
                            <div
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
        // <select
        //     onChange={(e) => {
        //         setValue(e.target.value);
        //         onChange(e.target.value);
        //     }}
        // >
        //     {options.map((option: string) => {
        //         if (option === value) {
        //             return (
        //                 <option value={option} selected>
        //                     {option}
        //                 </option>
        //             );
        //         } else {
        //             return <option value={option}>{option}</option>;
        //         }
        //     })}
        // </select>
    );
};

export default Dropdown;
