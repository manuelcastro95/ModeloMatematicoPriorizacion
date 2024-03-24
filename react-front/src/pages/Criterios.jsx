import React, { useEffect, useState } from 'react'
import Loader from '../components/dashboard/Loader';
import Label from '../components/Label';
import Button from '../components/Button';
import Input from '../components/Input';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const Criterios = () => {
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [peso, setPeso] = useState(0.0)
    const [criterios, setCriterios] = useState([])
    const [criterio, setCriterio] = useState([])

    const [titulo, setTitulo] = useState('Agregar Criterio')
    const [textButton, setTextButton] = useState('Agregar')
    const [accion, setAccion] = useState('crear')

    const url_base = 'http://localhost:8001/api/';

    const cargar_criterios = async () => {
        const data = await fetch(`${url_base}criterios`)
            .then(res => res.json())
            .then(data => data)
        setCriterios(data)
    }

    const update_criterio = async id => {
        const data = await fetch(`${url_base}criterios/show/${id}`)
            .then(res => res.json())
            .then(data => data)

        setCriterio(data)
        setTitulo('Actualizar información Criterio')
        setNombre(data.nombre)
        setDescripcion(data.descripcion)
        setPeso(data.peso)

        setTextButton('Actualizar')
        setAccion('actualizar')
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        let url_post = ''
        let method = 'POST'

        if (accion == 'crear') {
            url_post = `${url_base}criterios/store`
        } else if (accion == 'actualizar') {
            url_post = `${url_base}criterios/update/${criterio.id}`
            method = 'PUT'
        }

        let datos = {
            nombre: nombre,
            descripcion: descripcion,
            peso: peso
        }

        fetch(url_post, {
            'method': method,
            'body': JSON.stringify(datos),
            'headers': {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                cargar_criterios()
                Swal.fire({
                    title: '',
                    text: `${response.msg}`,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                })
                limpiar_campos();
            });
    }


    const limpiar_campos = () => {
        setTitulo('Agregar Criterio')
        setTextButton('Agregar')
        setNombre('')
        setDescripcion('')
        setPeso('')
        setAccion('crear')
    }
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        cargar_criterios();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className="grid grid-cols-1 gap-2 max-w-7xl rounded overflow-hidden shadow-lg ml-5 mt-4">
            <h1 className="font-bold text-xl mb-2 my-3 ml-5">Criterios</h1>

            <div className="ml-4 grid grid-cols-3 gap-3">
                <div className="overflow-x-auto  col-span-2 border-2 mx-auto">
                    <div className="inline-block">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-xl">
                                <thead>
                                    <tr className="bg-blue-gray-100 text-gray-700">
                                        <th className="py-3 px-4 text-left">Nombre</th>
                                        <th className="py-3 px-4 text-left">Descripcion</th>
                                        <th className="py-3 px-4 text-left">Peso</th>

                                        <th className="py-3 px-4 text-left">acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-gray-900">
                                    {criterios.map((criterio) =>
                                        <tr key={criterio.id} className="border-b border-blue-gray-200">
                                            <td className="py-3 px-4">{criterio.nombre}</td>
                                            <td className="py-3 px-4">{criterio.descripcion}</td>
                                            <td className="py-3 px-4">{criterio.peso}</td>
                                            <td className="py-3 px-4">
                                                <button
                                                    type="button"
                                                    onClick={() => update_criterio(criterio.id)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    editar
                                                </button>


                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full max-w-xl max-h-xl mx-auto">

                        <form onSubmit={enviarDatos} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-3">
                                <h2 className="block text-xl font-si leading-6 text-gray-900">{titulo}</h2>
                            </div>

                            <div className="mb-4">
                                <Label> Nombre  </Label>
                                <Input
                                    value={nombre}
                                    type="text"
                                    id="nombre"
                                    name="name"
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Peso </Label>
                                <Input
                                    value={peso}
                                    type="number"
                                    id="peso"
                                    name="peso"
                                    onChange={(e) => setPeso(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Descripcion </Label>
                                <textarea
                                    rows="5"
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    value={descripcion}
                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>


                            <div className="flex items-center justify-between">
                                
                                <button
                                    type='submit'
                                    className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                >
                                    {textButton}
                                </button>
                                
                            </div>
                        </form>
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={limpiar_campos}
                                className="w-full bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                            >
                                Limpiar Campos
                            </button>


                        </div>

                        <div className='mt-3'>
                            <button
                                className="w-full bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                            >
                                <Link to="/dashboard">Regresar</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Criterios