<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CasosUso;
use App\Models\Criterio;
use App\Models\Evaluacion;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Decimal;


class EvaluacionController extends Controller
{

    public function index()
    {
    }

    public function guardarEvaluaciones(Request $request)
    {
        $data = $request->all();



        foreach ($data as $item) {
            $caso_id = $item['caso_id'];
            $evaluaciones = $item['evaluaciones'];

            foreach ($evaluaciones as $evaluacion) {
                Evaluacion::create([
                    'caso_uso_id' => $caso_id,
                    'criterio_id' => $evaluacion['criterio_id'],
                    'valor' => $evaluacion['valor'],
                    'evaluador_id' => 3,
                ]);
            }
        }
        return response()->json(['msg' => 'Evaluaciones guardadas exitosamente']);
    }

    public function generarPriorizacion()
    {
        // Obtener todos los casos de uso con sus evaluaciones
        $casosUso = CasosUso::with('evaluaciones')->get();

        // Arreglo para almacenar los resultados finales
        $salida = [];


        foreach ($casosUso as $casoUso) :
            // Arreglo para almacenar los promedios ponderados por criterio
            $calificacionesFinales = [];

            // Obtener todas las evaluaciones para este caso de uso
            $evaluaciones = $casoUso->evaluaciones;

            // Agrupar las evaluaciones por criterio
            $evaluacionesPorCriterio = $evaluaciones->groupBy('criterio_id');

            // Iterar sobre las evaluaciones agrupadas por criterio
            foreach ($evaluacionesPorCriterio as $criterioId => $evaluaciones) :
                // Obtener el criterio actual
                $criterio = Criterio::find($criterioId);

                // Calcular el promedio de los valores para este criterio
                $promedio = $evaluaciones->avg('valor');

                // Calcular el promedio ponderado multiplicando por el peso del criterio
                $calificacion_final = $promedio * $criterio->peso;

                // Agregar el promedio ponderado al arreglo de promedios ponderados
                $calificacionesFinales[] = [
                    'criterio_id' => $criterioId,
                    'nombre' => $criterio->nombre,
                    'promedio_valor' => $promedio,
                    'peso' => $criterio->peso,
                    'calificacion_final' => $calificacion_final
                ];

            endforeach;
            // Agregar los promedios ponderados al resultado final
            $salida[] = [
                'caso_uso_id' => $casoUso->id,
                'evaluaciones' => $calificacionesFinales
            ];
        endforeach;


        $priorizacion = [];
        foreach ($salida as $caso) :
            $total_puntaje = 0;
            foreach ($caso['evaluaciones'] as $eva) :
                $total_puntaje += $eva['calificacion_final'];
            endforeach;
            $priorizacion[] = [
                'nombre' => CasosUso::find($caso['caso_uso_id'])->nombre,
                'caso_id' => $caso['caso_uso_id'],
                'puntaje_total_caso' => number_format($total_puntaje, 3)
            ];
        endforeach;


        $coleccionCasosUso = new Collection($priorizacion);
        $casosUsoOrdenados = $coleccionCasosUso->sortByDesc('puntaje_total_caso')->values()->all();

        return response()->json($casosUsoOrdenados);
    }

    public function store(Request $request)
    {

        // [
        //    {
        //     "caso_id":1,
        //     "evaluaciones":[
        //         {
        //             "criterio_id": 1,
        //             "valor": 5,
        //             "evaluador_id": 1,
        //         },
        //         {
        //             "criterio_id": 2,
        //             "valor": 4,
        //             "evaluador_id": 1,
        //         },
        //         {
        //             "criterio_id": 3,
        //             "valor": 3,
        //             "evaluador_id": 1,
        //         }
        //     ]
        //     },
        //     {
        //         "caso_id":2,
        //         "evaluaciones":[
        //             {
        //                 "criterio_id": 1,
        //                 "valor": 1,
        //                 "evaluador_id": 1,
        //             },
        //             {
        //                 "criterio_id": 2,
        //                 "valor": 3,
        //                 "evaluador_id": 1,
        //             },
        //             {
        //                 "criterio_id": 3,
        //                 "valor": 2,
        //                 "evaluador_id": 1,
        //             }
        //         ]
        //     }
        // ]


    }


    public function compararPuntajes($a, $b)
    {
        if ($a['puntaje_total_caso'] === $b['puntaje_total_caso']) {
            return 0;
        }
        return ($a['puntaje_total_caso'] > $b['puntaje_total_caso']) ? -1 : 1;
    }




    public function update(Request $request, string $id)
    {
        //
    }


    public function destroy(string $id)
    {
        //
    }
}
