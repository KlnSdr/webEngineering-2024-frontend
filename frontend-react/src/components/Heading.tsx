import React from "react";

interface HeadingProps {
  headingText: string;
}

const Heading: React.FC<HeadingProps> = ({ headingText }) => {
  return <h1>{headingText}</h1>;
};

export default Heading;
