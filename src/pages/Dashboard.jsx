import React ,{ useState }from "react";
import { useEffect } from "react";
import Paymentcard from "../components/paymentcard";
import  {BadgeIndianRupee, SidebarClose, SidebarCloseIcon, SidebarIcon, SidebarOpenIcon, X ,Menu} from 'lucide-react';
import Sidebar from "../components/Sidebar";
import BillList from "../components/Billlist";


function Dashboard(){
  const API = import.meta.env.VITE_API_URL;
 const [sidebarOpen, setSidebarOpen] = useState(true);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async() => {
      const token = localStorage.getItem("token");
      
      if (!token) return;

      try {
       
        const res = await fetch(`${API}/api/payments`, {
          headers: {
            "Content-Type": "application/json", // Add this
            "Authorization": `Bearer ${token}`,
          }
        });

        const data = await res.json();
        console.log("Dashboard - Raw data:", data); // Debug
        
        if (res.ok) {
          setPayments(data);
        } else {
          alert(data.error || "Failed to fetch payments");
        }
      } catch (error) {
        console.error("fetch error:", error);
        alert("network error fetching payments");
      }
    };

    fetchPayments();
  }, []);


const toggleSidebar =() => {
    setSidebarOpen((prev) => !prev);
};

const removeCard = (id) => {
    setPayments((prev) => prev.filter((p) => p._id !== id));
};

return(
<div>

 <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar}/>

<div className="nav h-20 flex items-center pl-5  bg-slate-300 space-x-5">
{!sidebarOpen && (
  <button onClick={toggleSidebar}>
    <Menu className="w-6 h-6" />
  </button>
)}


<div className="flex flex-col">   
 <div className="text-2xl font-bold ">Hello Bhumi,👋</div>
 <div className="text-sm">You've got some upcoming bills</div>   
</div>  
</div>        

<div className="flex">
{payments.map((payment) => (
<Paymentcard key = {payment._id}
payment ={payment}
removeCard = {removeCard} />

))}

</div>

 {/* 📋 Bill List Below Cards */}
  <div className="mt-8">
    <div className="text-2xl font-semibold pl-7">Bills</div>
    <BillList payments={payments} showSidebar ={false} />
  </div>


</div>
    );
}

export default Dashboard;