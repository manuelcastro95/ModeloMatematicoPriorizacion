<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all()->map(function ($usr) {
            return [
                'name' => $usr->name,
                'email' => $usr->email,
                'session_activa' => $usr->session_activa
            ];
        });

        return $users;
    }

    public function store(Request $request)
    {
        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            return response()->json(['msg' => 'usuario guardado exitosamente']);
        } catch (\Throwable $th) {
            return response('ha ocurrido un error al agregar el usuario '.$th,200);
        }
    }


    public function show(User $user)
    {
        return [
            'name' => $user->name,
            'email' => $user->email,
            'session_activa' => $user->session_activa
        ];
    }


    public function update(Request $request, User $user)
    {
        try {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            return response()->json(['msg' => 'usuario actualizado exitosamente']);
        } catch (\Throwable $th) {
            return response('ha ocurrido un error al actualizar el usuario '.$th,200);
        }
    }

}
