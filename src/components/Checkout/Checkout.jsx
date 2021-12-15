import React, {useState} from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';

import useStyles from "./styles";
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

const steps = ["Endereço", "Detalhes do Pagamento"]

const Checkout = ({ carrinho }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [endereco, setEndereco] = useState({});
    const [pagamento, setPagamento] = useState({});

    const classes = useStyles();

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
  	const goToWhatsapp = () => {
      console.log("aaa", endereco, pagamento)

      let nome = "João" || endereco.nome
      let enderecoo = "Rua sem saída, 15" || endereco.endereco
      let total = 0
      let produtos = ""
      let telefone = "5585986826485"
      let infoPagamento = "Pagamento em cartão"
 
        for (var key in carrinho){
          let subtotal =  carrinho[key].preco * carrinho[key].quantity
          total += subtotal
          produtos += carrinho[key].quantity + " x " + carrinho[key].nome +
          "\n\ Valor unitário (R$ " + carrinho[key].preco +")"+ 
          "\n\ Subtotal do item: R$ " +subtotal 
        }

      
      let mensagem = "✅ NOVO PEDIDO \n\ "+
      "▶ RESUMO DO PEDIDO\n\ " + 
      produtos +"\n\ " +
      "▶ Dados para entrega\n\  " +
  
      "Nome: "+ nome +
      "\n\ Endereço: " +enderecoo +
  
      "\n\ ▶ TOTAL = R$ " + total + 
      "\n\ ▶ PAGAMENTO " +
      infoPagamento +
      "\n\ Pagamento em Dinheiro"
      console.log(mensagem)
  
      let url = "https://api.whatsapp.com/send?phone="+telefone +"&text="+mensagem
      url = encodeURI(url)
      console.log(url)
  
      window.location.href = url
  
    }

    console.log(pagamento, endereco)


    let Confirmation = () => (true ? (
        <>
          <div>
            <Typography variant="h5">Falta pouco para realizar seu pedido!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Clique no botão para enviar seu pedido</Typography>
            <br/>    
              <Button onClick={goToWhatsapp}  variant="contained" color="primary">Enviar pedido</Button>
            <br/>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Menu principal</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
      const salvarEndereco = (data) => {
        
        setEndereco(data);
        nextStep();
      };
      const salvarPagamento = (data) => {
        setPagamento(data);
        nextStep();
      };

      const Form = () => (activeStep === 0
        ? <AddressForm nextStep={nextStep} salvarInformacoes={salvarEndereco} />
        : <PaymentForm nextStep={nextStep} backStep={backStep} salvarInformacoes={salvarPagamento} />);
    
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
