import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DocumentsPage from '../ui/pages/DocumentsPage';
import TypesPage from '../ui/pages/TypesPage';
import NotFound from '../ui/pages/NotFound';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const App = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Document Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">Documentos</Button>
          <Button color="inherit" component={Link} to="/types">Tipos</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<DocumentsPage />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
