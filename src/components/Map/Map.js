import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Box, Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  const getImage = (type) => {
    if (type === 1) return '/house.png';
    if (type === 2) return '/land.png';
    if (type === 3) return '/office.png';
    return '/house.png';
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="small" />
              : (
                <Paper
                  elevation={3}
                  className={classes.paper}
                >
                  <Box display="flex" justifyContent="left" my={2}>
                    <img
                      className={classes.pointer}
                      style={{ height: '20px', width: '20px' }}
                      src={place.status === 'Rental' ? '/for_rent.png' : '/for_sale.png'}
                    />
                    <img
                      className={classes.pointer}
                      style={{ height: '20px', width: '20px' }}
                      src={getImage(place.type)}
                    />
                  </Box>
                  <Typography className={classes.typography} variant="subtitle1" gutterBottom> {place.name}</Typography>
                  <Typography className={classes.typography} variant="inherit" gutterBottom> Cost: {Intl.NumberFormat('tr-TR').format(place.price)} TL</Typography>
                </Paper>
              )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
