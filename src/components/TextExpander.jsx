import { useState } from "react";

import "../styles/_TextExpander.scss";

const TextExpander = ({
  messageShowMore = "Show more",
  messageShowLess = "Show less",
  children,
  expanded = false,
  collapsedNumWords = 10,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleDisplayText = () => {
    setIsExpanded((show) => !show);
  };

  // Only proceed if children has content
  if (!children || typeof children !== "string" || children.trim() === "") {
    return null; // Do not render the component
  }

  const shortText =
    children.split(" ").slice(0, collapsedNumWords).join(" ") +
    (children.split(" ").length > collapsedNumWords ? "..." : "");

  const displayText = isExpanded ? children : shortText;

  return (
    <div className="text-expander-div">
      <span>{displayText}</span>
      {/* Display the button only if the text exceeds collapsedNumWords */}
      {children.split(" ").length > collapsedNumWords && (
        <button className="text-expander-div__btn" onClick={handleDisplayText}>
          {isExpanded ? messageShowLess : messageShowMore}
        </button>
      )}
    </div>
  );
};

export default TextExpander;
