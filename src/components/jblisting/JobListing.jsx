import React, { useState, useEffect } from 'react';

function JobListing({handlejobRole,handlelocation,handleminJdSalary,searchResult}) {
    const [jobsData, setJobsData] = useState(null);
    const [error, setError] = useState(null);
    const [jobRole, setjobRole] = useState([]);
    const [location, setlocation] = useState([]);
    const [minJdSalary, setminJdSalary] = useState([]);
        handlejobRole(jobRole);
        handlelocation(location);
        handleminJdSalary(minJdSalary);
    useEffect(() => {
        const fetchData = async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const body = JSON.stringify({
                "limit": 20,
                "offset": 0
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body
            };

            try {
                const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("coming data",data.jdList);
                setJobsData(data.jdList);

                const extractedJobRoles=data.jdList.map(roles=>roles.jobRole).filter(roles=>roles!==null);
                const uniqueRoles=[...new Set(extractedJobRoles)];
                // console.log("extracted data",uniqueRoles);
                setjobRole(uniqueRoles);

                const extractlocation=data.jdList.map(loc=>loc.location).filter(loc=>loc!==null);
                const uniqueLoctions=[...new Set(extractlocation)];
                // console.log(uniqueLoctions);
                setlocation(uniqueLoctions);
                
                const extractSalary=data.jdList.map(salary=>salary.minJdSalary).filter(sal=>sal!==null);
                const uniqueSalary=[...new Set(extractSalary)];
               uniqueSalary.sort((first,second)=>first-second);
                setminJdSalary(uniqueSalary);
             
            } catch (error) {
                setError(error);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {jobsData && (
                <div>
                    <h2>Total Jobs: {jobsData.totalCount}</h2>
                    <ul>
                   
                        {                                /*  filter on the basis of the Roles */
                            jobsData.filter(currole=>{
                            return searchResult.role=='Roles'?currole:currole.jobRole.toLowerCase().includes(searchResult.role)
                        })
                                                       /*  filter on the basis of the experience */
                          .filter(curexp=>{
                            const yearsOfExperience = parseInt(searchResult.experience.slice(2, 4), 10);
                                    {/* console.log(yearsOfExperience,"years"); */}
                            if (searchResult.experience === 'Experience' || isNaN(yearsOfExperience)) {
                                         return true;
                                        }
                                   
                                    return curexp.maxExp >= yearsOfExperience;

                          })
                                                       /*  filter on the basis of the location */    
                              .filter(curloc=>{
                                return searchResult.location=='Location'?curloc:curloc.location.includes(searchResult.location)
                              })
                                                       /*  filter on the basis of the salary */ 

                              .filter(cursal=>{
                                const currentSalary=parseInt(searchResult.salary.slice(0,4),10);
                                {/* console.log(currentSalary,"currentsalary"); */}
                                return (searchResult.salary=='salary in USD'||isNaN(currentSalary))?cursal:cursal.minJdSalary>=currentSalary;
                              })                         
                        .map(job => (
                            <li key={job.jdUid}>
                                <h3>jdLink:-{job.jdLink}</h3>
                                <p>jobRole:-{job.jobRole}</p>
                                <p>location:-{job.location}</p>
                                <p>logoUrl:-{job.logoUrl}</p>
                                <p>maxExp:-{job.maxExp?job.maxExp:0}</p>
                             
                                <p>minJdSalary:-{job.minJdSalary?job.minJdSalary:0}</p>
                                <p>salaryCurrencyCode:-{job.salaryCurrencyCode}</p>
                                {/* <p>{job.jobDetailsFromCompany}</p> */}

                                
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default JobListing;
