import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import NewComments from './newComments'
import { useState } from 'react';
import axios from 'axios';

function Comments(prop) {
    const [data,setDataComments] = useState([])

    var obj;
  
    var fethCommentsByID = async ()=>{
        let getall = await axios.get("http://localhost:5000/comments/"+prop.id)  ;
        //console.log(getall.data);
        if (getall.data.length == 0)
        obj = <h4>No Comments</h4>

        setDataComments(getall.data);
      
      }

      obj = data.map((element,index)=>{

 
        return ( <div className='comment'>
       <h6>Write by :{element.name}</h6>  <h4>  {element.comment}</h4>
       <h6>{element.publishedAt}</h6>
 
       </div>
      )

        } 
      )
   
      
      




  return (
      <div>
           <h4>Id for news post : {prop.id}</h4>
    <Button variant="contained" endIcon={<SendIcon />} onClick={()=>{fethCommentsByID(prop.id)}}>
    Show Comments
    </Button>
    {obj}
    <NewComments name={prop.id}/>
    </div>
  )
}

export default Comments