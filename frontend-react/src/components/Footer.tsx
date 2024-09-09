import React from "react";
import Stack from "react-bootstrap/Stack";

/**
 * Props for the Footer component.
 * @typedef {Object} FooterProps
 * @property {string} owner - The owner of the footer content.
 * @property {string} timestamp - The timestamp of when the footer content was created.
 */
interface FooterProps {
  owner: string;
  timestamp: string;
}

/**
 * Footer component displays the owner and timestamp information.
 * @param {FooterProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer: React.FC<FooterProps> = ({ owner, timestamp }) => {
    return(
        <footer className="text-center bg-body-tertiary pt-3">
            <Stack direction={"horizontal"} gap={5}>
                <text> Erstellt von: {owner} </text>
                <text> Datum: {timestamp} </text>
            </Stack>
        </footer>
    );
}

export default Footer;