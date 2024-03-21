<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Criterio;
use Illuminate\Http\Request;

class CriterioController extends Controller
{
    public function index()
    {
        return Criterio::all();
    }

    public function store(Request $request)
    {
        try {
            Criterio::create([
                'nombre' => $request->nombre,
                'peso' => $request->peso,
            ]);
            return response()->json(['msg' => 'criterio guardado exitosamente']);
        } catch (\Throwable $th) {
            return response('ha ocurrido un error al agregar el criterio '.$th,200);
        }
    }


    public function show(Criterio $criterio)
    {
        return $criterio;
    }


    public function update(Request $request, Criterio $criterio)
    {
        try {
            $criterio->update([
                'nombre' => $request->nombre,
                'peso' => $request->peso,
            ]);
            return response()->json(['msg' => 'criterio actualizado exitosamente']);
        } catch (\Throwable $th) {
            return response('ha ocurrido un error al actualizar el criterio '.$th,200);
        }
    }
}
