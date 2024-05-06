import React from 'react';
 import{ useState } from 'react';
import './App.css'
import Filters from './components/filters/Filters'
import Header from './components/header/Header'
import JobListing from './components/jblisting/JobListing'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [jobRole, setjobRole] = useState([]);
const [location, setlocation] = useState([]);
const [minJdSalary, setminJdSalary] = useState([]);
const [searchResult,setsearchResult]=useState({});
function handlejobRole(Role){
  setjobRole(Role);
}
function handlelocation(loc){
  setlocation(loc);
}
function handleminJdSalary(salary){
  setminJdSalary(salary)
}
function handleSearch(res){
setsearchResult(res);
// console.log(searchResult,"res from the app");
}
// console.log("from app",location,jobRole,minJdSalary);
  return (
    <>
   <Header/>
   <Filters jobRole={jobRole} location={location} minJdSalary={minJdSalary} handleSearch={handleSearch} />
   <BrowserRouter>
    <Routes>
      <Route  path='/'
      element={<JobListing handlejobRole={handlejobRole} handlelocation={handlelocation}
    handleminJdSalary={handleminJdSalary} searchResult={searchResult}/>}

      />
    </Routes>
   </BrowserRouter>     
    </>
  )
}

export default App

//  I have used React-router for the  button easy apply so it does not load the page to retain the functionality of react 
