import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (ref: any, onClickFunc: () => void) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickFunc();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */

interface OutsideAlerterProps {
  handleClickOutside: () => void
}
export const OutsideAlerter: React.FC<OutsideAlerterProps> = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.handleClickOutside);

  return <div ref={wrapperRef}>{props.children}</div>;
}

// OutsideAlerter.propTypes = {
//   children: PropTypes.element.isRequired
// };

export default OutsideAlerter;
