import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


function login(){

const [email , setEmail] = useState("");
const [otpSent , setOtpSent] = useState(false);
const [otp , setOtp] = useState("");
const navigate = useNavigate(); 

const handleSendOtp = async (e) => {
   e.preventDefault();
   try {
    const res = await fetch("http://localhost:5000/api/auth/send-otp" ,{
       method :"POST" ,
       headers: { "Content-Type": "application/json" },
       body :JSON.stringify({email}) , 
    });

    const data = await res.json();
    if(res.ok) {
        alert("OTP sent to your email");
        setOtpSent(true);
    } else {
        alert(data.message || "Failed to send OTP");
    }
    } catch(error) {
       alert("Failed to send otp");
    }
};
   


const handleVerifyOtp = async(e) => {
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:5000/api/auth/verify-otp",{
            method :"POST" ,
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email , otp}),
        });

        const data = await res.json();
        if(res.ok) {
            localStorage.setItem("token",data.token);
            alert("login successful!");
            //redirect to dashboard
            navigate("/dashboard");
            //window.location.href = "/dashboard";

        } else {
            alert(data.message || "Invalid OTP");
        }

    } catch (error) {
        alert("Login failed");
    }

};



return(
<div className = "flex w-screen">

{/* left side */}
<div className = "w-1/4 h-screen bg-[#1f9387df] text-white flex flex-col justify-center items-center gap-6">
<h1 className ="text-4xl font-bold">Sign up</h1>    
<p className ="text-center">Enter with your personal details<br></br>and start your journey with us</p>
<Link to ="/signup">
<button className ="bg-slate-100 text-gray-600 w-40 h-10 rounded-3xl hover:bg-[#cbeeea] active:shadow-lg">Sign Up</button>
</Link>
</div>    

{/* right side */}
<div className="w-3/4 flex flex-col justify-center items-center space-y-10">
<div className="text-[#1f9387df] font-bold text-4xl">Login In</div>


<form onSubmit={otpSent ? handleVerifyOtp: handleSendOtp} className="space-y-4 flex flex-col justify-center items-center">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-80 px-3 py-2 border-2 rounded"
        />

        {otpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        )}
      <button
            type="submit"
            className="bg-[#1e9c8e] text-white px-6 py-2 rounded hover:bg-[#1f9387b8]"
          >
            {otpSent ? "Verify & Login" : "Send OTP"}
          </button>
     
        </form>


</div>
</div>
    );
}
export default login;