import './App.css';
import {BrowserRouter as Router , Routes , Route , Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Billlist from './components/Billlist';
import Remainder from './components/Remainderform';

function App() {
  

  return (
   <Routes>
    <Route path = "/" element = {< Home />}/>
    <Route path = "/login" element ={< Login />}/>
    <Route path = "/signup" element = {<Signup />}/>
    <Route path = "/dashboard" element = {<Dashboard/>} />
    <Route path = "/billlist"  element = {<Billlist/>} />
    <Route path = "/remainder"  element = {<Remainder/>} />
   </Routes>
   

       





  );
}

export default App
