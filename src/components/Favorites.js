import React, { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

 function Favorites(){

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    useEffect(()=>{
        getFavoriteDogs()
    },[])

    const [myFav,setMyFav] = useState([])
    const getFavoriteDogs= async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8080/favorites', requestOptions)
        .then(response =>  response.json())
        .then((result)=>{
            console.log(result)
            setMyFav(result)
        })
    }
    function find(dogImg){
        if(dogImg.includes('.mp4')||dogImg.includes('.mov')
        ||dogImg.includes('.wmv')||dogImg.includes('.flv')||dogImg.includes('.avi')
        ||dogImg.includes('.webm')||dogImg.includes('.mkv')||dogImg.includes('.avchd')){
          return true;
        }
         
          return false;
         
      }
    return(
        <div id="div2">
             
      <Typography variant="h6" gutterBottom alignCenter component="div">
            Your fav images
        </Typography>
      
      <Box sx={{ flexGrow: 1 }}>
      <Grid id="grid1"container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      
      {myFav.map(ele=>{
            let val =find(ele)
             console.log(ele)
            if(val === true){
                return <Grid item xs={4}><Item>
                    <video src={ele} width="250" height="100" autoplay controls></video></Item>
                </Grid>
            } else{
                return <Grid item xs={4}><Item><img  src={ele} width="250" height="100"></img></Item></Grid>
            }
        })}
      </Grid>
      </Box>
      </div>    
    );
}
export default Favorites