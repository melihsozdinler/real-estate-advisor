import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPropertyData } from './api/realEstateFilter';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [status, setStatus] = useState('Rental');
  const [propertyType, setPropertyType] = useState('4');
  const [searchText, setSearchText] = useState('');
  const [searchEnter, setSearchEnter] = useState('');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getPropertyData(status, searchText, propertyType)
        .then((data) => {
          if (data !== undefined) {
            setPlaces(data.filter((place) => place.name && place.reviews > 0));
            setFilteredPlaces([]);
            setRating('');
          }
          setIsLoading(false);
        });
    }
  }, [bounds, status, searchEnter, propertyType]);

  return (
    <>
      <CssBaseline />
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        setSearchEnter={setSearchEnter}
      />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={3}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            status={status}
            setStatus={setStatus}
            rating={rating}
            setRating={setRating}
            searchText={searchText}
            setSearchText={setSearchText}
            setSearchEnter={setSearchEnter}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
          />
        </Grid>
        <Grid item xs={12} md={9} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
