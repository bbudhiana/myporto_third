<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrentDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // The current database only contains migration tables.
        // No actual application data is present; the migrations will
        // create the schema when run.
        // If you wish to seed the initial data defined in DatabaseSeeder,
        // call $this->call(DatabaseSeeder::class);
    }
}