<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class ApiLandingController extends Controller
{
    public function index()
    {
        return response()->json([
            'slider' => \App\Models\Slider::latest()->get(),
            'gallery' => \App\Models\Gallery::limit(6)->get(),
            'testimonies' => \App\Models\Testimony::latest()->get(),
            'partners' => \App\Models\Partner::all(),
            'about' => \App\Models\About::first(),
            'agenda' => \App\Models\Agenda::latest()->take(3)->get(),
            'podcasts' => \App\Models\Podcast::latest()->take(3)->get(),
        ]);
    }
}
