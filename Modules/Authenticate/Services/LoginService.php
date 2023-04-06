<?php
namespace Modules\Authenticate\Serivces;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginService
{
    public function login(Request $request)
    {
        // $credentinal = $request->only('username', 'password');
        $email = $request->get('username');
        $password = $request->get('password');
        // Log::info($credentinal);
        $credentinal = Auth::attempt(['email' => $email, 'password' => $password]);
        dd($credentinal);
    }
}