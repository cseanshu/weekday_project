import { useState } from 'react';
import './App.css'
import Filters from './components/filters/Filters'
import Header from './components/header/Header'
import JobListing from './components/jblisting/JobListing'


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
   <JobListing handlejobRole={handlejobRole} handlelocation={handlelocation}
    handleminJdSalary={handleminJdSalary} searchResult={searchResult}/>
    </>
  )
}

export default App
