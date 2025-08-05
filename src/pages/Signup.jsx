import { useState } from "react";
import { Link } from 'react-router-dom';
import {} from 'lucide-react';

function Signup(){
  const API = import.meta.env.VITE_API_URL;
 const [step , setStep] = useState(1); //
 const [formData , setFormData ] = useState({
   name: "",
   email: "",
   phone: "",
   notification: "email",
   otp: ""
 }
 );

const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name] : e.target.value
    }));
};

const handleSendOtp = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${API}/api/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notification: formData.notification
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ OTP sent:", data.message);
      setStep(2);
    } else {
      alert("Failed to send OTP: " + data.message);
    }
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    alert("Server error while sending OTP");
  }
};

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${API}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        otp: formData.otp
      })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup successful!");

    } else {
      alert("Invalid OTP");
    }
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    alert("Server error while verifying OTP");
  }
};


return(
<div className = "flex w-screen">

{/* left side */}
<div className = "w-1/4 h-screen bg-[#1f9387df] text-white flex flex-col justify-center items-center gap-6">
<h1 className ="text-4xl font-bold">Log In</h1>    
<p className ="text-center">To keep connecteded with us please <br></br> Log In with your personal info</p>
<Link to ="/login">
<button className ="bg-slate-100 text-gray-600 w-40 h-10 rounded-3xl hover:bg-[#cbeeea] active:shadow-lg">Log In</button>
</Link>
</div>    

{/* right side */}
<div className="w-3/4 flex flex-col justify-center items-center space-y-10">
 <div className="text-[#1f9387df] font-bold text-4xl">Sign Up</div>

 {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 rounded"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 rounded"
          />

          <div>
            <label className="block mb-1 font-medium">Notification Preference</label>
            <select
              name="notification"
              value={formData.notification}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 rounded"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="both">Both</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#239689] text-white px-4 py-2 rounded hover:bg-[#4db9ac] hover:shadow-lg"
          >
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4 flex flex-col justify-center items-center ">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
            className=" px-3 py-2 border rounded w-60"
          />

          <button
            type="submit"
            className="bg-[#42978d] text-white px-4 py-2 rounded hover:bg-[#1f9387b2]"
          >
            Verify & Register
          </button>

          <button
            type="button"
            className="text-blue-600 underline text-sm"
             onClick={handleSendOtp}
            >
             Resend OTP
            </button>
        </form>
      )}
</div>

</div>
    );
}
export default Signup;