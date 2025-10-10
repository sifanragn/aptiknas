<?php

namespace App\Http\Controllers;

use App\Models\CategoryDaftar;
use App\Models\CategoryPengurus;
use App\Models\Pengurus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PengurusController extends Controller
{
    public function index(Request $request)
    {
        $pengurus = Pengurus::with(['categoryDaftar', 'categoryPengurus'])->paginate(10);

        if ($request->has('search') && !empty($request->search)) {
            $pengurus->where('title', 'like', '%' . $request->search . '%');
        }

        return view('pengurus.index', compact('pengurus'));
    }

    public function show($id)
    {
        $pengurus = Pengurus::with(['categoryDaftar', 'categoryPengurus'])->findOrFail($id);
        return view('pengurus.show', compact('pengurus'));
    }

    // CREATE METHODS
    public function create()
    {
        $categoryDaftar = CategoryDaftar::all();
        $categoryPengurus = CategoryPengurus::all();

        return view('pengurus.create.step1', compact('categoryDaftar', 'categoryPengurus'));
    }

    public function storeStep1(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'descroption' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:750',
            'fb' => 'nullable|string|max:255',
            'ig' => 'nullable|string|max:255',
            'tiktok' => 'nullable|string|max:255',
            'yt' => 'nullable|string|max:255',
            'jabatan' => 'nullable|string|max:255',
            'category_daftar_id' => 'nullable|exists:daftar_dpd_categories,id',
            'category_pengurus_id' => 'nullable|exists:pengurus_categories,id',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('pengurus', 'public');
            $data['image'] = $imagePath;
        }

        $pengurus = Pengurus::create($data);

        return redirect()->route('pengurus.create.step2', $pengurus->id)
            ->with('success', 'Step 1 berhasil disimpan!');
    }

    public function createStep2($id)
    {
        $pengurus = Pengurus::findOrFail($id);
        return view('pengurus.create.step2', compact('pengurus'));
    }

    public function storeStep2(Request $request, $id)
    {
        $pengurus = Pengurus::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title2' => 'nullable|string|max:255',
            'title3' => 'nullable|string|max:255',
            'description2' => 'nullable|string',
            'description3' => 'nullable|string',
            'image2' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:750',
            'image3' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:750',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->except(['image2', 'image3']);

        if ($request->hasFile('image2')) {
            $image2Path = $request->file('image2')->store('pengurus', 'public');
            $data['image2'] = $image2Path;
        }

        if ($request->hasFile('image3')) {
            $image3Path = $request->file('image3')->store('pengurus', 'public');
            $data['image3'] = $image3Path;
        }

        $pengurus->update($data);

        return redirect()->route('pengurus.create.step3', $pengurus->id)
            ->with('success', 'Step 2 berhasil disimpan!');
    }

    public function createStep3($id)
    {
        $pengurus = Pengurus::findOrFail($id);
        return view('pengurus.create.step3', compact('pengurus'));
    }

    public function storeStep3(Request $request, $id)
    {
        $pengurus = Pengurus::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title4' => 'nullable|string|max:255',
            'description4' => 'nullable|string',
            'image4' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:750',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->except('image4');

        if ($request->hasFile('image4')) {
            $image4Path = $request->file('image4')->store('pengurus', 'public');
            $data['image4'] = $image4Path;
        }

        $pengurus->update($data);

        return redirect()->route('pengurus.index')
            ->with('success', 'Data pengurus berhasil dibuat!');
    }

    // EDIT METHODS
    public function edit($id)
    {
        $pengurus = Pengurus::findOrFail($id);
        $categoryDaftar = CategoryDaftar::all();
        $categoryPengurus = CategoryPengurus::all();

        return view('pengurus.edit.step1', compact('pengurus', 'categoryDaftar', 'categoryPengurus'));
    }

    public function updateStep1(Request $request, $id)
    {
        $pengurus = Pengurus::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'descroption' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:750',
            'fb' => 'nullable|string|max:255',
            'ig' => 'nullable|string|max:255',
            'tiktok' => 'nullable|string|max:255',
            'yt' => 'nullable|string|max:255',
            'jabatan' => 'nullable|string|max:255',
            'category_daftar_id' => 'nullable|exists:daftar_dpd_categories,id',
            'category_pengurus_id' => 'nullable|exists:pengurus_categories,id',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($pengurus->image) {
                Storage::disk('public')->delete($pengurus->image);
            }
            $imagePath = $request->file('image')->store('pengurus', 'public');
            $data['image'] = $imagePath;
        }

        $pengurus->update($data);

        return redirect()->route('pengurus.edit.step2', $pengurus->id)
            ->with('success', 'Step 1 berhasil diupdate!');
    }

    public function editStep2($id)
    {
        $pengurus = Pengurus::findOrFail($id);
        return view('pengurus.edit.step2', compact('pengurus'));
    }

    public function updateStep2(Request $request, $id)
    {
        $pengurus = Pengurus::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title2' => 'nullable|string|max:255',
            'title3' => 'nullable|string|max:255',
            'description2' => 'nullable|string',
            'description3' => 'nullable|string',
            'image2' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:750',
            'image3' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:750',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->except(['image2', 'image3']);

        if ($request->hasFile('image2')) {
            if ($pengurus->image2) {
                Storage::disk('public')->delete($pengurus->image2);
            }
            $image2Path = $request->file('image2')->store('pengurus', 'public');
            $data['image2'] = $image2Path;
        }

        if ($request->hasFile('image3')) {
            if ($pengurus->image3) {
                Storage::disk('public')->delete($pengurus->image3);
            }
            $image3Path = $request->file('image3')->store('pengurus', 'public');
            $data['image3'] = $image3Path;
        }

        $pengurus->update($data);

        return redirect()->route('pengurus.edit.step3', $pengurus->id)
            ->with('success', 'Step 2 berhasil diupdate!');
    }

    public function editStep3($id)
    {
        $pengurus = Pengurus::findOrFail($id);
        return view('pengurus.edit.step3', compact('pengurus'));
    }

    public function updateStep3(Request $request, $id)
    {
        $pengurus = Pengurus::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title4' => 'nullable|string|max:255',
            'description4' => 'nullable|string',
            'image4' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:750',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->except('image4');

        if ($request->hasFile('image4')) {
            if ($pengurus->image4) {
                Storage::disk('public')->delete($pengurus->image4);
            }
            $image4Path = $request->file('image4')->store('pengurus', 'public');
            $data['image4'] = $image4Path;
        }

        $pengurus->update($data);

        return redirect()->route('pengurus.index')
            ->with('success', 'Data pengurus berhasil diupdate!');
    }

    public function destroy($id)
    {
        $pengurus = Pengurus::findOrFail($id);

        if ($pengurus->image) Storage::disk('public')->delete($pengurus->image);
        if ($pengurus->image2) Storage::disk('public')->delete($pengurus->image2);
        if ($pengurus->image3) Storage::disk('public')->delete($pengurus->image3);
        if ($pengurus->image4) Storage::disk('public')->delete($pengurus->image4);

        $pengurus->delete();

        return redirect()->route('pengurus.index')
            ->with('success', 'Data pengurus berhasil dihapus!');
    }
}
