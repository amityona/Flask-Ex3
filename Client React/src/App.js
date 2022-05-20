import logo from './logo.svg';
import './App.css';
import axios  from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardUI from './components/card';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Redirect, Route, Switch } from "react-router";

import AddNews from './components/addnews';

function App() {
  const [authordata,setAutor] = useState("")
 const [data,setData] = useState([])

  var obj;




var clickS = async ()=>{
  console.log("click");
  let getall = await axios.get("http://127.0.0.1:5000")  ;
  //console.log(getall.data);
  setData(getall.data);

}
var fetchAllData = async ()=>{
  console.log("click");
  let getall = await axios.get("http://127.0.0.1:5000/news");
  var arr1 = getall.data
 setData(arr1);
  var arr2 = await axios.get("http://127.0.0.1:5000/mynews");
  arr2 = arr2.data
  setData([...arr1,...arr2]);

}



obj = data.map((element,index)=>{

  if (element.source != undefined)
var id = element.source.id;
else
//var id = JSON.stringify(element._id);
var id = String(element._id.$oid)
console.log(`id is : ${id} type ${typeof(id)}`)

  var urlToImage = element.urlToImage;
  var name = element.author;
  var elemntDiscrption = element.discrption;

  var created = element.publishedAt
  
  if ((name == authordata) || (authordata.length == 0 ))
{
  if (elemntDiscrption == null )
  elemntDiscrption = element.content;

  if(name== null)
  name="No Name"

  if(urlToImage == undefined)
  urlToImage=""


  if (created == undefined)
  created= element.created

  console.log(`created ${created.date}`)
  return ( <div>
   <CardUI key={element.author} id={id} name={name} created={created.toString()} url={element.urlToImage} title={element.title} discrption={elemntDiscrption} urls ={element.url}/></div>
)
  }

})


  return (
    <div className='main split left'>
      <TextField id="filled-basic" label="Search by Author" variant="filled" onChange={(e)=>{setAutor(e.target.value)}}/>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button variant="contained" color="success" onClick={()=>{clickS()}}>
  Search
</Button>

</ButtonGroup>
<br/>
      {obj}

      <Button variant="contained" color="success" onClick={()=>{fetchAllData()}}>
      Fetch all news
</Button> <br/>

<div className='main split right'>

  <AddNews/>

</div>

    </div>
  );
}

export default App;
