import React from "react";
import {useState} from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { Clock , Menu , Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";
import { jwtDecode } from "jwt-decode";

function BillList({showSidebar = true }){
const [sidebarOpen , setSidebarOpen ] = useState(true);
const [payments , setPayments ] = useState([]);
const [deletingId, setDeletingId] = useState(null);

  const handleDeletePayment = async (paymentId) => {
  if (!window.confirm("Are you sure you want to delete this payment? This action cannot be undone.")) {
    return;
  }

  setDeletingId(paymentId);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/payments/${paymentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete payment');
    }

    // Remove from local state
    setPayments(payments.filter(payment => payment._id !== paymentId));
    
  } catch (error) {
    console.error('Delete failed:', error);
    alert("Failed to delete payment. Please try again.");
  } finally {
    setDeletingId(null);
  }
};

useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) return;

      try {
        const res = await fetch(`http://localhost:5000/api/payments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setPayments(data);
        } else {
          alert(data.error || "Failed to fetch bills");
        }
      } catch (err) {
        console.error("Error fetching bills:", err);
      }
    };

    fetchPayments();
  }, []);


 const toggleSidebar =() => {
    setSidebarOpen((prev) => !prev);
};

  const getStatusBadge = (deadline, status) => {
    const now = new Date();
    const due = new Date(deadline);
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (status === "paid") return <span className="text-green-600">Paid</span>;
    if (diff < 0) return <span className="text-red-500">Overdue</span>;
    if (diff === 0) return <span className="text-pink-500">Due Today</span>;
    return <span className="text-blue-500">Due in {diff} days</span>;
  };

  
  return (
    <div className="p-4">
   {showSidebar && (
    <>
    <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar}/>
    

      <div className="flex justify-between items-center mb-4">
        {!sidebarOpen && (
    <button onClick={toggleSidebar}>
    <Menu className="w-6 h-6" />
    </button>
    )}
        <h2 className="text-2xl font-semibold">Bills</h2>
        <a href="#" className="text-sm text-blue-600 hover:underline">See all</a>
      </div>
      </>

  )}

      <div className="space-y-4 ">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md"
          >
            <div>
              <h3 className="font-semibold">{payment.paymentName}</h3>
              <p className="text-sm text-gray-600">
                Rs {payment.amount.toLocaleString()} • {payment.category}
              </p>
            </div>
            
            
            <div className="flex gap-2  ">
            <div className="flex flex-col text-center ">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={16} />
                {format(new Date(payment.deadline), "dd MMM, hh:mma")}
              </div>
              <div className="mt-1 text-xs font-medium">
                {getStatusBadge(payment.deadline, payment.status)}
              </div>
              </div>

          <button
                onClick={() => handleDeletePayment(payment._id)}
                disabled={deletingId === payment._id}
                className={`
                  p-2 rounded-lg transition-colors
                  ${deletingId === payment._id 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'hover:bg-red-50 text-gray-400 hover:text-red-600'
                  }
                `}
                title="Delete payment"
              >
                <Trash2 size={18} />
              </button>
              
            </div>
            </div>
          ))}
      

        {payments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No bills found</p>
          </div>
        )}

          </div>
        
      </div>
  
  );
}



export default BillList;
