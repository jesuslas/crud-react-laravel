<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Users;

class UserTypes extends Model
{
    public $timestamps = false;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];
       /**
     * Get the post that owns the comment.
     */
    public function users()
    {
        return $this->hasOne("App\Users");
    }
}
