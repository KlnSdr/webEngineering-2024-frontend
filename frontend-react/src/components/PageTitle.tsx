import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Props for the PageTitle component.
 * @typedef {Object} PageTitleProps
 * @property {string} title - The title to set for the document.
 */
interface PageTitleProps {
  title: string;
}

/**
 * PageTitle component sets the document title based on the provided title prop.
 * It updates the document title whenever the location or title changes.
 * @param {PageTitleProps} props - The props for the component.
 * @returns {null} This component does not render any visible elements.
 */
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
};

export default PageTitle;