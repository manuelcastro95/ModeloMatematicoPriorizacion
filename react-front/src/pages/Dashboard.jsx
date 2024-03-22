import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Dashboard = ({ token }) => {
    const url_base = 'http://localhost:8001/api/';
    const [casos, setCasos] = useState([])
    const [criterios, setCriterios] = useState([])
    const [evaluador, setEvaluador] = useState([])
    const [evaluadores, setEvaluadores] = useState([])

    const me = async () => {
        fetch(`${url_base}auth/me`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                setEvaluador(response)
            });
    }

    const cargar_data = async () => {
        await fetch(`${url_base}casos-uso/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(data => data.json())
            .then(res => {
                setCasos(res)
            });

        await fetch(`${url_base}criterios/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(data => data.json())
            .then(res => {
                setCriterios(res)
            });

        await fetch(`${url_base}evaluadores/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(data => data.json())
            .then(res => {
                setEvaluadores(res)
            });
    }

    const enviar_evaluacion = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        if (token) {
            cargar_data()
            me()
        }
    }, [token])



    return (
        <div className="min-h-full border-2 border-gray-300 m-3 p-3">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">DashBoard - {evaluador.name}</h1>
            </div>

            <div className="container">
                <div className="columns-4">
                    <div className="max-w-sm rounded overflow-hidden border-2 border-x-slate-400 shadow-lg ml-5">
                        <div className="px-1 py-5">
                            <div className="font-bold  mb-2 text-center">Casos de uso / Historias de usuario</div>
                            <p className="text-gray-700 text-base text-center">
                                <Link to="/casos-uso-historias">{casos.length}</Link>
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden border-2 border-x-slate-400 shadow-lg ">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">Criterios</div>
                            <p className="text-gray-700 text-base text-center">
                                <Link to="/criterios">{criterios.length}</Link>
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden border-2 border-x-slate-400 shadow-lg ">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">Evaluadores</div>
                            <p className="text-gray-700 text-base text-center">
                                <Link to="/evaluadores">{evaluadores.length}</Link>
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden border-2 border-x-slate-400 shadow-lg ">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">Evaluaciones</div>
                            <p className="text-gray-700 text-base text-center">
                                <Link to="/evaluaciones" >0</Link>
                            </p>
                        </div>
                    </div>
                </div>


            </div>



            {/* <table className="min-w-full bg-white shadow-md rounded-xl">
                <thead>
                    <tr className="bg-blue-gray-100 text-gray-700" >
                        <th className="py-3 px-4 text-center text-sm">Caso de uso / Historia Usuario</th>
                        {criterios.map((criterio) => 
                            <th key={criterio.id} className="py-3 px-4 text-center text-sm">{criterio.nombre}</th>
                        ) }
                    </tr>
                </thead>
                <tbody  className="text-blue-gray-900">
                    {casos.map((caso) => 
                        <tr key={caso.id} className="border-2 border-blue-gray-200">
                            <td className="text-left pl-2 capitalize border-2">{caso.nombre}</td>
                            {criterios.map((criterio) => 
                                <td  className="py-3 px-4 text-center border-2 text-sm">
                                    <Input
                                        className='text-s'
                                        type='number'
                                        placeholder='calificacion'
                                        name='criterio_id'

                                    />
                                </td>
                            ) }
                            
                        </tr>
                    )}
                </tbody>
            </table> */}




        </div>
    );
}


export default Dashboard;