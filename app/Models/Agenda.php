<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{

    protected $table = 'agenda';

    protected $fillable = [
        'title',
        'type',
        'description',
        'start_datetime',
        'end_datetime',
        'location',
        'event_organizer',
        'youtube_link',
        'image',
    ];
}
