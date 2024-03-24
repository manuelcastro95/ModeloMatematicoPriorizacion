import React, { useState } from 'react';

const CardEvaluacion = (props) =>{
    const [calificaciones, setCalificaciones] = useState([]);
    const [textButton, setTextButton] = useState('Guardar')
    const [estadoButton, setEstadoBUtton] = useState('completar')

    const handleChange = (e, criterioId) => {
        const updatedCalificaciones = [...calificaciones];
        const index = updatedCalificaciones.findIndex(item => item.criterioId === criterioId);

        if (index !== -1) {
            updatedCalificaciones[index] = { criterioId, evaluacion: e.target.value};
        } else {
            updatedCalificaciones.push({ criterioId, evaluacion: e.target.value });
        }

        setCalificaciones(updatedCalificaciones);
    };

    const guardarCalificaciones = (e) => {
        e.preventDefault();
        const evaluacionesPorCaso = {
            caso_id: props.caso.id,
            evaluaciones: calificaciones.map(calificacion => ({
                criterio_id: calificacion.criterioId,
                valor: calificacion.evaluacion,
                evaluador_id: props.evaluador_id
            }))
        };

        props.onGuardarCalificaciones(evaluacionesPorCaso);

        if(estadoButton == 'completar'){
            setTextButton('Editar');
            setEstadoBUtton('editar');
        } else if(estadoButton == 'editar'){
            setEstadoBUtton('completar');
            setTextButton('Guardar')
        }
    };


    

    return (
        <div className="max-w-xl mx-auto pb-7 px-1">
            <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
                <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl border border-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
                    <div className="mb-1 pb-2 flex items-center border-b border-gray-600">
                        <div className="ml-5 grid grid-cols-3">
                            <span className="mr-28 w-full text-lg col-span-2  font-semibold text-gray-950 capitalize">{props.caso.nombre}</span>
                            <span className="text-2xl text-right font-semibold text-gray-950 capitalize inline-block">{props.numero_caso}/{props.total_casos}</span>
                        </div>
                    </div>
                    <form onSubmit={guardarCalificaciones}>
                        <div className='w-full'>
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Criterio
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Evaluacion
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.criterios.map(criterio =>
                                        <tr key={criterio.id} className="bg-gray-100 border-b">
                                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-l-emerald-50">
                                                {criterio.nombre}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-2  whitespace-nowrap">
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={5}
                                                    name={criterio.id}
                                                    key={criterio.id}
                                                    className='w-24 p-0'
                                                    onChange={(e) => handleChange(e, criterio.id)}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="submit"
                            className="mt-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            id='btn-submit'
                        >
                            {textButton}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CardEvaluacion;
