@extends('layouts.app', ['title' => 'Tambah Career'])

@section('content')
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-10">
        <!-- Header -->
        <div class="border-b pb-5">
            <h1 class="text-3xl font-bold text-emerald-700">Tambah Career</h1>
            <p class="text-gray-500 text-sm mt-1">Isi detail karir baru dengan lengkap</p>
        </div>

        <!-- Form -->
        <form action="{{ route('career.store') }}" method="POST" class="space-y-8">
            @csrf

            <!-- Posisi -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Posisi</label>
                <input type="text" name="position_title" value="{{ old('position_title') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
                @error('position_title')
                    <p class="text-red-600 text-sm">{{ $message }}</p>
                @enderror
            </div>

            <!-- Job Type & Lokasi -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700">Job Type</label>
                    <div class="relative">
                        <select name="job_type"
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10
                                   focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
                                   appearance-none bg-white">
                            <option value="">-- Pilih Job Type --</option>
                            <option value="Full Time" {{ old('job_type') == 'Full Time' ? 'selected' : '' }}>Full Time
                            </option>
                            <option value="Part Time" {{ old('job_type') == 'Part Time' ? 'selected' : '' }}>Part Time
                            </option>
                            <option value="Contract" {{ old('job_type') == 'Contract' ? 'selected' : '' }}>Contract</option>

                        </select>

                        <!-- Custom arrow --> 
                        <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    @error('job_type')
                        <p class="text-red-600 text-sm">{{ $message }}</p>
                    @enderror
                </div>

                <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700">Lokasi</label>
                    <input type="text" name="lokasi" value="{{ old('lokasi') }}"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
                    @error('lokasi')
                        <p class="text-red-600 text-sm">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <!-- Pengalaman, Jam Kerja, Hari Kerja -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700">Pengalaman</label>
                    <input type="text" name="pengalaman" value="{{ old('pengalaman') }}"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
                    @error('pengalaman')
                        <p class="text-red-600 text-sm">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Jam Kerja (Timepicker) -->
<div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700">Jam Kerja</label>
    <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
            <label class="text-xs text-gray-500">Jam Masuk</label>
            <input type="time" name="jam_masuk" value="{{ old('jam_masuk') }}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
        </div>
        <div class="space-y-1">
            <label class="text-xs text-gray-500">Jam Pulang</label>
            <input type="time" name="jam_pulang" value="{{ old('jam_pulang') }}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2
                focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
        </div>
    </div>
    @error('jam_masuk') <p class="text-red-600 text-sm">{{ $message }}</p> @enderror
    @error('jam_pulang') <p class="text-red-600 text-sm">{{ $message }}</p> @enderror
</div>

<!-- Hari Kerja (Checklist Dropdown) -->
<div class="space-y-1 relative">
    <label class="block text-sm font-medium text-gray-700">Hari Kerja</label>

    <!-- Trigger Dropdown -->
    <button type="button"
        onclick="toggleHariKerjaDropdown()"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center text-left
               focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 bg-white">

        <span id="hari-kerja-label" class="text-gray-700">
            Pilih Hari
        </span>

        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    <!-- Dropdown -->
    <div id="hari-kerja-dropdown"
        class="absolute z-30 bg-white border border-gray-200 rounded-lg shadow-lg w-full mt-1 p-3 hidden">

        <!-- Check All -->
        <label class="flex items-center space-x-2 mb-2">
            <input type="checkbox" id="check-all-hari" onchange="toggleAllHariKerja()"
                class="h-4 w-4 text-emerald-600 rounded">
            <span class="text-gray-700 font-medium">Pilih Semua</span>
        </label>

        <hr class="my-2">

        <!-- Hari List -->
        @php
            $days = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'];
        @endphp

        @foreach($days as $day)
            <label class="flex items-center space-x-2 py-1">
                <input type="checkbox" name="hari_kerja[]" value="{{ $day }}"
                    class="hari-kerja-checkbox h-4 w-4 text-emerald-600 rounded"
                    {{ (is_array(old('hari_kerja')) && in_array($day, old('hari_kerja'))) ? 'checked' : '' }}>

                <span class="text-gray-700">{{ $day }}</span>
            </label>
        @endforeach
    </div>

    @error('hari_kerja') <p class="text-red-600 text-sm">{{ $message }}</p> @enderror
