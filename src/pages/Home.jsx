
import { BadgeIndianRupee, FacebookIcon, LinkedinIcon, TwitterIcon  } from 'lucide-react';
import  Image  from './image.png';
import { Link } from 'react-router-dom';

function Home() {
  

  return (
<div className ="home page">
      <div className ="nav flex w-full items-center h-16">
        <div className ="logoname flex pl-16  space-x-2">
        <BadgeIndianRupee className ="text-[rgb(20,101,98)]" size ={40}  />
        <div className="name text-2xl font-semibold">TrustPay</div>
        </div>
        
      
    <div className="signlog flex pr-13 space-x-5 w-3/4 justify-end  ">
    <Link to = "/login">
    <button className = "border-2 rounded-lg w-20 h-8 border-black hover:bg-gray-700 hover:text-white hover:border-gray-700">Log In</button>
    </Link>
    <Link to ="/signup">
    <button className = "border-2 rounded-lg w-20 h-8 border-black hover:bg-gray-700 hover:text-white hover:border-gray-700">Sign Up</button>  
    </Link>
    </div>  
        
      </div>

    <div className="body flex justify-around items-center bg-slate-100 h-[500px]">
      <div className ="space-y-5">
        <p className ="space-y-6 text-3xl font-bold">Remember and <br></br> Manage Upcoming <br></br> Bills with TrustPay</p>
        <p className ="text-s"> We are changing the way you manage and pay your bills <br></br>by making syre you never forget when its's due.
          </p>
          <button className = "border-2 rounded-lg w-40 h-10 border-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-700 mr-3">Get Started</button>
          <button className = "border-2 rounded-lg w-40 h-10 border-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-700">Learn More</button> 
      </div>
        <img src ={Image} alt="img" className ="h-[300px] w-[400px] rounded-2xl  "></img>

    </div>

<footer className="bg-[#0F5C53] text-white px-6 py-10 rounded-t-3xl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-2">
            <h2 className="text-2xl font-semibold">Keep up with the latest</h2>
            <p className="text-sm text-gray-200">
              Join our news letter to stay up to date on features, software and helpful articles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="bg-white text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">
              Try for Free
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20"></div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 text-sm gap-10">
          <div>
            <div className ="flex gap-2">
            <BadgeIndianRupee className ="text-white " size ={40}  /> 
            <h3 className="font-semibold mb-2 text-2xl">TrustPay</h3></div>
            <p className="text-gray-200 mt-2">Join our news letter to stay up to date on features and resources.</p>
          
          </div>

          <div>
            <h3 className="font-semibold mb-2">Home</h3>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Personal</li>
              <li>Business</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="space-y-1">
              <li>Get Started</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          
          <div className = "socialmedia flex flex-row gap-2">
          <FacebookIcon className ="hover:text-black"/>
          <LinkedinIcon className ="hover:text-black"/>
          <TwitterIcon className ="hover:text-black"/>
          </div>
          
        </div>
      </div>
    </footer>

</div>
  );
}

export default Home;