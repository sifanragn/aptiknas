<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiSliderController extends Controller
{

    public function index()
{
    $sliders = Slider::all()->map(function ($s) {
        return [
            'id' => $s->id,
            'display_on_home' => $s->display_on_home,
            'title' => $s->title,
            'subtitle' => $s->subtitle,
            'image' => $s->image,
            'image_url' => asset('storage/' . $s->image), // <= WAJIB
            'youtube_id' => $s->youtube_id,
            'button_text' => $s->button_text,
            'url_link' => $s->url_link,
            'created_at' => $s->created_at,
            'updated_at' => $s->updated_at,
        ];
    });

    return response()->json([
        "status" => true,
        "message" => "List of Slider",
        "data" => $sliders
    ]);
}

    public function showHomeSlider(): JsonResponse
    {
        $sliders = Slider::where('display_on_home', true)->latest()->get();
        return response()->json([
            'status' => true,
            'data' => $sliders,
        ]);
    }
}
