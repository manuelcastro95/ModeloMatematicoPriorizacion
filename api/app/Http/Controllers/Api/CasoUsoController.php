<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CasosUso;
use Illuminate\Http\Request;

class CasoUsoController extends Controller
{

    public function index()
    {
        return CasosUso::all();
    }


    public function store(Request $request)
    {
        try {
            CasosUso::create([
                'nombre' => $request->nombre
            ]);
            return response()->json(['msg' => 'caso de uso agregado exitosamente']);
        } catch (\Throwable $th) {
            return response('ha ocurrido un error al agregar el caso de uso '.$th,200);
        }
    }


    public function show(CasosUso $caso_uso)
    {
        return $caso_uso;
    }


    public function update(Request $request, CasosUso $caso_uso)
    {
        try {
            $caso_uso->update([
                'nombre' => $request->nombre
            ]);
            return response()->json(['msg' => 'caso de uso actualizado exitosamente']);
        } catch (\Throwable $th) {
            return response('ha ocurrido un error al actualizar el caso de uso '.$th,200);
        }
    }


    public function destroy(string $id)
    {
        //
    }
}
