import React from "react";

interface HeadingProps {
  headingText: string;
}

const Heading: React.FC<HeadingProps> = ({ headingText }) => {
  return <h1 className="headline-with-lines">{headingText}</h1>;
};

const Heading2: React.FC<HeadingProps> = ({ headingText }) => {
  return <h2 className="FoodTitle">{headingText}</h2>;
}

export default Heading;
export { Heading2 };
