import { useState } from "react";
import PleaseRead from "./PleaseRead";
import BasicProfile from "./BasicProfile";
import Congratulations from "./Congratulations";
const CreateTest = () => {
  const [step, setStep] = useState(1);
  const [TestID, setTestID] = useState("");
  const handleStep = (e) => {
    setStep(e);
  };
  const handleTestID = (e) => {
    setTestID(e);
  };
  return (
    <div>
      {step === 1 ? (
        <PleaseRead handleStep={handleStep} />
      ) : step === 2 ? (
        <BasicProfile
          handleStep={handleStep}
          handleTestID={handleTestID}
        />
      ) : (
        <Congratulations TestID={TestID} />
      )}
    </div>
  );
};
export default CreateTest;
