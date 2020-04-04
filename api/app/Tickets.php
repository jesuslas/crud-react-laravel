<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'ticket_pedido','status'
    ];
    public function user()
    {
     return $this->belongsTo("App\Users","user_id");
    }
}
