import React, { useState, ChangeEvent, FormEvent } from 'react';
import { LayoutDashboard } from '../../../components/LayoutDashboard';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

const GerenciarGaleria: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Imagem enviada com sucesso!');
            navigate('/upload');
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
        }
    };

    return (
        <LayoutDashboard>
            <div className="d-flex align-items-center">
                <FaCamera style={{ marginRight: '10px' }} />
                <h1>Adicionar Imagem</h1>
            </div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Escolha uma imagem (JPG, JPEG, PNG)</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="success">Adicionar</Button>
                    <Button
                        type="button"
                        variant="secondary"
                        className="ml-2"
                        onClick={() => navigate('/upload')}
                    >
                        Cancelar
                    </Button>
                </Form>
            </Container>
        </LayoutDashboard>
    );
};

export default GerenciarGaleria;
