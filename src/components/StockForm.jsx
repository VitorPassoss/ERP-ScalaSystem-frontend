import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress } from '@mui/material';

export default function StockForm() {
  const [product_fk, setProduct] = useState("");
  const [lastQuantity, setLastQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/v1/products/')
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const stockData = {
      product_fk: product_fk,
      first_quantity: lastQuantity,
      current_quantity: lastQuantity
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockData)
    };

    fetch('http://localhost:8000/v1/stock/', config)
      .then((data) => {
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="product-label">Produto</InputLabel>
        <Select
          labelId="product-label"
          value={product_fk}
          label="Produto"
          onChange={(event) => setProduct(event.target.value)}
        >
          {productList.map((productItem) => (
            <MenuItem key={productItem.id} value={productItem.pk}>
              ID - {productItem.pk} -
              Nome - {productItem.name} -
              Fornecedor: {productItem.supplie_fk.social_reason} -
              Peso: {productItem.weight}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Quantidade Inicial"
        value={lastQuantity}
        onChange={(event) => setLastQuantity(event.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" type="submit" color="primary" disabled={loading} >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Inserir no estoque"}
      </Button>
    </form>
  );
}
