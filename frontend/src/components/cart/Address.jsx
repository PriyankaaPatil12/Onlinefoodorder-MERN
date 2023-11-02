import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {loadStripe} from '@stripe/stripe-js';



export default function Address() {
    const dispatch = useDispatch();
const data = useSelector((state) => state.cart.cartData);


const makepayment = async() =>{
    const stripe = await loadStripe("pk_test_51NlxoSSEauZqEu7zccvOLpuHf51PnISYIvEkrGzuG9iTMuRBBYChIqINpa8Rbr1y4r5wo4WWdtPdWcyAXEdUlERD00RBitslnC")
    
    const body = {
      product:data.data
    }
    const headers = {
      "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:8004/api/create-checkout-session", {
      method: "POST",
      headers:headers,
      body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })

    if(result.error){
      console.log(result.error);
    }
  
  }


  return (
    <Container style={{ marginTop: "150px" }}>
      <React.Fragment>
        <Typography variant="h6" className="mt-8" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
          <Grid item xs={12}>
            <Button className="bg-black text-white" onClick={makepayment}>NEXT</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </Container>
  );
}
