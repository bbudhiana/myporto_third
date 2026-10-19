<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
use Illuminate\Support\Facades\DB;
$tables = DB::select("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'");
foreach ($tables as $t) {
    echo "Table: {$t->name}\n";
    $rows = DB::table($t->name)->get();
    if ($rows->isEmpty()) {
        echo "  (no rows)\n";
    } else {
        foreach ($rows as $r) {
            echo "  ".json_encode((array)$r)."\n";
        }
    }
}
