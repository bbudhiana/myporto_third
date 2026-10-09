<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function privacy(): Response
    {
        return Inertia::render('Public/Privacy');
    }
}