</div>

            </div>

            <!-- Ringkasan -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Ringkasan</label>
                <textarea name="ringkasan" rows="4"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">{{ old('ringkasan') }}</textarea>
                @error('ringkasan')
                    <p class="text-red-600 text-sm">{{ $message }}</p>
                @enderror
            </div>

            <!-- Klasifikasi -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Klasifikasi</label>

                <!-- Container untuk input klasifikasi -->
                <div id="klasifikasi-wrapper" class="space-y-2">
                    <input type="text" name="klasifikasi[]" value="{{ old('klasifikasi.0') }}"
                        placeholder="Tambahkan klasifikasi"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2
                   focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
                </div>

                @error('klasifikasi')
                    <p class="text-red-600 text-sm">{{ $message }}</p>
                @enderror

                <!-- Tombol tambah -->
                <button type="button" onclick="tambahKlasifikasi()"
                    class="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition">
                    + Tambah Klasifikasi
                </button>
            </div>

            <!-- Deskripsi -->
            <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Deskripsi</label>
                <div class="space-y-2">
                    <input type="text" name="deskripsi[]" value="{{ old('deskripsi.0') }}"
                        placeholder="Tuliskan poin deskripsi pekerjaan"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
                    <input type="text" name="deskripsi[]" value="{{ old('deskripsi.1') }}"
                        placeholder="Tambahkan poin deskripsi lain"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
                </div>
                @error('deskripsi')
                    <p class="text-red-600 text-sm">{{ $message }}</p>
                @enderror
            </div>

            <!-- Submit -->
            <div class="flex justify-end pt-4">
                <button type="submit"
                    class="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition">
                    Simpan
                </button>
            </div>
        </form>
    </div>

    <!-- Script untuk menambah input baru -->
    <script>
        function tambahKlasifikasi() {
            const wrapper = document.getElementById('klasifikasi-wrapper');
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'klasifikasi[]';
            input.placeholder = 'Tambahkan klasifikasi';
            input.className =
                'w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200';
            wrapper.appendChild(input);
        }
    </script>

    <script>
        // CKEditor
        ClassicEditor
            .create(document.querySelector('#description'))
            .catch(error => {
                console.error(error);
            });
    </script>

    <script>
    function toggleHariKerjaDropdown() {
        const dropdown = document.getElementById('hari-kerja-dropdown');
        dropdown.classList.toggle('hidden');
    }

    function toggleAllHariKerja() {
        const checkAll = document.getElementById('check-all-hari');
        const checkboxes = document.querySelectorAll('.hari-kerja-checkbox');

        checkboxes.forEach(cb => cb.checked = checkAll.checked);

        updateHariKerjaLabel();
    }

    const checkboxes = document.querySelectorAll('.hari-kerja-checkbox');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateHariKerjaLabel);
    });

    function updateHariKerjaLabel() {
        const selected = Array.from(document.querySelectorAll('.hari-kerja-checkbox:checked'))
            .map(cb => cb.value);

        const label = document.getElementById('hari-kerja-label');

        if (selected.length === 0) {
            label.textContent = "Pilih Hari";
        } else if (selected.length === 7) {
            label.textContent = "Semua Hari";
            document.getElementById('check-all-hari').checked = true;
        } else {
            label.textContent = selected.join(', ');
            document.getElementById('check-all-hari').checked = false;
        }
    }

    // Klik di luar dropdown untuk menutup
    document.addEventListener("click", function (e) {
        const dropdown = document.getElementById("hari-kerja-dropdown");
        const trigger = e.target.closest("button");

        if (!dropdown.contains(e.target) && !trigger) {
            dropdown.classList.add("hidden");
        }
    });
</script>

@endsection
