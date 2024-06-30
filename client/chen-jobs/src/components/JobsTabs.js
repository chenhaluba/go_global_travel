import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BtnsBox from "./BtnsBox";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { statusOptions, statusOptionsEdit } from "../consts/consts";
import jobsApi from "../api/jobsApi";
import jobsHistoryApi from "../api/jobsHistoryApi"
import JobsHistoryModal from './JobsHistoryModal'
import Modal from '@mui/material/Modal';



const JobsTabs = ({ jobs, jobFields}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(jobs[activeTab].status);
  const [updatedJob, setUpdatedJob] = useState(null);  
  const [jobID, setJobID] = useState(0)
  const [commentBtn, setCommentBtn] = useState(false);
  const [commentsByID, setCommentsByID] = useState("");
  const [newCommentJob, setNewCommentJob] = useState("");
  const [resolvedStatus, setResolvedStatus] = useState(false);
  const [historyBtn, setHistoryBtn] = useState(false);
  const [jobHistoryByID, setJobHistorysByID] = useState("");



  useEffect(() => {
    async function fetchData() {
      try {
        const data = await jobsApi.getCommentsByJobID(jobs[activeTab]["id"]);
        const commentsString = data.map(comment => comment.comment).join(', ');
        setCommentsByID(commentsString);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [commentBtn, activeTab]);

  useEffect(() => {
    setJobID(jobs[activeTab]["id"])
    setCommentBtn(false)
    setUpdatedJob(null);
  }, [activeTab])

  useEffect(() => {
    async function fetchHistoryData() {
      try {
        const data = await jobsHistoryApi.getHistoryByJobID(jobs[activeTab]["id"]);
        setJobHistorysByID(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    historyBtn && fetchHistoryData();
  }, [historyBtn]);
    

  const handleChangeTab = (event, newTab) => {
    setActiveTab(newTab);
    setSelectedStatus(jobs[newTab].status || "");
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    if(event.target.value == 'Resolved')
      {
        setResolvedStatus(true)
        setUpdatedJob((prevJob) => ({
          ...prevJob,
          status: event.target.value,
        }))
      }
    else{
      setUpdatedJob((prevJob) => ({
        ...prevJob,
        status: 'Error',
        resolution_comment : '',
      }))
    }

  };

  const handleFieldChange = (fieldName, value) => {
    setUpdatedJob((prevJob) => ({
      ...prevJob,
      [fieldName]: value,
    }));
  };



  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
        <Tabs value={activeTab} onChange={handleChangeTab}>
          {jobs.length > 0 &&
            jobs.map((job, index) => <Tab key={index} label={job.job_name} />)}
        </Tabs>
        <FormControl fullWidth sx={{marginTop:"1rem"}}>
          {jobs.length > 0 &&
            jobFields.map((field, index) => {
              const fieldName = Object.keys(field)[0];
              const fieldValue = jobs[activeTab][field[fieldName]];
              if(field[fieldName] !== "status") {
                return (
                  <TextField
                  key={index}
                  label={fieldName}
                  value={fieldValue}
                  fullWidth
                  sx={{ mb: 2}}
                  InputProps={{ readOnly: true }}
                />
                );
              } else {
                return (
                  <FormControl fullWidth >
                    <InputLabel id="status-label">Status</InputLabel>
                    {fieldValue !== 'Error' ? <Select
                      labelId="status-label"
                      id="status-select"
                      defaultValue={fieldValue}
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      label="Status"
                      readOnly={true}
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select> :
                    <Select
                      labelId="status-label"
                      id="status-select"
                      defaultValue={fieldValue}
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      label="Status"
                      readOnly={false}
                    >
                      {statusOptionsEdit.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>}
                  </FormControl>
                );
              }
            }
            )}
            {commentBtn&& 
            <div>
              <TextField label={"Comments"} defaultValue={commentsByID} fullWidth  multiline
              sx={{ mb: 2, marginTop:"1rem" }} InputProps={{ readOnly: true }}/>
             <TextField label={"Add New Comment"} onChange={(e) =>
              setNewCommentJob(e.target.value)
            } fullWidth sx={{ mb: 2, marginTop:"1rem" }} InputProps={{ readOnly: false }}/>
            </div>
            }
            {selectedStatus == 'Resolved' && resolvedStatus && <TextField label={"Resolution Comment"} 
            onChange={(e) =>handleFieldChange('resolution_comment',e.target.value)} 
              fullWidth sx={{ mb: 2, marginTop:"1rem" }} required={true}
              error={updatedJob["resolution_comment"]==undefined || updatedJob["resolution_comment"].length ==0 ? true: false}/>}
            <BtnsBox jobID={jobID} setCommentBtn={setCommentBtn}
             commentBtn={commentBtn} selectedStatus={selectedStatus} newCommentJob={newCommentJob} 
             updatedJob={updatedJob} historyBtn={historyBtn} setHistoryBtn={setHistoryBtn} commentsByID={commentsByID}/>
        </FormControl>
      </Box> 
      <JobsHistoryModal historyBtn={historyBtn} setHistoryBtn={setHistoryBtn} jobHistoryByID={jobHistoryByID}/>

    </div>
  );
};

export default JobsTabs;
