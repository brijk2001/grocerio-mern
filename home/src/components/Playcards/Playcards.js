import React from 'react'
import './Playcards.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Drinks from './images/drinks.jpeg'
import Dairy from './images/Dairy.jpg';
import Fruits from './images/fruit.jpg';
import Vegetables from './images/vegetables.jpg';
import Icecream from './images/icecream.jpg';
import toiletries from './images/Toiletries.jpg';


function Playcards() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className='palycards'>

      <Carousel responsive={responsive}>
        <div className='card1'>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={Drinks}
                alt="drinks and beverages"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Drinks & Beverages
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained" color="success">
                buy now
              </Button>
            </CardActions>
          </Card>
        </div>

        <div className='card1'>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={Dairy}
                alt="Milk products"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Milk Products
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained" color="success">
                buy now
              </Button>
            </CardActions>
          </Card>
        </div>

        <div className='card1'>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={Fruits}
                alt="Fruits"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Fruits
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained" color="success">
                buy now
              </Button>
            </CardActions>
          </Card>
        </div>

        <div className='card1'>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={Icecream}
                alt="icecreams"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Icecream
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained" color="success">
                buy now
              </Button>
            </CardActions>
          </Card>
        </div>

        <div>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={toiletries}
                alt="toileteries"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Toileteries
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained" color="success">
                buy now
              </Button>
            </CardActions>
          </Card>
        </div>
      </Carousel>
    </div>
  )
}

export default Playcards