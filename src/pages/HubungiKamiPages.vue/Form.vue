<template>
    <div class="grid grid-cols-1 gap-8">
        <form action="" method="post">
            <label for="nama" class="text-base text-gray-500">NAMA</label><input type="text" placeholder="Nama Lengkap" class="border border-gray-300 rounded-md p-2 w-full mb-6" />
            <label for="email" class="text-base text-gray-500">EMAIL</label><input type="email" placeholder="Email" class="border border-gray-300 rounded-md p-2 w-full mb-6" />
            <label for="nomor-telepon" class="text-base text-gray-500">NOMOR TELEPON</label><input type="text" placeholder="Nomor Telepon" class="border border-gray-300 rounded-md p-2 w-full mb-6" />
            <label for="pesan" class="text-base text-gray-500">PESAN</label><textarea placeholder="Pesan" class="border border-gray-300 rounded-md p-2 pb-10 w-full mb-6 items-start"></textarea>
            <button type="submit" class="bg-green-600 text-white rounded-md px-6 py-2 hover:bg-green-700 transition-colors">
                Kirim Pesan
            </button>
        </form>
    </div>
</template>