import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

type DocumentType = {
  id: string;
  name: string;
};

const TypesPage = () => {
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [open, setOpen] = useState(false);
  const [editType, setEditType] = useState<DocumentType | null>(null);
  const [typeName, setTypeName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('documentTypes');
    if (stored) {
      setTypes(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (updated: DocumentType[]) => {
    localStorage.setItem('documentTypes', JSON.stringify(updated));
    setTypes(updated);
  };

  const handleOpenCreate = () => {
    setEditType(null);
    setTypeName('');
    setOpen(true);
  };

  const handleOpenEdit = (type: DocumentType) => {
    setEditType(type);
    setTypeName(type.name);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = types.filter((t) => t.id !== id);
    saveToLocalStorage(updated);
  };

  const handleSave = () => {
    if (!typeName.trim()) return alert('El nombre es obligatorio');

    if (editType) {
      // Edición
      const updated = types.map((t) =>
        t.id === editType.id ? { ...t, name: typeName.trim() } : t
      );
      saveToLocalStorage(updated);
    } else {
      // Nuevo
      const newType: DocumentType = { id: uuidv4(), name: typeName.trim() };
      saveToLocalStorage([...types, newType]);
    }

    setOpen(false);
    setTypeName('');
    setEditType(null);
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h5" gutterBottom>
        Tipos de Documento
      </Typography>

      <Button variant="contained" onClick={handleOpenCreate} sx={{ mb: 2 }}>
        Crear Tipo
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.id}</TableCell>
                <TableCell>{type.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenEdit(type)}>Editar</Button>
                  <Button color="error" onClick={() => handleDelete(type.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editType ? 'Editar Tipo' : 'Crear Tipo'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre del Tipo"
            fullWidth
            margin="normal"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Guardar</Button>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TypesPage;
