<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function sitemap(): Response
    {
        $baseUrl = url('/');
        $urls = [
            [
                'loc' => $baseUrl,
                'lastmod' => now()->toDateString(),
                'changefreq' => 'weekly',
                'priority' => '1.0',
            ],
            [
                'loc' => "{$baseUrl}/projects",
                'lastmod' => now()->toDateString(),
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ],
            [
                'loc' => "{$baseUrl}/privacy",
                'lastmod' => now()->toDateString(),
                'changefreq' => 'monthly',
                'priority' => '0.3',
            ],
        ];

        $projects = Project::published()->get();
        foreach ($projects as $project) {
            $urls[] = [
                'loc' => "{$baseUrl}/projects/{$project->slug}",
                'lastmod' => $project->updated_at->toDateString(),
                'changefreq' => 'monthly',
                'priority' => '0.7',
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($urls as $u) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($u['loc'], ENT_XML1, 'UTF-8') . '</loc>';
            $xml .= '<lastmod>' . $u['lastmod'] . '</lastmod>';
            $xml .= '<changefreq>' . $u['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $u['priority'] . '</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
        ]);
    }

    public function robots(): Response
    {
        $baseUrl = url('/');
        $content = "User-agent: *\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /login\n";
        $content .= "Disallow: /resume\n";
        $content .= "Allow: /\n\n";
        $content .= "Sitemap: {$baseUrl}/sitemap.xml\n";

        return response($content, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
        ]);
    }
}
