<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Portfolio & Admin Credentials
    |--------------------------------------------------------------------------
    |
    | Nilai diambil dari .env lewat config(), bukan env() langsung. Setelah
    | `php artisan config:cache`, file .env tidak dimuat lagi sehingga
    | pemanggilan env() di luar folder config/ selalu mengembalikan null.
    |
    */

    'admin_email' => env('ADMIN_EMAIL', 'bana@bbudhiana.com'),

    'admin_password' => env('ADMIN_PASSWORD', 'BanaAdmin2026!'),

    'public_email' => env('PORTFOLIO_PUBLIC_EMAIL', 'budhiana.bana@gmail.com'),

];
