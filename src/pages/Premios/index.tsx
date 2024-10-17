import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

interface IPremio {
    id: number;
    nome: string;
    descricao: string;
    imagem?: string;
}

const Premios: React.FC = () => {
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

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:3001/premios/${id}`)
            .then(() => {
                setPremios(premios.filter(premio => premio.id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <LayoutDashboard>
            <div className="d-flex justify-content-between mt-3">
                <h1>Premiações</h1>
                <Button variant="success" onClick={() => navigate('/premios/criar')}>
                    Adicionar
                </Button>
            </div>

            <table className="table table-striped">
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
                                    onClick={() => handleDelete(premio.id)}
                                    className="ml-2"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LayoutDashboard>
    );
};

export default Premios;
