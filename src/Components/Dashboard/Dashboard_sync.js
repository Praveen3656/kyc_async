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
import LiveCheck from "../LiveWebCheck/LiveWebCheck";
import InputId from "../InputId/InputId";
import Uploadselfieid from "../LiveWebCheck/UploadSelfieid";
import { axiosRequest } from "../API/Api";
import { useParams } from "react-router-dom";
import { uniqueId } from "../constants/util";
import axios from "axios";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [formdata, setformData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [document, setDocumnet] = useState("");
  const [idtype, setIdType] = useState("");
  const [country, setCountry] = useState("");
  const [webImage, setWebImage] = useState("");
  const [webImageid, setWebImageid] = useState("");
  const [idName, setIdName] = useState("");
  const [loading, setLoading] = useState(false);
  const [faceMatch, setFaceMatch] = useState(false);
  const [nameMatch, setNameMatch] = useState(false);
  const [templateMatch, setTemplateMatch] = useState(false);
  const [imageverify, setImageverify] = useState(false);
  const [getstepid, setGetstepid] = useState({});
  const { uid } = useParams();
  const [newid, setNewid] = useState();
  const [newtemplate, setNewtemplate] = useState(false);
  const [errorname, setErrorname] = useState(false);
  const [errorimage, setErrorimage] = useState(false);
  const [errortemp, setErrortemp] = useState(false);
  const [iderror, setIderror] = useState(false);
  const [fakeface, setFakeface] = useState(false);
  const [iduploadid, setUploadid] = useState(false);
  const [time, setTime] = useState(false);
  const [endcount, setEndcount] = useState();
  const [timeresult, setTimeresult] = useState(false);
  const [counter, setCounter] = useState(0);
  const [result, setResult] = useState("");

  let navigate = useNavigate();
  const { data } = useParams();
  const getdata = data.split("data=");

  const faceres = getdata[0];

  const [key, setKey] = useState();

  const [value, setValue] = useState();

  const [usersection, setUsersection] = useState(false);

  const [editusersection, setEditusersection] = useState(false);

  const [apitime, setApitime] = useState();
  const [nametemplate, setNametemplate] = useState(false);
  const [userdetails, setUserdetails] = useState(false);
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [error, setError] = useState(false);

  const [errormessage, setErrormessage] = useState();

  const [redirect, setRedirect] = useState(false);
  const [iderrormessage, setIderrormessage] = useState(false);
  const [getuserdetails, setGetuserdetails] = useState({});

  const [processcount, setProcesscount] = useState(0);
  const [arraydata, setArraydata] = useState([]);
  const [processtext, setProcesstext] = useState("uploading image");

  const [score, setScore] = useState(false);

  const [message, setMessage] = useState();

  const [state, setState] = useState();

  const [idselfieerror, setIdselfieerror] = useState(false);

  const [showid, setShowid] = useState(false);

  const [successtemplete, setSuccesstemplete] = useState(false);

  const [countrynew, setCountrynew] = useState();

  const [camcheck, setCamcheck] = useState(2);
  const [token, setToken] = useState("");

  //const URL = "https://api.idverify.click";

  const URL = "https://o-kycapi-dev.onpassive.com";

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
  const updateWebImageid = (value) => {
    console.log(value);
    setWebImageid(value);
  };

  const baseurl = window.location.href;
  const updateName = (value) => {
    setIdName(value);
  };
  const updateType = (value) => {
    setIdType(value);
  };

  const updateCountry = (value) => {
    setCountry(value);
  };

  const updatestate = (value) => {
    setState(value);
  };

  const steps = [
    "Select Id",
    "Upload Document",
    "Live Web check",
    "ID Capture",
    "Submit Name",
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <InputType
            updateType={updateType}
            updateCountry={updateCountry}
            updatestate={updatestate}
          />
        );
      case 1:
        return <UploadForm updateDocument={updateDocument} />;
      case 2:
        return <LiveCheck updateWebImage={updateWebImage} />;
      case 3:
        return <Uploadselfieid updateWebImageid={updateWebImageid} />;
      case 4:
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
    fetch(`${URL}/id_verify/status/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setGetstepid(result));

    if (getstepid.id === true) {
      setActiveStep(2);
    }
    if (getstepid.verified_face === true) {
      setActiveStep(3);
    }
    if (getstepid.verified_name === true && getstepid.verified_face === false) {
      setActiveStep(2);
    }

    if (
      getstepid.id === true &&
      getstepid.selfie === true &&
      getstepid.verified_face === true &&
      getstepid.verified_name === true
    ) {
      setActiveStep(4);
      setNewtemplate(true);
      setSuccesstemplete(true);
      //  console.log(newtemplate);
    }
    setNewid(getstepid.type_of_id);
    setCountrynew(getstepid.country);
  }, [getstepid.id, getstepid.selfie, getstepid.verified]);

  //console.log(getstepid);

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 1000);
    if (counter === 0) {
      setCounter(0);
    }
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    localStorage.setItem("count", counter);
  }, [counter]);

  const items = JSON.parse(localStorage.getItem("count"));

  const getformdetails = (e) => {
    setformData({ ...formdata, [e.target.name]: [e.target.value] });
    setKey(e.target.name);
    setValue(e.target.value);

    getuserdetails[key] = e.target.value;

    console.log("value", e.target.value);
  };

  const uploadid = async (activeStep) => {
    setRedirect(true);
    setIderrormessage(false);
    setCounter(0);
    setErrorimage(false);
    setMessage("");
  

    try {
      const getcountry = localStorage.getItem("country");
      console.log("ID_API_REQUEST");
      let formData = new FormData();
      formData.append("id_image", document);
      formData.append("uid", uid);
      formData.append("type_of_id", idtype);
      formData.append("country", country);

      console.log("country---", country, "--- tdype", idtype, uid);

      if (idtype === "drivers_license") {
        if (state === undefined) {
          formData.append("sub_type", "");
        } else {
          formData.append("sub_type", state);
        }
      }

      if (idtype === "" || idtype === undefined) {
        formData.append("type_of_id", newid);
      }

      const save_id_image = await axios.post(
        `${URL}/id_verify/save_id_image/`,
        formData,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data;",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ID_RESPONSE", save_id_image);

      if (save_id_image.data.status === "DONE") {
        setRedirect(false);
        setScore(true);
        setMessage("Template Score " + save_id_image.data.score);
        setActiveStep(2);
        setLoading(false);
        setIderrormessage(false);
      } else {
        setLoading(false);
        setRedirect(false);
        setUploadid(true);
        setActiveStep(1);
        setCamcheck(0);
        setMessage();
      }
    } catch (err) {
      setLoading(false);
      setRedirect(false);
      setActiveStep(1);
      setCamcheck(0);
      console.log("ERROR", err.message);
      setIderrormessage(true);
      setMessage(err.message);
      setMessage(err.response.data);
      setRedirect(false);
      setLoading(false);
      setRedirect(false);
      setIderrormessage(true);
    }
  };

  const Uploadselfie = async (activeStep) => {
    setIderrormessage(false);
    setTimeresult(false);
    setNameMatch(false);
    setTimeresult(false);
    setIderrormessage(false);
    setMessage();
    setErrorimage(false);
    localStorage.removeItem("setseconds");
    setCounter(0);
    setProcesscount(0);

    setFakeface(false);
    setRedirect(true);
    setIdselfieerror(false);

    console.log("SELFIE_API_REQUEST");

    let faceData = new FormData();
    faceData.append("selfie_image", webImage);
    faceData.append("uid", uid);
    //faceData.append("type_of_id", idtype);

    if (idtype === "" || idtype === undefined) {
      faceData.append("type_of_id", newid);
    }

    try {
      const save_selfie = await axios.post(
        `${URL}/id_verify/save_selfie/`,
        faceData,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      console.log("SELFIE_RESPONSE", save_selfie.data);

      if (save_selfie.data.status === "DONE") {
        setRedirect(false);
        setFaceMatch(true);
        setActiveStep(3);
        setCounter(0);
        localStorage.removeItem("setseconds");
        setCounter(0);
        setProcesscount(0);
      } else {
        console.log("SELFIE_RESPONSE FAILED");
        setRedirect(false);
        setFaceMatch(false);
        setFakeface(true);
        setActiveStep(2);
        localStorage.removeItem("setseconds");
        setCounter(0);
        setProcesscount(0);
      }
    } catch (err) {
      console.log("SELFIE_RESPONSE FAILED");
      setRedirect(false);
      setFaceMatch(false);
      setFakeface(true);
      setActiveStep(2);
      localStorage.removeItem("setseconds");
      setCounter(0);
      setProcesscount(0);
      setMessage(err.response.data);
    }
  };

  const uploadselfiid = async (activeStep) => {
    setScore(false);
    setMessage("");
    setErrorimage(false);
    setIderrormessage(false);
    setTimeresult(false);
    setNameMatch(false);
    localStorage.removeItem("setseconds");
    setCounter(0);
    setProcesscount(0);
    setCounter(0);
    setErrorimage(false);
    setIdselfieerror(false);
    setRedirect(true);

    let faceData = new FormData();
    const idcountry = localStorage.setItem("idcountry", country);
    const id_type = localStorage.setItem("id_type", idtype);

    faceData.append("id_image", webImageid);
    faceData.append("uid", uid);
    faceData.append("type_of_id", idtype);
    faceData.append("country", country);

    if (idtype === "" || idtype === undefined) {
      faceData.append("type_of_id", newid);
    }
    if ((country === "") | (country === undefined)) {
      faceData.append("country", countrynew);
    }
    console.log(
      "request check",
      faceData,
      webImageid,
      uid,
      idtype,
      country,
      newid
    );

    if (idtype === "drivers_license") {
      if (state === undefined) {
        faceData.append("sub_type", "");
      } else {
        faceData.append("sub_type", state);
      }
    }

    let newdata = new FormData();
    newdata.append("uid", uid);
    const getuser = await axios.post(`${URL}/id_verify/key_values`, newdata, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    });

    console.log("GET_USER_DATA", getuser.data.fields);
    setGetuserdetails(getuser.data.fields);

    try {
      const save_selfie_id = await axios.post(
        `${URL}/id_verify/save_id_selfie/`,
        faceData,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        }
      );

      console.log("ID_SELFIE_RESPONSE", save_selfie_id);
      if (save_selfie_id.data.status === "SUCCESS") {
        setRedirect(false);
        setFaceMatch(true);
        setActiveStep(4);
        setEditusersection(true);
        setCounter(0);
        localStorage.removeItem("setseconds");
        setCounter(0);
        setProcesscount(0);
      } else {
        setRedirect(false);
        setFaceMatch(true);
        setActiveStep(3);
        setEditusersection(false);
        setCounter(0);
        localStorage.removeItem("setseconds");
        setCounter(0);
        setProcesscount(0);
        setIdselfieerror(true);
      }
    } catch (err) {
      console.log(err);
      setRedirect(false);
      setFaceMatch(true);
      setActiveStep(3);
      setEditusersection(false);
      setCounter(0);
      localStorage.removeItem("setseconds");
      setCounter(0);
      setProcesscount(0);
      setIdselfieerror(true);
      setMessage(err.response.data);
    }
  };

  const finalsteps = async (activeStep) => {
    setScore(false);
    setMessage("");
    setIderrormessage(false);
    setTimeresult(false);
    setNameMatch(false);
    localStorage.removeItem("setseconds");

    setCounter(0);
    setProcesscount(0);

    setCounter(0);
    setErrorimage(false);
    setLoading(true);
    setTimeresult(false);
    setIdselfieerror(false);
    console.log("VERIFY_IMAGE__API_REQUEST");
    const verify_image_data = new FormData();
    verify_image_data.append("uid", uid);

    try {
      const verify_image = await axios.post(
        `${URL}/id_verify/verify_image/`,
        verify_image_data,
        {
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      console.log("verify_image", verify_image.data.verified);

      if (verify_image.data.verified === true) {
        verfiyname();
        setLoading(false);
        setScore(true);
        setMessage();
        setMessage("Selfi Score" + " " + Math.round(verify_image.data.score));
      } else {
        setLoading(false);
        setErrorimage(true);
        setActiveStep(2);
        setCounter(0);
        setEditusersection(false);
      }
    } catch (err) {
      setLoading(false);
      setErrorimage(true);
      setActiveStep(2);
      setCounter(0);
      setCounter(0);
      setEditusersection(false);
    }
  };

  const reload = () => {
    window.location.reload();
  };

  const verfiyname = async (activeStep) => {
    setErrorname(false);
    setLoading(true);
    setScore(false);
    setMessage();
    console.log("NAME_API_REQUEST");

    const sendrequest = {
      uid: uid,
      fields: getuserdetails,
    };
    console.log("sendEditrequest", sendrequest);

    try {
      const verify_name = await axios.post(
        `${URL}/id_verify/verify_fields/`,
        sendrequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "VERIFY_NAME_RESPOSNE",
        verify_name,
        "-----",
        verify_name.data
      );

      if (verify_name.data.first_name === true) {
        setLoading(false);
        setNameMatch(true);
        setImageverify(true);
        setFaceMatch(true);
        setImageverify(true);
        setEditusersection(false);
        setTimeresult(true);
        setScore(false);
        setMessage();
        setActiveStep(4);
        setResult(JSON.parse(localStorage.getItem("count")));
        setSuccesstemplete(true);
        setTimeout(reload, 1000);
      } else {
        setCounter(0);
        setLoading(false);
        setActiveStep(4);
        setErrorname(true);
        setEditusersection(true);
        setTime(false);
        setResult(JSON.parse(localStorage.getItem("count")));
        setTimeresult(true);
      }
    } catch (err) {
      setLoading(false);
      setActiveStep(3);
      setErrorname(true);
      setEditusersection(true);
      setTime(false);
      setCounter(0);
      setResult(JSON.parse(localStorage.getItem("count")));
    }
  };

  const handleNext = () => {
    setError(false);
    localStorage.removeItem("countaction");
    if (activeStep === 0) {
      if (country === "" || country === undefined || country === null) {
        setError(true);
        setErrormessage("");
        setErrormessage("Please select Country");
        return;
      }

      if (idtype === "" || idtype === undefined || idtype === null) {
        setError(true);
        setErrormessage("");
        setErrormessage("Please select ID Type");
        return;
      }
    }

    if (activeStep === 1) {
      if (document === "" || document === undefined || document === null) {
        setError(true);
        setErrormessage("");
        setErrormessage("Please Upload ID");
        return;
      }
    }

    if (activeStep === 2) {
      if (webImage === "" || webImage === undefined || webImage === null) {
        setError(true);
        setErrormessage("");
        setErrormessage("Please take a selfie");
        return;
      }
    }

    // console.log('activeStep', activeStep, steps.length)
    if (activeStep === 1) {
      uploadid(activeStep);
    }
    if (activeStep === 2) {
      Uploadselfie(activeStep);
    }
    if (activeStep === 3) {
      uploadselfiid(activeStep);
    }
    if (activeStep === 4) {
      finalsteps(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setActiveStep(0);
    setDocumnet("");
    setIdType("");
    setWebImage("");
    setIdName("");
    setFaceMatch(false);
    setNameMatch(false);
    setTemplateMatch(false);
    setTimeresult(false);
    setNewtemplate(false);
    setTime(false);
    setIderror(false);
    setUploadid(false);
    setErrorname(false);
    setErrortemp(false);
    setErrorimage(false);
    setFakeface(false);
    setIderrormessage(false);
    setEditusersection(false);
    setIdselfieerror(false);
    setSuccesstemplete(false);
    localStorage.removeItem("countaction");
  };

  const handleReset = () => {
    localStorage.removeItem("countaction");
    setSuccesstemplete(false);
    setActiveStep(0);
    setDocumnet("");
    setIdType("");
    setWebImage("");
    setIdName("");
    setFaceMatch(false);
    setNameMatch(false);
    setTemplateMatch(false);
    setTimeresult(false);
    setNewtemplate(false);
    setTime(false);
    setIderror(false);
    setUploadid(false);
    setErrorname(false);
    setErrortemp(false);
    setErrorimage(false);
    setFakeface(false);
    setEditusersection(false);
    setError(false);
    setErrormessage("");
    setScore(false);
    setMessage();
    setError(false);
    setErrormessage("");
    setIderrormessage(false);
    setIdselfieerror(false);
  };
  var setsec;
  const timer = () => {
    setProcesscount(processcount + 1);
    setsec = localStorage.setItem("setseconds", processcount);
  };
  setTimeout(timer, 4000);
  const getsec = localStorage.getItem("setseconds");
  return (
    <>
      <Navbar />
      <div className="dashboard-ctn">
        <div className="stepper-ctn">
          <p className="workflow">Work Flow</p>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <p>
            {newtemplate ? (
              <div className="successsecreen">
                <div className="ouput-v">
                  Faces match - Yes
                  <br />
                  Names match - Yes
                  <br />
                  Image verified -Yes
                </div>
                <h1>Congrats!</h1>
                <div className="p-title">
                  Your profile is successfully verified!
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </p>

          {redirect ? (
            <div className="spinner_two">
              <span>
                <b>
                  {processcount == 0 ? "Uploading image" : ""}
                  {processcount == 1 ? "Verifying template" : ""}
                  {processcount == 2 ? "Detecting fake image" : ""}
                  {processcount == 3 ? "Enhancing photo" : ""}
                  {processcount == 4 ? "Enhancing template" : ""}
                  {processcount >= 5 ? setProcesscount(0) : ""}
                </b>
              </span>
              <br />
              <CircularProgress />
            </div>
          ) : (
            ""
          )}

          <div className="errormessages">
            {score ? (
              <p className="">
                <b>{message}</b>
              </p>
            ) : (
              ""
            )}

            {iduploadid ? (
              <p className="error">
                <b>ID verification failed</b>
              </p>
            ) : (
              ""
            )}

            {iderror ? (
              <p className="success">
                <b>Your ID verification failed</b>
              </p>
            ) : (
              ""
            )}

            {idselfieerror ? (
              <p className="error">
                <b>{message}</b>
              </p>
            ) : (
              ""
            )}

            {iderrormessage ? (
              <p className="error">
                <b>{message}</b>
              </p>
            ) : (
              ""
            )}

            {errorname ? (
              <p className="error">
                <b>Name Verification Failed</b>
              </p>
            ) : (
              ""
            )}

            {fakeface ? (
              <p className="error">
                <b>Please Take a Selfie With Better Light Condition</b>
                {message}
              </p>
            ) : (
              ""
            )}

            {error ? (
              <p className="error">
                <b>{errormessage}</b>
              </p>
            ) : (
              ""
            )}

            {errorimage ? (
              <p className="error">
                <b>
                  Image Verification Failed <br />
                </b>
              </p>
            ) : (
              ""
            )}

            {errortemp ? (
              <p className="error">
                <b>Template verification failed</b>
              </p>
            ) : (
              ""
            )}
          </div>
          {editusersection ? (
            <div className="usersection">
              {Object.entries(getuserdetails).map((k, v) => {
                return (
                  <div className="userdetails">
                    <div className="box" id={k[0]}>
                      {k[0]}
                    </div>
                    <div className="box" id={k[0]}>
                      <span>
                        <input
                          type="text"
                          placeholder={k[1]}
                          className="editinput"
                          name={k[0]}
                          onChange={getformdetails}
                          autocomplete="off"
                        ></input>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}

          {getStepContent(activeStep)}

          {loading ? (
            <div className="spinner">
              <span>
                <b>Please wait...</b>
              </span>
              <br />
              <CircularProgress />
            </div>
          ) : (
            <>
              {successtemplete ? (
                <div>
                  {faceMatch && nameMatch && imageverify ? (
                    <>
                      <div className="ouput-v">
                        Faces match - {faceMatch ? "Yes" : "No"} <br />
                        Names match - {nameMatch ? "Yes" : "No"} <br />
                        Image verified - {imageverify ? "Yes" : "No"}
                      </div>
                      <h1>Congrats!</h1>
                      <div className="p-title">
                        Your profile is successfully verified!
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>Result loading please Wait..</h4>
                    </>
                  )}
                </div>
              ) : (
                ""
              )}
            </>
          )}

          <div className="back-next-btn stepstyle">
            {/* <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="back-btn"
            >
              Back
            </Button> */}
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
        <center></center>
      </div>
    </>
  );
}
