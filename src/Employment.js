import React, { memo, useEffect, useRef } from "react";

const EmploymentDetails = memo(function (props) {
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <h3>Emp Details ( Render Count - {renderCount.current})</h3>
      <p>Company: {props.employmentDetails.company}</p>
      <p>Role: {props.employmentDetails.role}</p>
    </div>
  );
});

export default EmploymentDetails;
