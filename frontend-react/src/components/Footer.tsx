import React from "react";
import Stack from "react-bootstrap/Stack";

interface FooterProps {
  owner: string;
  timestamp: string;
}

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