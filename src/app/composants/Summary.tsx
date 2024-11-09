import React from "react";

function Summary({ totalPrix }) {
  return (
    <div className="mt-4 p-4 bg-blue-100 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold">Prix Total: {totalPrix} $</h4>
    </div>
  );
}

export default Summary;
