<?php

namespace Modules\User\Http\Requests;

use App\Traits\Responser;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class UserRequest extends FormRequest
{
    use Responser;
    // protected $stopOnFirstFailure = true;
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $method = request()->method();
        switch ($method) {
            case 'GET':
                # code...
                break;
            case 'POST':
                return [
                    'name' => ['required', 'min:6', 'max:255', 'string'],
                    'email' => ['required', 'min:6', 'max:255', 'email', 'unique:users'],
                ];
                break;
            case 'PUT':
                return [
                    //
                ];
                break;
            case 'PATCH':
                return [
                    //
                ];
                break;
            case 'DELETE':
                return [
                    //
                ];
                break;
            default:
                # code...
                break;
        }
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function failedValidation(Validator $validator) {
        $errors = $validator->errors()->messages();
        $result = $this->responseError($errors);
        throw new HttpResponseException(response()->json($result));
        // dd($errors);
        // throw new ValidationException();
        // dd($errors);
        // return $this->responseError($errors);
    }
}
