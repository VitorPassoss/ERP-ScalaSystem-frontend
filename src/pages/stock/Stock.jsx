import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import TableStock from '../../components/TableStock';
import HeaderStock from '../../components/HeaderStock';

const Stock = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={8}>
        <HeaderStock />
        <TableStock />
      </Grid>
    </Grid>
  );
}

export default Stock;
