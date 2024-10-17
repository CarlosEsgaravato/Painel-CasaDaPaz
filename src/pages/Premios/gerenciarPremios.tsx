import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';

interface IForm {
    nome: string;
    descricao: string;
    imagem?: FileList;
}

const GerenciarPremios: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IForm>();
    const refForm = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            axios.get(`http://localhost:3001/premios/${id}`)
                .then((res) => {
                    setValue("nome", res.data.nome);
                    setValue("descricao", res.data.descricao);
                })
                .catch((err) => console.log(err));
        }
    }, [id, setValue]);

    const submitForm: SubmitHandler<IForm> = useCallback(
        async (data) => {
            const formData = new FormData();
            formData.append('nome', data.nome);
            formData.append('descricao', data.descricao);
            if (data.imagem && data.imagem.length > 0) {
                formData.append('imagem', data.imagem[0]);
            }
    
            // Log the FormData content
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
    
            try {
                if (isEdit) {
                    await axios.put(`http://localhost:3001/premios/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                } else {
                    await axios.post('http://localhost:3001/premios', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                }
                navigate('/premios');
            } catch (error: any) {
                if (error.response) {
                    console.error('Axios error:', error.response.data);
                } else {
                    console.error('Axios error:', error.message);
                }
            }
        }, [isEdit, id, navigate]
    );
    

    return (
        <LayoutDashboard>
            <h1>{isEdit ? 'Editar Premiação' : 'Adicionar Premiação'}</h1>
            <Container>
                <form
                    className="row g-3 needs-validation mb-3"
                    noValidate
                    style={{ alignItems: 'center' }}
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (refForm.current) {
                            refForm.current.classList.add('was-validated');
                        }
                        handleSubmit(submitForm)(event);
                    }}
                    ref={refForm}
                >
                    <div className="col-md-12">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome da Premiação"
                            id="nome"
                            required
                            {...register('nome', { required: 'Nome é obrigatório' })}
                        />
                        <div className="invalid-feedback">
                            {errors.nome && errors.nome.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <textarea
                            className="form-control"
                            placeholder="Descrição da Premiação"
                            id="descricao"
                            required
                            {...register('descricao', { required: 'Descrição é obrigatória' })}
                        />
                        <div className="invalid-feedback">
                            {errors.descricao && errors.descricao.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="imagem" className="form-label">Imagem (opcional)</label>
                        <input
                            type="file"
                            className="form-control"
                            id="imagem"
                            {...register('imagem')}
                        />
                    </div>

                    <div className="col-md-12">
                        <button type="submit" className="btn btn-success">
                            {isEdit ? 'Salvar Alterações' : 'Adicionar'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={() => navigate('/premios')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Container>
        </LayoutDashboard>
    );
};

export default GerenciarPremios;
