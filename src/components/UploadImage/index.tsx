import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Image {
    id: number;
    filename: string;
}

const UploadImage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [images, setImages] = useState<Image[]>([]);

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
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.success);
            loadImages(); // Recarrega a lista de imagens
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
        }
    };

    const loadImages = async () => {
        try {
            const response = await axios.get<Image[]>('http://localhost:8000/api/images');
            setImages(response.data);
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div>
            <h1>Upload de Imagens</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            <h2>Imagens</h2>
            <div>
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={`http://localhost:8000/storage/images/${image.filename}`}
                        alt={image.filename}
                        style={{ width: '200px', margin: '10px' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default UploadImage;
