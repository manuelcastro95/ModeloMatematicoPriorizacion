<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evaluacion;
use Illuminate\Http\Request;

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
                    'evaluador_id' => $evaluacion['evaluador_id'],
                ]);
            }
        }
        return response()->json(['message' => 'Evaluaciones guardadas exitosamente']);
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


    public function show(string $id)
    {
        //
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
