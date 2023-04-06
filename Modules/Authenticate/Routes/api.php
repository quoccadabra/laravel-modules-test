<?php

use Illuminate\Http\Request;
use Modules\Authenticate\Http\Controllers\AuthenticateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/authenticate', function (Request $request) {
    return $request->user();
});
Route::post('login', [AuthenticateController::class, 'login']);