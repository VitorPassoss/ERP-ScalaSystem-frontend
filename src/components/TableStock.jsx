import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import StockForm from './StockForm';
import ProductEdit from './ProductEdit';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {  LinearProgress, Grid, Chip } from '@mui/material';
import { Business, Room, MonetizationOn, LocalShipping, VpnKey } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person';


function createData(id, name, quantity, unitValue, entryDate, product_fk) {
  return {
    id,
    name,
    quantity,
    unitValue,
    entryDate,
    product_fk
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Produto',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantidade Atual',
  },
  {
    id: 'unitValue',
    numeric: true,
    disablePadding: false,
    label: 'Quantidade de entrada',
  },
  {
    id: 'entryDate',
    numeric: true,
    disablePadding: false,
    label: 'Data de entrada',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {numSelected, handleStockFormSubmit, selected } = props; // add selected here
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExitClick = () => {
    if (props.handleSelectedItemProcess && selected.length > 0) {
      props.handleSelectedItemProcess(selected[0]);
    }
  };

  useEffect(() => {
    fetch('http://54.94.34.148:8000/v1/products/')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Produtos em estoque
        </Typography>
      )}
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        <AddIcon /> Estoque
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Produto</DialogTitle>
        <DialogContent>
          <StockForm onStockFormSubmit={handleStockFormSubmit}  />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      {numSelected > 0 ? (
        <Tooltip title="Registrar Saida" sx={{
          margin:2
        }}>
            <Button variant='contained' color="primary" size='small' onClick={handleExitClick}>
                <LogoutIcon />
                Saida
            </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Filtrar lista">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleStockFormSubmit: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,  // add this line
};


export default function TableStock() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const [editItem, setEditItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);

  // Fetch data from API when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectedItemProcess = (itemId) => {
     const config = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch('http://54.94.34.148:8000/v1/stock/exit/history/'+itemId, config)
      .then((data) => {
        window.location.reload();
      });
    

  };

  const fetchData = () => {
    fetch('http://54.94.34.148:8000/v1/stock/')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item, index) =>
          createData(
            item.id,
            item.product_fk.name,
            item.current_quantity,
            item.first_quantity,
            new Date(item.created_at),
            item.product_fk.pk,
          )
        );
        setData(formattedData);
      });
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handleEditOpen = (item) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [data, order, orderBy, page, rowsPerPage]
  );

  const handleStockFormSubmit = () => {
    fetchData(); // Update table data after form submission
  };

  const fetchProductDetails = (id) => {
    fetch(`http://54.94.34.148:8000/v1/products/details/${id}`)
      .then(response => response.json())
      .then(data => {
        setProductDetails(data);
        setDetailOpen(true); // abrir o modal após carregar os detalhes
      })
      .catch(err => console.error(err));
};


  const handleDetails = (id_item) => {
      fetchProductDetails(id_item);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogContent>
            <ProductEdit editItem={selectedItem} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)}>
    <DialogTitle>Detalhes do Produto</DialogTitle>
    <DialogContent>
        {productDetails ? (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                   
                    <Chip icon={<PersonIcon />} label={`ID: ${productDetails.pk}`} />
                </Grid>
                <Grid item xs={12}>
                  <Chip icon={<PersonIcon />} label={`Nome: ${productDetails.name}`} />
                </Grid>
                <Grid item xs={12}>
                    <Chip icon={<MonetizationOn />} label={`Preço: ${productDetails.price}`} />
                </Grid>
                <Grid item xs={12}>
                    <Chip icon={<LocalShipping />} label={`Peso: ${productDetails.weight}`} />
                </Grid>
                <Grid item xs={12}>
                    <Chip icon={<PersonIcon />} label={`Razao social fornecedor: ${productDetails.supplie_fk.social_reason}`} />

                </Grid>
                <Grid item xs={12}>
                    <Chip icon={<VpnKey />} label={`CNPJ: ${productDetails.supplie_fk.cnpj}`} />
                </Grid>
                <Grid item xs={12}>
                    <Chip icon={<Business />} label={`Endereço: ${productDetails.supplie_fk.street}`} />
                </Grid>
                <Grid item xs={12}>
                    <Chip icon={<Room />} label={`CEP: ${productDetails.supplie_fk.postal_code}`} />
                </Grid>
            </Grid>
        ) : (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setDetailOpen(false)}>Fechar</Button>
    </DialogActions>
</Dialog>



      <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
          numSelected={selected.length}
          handleStockFormSubmit={handleStockFormSubmit}
          selected={selected} // add this line
          handleSelectedItemProcess={handleSelectedItemProcess}
        />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />

            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    key={row.id} 
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    
                    <TableCell>
      
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.id}
                    </TableCell>

                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.unitValue}</TableCell>
                    <TableCell align="right">{row.entryDate.toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditOpen(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDetails(row.product_fk)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
