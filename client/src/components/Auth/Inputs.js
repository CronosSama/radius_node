import { InputAdornment, TextField, Grid, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';

const Inputs = ({ handleChange, handleShowPassword, half, name, label, autoFocus, type}) => {
  return (

    <Grid item xs={12} sm={half ? 6 : 12} >
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={ name === "password" && {
          endAdornment : (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff /> }
                </IconButton>
            </InputAdornment>
          )
        } }

        />
    </Grid>



  )
};

export default Inputs;
