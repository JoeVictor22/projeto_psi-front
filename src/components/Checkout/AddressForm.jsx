import React, {useState} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider} from 'react-hook-form';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';

const AddressForm = ({salvarInformacoes}) => {
    const methods = useForm();

    const [tipoEntrega, setTipoEntrega] = useState([])
    const [nome, setNome] = useState([]);
    const [endereco, setEndereco] = useState([]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Informações de entrega</Typography>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => salvarInformacoes({ ...data, nome, endereco }))}>
                    <Grid container spacing={3}>
                        <FormInput required name="nome" label="Name" />               
                        <FormInput required name="endereco" label="Endereço" />                              
                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/carrinho">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
 
export default AddressForm
