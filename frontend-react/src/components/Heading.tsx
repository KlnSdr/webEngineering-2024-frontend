import React from "react";

interface HeadingProps {
  headingText: string;
}

const Heading: React.FC<HeadingProps> = ({ headingText }) => {
  return <h1 className="headline-with-lines">{headingText}</h1>;
};

export default Heading;
