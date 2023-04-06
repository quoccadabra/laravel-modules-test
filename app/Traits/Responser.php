<?php 
namespace App\Traits;

use Illuminate\Support\Facades\Response;

trait Responser
{
    public function responseSucess($data = [], $status = 200, $message = 'success')
    {
        $response = [
            'data' => $data,
            'status' => $status,
            'message' => $message,
            'success' => true
        ];
        return $response;
    }

    public function responseError($data = [], $status = 400, $message = 'failed!')
    {
        $response = [
            'errors' => $data,
            'status' => $status,
            'message' => $message,
            'success' => false
        ];
        return $response;
    }
}