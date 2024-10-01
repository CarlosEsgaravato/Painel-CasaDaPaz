
import {
    SyntheticEvent, useCallback, useRef, useState
} from 'react'
import styles from './styles.module.css'

export default function PageExampleState() {

    // let contador = 0
    const refContador = useRef(0)
    const [estado, setEstado] = useState(0);

    // function nomeFuncao() {}
    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        let contador = 0
        console.log('Enviou o Formulario Estado')
        console.log(estado)
        console.log('refContador.current')
        console.log(refContador.current)
    }, [estado])

    return (
        <>
            <div className={styles.main}>
                <div className={styles.border}>
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className='text-primary'>
                            Contador Estado {estado}
                        </h1>
                        <h1 className='text-primary'>
                            Contador Ref {refContador.current}
                        </h1>
                        <p className='text-secundary'>
                            Preencha os campos para logar
                        </p>

                    </div>
                    <hr />

                    <form
                        className='needs-validation align-items-center'
                        noValidate
                        onSubmit={submitForm}
                    >
                        <div
                            className='col-md-12'
                        >
                            <label
                                htmlFor='email'
                                className='form-label'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Digite seu email'
                                id='email'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Por favor digite seu email
                            </div>
                        </div>
                        <div
                            className='col-md-12 mt-1'
                        >
                            <label
                                htmlFor='senha'
                                className='form-label'
                            >
                                Senha
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Digite sua senha'
                                id='senha'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Por favor digite sua senha
                            </div>
                        </div>
                        <div className='col-md-12 mt-3'>
                            <button
                                className='btn btn-primary w-100'
                                type='submit'
                                id='botao'
                            >
                                Enviar
                            </button>
                        </div>
                        <div className='col-md-12 mt-3'>
                            <button
                                className='btn btn-warning w-100'
                                type='button'
                                id='botao'
                                onClick={() => {
                                    setEstado(estado + 1)
                                }}
                            >
                                Somar
                            </button>
                        </div>
                        <div className='col-md-12 mt-3'>
                            <button
                                className='btn btn-success w-100'
                                type='button'
                                id='botao'
                                onClick={() => {
                                    refContador.current = refContador.current + 1
                                }}
                            >
                                Somar Ref
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}