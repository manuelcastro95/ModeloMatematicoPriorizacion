<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EvaluacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([  'middleware' => 'api', 'prefix' => 'auth' ], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
});
Route::group([  'middleware' => 'auth:api', 'prefix' => 'auth' ], function ($router) {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group([  'middleware' => 'auth:api', 'prefix' => 'evaluaciones/' ], function ($router) {
    Route::post('guardar-evaluaciones', [EvaluacionController::class, 'guardarEvaluaciones']);
});
