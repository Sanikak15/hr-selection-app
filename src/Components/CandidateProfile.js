// CandidateProfile.jsx
import React from "react";

const CandidateProfile = ({ candidate }) => {
  return (
    <div>
      <h3>{candidate.name}</h3>
      <p>Email: {candidate.email}</p>
      {/* Additional candidate information */}
    </div>
  );
};

export default CandidateProfile;
