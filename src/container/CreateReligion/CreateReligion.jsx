import { useState } from "react";
import PleaseRead from "./PleaseRead";
import BasicProfile from "./BasicProfile";
import Congratulations from "./Congratulations";
const CreateReligion = () => {
  const [step, setStep] = useState(1);
  const [religionID, setReligionID] = useState("");
  const handleStep = (e) => {
    setStep(e);
  };
  const handleReligionID = (e) => {
    setReligionID(e);
  };
  return (
    <div>
      {step === 1 ? (
        <PleaseRead handleStep={handleStep} />
      ) : step === 2 ? (
        <BasicProfile
          handleStep={handleStep}
          handleReligionID={handleReligionID}
        />
      ) : (
        <Congratulations religionID={religionID} />
      )}
    </div>
  );
};
export default CreateReligion;
