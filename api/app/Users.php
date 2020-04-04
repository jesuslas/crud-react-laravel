<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\UserTypes;

class Users extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',"userType_id"
    ];
     /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userTypes()
    {
     return $this->belongsTo("App\UserTypes","userType_id");
    }
}
