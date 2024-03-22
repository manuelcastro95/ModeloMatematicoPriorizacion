import { useEffect, useState } from "react";
import Loader from "../components/dashboard/Loader";
import CardEvaluacion from "../components/CardEvaluacion";

const Evaluaciones = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const url_base = 'http://localhost:8001/api/';
    const [casos, setCasos] = useState([]);
    const [criterios, setCriterios] = useState([]);
    const [evaluador, setEvaluador] = useState('');
    const [calificacionCompletada, setCalificacionCompletada] = useState(false);

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
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="min-h-full border-2 border-gray-300 m-3 p-3">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Evaluaciones</h1>
            </div>

            {calificacionCompletada && casos.map((caso, index) => (
                <CardEvaluacion
                    key={caso.id}
                    criterios={criterios}
                    caso={caso}
                    numero_caso={index + 1}
                    total_casos={casos.length}
                    evaluador_id={evaluador.id}
                />
            ))}

            {!calificacionCompletada && (
                <button onClick={handleCalificacionCompleta}>Completar calificación</button>
            )}
        </div>
    );
};

export default Evaluaciones;
