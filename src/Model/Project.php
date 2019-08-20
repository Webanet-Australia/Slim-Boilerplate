<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'description',
        'url',
        'dir'
    ];

    public function users()
    {
      return $this->belongsTo('App\Model\User')->get();
    }
}
