import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import TableProducts from '../../components/TableProducts'
import TableStock from '../../components/TableStock'

const Product = () => {
  return (
    <div>
    <Grid container>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={8}>
        <TableProducts />
      </Grid>
    </Grid>
    </div>
  )
}

export default Product