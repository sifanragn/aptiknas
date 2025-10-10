<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategoryDaftar;
use Illuminate\Http\Request;

class ApiCategoryDaftarDPDController extends Controller
{
    /**
     * 🔹 Tampilkan semua kategori
     */
    public function index()
    {
        $categories = CategoryDaftar::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Data kategori berhasil diambil',
            'data' => $categories
        ]);
    }

    /**
     * 🔹 Tampilkan detail kategori berdasarkan ID
     */
    public function show($id)
    {
        $category = CategoryDaftar::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail kategori berhasil diambil',
            'data' => $category
        ]);
    }

    /**
     * 🔹 Tampilkan kategori berdasarkan nama (custom endpoint)
     */
    public function getByCategoryName($categoryName)
    {
        $category = CategoryDaftar::where('name', $categoryName)->first();

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan'
            ], 404);
        }

        // Jika nanti ada tabel daftar relasi, bisa diganti ke relasi
        $daftar = CategoryDaftar::where('id', $category->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'category' => $category->name,
            'data' => $daftar
        ]);
    }
}
