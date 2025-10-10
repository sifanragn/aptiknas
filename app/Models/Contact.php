<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contact';
    protected $fillable = [
        'email_dpp',
        'email_dpd',
        'alamat',
        'notlp',
        'start_datetime',
        'end_datetime',

    ];
}
