import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
} from '@mui/material';

type DocumentData = {
  name: string;
  type: string;
  date: string;
  file: string; // base64
  description: string;
  status?: string;
};

type DocumentType = {
  id: string;
  name: string;
};

const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

const DocumentForm = () => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    date: '',
    description: '',
    file: null as File | null,
  });
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedTypes = localStorage.getItem('documentTypes');
    if (storedTypes) {
      setDocumentTypes(JSON.parse(storedTypes));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, file }));
  };

  const validateFile = (file: File | null) => {
    if (!file) return false;
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension && allowedExtensions.includes(extension);
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (!form.name || !form.type || !form.date || !form.description || !form.file) {
    setError('Todos los campos son obligatorios.');
    return;
  }

  if (!validateFile(form.file)) {
    setError('Formato de archivo no válido. Usa PDF, JPG o PNG.');
    return;
  }

  const fileBase64 = await toBase64(form.file);

  const newDocument: DocumentData = {
    name: form.name,
    type: form.type,
    date: form.date,
    description: form.description,
    file: fileBase64,
    status: 'Activo',
  };

  const storedDocs = JSON.parse(localStorage.getItem('documents') || '[]');
  storedDocs.push(newDocument);
  localStorage.setItem('documents', JSON.stringify(storedDocs));

  // 🚨 ESTA LÍNEA ES LA CLAVE
  window.dispatchEvent(new Event('document-added'));

  alert('Documento guardado correctamente ✅');
  setForm({
    name: '',
    type: '',
    date: '',
    description: '',
    file: null,
  });
};


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Nuevo Documento</Typography>
      <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} required />
      <TextField
        label="Tipo de Documento"
        name="type"
        value={form.type}
        onChange={handleChange}
        select
        required
      >
        {documentTypes.map((type) => (
          <MenuItem key={type.id} value={type.name}>
            {type.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Fecha de creación"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Descripción"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={3}
        required
      />
      <Button variant="outlined" component="label">
        Seleccionar archivo
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" hidden onChange={handleFileChange} />
      </Button>
      {form.file && <Typography variant="body2">Archivo seleccionado: {form.file.name}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained">Guardar</Button>
    </Box>
  );
};

export default DocumentForm;
