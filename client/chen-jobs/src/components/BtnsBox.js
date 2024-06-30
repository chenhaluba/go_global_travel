
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import jobsApi from "../api/jobsApi";


const BtnsBox = ({ jobID, setCommentBtn, commentBtn, selectedStatus, newCommentJob, updatedJob, historyBtn, setHistoryBtn, commentsByID}) => {

  
  const handleSave = async () => {
    if(newCommentJob !== '')
      {
        try {
          await jobsApi.updateCommentJob(newCommentJob, jobID);
          window.location.reload()
    
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    if(updatedJob!==null)
        {
          if(updatedJob["status"] == 'Resolved'&& updatedJob["resolution_comment"]!= undefined && updatedJob["resolution_comment"]!= '' )
            {            try {
              await jobsApi.updateJob(updatedJob, commentsByID, jobID);
              window.location.reload()
        
            } catch (error) {
              console.error("Error fetching data:", error);
            }
            }
          
        }
  };

  const handleRemove = async () => {
    try {
      await jobsApi.deleteJob(jobID);
      window.location.reload();

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLeaveComment = () => {
    setCommentBtn(!commentBtn)
  };


  return (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Button variant="contained" color="primary" onClick={handleRemove} sx={{ borderRadius: 20, width: "10rem" }}>
              Remove
            </Button>
            {selectedStatus != 'Running' && selectedStatus != 'Completed' && <Button variant="contained" color="primary"  onClick={() =>
              setHistoryBtn(!historyBtn)} sx={{ borderRadius: 20, width: "10rem" }}>
              History
            </Button>}
            <Button variant="contained" color="primary" onClick={handleLeaveComment} sx={{ borderRadius: 20, width: "10rem" }}>
              Comments
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ borderRadius: 20, width: "10rem" }}>
              Save
            </Button>
            
          </Box>
  );
};

export default BtnsBox;
