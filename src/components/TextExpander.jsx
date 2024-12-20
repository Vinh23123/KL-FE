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

  const shortText =
    String(children).split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  const displayText = isExpanded ? String(children) : shortText;
  return (
    <div className="text-expander-div">
      <span>{displayText}</span>
      {/* logic is if the number of words is greater than collapedNumber -> display button*/}
      {String(children).split(" ").length > collapsedNumWords && (
        <button className="text-expander-div__btn" onClick={handleDisplayText}>
          {isExpanded ? messageShowLess : messageShowMore}
        </button>
      )}
    </div>
  );
};

export default TextExpander;
