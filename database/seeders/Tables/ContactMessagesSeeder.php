<?php
namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactMessagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Command :
         * artisan seed:generate --mode=table --all-tables
         *
         */

        $dataTables = [
            [
                'company' => 'PT Amerika Raya',
                'consent_at' => '2026-10-09 09:29:53',
                'created_at' => '2026-10-09 09:29:53',
                'email' => 'john@gmail.com',
                'id' => 1,
                'ip_hash' => '245c0ffc0f6a0215471542b9add1fa5331647f4af18c431f039c66dbee92732e',
                'message' => 'saya ingin tester dong, coba ini bisa aktif gak yah',
                'name' => 'John Rambo',
                'notification_status' => 'pending',
                'privacy_notice_version' => 1,
                'purpose' => 'cooperation',
                'status' => 'read',
                'submission_token' => 'b65372c1-b493-4f24-9306-77be4c7896fe',
                'updated_at' => '2026-10-09 09:30:01',
            ]
        ];
        
        DB::table("contact_messages")->insert($dataTables);
    }
}