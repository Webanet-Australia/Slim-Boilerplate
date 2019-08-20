<?php

namespace App\Controller;

use Awurth\Slim\Helper\Controller\Controller;
use Slim\Http\Request;
use Slim\Http\Response;

class AppController extends Controller
{
    public function home(Request $request, Response $response)
    {
        $template = 'home';

        if(!$this->auth->getUser()) {
          $template = 'index';
        }

        $data = [
          'projects' => $this->auth->getUser()->projects()->get()
        ];

        return $this->render($response, "app/$template.twig", $data);
    }
}
