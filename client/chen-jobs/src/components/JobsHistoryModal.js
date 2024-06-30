import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styleModal , jobHistoryFields} from "../consts/consts";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";



const JobsHistoryModal = ({historyBtn, setHistoryBtn, jobHistoryByID}) => {
    
    return (
        <div>
          <Modal
            open={historyBtn}
            onClose={()=>{setHistoryBtn(!historyBtn)}}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...styleModal, width: 400 }} >
              <h2 id="parent-modal-title">Job`s History</h2>
              {jobHistoryByID.length < 1 &&<p id="parent-modal-description">
                There is no history for this job
              </p>}
              
              {jobHistoryByID.length > 0 &&        
        <FormControl fullWidth  sx={{marginTop:"1rem"}}>
        {jobHistoryFields.map((field, index) => 
        {
        const fieldName = Object.keys(field)[0];
        return (
            <TextField
            key={index}
            label={fieldName}
            value={jobHistoryByID[0][field[fieldName]]}
            fullWidth
            multiline
            sx={{ mb: 2}}
            InputProps={{ readOnly: false }}
        />
        );
            })}
        </FormControl> }

        </Box>
        </Modal>
        </div>
      );
};

export default JobsHistoryModal;
