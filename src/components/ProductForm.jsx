import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress, Typography, Box, Divider } from '@mui/material';

export default function ProductForm() {
const [product_fk, setProduct] = useState("");
const [lastQuantity, setLastQuantity] = useState("");
const [loading, setLoading] = useState(false);
const [supplie, setSupplies] = useState([]);
const [newSupplie, setNewSupplie] = useState(false)
const [socialReason, setSocialReason] = useState("");
const [cnpj, setCnpj] = useState("");
const [postalCode, setPostalCode] = useState("");
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [weight, setWeight] = useState("");
const [adress, setAdress] = useState("")
const [nameProduct, setNameProduct] = useState("");


useEffect(() => {
    fetch('http://localhost:8000/v1/products/supplie/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSupplies(data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    let productData = {};

    if(newSupplie){
      productData = {
        name:nameProduct,
        price,
        weight,
        supplie_fk: {
          social_reason: socialReason,
          name: name,
          street: adress,
          postal_code: postalCode,
          cnpj: cnpj
        }
      };
    } else {
      productData = {
        name:nameProduct,
        price,
        weight,
        supplie_fk: product_fk,
      };
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData)
    };

    fetch('http://localhost:8000/v1/products/', config)
      .then((data) => {
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{
        width:'500px'
      }}>
        {!newSupplie && (

            <>
            <InputLabel id="product-label">Fornecedores</InputLabel>

            <Select
            labelId="product-label"
            value={product_fk}
            label="Fornecedores"
            onChange={(event) => setProduct(event.target.value)}
            >
            {supplie.map((supplieitem) => (
                <MenuItem key={supplieitem.id} value={supplieitem.id}>
                ID - {supplieitem.id} -
                Nome - {supplieitem.name} -
                Razao Social : {supplieitem.social_reason} -
                codigo postal: {supplieitem.postal_code} -
                cnpj : {supplieitem.cnpj}
                </MenuItem>
                
            ))}
            </Select>
            </>
        )}
       
        {newSupplie != true & product_fk == "" && (
            <Button variant="contained" onClick={()=>{
                setNewSupplie(true)
            }}>
                + Novo fornecedor
            </Button>
        )}
        
        {newSupplie && (
          <Box>
               <Typography variant='h5'>
                    Dados do Novo Fornecedor
                </Typography>
                <Divider />
            <TextField
              label="Razao Social"
              value={socialReason}
              onChange={(event) => setSocialReason(event.target.value)}
              fullWidth
              margin="normal"
            />
             <TextField
              label="Apelido"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CNPJ"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Codigo Postal"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Endereco"
              value={adress}
              onChange={(event) => setAdress(event.target.value)}
              fullWidth
              margin="normal"
            />

          </Box>
        )}
        
        <Typography variant='h5'>
          Dados do Produto
        </Typography>
        <Divider />
        <TextField
          label="Nome do Produto"
          value={nameProduct}
          onChange={(event) => setNameProduct(event.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Preço Produto"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Peso Produto"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" type="submit" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Inserir no estoque"}
        </Button>
      </FormControl>
    </form>
  );
}
