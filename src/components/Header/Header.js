import React, { useRef } from 'react';
import { AppBar, Toolbar, Typography, InputBase, FormControl } from '@material-ui/core';

import useStyles from './styles.js';

const Header = ({ searchText, setSearchText, setSearchEnter }) => {
  const classes = useStyles();

  const inputRef = useRef(null);

  const handleOnChange = (event) => {
    setSearchText(event.target.value);
    if (event.key === 'Enter') {
      setSearchEnter(event.target.value);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Real Estate Advisor
        </Typography>
        <FormControl>
          <InputBase type="hidden" className={classes.inputInput} placeholder="Search…" ref={inputRef} id="searchText" value={searchText} onChange={(e) => handleOnChange(e)} onKeyDown={(e) => handleOnChange(e)} />
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
