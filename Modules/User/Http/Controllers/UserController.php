<?php

namespace Modules\User\Http\Controllers;

use App\Traits\Responser;
use Exception;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Modules\User\Entities\User;
use Modules\User\Http\Requests\UserRequest;

class UserController extends Controller
{
    use Responser;
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request)
    {
        try {
            $query = User::query();
            if ($request->has('name')) {
                $query->where('name', 'like', '%'.$request->get('name').'%');
            }
            if ($request->has('email')) {
                $query->where('email', 'like', '%'.$request->get('email').'%');
            }
            $users = $query->orderBy('id', 'desc')->paginate(10);
            return $this->responseSucess($users);
        } catch (Exception $e) {
            Log::info($e->getMessage());
            return $this->responseError();
        }
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('user::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(UserRequest $request)
    {
        try {
            $body = $request->only('email', 'name');
            $body['password'] = Hash::make('password');
            $user = User::create($body);
            return $this->responseSucess($user);
        } catch (ValidationException $ve) {
            dd($ve);
        }
        catch (Exception $e) {
            Log::info($e->getMessage());
            return $this->responseError();
        }
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('user::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('user::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        try {
            $body = $request->only('email', 'name');
            // $body['password'] = Hash::make('password');
            User::find($id)->update($body);
            return $this->responseSucess(User::find($id));
        } catch (Exception $e) {
            Log::info($e->getMessage());
            return $this->responseError();
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        try {
            User::destroy($id);
            return $this->responseSucess(true);
        } catch (Exception $e) {
            Log::info($e->getMessage());
            return $this->responseError();
        }
    }
}
