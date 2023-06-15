import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import InputType from "../InputType/InputType";
import UploadForm from "../UploadForm/UploadForm";
import LiveCheck from "../LiveWebCheck/LiveWebCheck_bkp";
import InputId from "../InputId/InputId";
import { axiosRequest } from "../API/Api";
import { useParams } from "react-router-dom";

import { uniqueId } from "../constants/util";
import axios from "axios";

export default function Dashboard() {
  const [activeStep, setActiveStep] = useState(0);
  const [document, setDocumnet] = useState("");
  const [idtype, setIdType] = useState("");
  const [webImage, setWebImage] = useState("");
  const [idName, setIdName] = useState("");

  const [loading, setLoading] = useState(false);
  const [faceMatch, setFaceMatch] = useState(false);
  const [nameMatch, setNameMatch] = useState(false);
  const [templateMatch, setTemplateMatch] = useState(false);
  const [getstepid, setGetstepid] = useState({});
  const { uid } = useParams();
  const [template, setTemplate] = useState();
  useEffect(() => {
    if (!uid) {
      const id = uniqueId();
    }
  });

  const updateDocument = (value) => {
    setDocumnet(value);
  };
  const updateWebImage = (value) => {
    setWebImage(value);
  };

  const updateName = (value) => {
    setIdName(value);
  };
  const updateType = (value) => {
    setIdType(value);
  };

  const steps = [
    "Select Id",
    "Upload Document",
    "Live Web check",
    "Submit Name",
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <InputType updateType={updateType} />;
      case 1:
        return <UploadForm updateDocument={updateDocument} />;
      case 2:
        return <LiveCheck updateWebImage={updateWebImage} />;
      case 3:
        return <InputId updateName={updateName} />;
      default:
        return;
    }
  }

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("uid", uid);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch("http://18.135.45.221:8000/id_verify/status/", requestOptions)
      .then((response) => response.json())
      .then((result) => setGetstepid(result));
        if(getstepid.id === true){
          setActiveStep(1)
        }
        if(getstepid.selfie === true){
          setActiveStep(2)
        }
  }, [0]);

  const startProcess = async (activeStep) => {
    if (activeStep === 1) {
      setLoading(true);
      let formData = new FormData();
      formData.append("id_image", document);
      formData.append("uid", uid);
      formData.append("type_of_id", idtype);
      const save_id_image = await axios.post(
        "http://18.135.45.221:8000/id_verify/save_id_image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      console.log("ID_RESPONSE", save_id_image.data.status);

      if (save_id_image.data.status === "DONE") {
        setLoading(false);
      }
    }

    if (activeStep === 2) {
      setLoading(true);
      let faceData = new FormData();
      faceData.append("selfie_image", webImage);
      faceData.append("uid", uid);
      faceData.append("type_of_id", idtype);

      console.log("STEP 2" + faceData);
      const save_selfie = await axios.post(
        "http://18.135.45.221:8000/id_verify/save_selfie/",
        faceData,
        {
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      console.log("SELFIE_RESPONSE", save_selfie.data.status);

      if (save_selfie.data.status === "DONE") {
        setLoading(false);
      }
    }

    if (activeStep === 3) {
      setLoading(true);
      let Namedata = new FormData();
      Namedata.append("name", idName);
      Namedata.append("uid", uid);
      console.log("STEP 3" + Namedata);

      const verify_name = await axios.post(
        "http://18.135.45.221:8000/id_verify/verify_name/",
        Namedata,
        {
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        }
      );

      console.log("VERIFY_NAME_RESPOSNE", verify_name.data.verified);

      if (verify_name.data.verified === true) {
        setNameMatch(true);
      } else {
        setNameMatch(false);
      }

      if (verify_name.data.verified === true) {
        setNameMatch(true);
        const verify_image_data = new FormData();
        verify_image_data.append("uid", uid);
        const verify_image = await axios.post(
          "http://18.135.45.221:8000/id_verify/verify_image/",
          verify_image_data,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
            },
          }
        );
        console.log("verify_image", verify_image.data.verified);

        if (verify_image.data.verified === true) {
          setFaceMatch(true);
        } else {
          setFaceMatch(false);
        }

        const verify_template_data = new FormData();
        verify_template_data.append("uid", uid);
        const verify_template = await axios.post(
          "http://18.135.45.221:8000/id_verify/verify_template/",
          verify_image_data,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
            },
          }
        );
        console.log("verify_template", verify_template.data.verified);

        if (verify_template.data.verified === true) {
          setTemplateMatch(true);
          setLoading(false);
        } else {
          setLoading(false);
          setTemplate(false);
        }
      }
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    startProcess(activeStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setLoading(false);
    setDocumnet("");
    setIdType("");
    setWebImage("");
    setIdName("");
    setFaceMatch(false);
    setNameMatch(false);
    setTemplateMatch(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setDocumnet("");
    setIdType("");
    setWebImage("");
    setIdName("");
    setFaceMatch(false);
    setNameMatch(false);
    setTemplateMatch(false);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-ctn">
        <div className="stepper-ctn">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          {loading ? (
            <div className="spinner">
              <CircularProgress />
            </div>
          ) : (
            <>
              {activeStep === steps.length && (
                <div>
                  <div className="ouput-v">
                    Faces match - {faceMatch ? "Yes" : "No"} <br />
                    Names match - {nameMatch ? "Yes" : "No"} <br />
                    Template verified - {templateMatch ? "Yes" : "No"}
                  </div>
                  {faceMatch && nameMatch && templateMatch ? (
                    <>
                      <h1>Congrats!</h1>
                      <div className="p-title">
                        Your profile is successfully verified!
                      </div>
                    </>
                  ) : (
                    <>
                      <h1>Oops!</h1>
                      <div className="p-title">
                        Your profile was not verified!
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}

          <div className="back-next-btn">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="back-btn"
            >
              Back
            </Button>
            <div className="r-n-btn">
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className="next-btn m-r"
                disabled={activeStep === steps.length ? true : false}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleReset}
                className="next-btn"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
