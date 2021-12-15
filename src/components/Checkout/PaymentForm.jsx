import React, {useState} from 'react'
import { InputLabel, Select, MenuItem, Divider,Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider} from 'react-hook-form';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';

const PaymentForm = ({ salvarInformacoes, nextStep, backStep }) => {
  const handleSubmit = async (event, elements, stripe) => {
    console.log("simbora")
  };
  const methods = useForm();
  const [tipoPagamento, setTipoPagamento] = useState([])
  const [troco, setTroco] = useState([]);

  const handleChange = (event) => {
    setTipoPagamento(event.target.value);
  };

  return (
    <>
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Forma de pagamento</Typography>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => salvarInformacoes({ ...data, troco, tipoPagamento }))}>
                    <Grid container xs={12} sm={12} spacing={3}>
                    <Grid item  xs={12} sm={12} spacing={3} bottomGutter>
                        <InputLabel>Tipo de pagamento</InputLabel>
                        <Select
                          fullWidth 
                          labelId="tipo-pagamento"
                          value={tipoPagamento}
                          onChange={handleChange}
                          label="Tipo de pagamento"
                        >
                          <MenuItem selected value={1}>Dinheiro</MenuItem>
                          <MenuItem value={2}>Cartão</MenuItem>
                        </Select>
                      </Grid>
                    <Grid item xs={12} sm={12} spacing={3}>
                    {tipoPagamento === 1 && <FormInput required name="troco" label="Troco para" />}
                    </Grid>
                    </Grid>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/carrinho">Voltar ao carrinho</Button>
                        <Button type="submit" variant="contained" color="primary">Continuar</Button>
                    </div>
                </form>
            </FormProvider>
    </>
  );
};

export default PaymentForm;