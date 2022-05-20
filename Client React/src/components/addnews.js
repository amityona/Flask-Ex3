import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import NewComments from './newComments';

export default function AddNews() {
    const [author,SetAuthor] = React.useState("")
    const [title,Settitle] = React.useState("")
    const [discrption,Setdiscrption] = React.useState("")
    const [urlToImage,SeturlToImage] = React.useState("")
    const [url,seturl] = React.useState("")

    var onClickAdd = () =>{

        var body ={
            author:author,
            title:title,
            discrption:discrption,
            urlToImage:urlToImage,
            url:url
        }
        var data = axios.post("http://localhost:5000/mynews",body)
        alert("Add News!")
    }
  return (
      <div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <h3> Add new Post</h3>
      <TextField id="filled-basic" label=" Title " variant="filled" onChange={(e)=>{Settitle(e.target.value)}}/>
      <TextField id="filled-basic" label="discrption" variant="filled" onChange={(e)=>{Setdiscrption(e.target.value)}}/>
      <TextField id="filled-basic" label="urlToImage" variant="filled" onChange={(e)=>{SeturlToImage(e.target.value)}}/>
      <TextField id="filled-basic" label=" Author" variant="filled" onChange={(e)=>{SetAuthor(e.target.value)}}/>
      <TextField id="filled-basic" label="url" variant="filled" onChange={(e)=>{seturl(e.target.value)}}/>
      <Button variant="contained" endIcon={<SendIcon />} onClick={()=>{onClickAdd()}}>
  ADD
</Button>


 
  </div>
 </Box>
 </div>
  );
}
