import { useEffect, useState } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

interface IPremios {
    id: number;
    nome: string;
    descricao: string;
}

export default function Premios() {
    const navigate = useNavigate();
    const [premios, setPremios] = useState<Array<IPremios>>([]);

    useEffect(() => {
        let lsToken = localStorage.getItem('americanos.token');
        let token: IToken | null = null;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken);
        }

        if (!token || verificaTokenExpirado(token.accessToken) && 
        validaPermissao(['admin', 'usuario'], token?.user.permissoes)) {
            navigate('/');
        }

        if (!validaPermissao(['admin', 'usuario'], token?.user.permissoes)) {
            navigate('/dashboard');
        }

        axios.get('http://localhost:3001/premios')
            .then((resposta) => {
                setPremios(resposta.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [navigate]);

    return (
        <>
            <LayoutDashboard>
                <div className="d-flex justify-content-between mt-3">
                    <h1>Premiações</h1>
                    <Button variant="success" onClick={() => navigate('/premios/criar')}>
                        Adicionar
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
                            <tr key={premio.id}>
                                <td>{index + 1}</td>
                                <td>{premio.nome}</td>
                                <td>{premio.descricao}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => navigate(`/premios/editar/${premio.id}`)}
                                    >
                                        <FaEdit /> Editar
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
        </>
    );
}

