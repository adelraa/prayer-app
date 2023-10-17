
import './prayer.css';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

// eslint-disable-next-line react/prop-types
export default function PrayerCard({ name,time,image }) {
  return (
   
          <Card sx={{ maxWidth:500,marginLeft:5}} className='card'>
              <CardMedia
                  sx={{ height:200 ,width:300}}
                  image={image}  className='image'/>
              <CardContent>
              <h2>{name}</h2>
              <h1>{time}</h1>
               
              </CardContent>
          </Card>
  
            
         
  )
}
