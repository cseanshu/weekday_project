import React, { useState, useEffect } from "react";
import "./joblisting.css";
import { NavLink } from "react-router-dom";
function JobListing({
  handlejobRole,
  handlelocation,
  handleminJdSalary,
  searchResult,
}) {
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
        limit: 20,
        offset: 0,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      try {
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("coming data", data.jdList);
        setJobsData(data.jdList);

        const extractedJobRoles = data.jdList
          .map((roles) => roles.jobRole)
          .filter((roles) => roles !== null);
        const uniqueRoles = [...new Set(extractedJobRoles)];
        // console.log("extracted data",uniqueRoles);
        setjobRole(uniqueRoles);

        const extractlocation = data.jdList
          .map((loc) => loc.location)
          .filter((loc) => loc !== null);
        const uniqueLoctions = [...new Set(extractlocation)];
        // console.log(uniqueLoctions);
        setlocation(uniqueLoctions);

        const extractSalary = data.jdList
          .map((salary) => salary.minJdSalary)
          .filter((sal) => sal !== null);
        const uniqueSalary = [...new Set(extractSalary)];
        uniqueSalary.sort((first, second) => first - second);
        setminJdSalary(uniqueSalary);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="job__list-div">
      {jobsData && (
        <div className="card__container">
          {
            /*  filter on the basis of the Roles */
            jobsData
              .filter((currole) => {
                return searchResult.role == "Roles"
                  ? currole
                  : currole.jobRole.toLowerCase().includes(searchResult.role);
              })
              /*  filter on the basis of the experience */
              .filter((curexp) => {
                const yearsOfExperience = parseInt(
                  searchResult.experience.slice(2, 4),
                  10
                );
                {
                  /* console.log(yearsOfExperience,"years"); */
                }
                if (
                  searchResult.experience === "Experience" ||
                  isNaN(yearsOfExperience)
                ) {
                  return true;
                }

                return curexp.maxExp >= yearsOfExperience;
              })
              /*  filter on the basis of the location */
              .filter((curloc) => {
                return searchResult.location == "Location"
                  ? curloc
                  : curloc.location.includes(searchResult.location);
              })
              /*  filter on the basis of the salary */

              .filter((cursal) => {
                const currentSalary = parseInt(
                  searchResult.salary.slice(0, 4),
                  10
                );
                {
                  /* console.log(currentSalary,"currentsalary"); */
                }
                return searchResult.salary == "salary in USD" ||
                  isNaN(currentSalary)
                  ? cursal
                  : cursal.minJdSalary >= currentSalary;
              })
              /*  filter on the basis of the CompanyName */
              .filter((curcompany) => {
                return searchResult.companyName == ""
                  ? curcompany
                  : curcompany.companyName.toLowerCase() ==
                      searchResult.companyName.toLowerCase();
              })
              .map((job) => (
                <div className="card__div" key={job.jdUid}>
                  <div className="logo__card-details">
                    <div className="card__logo">
                      <img src={job.logoUrl} alt="Company Logo" />
                    </div>
                    <div className="card_details">
                      <div className="card__companyName">
                        <h4>{job.companyName}</h4>
                      </div>
                      <div>
                        <h5>{job.jobRole}</h5>
                      </div>
                      <div>
                        <h6>{job.location}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="salary_div">
                    <h5>
                      Estemated-Salary: {job.minJdSalary ? job.minJdSalary : 0}
                      USD✅
                    </h5>
                  </div>
                  <div className="experience__div">
                    <h5>
                      Experience-req: +{job.maxExp ? job.maxExp : 0} years
                    </h5>
                  </div>
                  <div className="jobdetails__heading">
                    <h4>Job-details:</h4>
                  </div>
                  <div className="job__details">
                    <p>
                      {job.jobDetailsFromCompany.slice(0, 150)}.....
                    </p>
                  </div>

                  <div className="button__container">
                    <div>
                      {" "}
                      <button className="viewmore__button">View-more➡️</button>
                    </div>
                    <div>
                      <NavLink to={job.jdLink} target="blank">
                        <button className="apply__Button">⚡Easy-Apply</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      )}
    </div>
  );
}

export default JobListing;
{
  /* <li key={job.jdUid}>
                                
                                <h3>jdLink:-{job.jdLink}</h3>
                                <p>jobRole:-{job.jobRole}</p>
                                <p>location:-{job.location}</p>
                                <p>logoUrl:-{job.logoUrl}</p>
                                <p>maxExp:-{job.maxExp?job.maxExp:0}</p>
                             
                                <p>minJdSalary:-{job.minJdSalary?job.minJdSalary:0}</p>
                                <p>salaryCurrencyCode:-{job.salaryCurrencyCode}</p>
                                <p>CompanyName:-{job.companyName}</p>

                                
                            </li> */
}
