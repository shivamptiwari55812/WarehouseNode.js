import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../cssfiles/verify.css";
import "../../cssfiles/OTPSingleInput.css";
const verify = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (otp.length !== 6) {
      alert("Please enter a complete 6-digit OTP code.");
      return;
    }
    const payload = {
      otp,
      email: localStorage.getItem("email"),
    };
    console.log(payload)
    try{
    const response = await fetch("http://localhost:5050/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    
    if (response.ok) {
     
      console.log(result);
      navigate("/Dashboard");
    }
    else{
      alert("Something went wrong")
    }
  }
  catch(err){
    
    console.log("Shivam");
  }
  finally{
    setIsLoading(false)
  }

    
  };

  const handleResendOTP = () => {
    alert("A new OTP has been sent to your Device.");
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-container">
        <div className="otp-header">
          <div className="otp-logo">
            <div className="logo">TG</div>
            <h1 className="company-name">
              <span className="highlight">TOTAL</span> GROUP
            </h1>
          </div>
        </div>

        <div className="otp-content">
          <h2 className="otp-title">Enter Verification Code</h2>
          <p className="otp-subtitle">
            We've sent a 6-digit verification code to your registered phone
            number
          </p>

          <form onSubmit={handleSubmit} className="otp-form">
            <div className="otp-input-container">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="otp-single-input"
              />
            </div>

            <button
              type="submit"
              className="otp-verify-button"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="otp-actions">
              <p className="otp-resend-text">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  className="otp-resend-link"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              </p>

              <button
                type="button"
                className="otp-back-link"
                onClick={() => navigate("/SignUp")}
              >
                ← Back to Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default verify;
