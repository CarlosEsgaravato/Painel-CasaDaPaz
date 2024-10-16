import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import GerenciarUsuarios from './pages/Usuarios/Gerenciar'
import Galeria from './pages/Galeria'
import Premios from './pages/Premios'
import GerenciarPremios from './pages/Premios/gerenciarPremios'
import GerenciarEvento from './pages/Galeria/gerenciarEvento'
import VisualizarFotos from './pages/Galeria/vizualizarFotos'
import AdicionarFotos from './pages/Galeria/adicionarFotos'


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
                    element={<Premios />}
                />

                <Route
                    path='/premios/criar'
                    element={<GerenciarPremios />}
                />

                <Route
                    path='/premios/editar/:id'
                    element={<GerenciarPremios />}
                />

                <Route
                    path='/galeria'
                    element={<Galeria />}
                />

                <Route
                    path='/galeria/criar'
                    element={<GerenciarEvento />}
                />

                <Route 
                    path='/galeria/editar/:id' 
                    element={<GerenciarEvento />} 
                />

                <Route 
                    path='/galeria/:id/fotos' 
                    element={<VisualizarFotos />} 
                />

                <Route 
                    path='/galeria/:id/fotos/adicionar' 
                    element={<AdicionarFotos />} 
                />

            </Routes>
        </BrowserRouter>
    )
}