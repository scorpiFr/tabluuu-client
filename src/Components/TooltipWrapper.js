import { useState } from "react";

export default function TooltipWrapper({ message }) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="tooltip1"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="tooltip2">?</span>
      {show && <span className="tooltip3">{message}</span>}
    </span>
  );
}
