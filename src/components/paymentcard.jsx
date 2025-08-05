import { BadgeIndianRupee, IndianRupeeIcon , CheckCircle2 } from "lucide-react";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { differenceInCalendarDays, format } from "date-fns";
function paymentcard({ payment , removeCard}){

  const [isFlipped, setIsFlipped] = useState(false);
  const [status , setStatus ] = useState(payment.status);

const due = new Date(payment.deadline);
const now = new Date();
const daysLeft = differenceInCalendarDays(due,now);

const badge =
daysLeft === 0 
? "Due Today"
: daysLeft === 1
? "Due in 1 day"
: `Due in ${daysLeft} days`;

  const handlePay = async() => {
    setIsFlipped(true); 
    setStatus("paid");

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/payments/${payment._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "paid" }),
      });

    } catch (error) {
      alert("Payment failed. Try again");
      setIsFlipped(false);
      setStatus("pending");
      return;
    }

// remove card after animation delay
setTimeout(() => removeCard(payment._id), 2000);
  };

  if (status === 'paid') {
    return null;
  }

    return(
 <motion.div
      className="w-80 h-40 perspective relative mt-10 ml-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >

<motion.div
        className={`relative w-full h-full  rounded-xl shadow-xl transform transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >        

{/* Front side */}
<div className=" bg-[#19766ddf] space-y-5 pl-5 pr-5 pt-1 rounded-2xl text-white absolute inset-0 backface-hidden">
    <div className="flex justify-between">
    <div>Amount Due</div>
    <div className="w-fit pl-2 pr-2 bg-[#15635b] rounded-3xl "> {badge} </div>
    </div>
    <div className="lower part flex justify-between ">
    <div className="space-y-1">    
    <div className="text-lg">{payment.paymentName}</div>
    <div className="flex">
    <IndianRupeeIcon size = {20} className="mt-2"/>
    <div className="text-3xl font-semibold">{
    payment.amount.toLocaleString() || 0 }
     </div>  
    </div>
    <button onClick={handlePay}
    className="rounded-3xl bg-white text-blue-950 w-20 font-semibold text-sm h-7 ">Pay Bill</button>
    </div>
    
 
    <div className=" mt-3 ">
    <BadgeIndianRupee size={60} className=""/>    
    </div>

    </div>


</div>

{/* back side */}
<div className="absolute backface-hidden inset-0 rotate-y-180 bg-green-50 rounded-xl  flex flex-col justify-center items-center ">
<CheckCircle2 className="text-green-600 w-10 h-10 mb-2" />
<p className="text-green-700 font-semibold text-lg">Paid</p>
</div>

</motion.div>
</motion.div>
    );
}

export default paymentcard;