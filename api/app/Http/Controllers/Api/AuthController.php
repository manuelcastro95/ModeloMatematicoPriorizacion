<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponserTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use JWTAuth;

class AuthController extends Controller
{
    use ApiResponserTraits;
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $credentials = $request->only(['email', 'password']);
        if (! $token = JWTAuth::attempt($credentials)) {
            return $this->errorResponse('El correo o la contraseña son incorrectos', Response::HTTP_UNAUTHORIZED);
        }

        $user = JWTAuth::user();
        // if($user->session_activa == true) {
        //     return $this->errorResponse('El usuario está ya ha inciado sesion', Response::HTTP_UNAUTHORIZED);
        // }

        $user->update([
            'session_activa' => true
        ]);

        return $this->successResponse($this->respondWithToken($token));
    }


    public function me()
    {
        return response()->json(JWTAuth::parseToken()->authenticate());
    }


    public function logout()
    {
        $user = JWTAuth::user();
        $user->update([
            'session_activa' => false
        ]);
        auth()->logout();
        return $this->successResponse('has cerrado sesion.');
    }


    public function refresh()
    {
        return $this->successResponse($this->respondWithToken(JWTAuth::parseToken()->refresh()));
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 600
        ]);
    }


}
