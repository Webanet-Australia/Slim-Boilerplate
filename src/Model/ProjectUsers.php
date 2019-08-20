<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ProjectUsers extends Model
{
    protected $table = 'project_users';

    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'project_id'
    ];

    public function projects(User $user)
    {
      return $this->belongsTo('App\Model\Project', 'project_id');
    }

    public function user()
    {
      return $this->belongsTo('App\Model\User', 'user_id');
    }
}
