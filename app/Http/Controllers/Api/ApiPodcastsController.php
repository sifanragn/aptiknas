<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Podcast;
use App\Models\CategoryPodcasts;
use Illuminate\Http\Request;

class ApiPodcastsController extends Controller
{
    /**
     * 🔹 GET: Ambil semua podcast (dengan kategori)
     */
    public function index()
    {
        $podcasts = Podcast::with('category')->latest()->get();
        return response()->json([
            'success' => true,
            'data' => $podcasts
        ]);
    }

    /**
     * 🔹 GET: Ambil detail podcast berdasarkan ID
     */
    public function show($id)
    {
        $podcast = Podcast::with('category')->find($id);

        if (!$podcast) {
            return response()->json([
                'success' => false,
                'message' => 'Podcast tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $podcast
        ]);
    }

}
