<?php

namespace App\Controller;

use Awurth\Slim\Helper\Controller\Controller;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Model\User;

class ProjectsController extends Controller
{
    public function list(Request $request, Response $response)
    {
        return $this->render($response, 'app/projects.twig', ['projects' => User::projects()]);
    }
    public function content(Request $request, Response $response)
    {
        return $this->render($response, 'app/content.twig');
    }
    public function item(Request $request, Response $response)
    {
        return $this->render($response, 'app/project.twig');
    }

    public function add(Request $request, Response $response)
    {
        return $this->render($response, 'app/project.twig');
    }

    public function edit(Request $request, Response $response)
    {
        return $this->render($response, 'app/project.twig');
    }

    public function delete(Request $request, Response $response)
    {
        return $this->render($response, 'app/project.twig');
    }
}
