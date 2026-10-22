<?php

namespace App\Http\Middleware;

use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'site' => fn () => [
                'name' => config('app.name'),
                'url' => rtrim((string) config('app.url'), '/'),
                // Sengaja tanpa cache: cache store 'file' menulis ke storage/,
                // dan bila folder itu tidak writable setiap request akan 500.
                'location' => Profile::published()->value('location'),
            ],
        ];
    }
}
