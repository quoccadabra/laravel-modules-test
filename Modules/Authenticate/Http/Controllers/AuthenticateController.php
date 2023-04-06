<?php

namespace Modules\Authenticate\Http\Controllers;

use Exception;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Modules\Authenticate\Serivces\LoginService;
use Modules\User\Entities\User;

class AuthenticateController extends Controller
{
    // private $loginService;
    // public function __construct()
    // {
    //     $this->loginService = new LoginService();
    // }
    public function login(Request $request)
    {
        try {
            $email = $request->get('username');
            $password = $request->get('password');
            $user = User::where('email', $email)->first();
            if (Hash::check($password, $user->password)) {
                $token = $user->createToken('authToken');
                return [
                    'token' => $token->plainTextToken,
                    'user' => $user
                ];
            }
            
        } catch (Exception $e)
        {
            Log::info($e->getMessage());
        }
    }

}
