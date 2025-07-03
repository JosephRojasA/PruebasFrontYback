import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, TableContainer, Typography, Button, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, FormControl, InputLabel,
  Select, MenuItem
} from '@mui/material';

type DocumentData = {
  name: string;
  type: string;
  date: string;
  file: string;
  description: string;
  status?: string; // "Activo" o "Eliminado"
};

type DocumentType = {
  id: string;
  name: string;
};

const DocumentList = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadDocuments();
    loadTypes();
  }, []);

  const loadDocuments = () => {
    const stored = localStorage.getItem('documents');
    if (stored) {
      setDocuments(JSON.parse(stored));
    }
  };

  const loadTypes = () => {
    const storedTypes = localStorage.getItem('documentTypes');
    if (storedTypes) {
      setDocumentTypes(JSON.parse(storedTypes));
    }
  };

  const handleView = (doc: DocumentData) => {
    setSelectedDoc(doc);
    setEditMode(false);
  };

  const handleDownload = (doc: DocumentData) => {
    const link = document.createElement('a');
    link.href = doc.file;
    link.download = doc.name;
    link.click();
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
  if (!selectedDoc) return;

  const updatedDocuments = documents.map((doc) =>
    doc.file === selectedDoc.file ? { ...doc, ...selectedDoc } : doc
  );

  localStorage.setItem('documents', JSON.stringify(updatedDocuments));
  setDocuments(updatedDocuments);
  setEditMode(false);
  setSelectedDoc(null);
  alert('Documento actualizado correctamente');
};


  const handleDelete = (doc: DocumentData) => {
    const updated = documents.map((d) =>
      d.file === doc.file ? { ...d, status: 'Eliminado' } : d
    );
    localStorage.setItem('documents', JSON.stringify(updated));
    setDocuments(updated);
  };

  const handleClose = () => {
    setSelectedDoc(null);
  };

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
  <Button
    variant="outlined"
    onClick={() => setShowDeleted(!showDeleted)}
  >
    {showDeleted ? 'Ver activos' : 'Ver eliminados'}
  </Button>
</Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ p: 2 }}>Lista de Documentos</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents
  .filter((doc) => showDeleted ? doc.status === 'Eliminado' : doc.status !== 'Eliminado')

              .map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>{doc.description}</TableCell>
                  <TableCell>{doc.status || 'Activo'}</TableCell>
                  <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" onClick={() => handleView(doc)}>Ver</Button>

                    {!showDeleted && (
                      <>
                        <Button size="small" onClick={() => handleDownload(doc)}>Descargar</Button>
                        <Button size="small" onClick={() => {
                          handleView(doc);
                          setEditMode(true);
                        }}>Editar</Button>
                        <Button size="small" color="error" onClick={() => handleDelete(doc)}>Eliminar</Button>
                      </>
                    )}
                  </Box>
                </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={!!selectedDoc} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editMode ? 'Editar Documento' : 'Detalle del Documento'}
        </DialogTitle>
        <DialogContent>
          {selectedDoc && (
            <>
              {editMode ? (
                <>
                  <TextField
                    label="Nombre"
                    fullWidth
                    margin="normal"
                    value={selectedDoc.name}
                    onChange={(e) =>
                      setSelectedDoc((prev) => prev ? { ...prev, type: e.target.value } : prev)
                    }

                  />

                  <FormControl fullWidth margin="normal">
                    <InputLabel id="select-type-label">Tipo</InputLabel>
                    <Select
                      labelId="select-type-label"
                      value={selectedDoc.type}
                      label="Tipo"
                      onChange={(e) =>
                        setSelectedDoc({ ...selectedDoc, type: e.target.value })
                      }
                    >
                      {documentTypes.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Fecha"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={selectedDoc.date}
                    onChange={(e) =>
                      setSelectedDoc({ ...selectedDoc, date: e.target.value })
                    }
                  />

                  <TextField
                    label="Descripción"
                    fullWidth
                    margin="normal"
                    multiline
                    value={selectedDoc.description}
                    onChange={(e) =>
                      setSelectedDoc({ ...selectedDoc, description: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <Typography><strong>Nombre:</strong> {selectedDoc.name}</Typography>
                  <Typography><strong>Tipo:</strong> {selectedDoc.type}</Typography>
                  <Typography><strong>Fecha:</strong> {selectedDoc.date}</Typography>
                  <Typography><strong>Descripción:</strong> {selectedDoc.description}</Typography>
                  <Box mt={2}>
                    {selectedDoc.file.startsWith('data:application/pdf') ? (
                      <embed
                        src={selectedDoc.file}
                        type="application/pdf"
                        width="100%"
                        height="500px"
                      />
                    ) : (
                      <img src={selectedDoc.file} alt="Documento" style={{ maxWidth: '100%' }} />
                    )}
                  </Box>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button onClick={handleSaveEdit}>Guardar</Button>
              <Button onClick={() => setEditMode(false)}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit}>Editar</Button>
              <Button onClick={handleClose}>Cerrar</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DocumentList;
