import React, { useState, useEffect } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaPremios = () => {
    const [premios, setPremios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/premios')
            .then((res) => setPremios(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleRemovePremio = (index) => {
        setPremios(premios.filter((_, i) => i !== index));
    };

    return (
        <LayoutDashboard>
            <Container>
                <div className="d-flex justify-content-between mt-3">
                    <h1>Premiações</h1>
                    <Button variant="success" onClick={() => navigate('/premios/criar')}>
                        <FaPlus /> Adicionar Premiação
                    </Button>
                </div>

                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {premios.map((premio, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{premio.nome}</td>
                                <td>{premio.descricao}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => navigate(`/premios/editar/${index}`)}
                                    >
                                        <FaEdit /> Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemovePremio(index)}
                                        className="ml-2"
                                    >
                                        Remover
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </LayoutDashboard>
    );
};

export default ListaPremios;
