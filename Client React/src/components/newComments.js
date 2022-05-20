import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect } from 'react';
export default function NewComments(prop) {
    var dynamicID;
    const [comment,SetComment] = React.useState("")
    const [id,SetID] = React.useState("")
    const [name,SetName] = React.useState("")


    useEffect(()=>{
        if (prop.name != undefined)
        {
            SetID(prop.name)
        }
        else
        {
            dynamicID =  <TextField id="filled-basic" label=" ID " variant="filled" onChange={(e)=>{SetID(e.target.value)}}/>
            SetID("")
        }
    },[])   

    var onClickAdd = () =>{

        var body ={
            name:name,
            id:id,
            comment:comment,
        }
        var data = axios.post("http://localhost:5000/comments",body)
    }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <h3> Add new Comment for post</h3>
      <TextField id="filled-basic" label="Comment" variant="filled" onChange={(e)=>{SetComment(e.target.value)}}/>
      <TextField id="filled-basic" label="Youer Name" variant="filled" onChange={(e)=>{SetName(e.target.value)}}/>
      <Button variant="contained" endIcon={<SendIcon />} onClick={()=>{onClickAdd()}}>
  ADD
</Button>


 
  </div>
 </Box>
    
  );
}
