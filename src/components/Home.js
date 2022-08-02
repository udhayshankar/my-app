

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function Home() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
    

  const [fav, setFav] = useState([])
  const [dogImage, setDogImage] = useState([])
  const [checked, setChecked] = React.useState([false,false,false,false,false,false]);
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const handleChange = (index) =>(event) =>{
    const newChecked = checked.slice() 
    newChecked[index] = event.target.checked
    setChecked(newChecked)
    if(!fav.includes(event.target.name)){
    setFav(fav => [...fav,event.target.name] );
    }
   
  };
 
  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleOpenError = () => {
    setOpenError(true);
  };
  const handleCloseError = () => {
    setOpenError(false);
  };
  const handleButtonClick=(event)=>{
    
    console.log("udhay")
    console.log(fav)
    const newChecked = checked.slice() 
    for(var i=0;i<6;i++){
      if(newChecked[i] === true){
        newChecked[i] = false
      }
    }
    setChecked(newChecked)
    saveFavorites()
  }
  
   const handleRefreshButtonClick=(event)=>{
    getAnswer();
   }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const saveFavorites = async () =>{

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fav),
      

  };
  fetch('http://localhost:8080/savefavorites', requestOptions)
      .then(response => {
        response.json()
        handleOpenSuccess()
      })
      // .then(data => this.setState({ postId: data.id }));
    
  }
  const getAnswer = async () => {
    
    const newChecked = checked.slice() 
    for(var i=0;i<6;i++){
      if(newChecked[i] === true){
        newChecked[i] = false
      }
    }
    setChecked(newChecked)
    setFav([])
    const arr = []
    const urls = ['https://random.dog/woof.json', 'https://random.dog/woof.json','https://random.dog/woof.json','https://random.dog/woof.json', 'https://random.dog/woof.json','https://random.dog/woof.json'];
  try{
    const res = await Promise.all(urls.map(e => fetch(e)))
    const resJson = await Promise.all(res.map(e => e.json()))
   resJson.map(e => (
    arr.push(e.url)
   ))
   setDogImage(arr)
   
  }catch(err) {
    console.log(err)
  }
    
  };

  useEffect(()=>{
    
   
    getAnswer();
   
  
// eslint-disable-next-line
    },[]);
  
function find(dogImg){
  if(dogImg.includes('.mp4')||dogImg.includes('.mov')
  ||dogImg.includes('.wmv')||dogImg.includes('.flv')||dogImg.includes('.avi')
  ||dogImg.includes('.webm')||dogImg.includes('.mkv')||dogImg.includes('.avchd')){
    return true;
  }
   
    return false;
   
}
  return (
    
    <div id="div1">
      
      <Typography variant="h6" gutterBottom alignCenter component="div">
            Select the favorite Images
        </Typography>
      
      <Box sx={{ flexGrow: 1 }}>
      <Grid id="grid2" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  {dogImage.map((dogImg,index)=>{
    let val =find(dogImg)
  
   
    if(val === true){
      return <Grid item xs={4}><Item><video id = {dogImg}src={dogImg} width="250"height="100" autoplay controls>
      </video> </Item><Item><Checkbox  sx={{
          color: 'red',
          '&.Mui-checked': {
            color: 'red',
          },}}
          name ={dogImg} key ={dogImg} id= {dogImg}
          {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}checked={checked[index]} onChange={handleChange(index)} /></Item></Grid>
    }
    else{
     return <Grid item xs={4}><Item><img alt={dogImg} id = {dogImg} src={dogImg} width="250" height="100"></img></Item><Item><Checkbox 
     name ={dogImg} key ={dogImg}id= {dogImg}
     sx={{
      color: 'red',
      '&.Mui-checked': {
        color: 'red',
      },}}{...label} icon={<FavoriteBorder />} checkedIcon={<Favorite /> } checked={checked[index]} onChange={handleChange(index)}/></Item></Grid>;
    }
  
    
  })}
   <Grid key="grid2" item xs={4} sm={12} container justifyContent="flex-end" columnSpacing={1}>
      <Grid item>
        <Button  size="small" variant="contained" color="error" onClick={fav.length>0 ? handleButtonClick: handleOpenError}>
        Add to Favorites
        </Button>
      </Grid>
      <Grid item>
        <Button  size="small" variant="contained" color="error" onClick={handleRefreshButtonClick}>
          Refresh
        </Button>
      </Grid>
      <Grid item>
        <Link  to="/favorites">
          <Button size="small" variant="contained" color="error">
           Favorites
        </Button>
        </Link>
      </Grid>
    </Grid>

    <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess}>
        <Alert variant="filled" onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Added to the favorites successfully
        </Alert>
    </Snackbar>
    <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError}>
        <Alert variant="filled" onClose={handleCloseError} severity="warning" sx={{ width: '100%' }}>
          Select the fav images first 
        </Alert>
    </Snackbar>
     
</Grid>
</Box>

    </div>
   );
}


export default Home;
