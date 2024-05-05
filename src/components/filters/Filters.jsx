import React, { useEffect, useState } from 'react'
import './filter.css'
function Filters({jobRole,location,minJdSalary,handleSearch}) {
    const [jobSearch, setjobSearch] = useState({
     role:'',
     experience:'',
     mode:'',
     location:'',
     salary:'',
     companyName:''
    })
    function handleChange(e){
        setjobSearch((oldstate)=>({
            ...oldstate,
            [e.target.name]:e.target.value
        }))
    }
    
    useEffect(()=>{
      handleSearch(jobSearch);
    },[jobSearch])
  return (
    <div className='filter__div'>
        <select value={jobSearch.role} name='role' onChange={handleChange}>
        <option>Roles</option>
            {
                jobRole?.map((role,id)=>(
                    <option key={id}>
                        {role}
                    </option>
                ))
            }
        </select>
        <select value={jobSearch.experience} name='experience' onChange={handleChange}>
            <option>Experience</option>
            <option>&gt;=0 or fresher</option>
            <option>&gt;+2 years</option>
            <option>&gt;+3 years</option>
            <option>&gt;+4 years</option>
            <option>&gt;+5 years</option>
            <option>&gt;+10 years</option>
            <option>&gt;+15 years</option>
            
        </select>
        <select value={jobSearch.mode} name='mode' onChange={handleChange}>
            <option>Mode</option>
            <option>on-site</option>
            <option>Remote</option>
        </select>
        <select value={jobSearch.location} name='location' onChange={handleChange}>
            <option>Location</option>
            {
                location?.map((loc,id)=>(
                    <option key={id}>
                        {loc}
                    </option>
                ))
            }
        </select>
        <select value={jobSearch.salary} name='salary' onChange={handleChange}> 
            <option>salary in USD </option>
            {
                minJdSalary?.map((sal,id)=>(
                    <option key={id}>{sal} + USD</option>
                ))
            }
        </select>
        <input type='text' placeholder='search Company Name' value={jobSearch.companyName} name='companyName' onChange={handleChange}/>
    </div>
  )
}

export default Filters