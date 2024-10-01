import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Produto from './pages/Produto'
import PageExampleState from './pages/PageExampleState'
import Usuarios from './pages/Usuarios'
import GerenciarUsuarios from './pages/Usuarios/Gerenciar'

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
                    path='/produto/:id'
                    element={<Produto />}
                />

                <Route
                    path='/example'
                    element={<PageExampleState />}
                />

            </Routes>
        </BrowserRouter>
    )
}