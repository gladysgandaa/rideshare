import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

import { useFormFields } from "../../libs/hooksLib";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function AddCar(props) {
  const classes = useStyles();
  console.log("These are the props:", props.carId);

  const [fields, handleFieldChange] = useFormFields({
    make: "",
    model: "",
    rentalCostPerHour: "",
    numberOfSeats: "",
    year: "",
    Longitude: "",
    Latitude: ""
  });

  const submitVehicle = e => {
    e.preventDefault();

    const vehicleData = {
      make: fields.make,
      model: fields.model,
      rentalCostPerHour: fields.rentalCostPerHour,
      numberOfSeats: fields.numberOfSeats,
      year: fields.year,
      returnDate: null,
      retired: false,
      currentLocation: {
        Latitude: fields.Latitude,
        Longitude: fields.Longitude
      }
    };
    console.log("Vehicle Date to Put", vehicleData);

    if (props.action == "EDITING") {
      axios({
        method: "put",
        url:
          "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=" +
          props.carId,
        headers: {},
        data: vehicleData
      }).then(res => {
        window.location.reload();
      });
    } else if (props.action == "ADDING") {
      console.log("there are no props");
      console.log(vehicleData);
      axios({
        method: "post",
        url: "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car",
        headers: {},
        data: vehicleData
      }).then(res => {
        window.location.reload();
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a Car
        </Typography>
        <form className={classes.form} onSubmit={submitVehicle} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="make"
                label="Car's Make"
                name="make"
                autoComplete="make"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="model"
                label="Car's Model"
                name="model"
                autoComplete="model"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rentalCostPerHour"
                label="Price per hour"
                name="rentalCostPerHour"
                autoComplete="rentalCostPerHour"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="numberOfSeats"
                label="Number of Seats"
                name="numberOfSeats"
                autoComplete="numberOfSeats"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="year"
                label="Make Year"
                name="year"
                autoComplete="year"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Latitude"
                label="Latitude"
                name="Latitude"
                autoComplete="Latitude"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Longitude"
                label="Longitude"
                name="Longitude"
                autoComplete="Longitude"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Car
          </Button>
        </form>
      </div>
    </Container>
  );
}
