import React, { useState, useEffect } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

interface Image {
    id: number;
    filename: string;
}

const Galeria: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const navigate = useNavigate();

    const loadImages = async () => {
        try {
            const response = await axios.get<Image[]>('http://localhost:8000/api/images');
            setImages(response.data);
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/images/${id}`);
            console.log('Resposta da API ao deletar:', response);
            setImages(images.filter(image => image.id !== id));
        } catch (error) {
            console.error('Erro ao deletar imagem:', error);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <LayoutDashboard>
            <div className="d-flex justify-content-between mt-3">
                <h1>Galeria de Imagens</h1>
                <Button variant="success" onClick={() => navigate('/galeria/gerenciar')}>
                    Adicionar Imagem
                </Button>
            </div>
            <div className="d-flex flex-wrap">
                {images.map((image) => (
                    <div key={image.id} style={{ margin: '10px', position: 'relative' }}>
                        <img
                            src={`http://localhost:8000/storage/images/${image.filename}`}
                            alt={image.filename}
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                        <Button
                            variant="light"
                            onClick={() => handleDelete(image.id)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                border: 'none',
                                padding: '5px',
                                borderRadius: '50%',
                            }}
                        >
                            <FaTimes style={{ color: 'black' }} />
                        </Button>
                    </div>
                ))}
            </div>
        </LayoutDashboard>
    );
};

export default Galeria;
