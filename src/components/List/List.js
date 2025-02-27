import React, { useState, useRef, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, Input, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

const List = ({ places, status, setStatus, rating, setRating, childClicked, isLoading, searchText, setSearchText, setSearchEnter, propertyType, setPropertyType }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  const inputRef = useRef(null);

  const handleOnChange = (event) => {
    setSearchText(event.target.value);
    if (event.key === 'Enter') {
      setSearchEnter(event.target.value);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">Property around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <MenuItem value="1">Home</MenuItem>
              <MenuItem value="2">Land</MenuItem>
              <MenuItem value="3">Office</MenuItem>
              <MenuItem value="4">All</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="status">Status</InputLabel>
            <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)} ref={inputRef}>
              <MenuItem value="Rental">Rental</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="2">Above 2.0</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="searchText">Text:</InputLabel>
            <Input ref={inputRef} id="searchText" value={searchText} onChange={(e) => handleOnChange(e)} onKeyDown={(e) => handleOnChange(e)} />
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
