import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DocumentsPage from '../ui/pages/DocumentsPage';
import TypesPage from '../ui/pages/TypesPage';
import NotFound from '../ui/pages/NotFound';
import { Button, Box } from '@mui/material';

const App = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="contained" component={Link} to="/">Documentos</Button>
        <Button variant="contained" component={Link} to="/types">Tipos de Documento</Button>
      </Box>
      <Routes>
        <Route path="/" element={<DocumentsPage />} />
        <Route path="/types" element={<TypesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

export default App;