import React from 'react';
import DocumentForm from '../components/DocumentForm';
import DocumentList from '../components/DocumentList';
import { Container } from '@mui/material';

const DocumentsPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <DocumentForm />
      <DocumentList />
    </Container>
  );
};

export default DocumentsPage;
