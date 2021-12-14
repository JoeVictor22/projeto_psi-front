import React, {useState} from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';

import useStyles from "./styles";
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

const steps = ["Endereço", "Detalhes do Pagamento"]

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [endereco, setEndereco] = useState({});

    const classes = useStyles();

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
    let Confirmation = () => (true ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {"nome"}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {"id da compra"}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    const salvarInformacoes = (data) => {
        setEndereco(data);
        nextStep();
      };

      const Form = () => (activeStep === 0
        ? <AddressForm nextStep={nextStep} salvarInformacoes={salvarInformacoes} />
        : <PaymentForm nextStep={nextStep} backStep={backStep} />);
    
        return (
            <>
              <CssBaseline />
              <div className={classes.toolbar} />
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Typography variant="h4" align="center">Checkout</Typography>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
              </main>
            </>
          );
        };


export default Checkout
