export const jobFields = [
    { "Time Of Start": "start_time" },
    { "Time Of Completion": "completion_time" },
    { "Job name": "job_name" },
    { "Category": "category" },
    { "Description": "description" },
    { "Responsible Person": "responsible_person" },
    { "Status": "status" },
  ];

  export const jobHistoryFields = [
    { "Job name": "job_name" },
    { "Category": "category" },
    { "Description": "description" },
    { "Status": "status" },
    {"Comments": "comments"}, 
    {"Resolution Comment": "resolution_comment"}

  ];

  export const newJobFields = [
    { "Time Of Start": "start_time" },
    { "Time Of Completion": "completion_time" },
    { "Job name": "job_name" },
    { "Category": "category" },
    { "Description": "description" },
    { "Responsible Person": "responsible_person" },
    { "Responsible Person`s Email": "responsible_person_email" },
    { "Status": "status" },
    {"Comments": "comments"}, 
    {"Resolution Comment": "resolution_comment"}
  ];
  
export const statusOptions = ["Completed","Running","Error","Resolved"];

export const statusOptionsEdit = ["Error","Resolved"];

export const categoryAndEmail =[
  {"FullStack" : "chenhaluba@gmail.com"},
  {"Frontend" : "chenhaluba@gmail.com"},
  {"Backend" : "chenhaluba@gmail.com"},
  {"Server" : "chenhaluba@gmail.com"},
  {"Devops" : "chenhaluba@gmail.com"},
]

export const sender_email = 'halubachen@gmail.com'

export const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
