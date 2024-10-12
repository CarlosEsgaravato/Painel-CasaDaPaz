import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Produto from './pages/Galeria'
import PageExampleState from './pages/Premios'
import Usuarios from './pages/Usuarios'
import GerenciarUsuarios from './pages/Usuarios/Gerenciar'
import Galeria from './pages/Galeria'
import Premios from './pages/Premios'
import ListaPremios from './pages/Premios/listaPremios'
import FormularioPremios from './pages/Premios/formularioPremios'

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* www.google.com.br/profchines */}
                <Route
                    path='/' // caminho 
                    element={<Login />} // elemento a ser enderizado
                />

                <Route
                    path='/dashboard'
                    element={<Dashboard />}
                />

                <Route
                    path='/usuarios'
                    element={<Usuarios />}
                />

                <Route
                    path='/usuarios/:id'
                    element={<GerenciarUsuarios />}
                />

                <Route
                    path='/premios'
                    element={<ListaPremios />}
                />

                <Route
                    path='/premios/criar'
                    element={<FormularioPremios />}
                />

                <Route
                    path='/premios/editar/:id'
                    element={<FormularioPremios />}
                />

                <Route
                    path='/galeria'
                    element={<Galeria />}
                />

            </Routes>
        </BrowserRouter>
    )
}