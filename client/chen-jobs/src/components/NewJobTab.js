import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { jobFields, statusOptions, categoryAndEmail } from "../consts/consts";
import jobsApi from "../api/jobsApi";


const NewJobTab = ({newJobFields, setAddBtn}) => {
    const [newJob, setNewJob] = useState(null);
    const [personEmail, setPersonEmail] = useState('') 
    
    useEffect(() => {
      if(newJob != null && newJob["category"] != undefined)
        {
          categoryAndEmail.map((c)=>{
            if(newJob["category"] == Object.keys(c)[0])
              {
                setPersonEmail(Object.values(c)[0])
                handleFieldChange("responsible_person_email", personEmail, "text")
              }
          })
        }
    
      
    }, [newJob])
    
  const handleFieldChange = (fieldName, value, type) => {
    if (type === 'date'){
        const formatDate= value.toISOString().split('T')[0]
        setNewJob((prevJob) => ({
            ...prevJob,
            [fieldName]: formatDate,
          }));
    }
    else{
        setNewJob((prevJob) => ({
            ...prevJob,
            [fieldName]: value,
          }));
    }
   
  };
  const checkFields = (newJob, fieldsArray) => {
    if(newJob!==null){
        for (let i = 0; i < fieldsArray.length; i++) {
            const fieldName = Object.values(fieldsArray[i])[0];
            if (!(fieldName in newJob) || newJob[fieldName].length === 0) {
              return false; 
            }
          }
          if (!('responsible_person_email' in newJob) || newJob['responsible_person_email'].length === 0) {
            return false;
          }
          return true; 
    }
  };

  const addJob = async () => {
    const allFieldsFilled = checkFields(newJob, jobFields);
      if(newJob!==null && allFieldsFilled)
        {
          if(newJob["status"] === 'Resolved'&& newJob["resolution_comment"]!== undefined && newJob["resolution_comment"]!== '' )
            {
            try {
              await jobsApi.addJob(newJob);
              window.location.reload()
        
            } catch (error) {
              console.error("Error fetching data:", error);
            }
            }
            else{
                if(newJob["status"] !== 'Resolved')
                    {
                        try {
                            await jobsApi.addJob(newJob);
                            window.location.reload()
                      
                          } catch (error) {
                            console.error("Error fetching data:", error);
                          }   
                    }
            }
          
        }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
        <Tabs value={0} >
            <Tab label={'New Job'} />
        </Tabs>
        <FormControl fullWidth sx={{marginTop:"1rem"}}>
          {
            newJobFields.map((field, index) => {
              const fieldName = Object.keys(field)[0];
              if(field[fieldName] !== "status" && field[fieldName] !== "category") {
                return <TextField
                key={index}
                type={field[fieldName] !== 'start_time' && field[fieldName] !== 'completion_time' ? 'text' : 'date'}
                label={fieldName}
                fullWidth
                sx={{ mb: 2}}
                onChange={(e) =>
                  handleFieldChange(field[fieldName], e.target.value, e.type)
                }
                required={newJob != null && newJob["status"] == 'Resolved' ? 
                  field[fieldName] == 'resolution_comment'? true: false
                  : false}
                error={newJob != null && newJob["status"] == 'Resolved' && newJob["resolution_comment"] == undefined ?
                  field[fieldName] == 'resolution_comment' ? true: false 
                   : newJob != null && newJob["status"] == 'Resolved' && newJob["resolution_comment"].length == 0 && field[fieldName] == 'resolution_comment'
                    ? true : false}
                value={newJob != null && newJob["category"] != undefined && field[fieldName] == 'responsible_person_email' ? personEmail 
                  : field[fieldName] == 'responsible_person_email'? "" : null }
                InputProps={{ readOnly: newJob != null && newJob["category"] != undefined && field[fieldName] == 'responsible_person_email' ? true : false }}

              />
            }
            else{
                return (
                  field[fieldName] == 'status' ?
                  <FormControl fullWidth sx={{marginBottom:"1rem"}}>
                      <InputLabel id="status-label">{fieldName}</InputLabel>
                      <Select
                        labelId="status-label"
                        id="status-select"
                        onChange={(e) =>
                            handleFieldChange(field[fieldName], e.target.value)
                          }                        
                        label={fieldName}
                      >
                        {statusOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      </FormControl> :
                      <FormControl fullWidth sx={{marginBottom:"1rem"}}>
                      <InputLabel id="category-label">{fieldName}</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category-select"
                        onChange={(e) =>
                            handleFieldChange(field[fieldName], e.target.value)
                          }                        
                        label={fieldName}
                      >
                        {categoryAndEmail.map((option) => (
                          <MenuItem key={Object.keys(option)[0]} value={Object.keys(option)[0]}>
                            {Object.keys(option)[0]}
                          </MenuItem>
                        ))}
                      </Select>
                      </FormControl>
                
                    
                      
                      
                );
            }
                 
}
            )}
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant="contained" color="primary" onClick={()=>{setAddBtn(false)}} sx={{ borderRadius: 20, width: "10rem" }}>
              Cancel Job
        </Button>
        <Button variant="contained" color="primary" onClick={addJob} sx={{ borderRadius: 20, width: "10rem" }}>
              Add Job
        </Button>
       
        </Box>
        
      </Box>
    </div>
  );
};

export default NewJobTab;
