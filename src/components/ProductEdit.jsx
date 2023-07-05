import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress } from '@mui/material';

export default function ProductEdit({editItem}) {
  const [lastQuantity, setLastQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [productData,SetProduct] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const stockData = {
      current_quantity: lastQuantity
    };


    const config = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockData)
    };

    fetch('http://localhost:8000/v1/stock/'+editItem, config)
      .then((data) => {
        setLoading(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8000/v1/stock/details/'+editItem)
      .then((res) => res.json())
      .then((data) => {
        SetProduct(data);
        setLastQuantity(data.current_quantity)
      });
  };


  return (
    <form onSubmit={handleSubmit}>
       
      <TextField
        label="Quantidade Atual"
        value={lastQuantity}
        onChange={(event) => setLastQuantity(event.target.value)}
        fullWidth
        type={'number'}
        margin="normal"
      />

      <Button variant="contained" type="submit" color="primary" disabled={loading} >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Alterar Quantidade"}
      </Button>
    </form>
  );
}
