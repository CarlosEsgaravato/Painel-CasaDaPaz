import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard } from '../../components/LayoutDashboard';

const FormularioPremios = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/premios/${id}`)
                .then((res) => {
                    setNome(res.data.nome);
                    setDescricao(res.data.descricao);
                    setImagem(res.data.imagem);
                })
                .catch((err) => console.log(err));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('descricao', descricao);
        if (imagem) {
            formData.append('imagem', imagem);
        }

        try {
            console.log("Form submitted: ", { nome, descricao, imagem });

            if (id) {
                await axios.put(`http://localhost:3001/premios/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Edit successful");
            } else {
                await axios.post('http://localhost:3001/premios', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Addition successful");
            }

            navigate('/premios');
        } catch (error) {
            console.error('Axios error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <LayoutDashboard>
            <Container>
                <Form onSubmit={handleSubmit} className="my-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Nome da Premiação</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da premiação"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Digite a descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagem (opcional)</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setImagem(e.target.files[0])}
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        {id ? 'Salvar Alterações' : 'Adicionar'}
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/premios')} className="ml-2">
                        Cancelar
                    </Button>
                </Form>
            </Container>
        </LayoutDashboard>
    );
};

export default FormularioPremios;
