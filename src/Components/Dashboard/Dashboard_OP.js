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

  const [geturldata, setGeturldata] = useState({});

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
  const [statusshow, setStatusshow] = useState(false);

  const [errormessage, setErrormessage] = useState();

  const [redirect, setRedirect] = useState(false);
  const [iderrormessage, setIderrormessage] = useState(false);
  const [getuserdetails, setGetuserdetails] = useState({});

  const [awssaveimgres, setAwssaveimgres] = useState();

  const [processcount, setProcesscount] = useState(0);
  const [arraydata, setArraydata] = useState([]);
  const [processtext, setProcesstext] = useState("uploading image");

  const [score, setScore] = useState(false);

  const [message, setMessage] = useState();

  const [state, setState] = useState();

  const [showretrybnt, setShowretrybnt] = useState(true);
  const [idselfieerror, setIdselfieerror] = useState(false);

  const [showid, setShowid] = useState(false);

  const [successtemplete, setSuccesstemplete] = useState(false);

  const [countrynew, setCountrynew] = useState();

  const [camcheck, setCamcheck] = useState(2);

  const [finalcheck, setFinalcheck] = useState(false);

  const [taskstatus, setTaskstatus] = useState();
  const [statusmessage, setStatusmessage] = useState();

  const [showstatus, setShowstatus] = useState(false);

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

  const gettaskid = sessionStorage.getItem("taskid");

  // console.log("gettaskid", gettaskid);
  let token = "";
  useEffect(() => {
    const fetchToken = async () => {
      console.log("gettoken");
      let tokendata = new FormData();
      tokendata.append("username", "admin");
      tokendata.append("password", "sw0rdpass");

      try {
        const tokenapi = await axios.post(`${URL}/token`, tokendata, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        console.log("GETTOKEN", tokenapi.data.access_token);
        localStorage.setItem("settoken", tokenapi.data.access_token);
      } catch (err) {}
    };
    fetchToken();
  }, [0]);

  useEffect(() => {
    token = localStorage.getItem("settoken");
    fetch(`${URL}/id_verify/check_progress/${gettaskid}`, {
      method: "post",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setTaskstatus(json.status));
  }, []);

  // console.log("taskstatus", taskstatus);
  token = localStorage.getItem("settoken");
  useEffect(() => {
    var formdata = new URLSearchParams();
    formdata.append("uid", uid);

    const myHeaders = {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    };

    // console.log("status", myHeaders);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: myHeaders,
    };
    fetch(`${URL}/id_verify/status`, requestOptions)
      .then((response) => response.json())
      .then((result) => setGetstepid(result));

    console.log(getstepid);

    if (gettaskid === null) {
      // console.log("taskstatus---------------",taskstatus);
    }

    if (taskstatus === "PENDING" && gettaskid != null) {
      setActiveStep(4);
      setFinalcheck(true);
      // setIderror(true);
      // setMessage("Your Verification is under Process..");
    } else {
      if (getstepid._id === true) {
        setActiveStep(2);
      }
      if (getstepid.verified_face === true) {
        setActiveStep(3);
      }

      if (
        getstepid.verified_name === true &&
        getstepid.verified_face === false
      ) {
        setActiveStep(2);
      }

      if (
        getstepid._id === true &&
        getstepid.selfie === true &&
        getstepid.verified_face === true &&
        getstepid.verified_id_selfie === true
      ) {
        setActiveStep(4);
        setNewtemplate(true);
        setSuccesstemplete(true);

        //  console.log(newtemplate);
      }
      setNewid(getstepid.type_of_id);
      setCountrynew(getstepid.country);
    }
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
    getuserdetails[key] = value;
    console.log("value", e.target.value);
  };

  const uploadid = async (activeStep) => {
    setIderrormessage(false);
    setRedirect(true);
    setCounter(0);
    setErrorimage(false);
    setMessage("");
    let tokendata = new FormData();
    tokendata.append("username", "admin");
    tokendata.append("password", "sw0rdpass");

    try {
      const tokenapi = await axios.post(`${URL}/token`, tokendata, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("token", tokenapi.data.access_token);
      localStorage.setItem("settoken", tokenapi.data.access_token);
    } catch (err) {}

    token = localStorage.getItem("settoken");

    try {
      var urlencoded = new URLSearchParams();
      urlencoded.append("uid", uid);
      urlencoded.append("type", "original_id");

      const myHeaders = {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      };

      var requestOptions = {
        method: "POST",
        body: urlencoded,
        redirect: "follow",
        headers: myHeaders,
      };

      console.log("requestOptions", requestOptions);

      fetch(
        `${URL}/id_verify/get_url?uid=${uid}&type=original_id`,
        requestOptions
      )
        .then((response) => response.json())

        .then((result) => {
          console.log("get_url", result);
          setGeturldata(result);
          var formdata = new FormData();
          formdata.append("key", result.fields["key"]);
          formdata.append("x-amz-algorithm", result.fields["x-amz-algorithm"]);
          formdata.append(
            "x-amz-credential",
            result.fields["x-amz-credential"]
          );
          formdata.append("x-amz-date", result.fields["x-amz-date"]);
          formdata.append("policy", result.fields["policy"]);
          formdata.append("x-amz-signature", result.fields["x-amz-signature"]);
          formdata.append("file", document);
          console.log(document);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };

          /// console.log("GETURL", requestOptions);

          fetch(result.url, requestOptions)
            .then((response) => {
              console.log("aws url", response);
              if (response.status === 204) {
                checkuploadsaveid();
              } else {
                setLoading(false);
                setRedirect(false);
                setUploadid(true);
                setActiveStep(1);
                setCamcheck(0);
                setCamcheck(0);
                setIderrormessage(true);
                setMessage("Please try again");
              }
            })

            .catch((error) => {
              setLoading(false);
              setRedirect(false);
              setUploadid(true);
              setActiveStep(1);
              setCamcheck(0);
              setLoading(false);
              setRedirect(false);
              setActiveStep(1);
              setCamcheck(0);
              setIderrormessage(true);
              setMessage("Please try again");
            });
        });
    } catch (err) {
      console.log("Err", err);
      setActiveStep(1);
      setCamcheck(0);
      console.log("ERROR", err);

      setMessage("Template Mismatch");

      if (err.response.status === 503 || err.response.status === 504) {
        setMessage("Please upload a non-rotated aadhar card");
      }
      if (err.response.status === 502) {
        setMessage("Template Mismatch");
      }
      setRedirect(false);
      setLoading(false);
      setRedirect(false);

      setIderrormessage(true);
    }
  };

  const checkuploadsaveid = async () => {
    console.log("checkuploadsaveid");
    let faceData = new URLSearchParams();

    const idcountry = localStorage.setItem("idcountry", country);
    const id_type = localStorage.setItem("id_type", idtype);

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
    token = localStorage.getItem("settoken");

    const myHeaders = {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    };

    console.log("checkuploadsaveid", myHeaders);
    try {
      const save_selfie_id = await axios.post(
        `${URL}/id_verify/save_id_image`,
        faceData,
        {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        }
      );

      console.log("ID_SELFIE_RESPONSE", save_selfie_id);

      if (save_selfie_id.status === 200) {
        console.log("UPLOAD_ID", save_selfie_id.status);
        setRedirect(false);
        setScore(true);
        setActiveStep(2);
        setLoading(false);
        setIderrormessage(false);
      } else {
        setLoading(false);
        setRedirect(false);
        setUploadid(true);
        setActiveStep(1);
        setCamcheck(0);
        setCamcheck(0);
        setIderrormessage(true);
        setMessage();
      }
    } catch (err) {
      console.log("errr", err);
      setLoading(false);
      setRedirect(false);
      setUploadid(true);
      setActiveStep(1);
      setCamcheck(0);
      setCamcheck(0);
      setIderrormessage(true);
      setMessage("Please try again");
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
    token = localStorage.getItem("settoken");
    try {
      var geturlformdata = new URLSearchParams();
      geturlformdata.append("uid", uid);
      geturlformdata.append("type", "selfie");

      const myHeaders = {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      };
      var requestOptions = {
        method: "POST",
        body: geturlformdata,
        redirect: "follow",
        headers: myHeaders,
      };

      fetch(`${URL}/id_verify/get_url?uid=${uid}&type=selfie`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setGeturldata(result);
          var formdata = new FormData();
          formdata.append("key", result.fields["key"]);
          formdata.append("x-amz-algorithm", result.fields["x-amz-algorithm"]);
          formdata.append(
            "x-amz-credential",
            result.fields["x-amz-credential"]
          );
          formdata.append("x-amz-date", result.fields["x-amz-date"]);
          formdata.append("policy", result.fields["policy"]);
          formdata.append("x-amz-signature", result.fields["x-amz-signature"]);
          formdata.append("file", webImage);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };

          fetch(result.url, requestOptions)
            .then((response) => {
              if (response.status === 204) {
                console.log("SELFIE_RESPONSE", response.status);
                setRedirect(false);
                setFaceMatch(true);
                setActiveStep(3);
                setCounter(0);
                setCounter(0);
                setProcesscount(0);
              } else {
                console.log("SELFIE_RESPONSE FAILED");
                setRedirect(false);
                setFaceMatch(false);
                setFakeface(true);
                setActiveStep(2);
                setCounter(0);
                setProcesscount(0);
              }
            })

            .catch((error) => {
              console.log("SELFIE_RESPONSE FAILED");
              setRedirect(false);
              setFaceMatch(false);
              setFakeface(true);
              setActiveStep(2);
              setCounter(0);
              setProcesscount(0);
              setIderrormessage(true);
              setMessage("Please try again");
            });
        });

      console.log(geturldata.url);
    } catch (error) {}
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
    token = localStorage.getItem("settoken");
    try {
      var geturlformdata = new URLSearchParams();
      geturlformdata.append("uid", uid);
      geturlformdata.append("type", "id_selfie");

      const myHeaders = {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      };

      var requestOptions = {
        method: "POST",
        body: geturlformdata,
        redirect: "follow",
        headers: myHeaders,
      };

      fetch(
        `${URL}/id_verify/get_url?uid=${uid}&type=id_selfie`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setGeturldata(result);
          var formdata = new FormData();
          formdata.append("key", result.fields["key"]);
          formdata.append("x-amz-algorithm", result.fields["x-amz-algorithm"]);
          formdata.append(
            "x-amz-credential",
            result.fields["x-amz-credential"]
          );
          formdata.append("x-amz-date", result.fields["x-amz-date"]);
          formdata.append("policy", result.fields["policy"]);
          formdata.append("x-amz-signature", result.fields["x-amz-signature"]);
          formdata.append("file", webImageid);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };

          fetch(result.url, requestOptions)
            .then((response) => {
              if (response.status === 204) {
                console.log("saveidimage", response.status);
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
                setProcesscount(0);
                setIdselfieerror(true);

                setCounter(0);
              }
            })

            .catch((error) => {
              setRedirect(false);
              setFaceMatch(true);
              setActiveStep(3);
              setEditusersection(false);
              setCounter(0);
              setProcesscount(0);
              setIdselfieerror(true);

              setCounter(0);
              setIderrormessage(true);
              setMessage("please try again");
            });
        });

      console.log(geturldata.url);
    } catch (error) {}
  };

  const finalsteps = async (activeStep) => {
    setScore(false);
    setMessage("");
    setIderrormessage(false);
    setTimeresult(false);
    setNameMatch(false);
    setCounter(0);
    setProcesscount(0);
    setCounter(0);
    setErrorimage(false);
    setLoading(true);
    setTimeresult(false);
    setIdselfieerror(false);

    const verify_name = new URLSearchParams();

    verify_name.append("uid", uid);
    verify_name.append("name", formdata.username[0]);
    token = localStorage.getItem("settoken");

    try {
      const verify_api = await axios.post(
        `${URL}/id_verify/verify`,
        verify_name,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("verify_api", verify_api);

      if (verify_api.status === 200) {
        console.log("verify_api", verify_api.status);
        setLoading(false);
        setEditusersection(false);
        setScore(false);
        setActiveStep(4);
        setIderror(true);
        sessionStorage.clear();
        sessionStorage.setItem("taskid", verify_api.data.id);
        setFinalcheck(true);
        setShowstatus(true);
        // setMessage("Your Verification is under Process..");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reload = () => {
    token = localStorage.getItem("settoken");
    fetch(`${URL}/id_verify/check_progress/${gettaskid}`, {
      method: "post",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setTaskstatus(json.status));
    if (taskstatus === "PENDING" && gettaskid != null) {
    }
    if (taskstatus === "SUCCESS") {
      window.location.reload();
    }
  };

  const handleNext = () => {
    setError(false);

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
  };

  const handleReset = () => {
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
              ""
            )}
          </p>

          {finalcheck ? (
            <>
              <p className="success">
                <b>Your Verification is under Process...</b>
              </p>
              <center>
                <CircularProgress />
              </center>
            
              <small>
                <span>
                  <b>Status: </b> {taskstatus}..
                </span>
              </small>
              <br/>
              <button className="reloadbnt" onClick={reload}>
                Reload
              </button>
            </>
          ) : (
            ""
          )}

          {/* {taskstatus === "PENDING"  && taskstatus!= null && taskstatus != undefined  ? (
            <>
              <p className="success">
                <b>Your Verification is under Process...</b>
              </p>
              {
                <small>
                  <span>
                    <b>Status: </b> {taskstatus}..
                  </span>
                </small>
              }
              <br /> <br />
              <center>
                <CircularProgress />
              </center>
            </>
          ) : (
            ""
          )} */}

          {/* {taskstatus === "SUCEESS" ? (
            <>
              <p className="error">
                <br />
                <b>{statusmessage}</b>
                <br />
              </p>

              {showretrybnt ? (
                <>
                  <br />
                  <button className="reloadbnt" onClick={reload}>
                    Retry
                  </button>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )} */}

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

            {iduploadid ? <p className="error"></p> : ""}

            {iderror ? (
              <p className="success">
                <b>{message}</b>
              </p>
            ) : (
              ""
            )}

            {idselfieerror ? (
              <p className="error">
                <b>Type of ID couldnt be verified</b>
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
              <div className="username">
                <p>Enter your name as per upload ID</p>
                <input
                  type="text"
                  className="usernameenter"
                  name="username"
                  placeholder="Enter name here.."
                  onChange={getformdetails}
                  autoComplete="off"
                ></input>
              </div>
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