import { useEffect } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

    const navigate = useNavigate()

    useEffect(() => {
        let lsToken = localStorage.getItem('americanos.token')

        let token: IToken | null = null

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
        }

        if (!token || verificaTokenExpirado(token.accessToken)){
            navigate('/')
        }




    }, [])

    return (
        <>
            <LayoutDashboard>
                <h1>TESTE PARA INCIAR A CASA DA PAZ</h1>
            </LayoutDashboard>
        </>
    )
}