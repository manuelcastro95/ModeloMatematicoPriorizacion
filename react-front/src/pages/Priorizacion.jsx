import { useEffect, useState } from "react";
import Loader from "../components/dashboard/Loader";
import Label from "../components/Label";
import { Link } from "react-router-dom";
import CardPriorizado from "../components/CardPriorizado";
import Modal from "../components/Modal";
const Priorizacion = ({ token }) => {
    const url_base = 'http://localhost:8001/api/';
    const [loading, setLoading] = useState(true);
    const [casosPriorizados, setCasosPriorizados] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    // const [rutaPdf, setRutaPdf] = useState("../assets/pdf/documentacion_modelo_matematico.pdf")

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const cargar_casos_pririzados = async () => {
        await fetch(`${url_base}evaluaciones/generar-priorizacion`)
            .then(data => data.json())
            .then(res => {
                setCasosPriorizados(res)
            })
    }



    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [token]);

    return loading ? (
        <Loader />
    ) : (
        <div className="py-16">
            <div className="mx-auto px-6 max-w-6xl text-gray-500">
                <div className="text-center mb-4">
                    <h2 className="text-3xl text-gray-950 dark:text-white font-semibold">Casos uso / Historias usuario Priorizados</h2>
                </div>

                <button
                    onClick={cargar_casos_pririzados}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Generar Priorización
                </button>

                
                <button
                    onClick={toggleModal}

                    className="ml-3 bg-transparent hover:bg-slate-400 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded"
                >
                    Documentacion Modelo
                </button>

                <button
                    className="ml-2 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                >
                    <Link to="/dashboard">Regresar</Link>
                </button>


                <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {casosPriorizados.map((caso, i) =>
                        <CardPriorizado
                            key={i}
                            nombre={caso.nombre}
                            puntaje={caso.puntaje_total_caso}
                            orden={i + 1}
                        />
                    )}
                </div>
            </div>

            <Modal 
                isOpen={modalOpen}
                toggleModal={toggleModal}
                ruta='/assets/pdf/documentacion_modelo_matematico.pdf'
            />

        </div>

    )
}

export default Priorizacion