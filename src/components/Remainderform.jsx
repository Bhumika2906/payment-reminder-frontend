import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import {jwtDecode} from "jwt-decode";

function Reminderform() {
    
  const API = import.meta.env.VITE_API_URL;
  const [sidebarOpen , setSidebarOpen ] = useState(true);
  const [formData, setFormData] = useState({
    userId: "",
    paymentName: "",
    description: "",
    amount: "",
    category: "bills",
    deadline: "",
    status: "pending",
  });

  // Extract userId from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setFormData((prev) => ({ ...prev, userId: decoded.userId }));
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
  console.log("Submitting form data:", formData);
  console.log("Token:", token);



    try {
      const res = await fetch (`${API}/api/payments`,{
        method : "POST",
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

       console.log("Response status:", res.status); // Add this
       console.log("Response data:", data); 

      if(res.ok) {
        alert("Remainder added!");
        setFormData({
          userId: formData.userId,
          paymentName: "",
          description: "",
          amount: "",
          category: "bills",
          deadline: "",
          status: "pending",


        });
      } else {
        alert(data.error || "Failed to add reminder");
      }
    } catch(error) {
      console.error("error:", error);
      alert("something went wrong");
    }
  };


  const toggleSidebar =() => {
    setSidebarOpen((prev) => !prev);
};


  return (
    <div className="flex">
     <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar}/>

    {!sidebarOpen && (
    <button onClick={toggleSidebar} className="flex gap-3 text-xl mt-3 text-green-900 underline ">
    <Menu className="w-6 h-8 ml-2 " /> MENU </button>
    )}

    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-[rgb(52,120,119)]">New Payment Reminder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* userId is hidden */}
        <input type="hidden" name="userId" value={formData.userId} />

        <input
          name="paymentName"
          required
          placeholder="Payment Name"
          className="w-full p-2 border-2 rounded"
          value={formData.paymentName}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          className="w-full p-2 border-2 rounded"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="amount"
          type="number"
          required
          placeholder="Amount"
          className="w-full p-2 border-2 rounded"
          value={formData.amount}
          onChange={handleChange}
        />
        <select
          name="category"
          className="w-full p-2 border-2 rounded"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="bills">Bills</option>
          <option value="subscription">Subscription</option>
          <option value="loan">Loan</option>
          <option value="tax">Tax</option>
          <option value="other">Other</option>
        </select>
        <input
          name="deadline"
          type="datetime-local"
          required
          className="w-full p-2 border-2 rounded"
          value={formData.deadline}
          onChange={handleChange}
        />
        <select
          name="status"
          className="w-full p-2 border-2 rounded"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button type="submit" className="w-full bg-[rgb(45,137,134)] text-white p-2 rounded">
          Add Reminder
        </button>
      </form>
    </div>
    </div>
  );
}

export default Reminderform;
