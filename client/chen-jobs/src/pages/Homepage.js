import { useEffect, useState } from "react";
import jobsApi from "../api/jobsApi";
import emailApi from "../api/emailApi"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import JobsTabs from "../components/JobsTabs";
import { jobFields, newJobFields , sender_email} from "../consts/consts";
import Button from "@mui/material/Button";
import NewJobTab from "../components/NewJobTab";



const Homepage = () => {
  const [jobs, setJobs] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const[emailData ,setEmailData]= useState(null)


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await jobsApi.fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() =>{
    if(emailData !== null){
      emailApi.sendEmail(emailData)
    }
  },[emailData])


  const sendEmailToResponsiblePerson = async () => {
    jobs.map((job)=>{
      if(job["status"]== 'Error'){
          setEmailData({ 
            ["subject"]: `Error job - ${job["job_name"]}`,
            ["message"]: `There is an Error, ${job["description"]}`,
            ["sender_email"]: sender_email,
            ["receiver_email"]: job["responsible_person_email"],
           });
      }
    })
  }

  return (
      <div>
        <AppBar position="static">
          <Toolbar>
          <Button variant="contained" color="primary" onClick={sendEmailToResponsiblePerson} sx={{ borderRadius: 20, width: "15rem", marginRight:"1rem"}}>
              Send Error Email
          </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center", marginRight:"5rem" }}
            >
              Various System Processes 
            </Typography>
            <Button variant="contained" color="primary"  onClick={() =>
              setAddBtn(!addBtn)} sx={{ borderRadius: 20, width: "9rem" }}>
              Add New Job
            </Button>
          </Toolbar>
        </AppBar>
        {addBtn ?
        <NewJobTab newJobFields={newJobFields} setAddBtn={setAddBtn} />
         : 
        jobs.length > 0 && <JobsTabs jobs={jobs} jobFields={jobFields} />
}
        
       

      </div>
  );
};

export default Homepage;
