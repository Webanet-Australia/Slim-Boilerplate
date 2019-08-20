<?php
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use Cartalyst\Sentinel\Native\SentinelBootstrapper;
use Illuminate\Database\Capsule\Manager;
use Illuminate\Database\Schema\Blueprint;

//projects
Manager::schema()->create('projects', function (Blueprint $table) {
    $table->increments('id');
    $table->integer('user_id');
    $table->string('name');
    $table->string('description');
    $table->string('url');
    $table->string('dir');
    $table->timestamps();
    $table->foreign('user_id')->references('id')->on('users');
});
