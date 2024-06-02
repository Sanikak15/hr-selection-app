// CollaborationPanel.jsx
import React from "react";

const CollaborationPanel = ({ candidate, assignReviewer, shareProfile }) => {
  return (
    <div>
      <h3>Collaboration Panel</h3>
      <button onClick={assignReviewer}>Assign Reviewer</button>
      <button onClick={shareProfile}>Share Profile</button>
    </div>
  );
};

export default CollaborationPanel;
