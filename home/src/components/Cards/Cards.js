import React from 'react';
import './cards.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Cards() {
  return (
    <div className="shop">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tea Shop
            </Typography>
          </CardContent>
          <Stack spacing={2} direction="row" alignItems="center">
            <Button variant="text">Visit Shop</Button>
            <div className='location'><a href='/location'>Location</a></div>
          </Stack>
        </CardActionArea>
      </Card>
    </div>

  );
}
