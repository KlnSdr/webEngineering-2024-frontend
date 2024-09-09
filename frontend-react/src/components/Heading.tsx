import React from "react";

/**
 * Props for the Heading component.
 * @typedef {Object} HeadingProps
 * @property {string} headingText - The text to display in the heading.
 */
interface HeadingProps {
  headingText: string;
}

/**
 * Heading component renders an h1 element with the provided text.
 * @param {HeadingProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Heading component.
 */
const Heading: React.FC<HeadingProps> = ({ headingText }) => {
  return <h1 className="headline-with-lines">{headingText}</h1>;
};

/**
 * Heading2 component renders an h2 element with the provided text.
 * @param {HeadingProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Heading2 component.
 */
const Heading2: React.FC<HeadingProps> = ({ headingText }) => {
  return <h2 className="FoodTitle">{headingText}</h2>;
}

export default Heading;
export { Heading2 };