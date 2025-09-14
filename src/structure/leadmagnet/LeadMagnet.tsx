"use client";
import React, { useState } from "react";
import GetNow from "../getnow/GetNow";

interface SampleBiodataDetails {
  modelNumber: string;
  language: string;
  type: string;
  amount: number;
}

const LeadMagnet: React.FC = () => {
  const [showGetNow, setShowGetNow] = useState<boolean>(true);
  const [showLeadMagnet, setShowLeadMagnet] = useState<boolean>(true);

  const sampleBiodataDetails: SampleBiodataDetails = {
    modelNumber: "0000",
    language: "English",
    type: "Guest",
    amount: 0,
  };

  return (
    <>
      {showLeadMagnet && (
        <GetNow
          heading="Get 8 Free Resume Sample and Resume Tips"
          paragraph="Fill the details to get on your Whatsapp"
          buttonTitle="Submit"
          isOpen={showGetNow}
          onClose={() => {
            setShowGetNow(false);
            setShowLeadMagnet(false);
          }}
          modelDetails={sampleBiodataDetails}
          isLeadMagnet={true}
        />
      )}
    </>
  );
};

export default LeadMagnet;