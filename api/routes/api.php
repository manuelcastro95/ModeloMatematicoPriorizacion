<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CasoUsoController;
use App\Http\Controllers\Api\CriterioController;
use App\Http\Controllers\Api\EvaluacionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([ 'prefix' => 'auth' ], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
});
Route::group([  'middleware' => 'auth:api', 'prefix' => 'auth' ], function ($router) {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group([ 'prefix' => 'evaluaciones/' ], function ($router) {
    Route::post('guardar-evaluaciones', [EvaluacionController::class, 'guardarEvaluaciones']);
    Route::get('generar-priorizacion', [EvaluacionController::class, 'generarPriorizacion']);
});

Route::group(['prefix' => 'casos-uso/' ], function ($router) {
    Route::get('', [CasoUsoController::class, 'index']);
    Route::post('store', [CasoUsoController::class, 'store']);
    Route::get('show/{caso_uso}', [CasoUsoController::class, 'show']);
    Route::put('update/{caso_uso}', [CasoUsoController::class, 'update']);
});
Route::group(['prefix' => 'criterios/' ], function ($router) {
    Route::get('', [CriterioController::class, 'index']);
    Route::post('store', [CriterioController::class, 'store']);
    Route::get('show/{criterio}', [CriterioController::class, 'show']);
    Route::put('update/{criterio}', [CriterioController::class, 'update']);
});
Route::group(['prefix' => 'evaluadores/' ], function ($router) {
    Route::get('', [UserController::class, 'index']);
});


