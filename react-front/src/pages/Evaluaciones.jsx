import { useEffect, useState } from "react";
import Loader from "../components/dashboard/Loader";
import CardEvaluacion from "../components/CardEvaluacion";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Evaluaciones = ({ token }) => {
    const url_base = 'http://localhost:8001/api/';
    const [loading, setLoading] = useState(true);
    const [casos, setCasos] = useState([]);
    const [criterios, setCriterios] = useState([]);
    const [evaluador, setEvaluador] = useState('');
    const [calificacionCompletada, setCalificacionCompletada] = useState(false);
    const [calificacionesFinales, setCalificacionesFinales] = useState([]);
    const goTo = useNavigate();


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
                setEvaluador(response);
            });
    };

    const cargar_data = async () => {
        await fetch(`${url_base}casos-uso/`)
            .then(data => data.json())
            .then(res => {
                setCasos(res);
            });

        await fetch(`${url_base}criterios/`)
            .then(data => data.json())
            .then(res => {
                setCriterios(res);
            });
    };

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        cargar_data();
        if (token) {
            me();
        }
    }, [token]);

    const handleCalificacionCompleta = () => {
        setCalificacionCompletada(true);
        setCalificacionesFinales(calificaciones => [...calificaciones, ...calificacionesFinales]);
    };

    const guardarCalificaciones = (evaluacionesPorCaso) => {
        // Buscar si ya hay calificaciones para este caso
        const index = calificacionesFinales.findIndex(calificacion => calificacion.caso_id === evaluacionesPorCaso.caso_id);

        // Si ya hay calificaciones, reemplazarlas
        if (index !== -1) {
            const nuevasCalificacionesFinales = [...calificacionesFinales];
            nuevasCalificacionesFinales[index] = evaluacionesPorCaso;
            setCalificacionesFinales(nuevasCalificacionesFinales);
        } else {
            // Si no, agregarlas
            setCalificacionesFinales(calificaciones => [...calificaciones, evaluacionesPorCaso]);
        }
    };

    const storeCalificaciones = async () => {
        console.log(calificacionesFinales);

        fetch(`${url_base}evaluaciones/guardar-evaluaciones`, {
            'method': 'POST',
            'body': JSON.stringify(calificacionesFinales),
            'headers': {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => {

                Swal.fire({
                    title: 'Error!',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                })
            })
            .then((response) => {
                Swal.fire({
                    title: '',
                    text: `${response.msg}`,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                })

                goTo("/dashboard");
            });
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="min-h-full border border-gray-300 m-3 p-3">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Nueva Calificación</h1>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {calificacionCompletada && casos.map((caso, index) => (
                    <div key={caso.id}>
                        <CardEvaluacion
                            key={caso.id}
                            criterios={criterios}
                            caso={caso}
                            numero_caso={index + 1}
                            total_casos={casos.length}
                            evaluador_id={evaluador.id}
                            onGuardarCalificaciones={guardarCalificaciones}
                        />
                    </div>
                ))}
            </div>

            {!calificacionCompletada && (
                <button
                    onClick={handleCalificacionCompleta}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Completar Calificacion
                </button>
            )}
            {calificacionCompletada && (
                // <button onClick={verCalificaciones}>Ver Calificaciones</button>

                <div className="w-full  place-content-center inline-flex">
                    <button
                        onClick={storeCalificaciones}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        Finalizar Calificacion
                    </button>

                    <button
                        className="ml-2 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                    >
                        <Link to="/dashboard">Regresar</Link>
                    </button>
                </div>


            )}
        </div>
    );
};

export default Evaluaciones;
