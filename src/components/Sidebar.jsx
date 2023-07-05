import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box, Typography, Divider, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from 'react-router-dom';

const links = [
  { name: 'Estoque', route: '/', icon: <HomeIcon color="primary" /> },
  { name: 'Produtos', route: '/products', icon: <InfoIcon color="primary" /> },
  { name: 'Fornecedores', route: '/supplie', icon: <ContactsIcon color="primary" /> },
  { name: 'Administração', route: '/admin', icon: <ContactsIcon color="primary" /> }
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: { sm: 300 },
        flexShrink: { sm: 0 },
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container>
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Scala System
          </Typography>
          <Divider />
          
          <Box display="flex" alignItems="center" mt={2} mb={2}>
            <Avatar alt="Nome do Usuário" />
            <Box ml={1}>
              <Typography variant="body1">Nome do Usuário</Typography>
              <Typography variant="body2" color="textSecondary">Cargo do Usuário</Typography>
            </Box>
          </Box>

          <List>
            {links.map((link) => (
              <ListItem button key={link.name}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <Link to={link.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText primary={link.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Drawer>
  );
}

export default Sidebar;
