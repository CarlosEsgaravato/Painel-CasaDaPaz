import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

interface IPremio {
    id: number;
    nome: string;
    descricao: string;
    imagem?: string;
}

const Premios = () => {
    const navigate = useNavigate();
    const [premios, setPremios] = useState<Array<IPremio>>([]);

    useEffect(() => {
        axios.get('http://localhost:3001/premios')
            .then((resposta) => {
                setPremios(resposta.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <LayoutDashboard>
            <div className="d-flex justify-content-between mt-3">
                <h1>Premiações</h1>
                <Button variant="success" onClick={() => navigate('/premios/criar')}>
                    Adicionar Premiação
                </Button>
            </div>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {premios.map((premio, index) => (
                        <tr key={premio.id}>
                            <td>{index + 1}</td>
                            <td>{premio.nome}</td>
                            <td>{premio.descricao}</td>
                            <td>
                                {premio.imagem && <img src={premio.imagem} alt={premio.nome} style={{ width: '100px' }} />}
                            </td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => navigate(`/premios/editar/${premio.id}`)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        // Lógica para remover premiação
                                    }}
                                    className="ml-2"
                                >
                                    Remover
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </LayoutDashboard>
    );
};

export default Premios;
