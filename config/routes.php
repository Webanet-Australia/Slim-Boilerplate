<?php

$app->get('/', 'controller.app:home')->setName('home');

$app->group('', function () {
    $this->map(['GET', 'POST'], '/login', 'controller.auth:login')->setName('login');
    $this->map(['GET', 'POST'], '/register', 'controller.auth:register')->setName('register');
    $this->map(['GET', 'POST'], '/forgot', 'controller.auth:forgot')->setName('forgot');
})->add($container['middleware.guest']);

$app->get('/logout', 'controller.auth:logout')
    ->add($container['middleware.auth']())
    ->setName('logout');

$app->group('/projects', function () {
    $this->get('', 'controller.projects:list')->setName('projects');
    $this->put('', 'controller.projects:add')->setName('projectsAdd');
    $this->get('/{project}', 'controller.projects:item')->setName('projectsItem');
    $this->post('/{project}', 'controller.projects:add')->setName('projectsAdd');
    $this->get('/{project}/content', 'controller.projects:content')->setName('projectContent');
    $this->delete('/{project}', 'controller.projects:delete')->setName('projectsDelete');
})->add($container['middleware.auth']());
