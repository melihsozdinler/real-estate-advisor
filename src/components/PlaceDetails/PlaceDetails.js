import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>{place.name}</Typography>
        <Box display="flex" justifyContent="left" my={2}>
          <img
            style={{ height: '100px', width: '100px', margin: '2px' }}
            src={`/sample/sample${Math.floor(Math.random() * 7) + 1}.png`}
          />
          <img
            style={{ height: '100px', width: '100px', margin: '2px' }}
            src={`/sample/sample${Math.floor(Math.random() * 7) + 1}.png`}
          />
          <img
            style={{ height: '100px', width: '100px', margin: '2px' }}
            src={`/sample/sample${Math.floor(Math.random() * 7) + 1}.png`}
          />
        </Box>
        <Box display="flex" justifyContent="left" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">[{place.reviews} review{place.reviews > 1 && 's'}]</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Cost</Typography>
          <Typography gutterBottom variant="subtitle1">
            {Intl.NumberFormat('tr-TR').format(place.price)} TL
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">{place.extraInfo}</Typography>
        </Box>
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Call
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Message
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
