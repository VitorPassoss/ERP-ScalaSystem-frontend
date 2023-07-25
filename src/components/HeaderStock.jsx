import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material';

const HeaderStock = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://54.94.34.148:8000/v1/stock/info/dashboard');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '0.00';
  };

  return (
    <Box p={{ xs: 3, sm: 3, md: 3 }} my={{ xs: 2, sm: 3, md: 4 }} borderRadius='8px' sx={{ background: 'white' }}>
      <Typography sx={{ marginBottom: 4 }}>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ background: '#6425FE', height: '116px', mx: 2, borderRadius: '8px' }}>
          <Typography color="white">Produtos cadastrados</Typography>
          <Typography color="white">{dashboardData?.total_products}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ background: '#6425FE', height: '116px', mx: 2, borderRadius: '8px' }}>
          <Typography color="white">Unidades Total</Typography>
          <Typography color="white">{dashboardData?.total_unity_products}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ background: '#6425FE', height: '116px', mx: 2, borderRadius: '8px' }}>
          <Typography color="white">Fornecedores</Typography>
          <Typography color="white">{dashboardData?.supplie}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ background: '#6425FE', height: '116px', mx: 2, borderRadius: '8px' }}>
          <Typography color="white">Valor Potencial</Typography>
          <Typography color="white">{formatCurrency(dashboardData?.price_profit)}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ background: '#6425FE', height: '116px', mx: 2, borderRadius: '8px' }} color="white">
          <Typography color="white">Saidas</Typography>
          <Typography color="white">{dashboardData?.Saidas}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderStock;
