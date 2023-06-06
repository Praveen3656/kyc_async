import React, { useEffect, useState } from "react";
import "./Home.scss";
import kycImage1 from "../../Assets/Images/kyc-img.png";
import kycImage2 from "../../Assets/Images/eKYC.png";

import kycImage3 from "../../Assets/Images/kyc.jpg";
import kycImage4 from "../../Assets/Images/kycbg.png";
import { uniqueId } from "../constants/util";
import { useNavigate } from "react-router-dom";

function Home() {
  const [uid, setUid] = useState("");
  let navigate = useNavigate();
  const openLogin = () => {
    sessionStorage.clear();
    // window.location.pathname = '/login';
    navigate(`/dashboard/uid=${uid}/data=na`);
  };

  useEffect(() => {
    const id = uniqueId();
    setUid(id);
  }, []);

  return (
    <>
      <div className="home-page-ctn">
        <div className="home-page-layer">
          <div className="kyc-img-ctn">
           
          </div>
          <div className="home-page-title">Welcome to E-KyC Verification!</div>
          <div className="start-btn-ctn" onClick={openLogin}>
            Get Started
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
