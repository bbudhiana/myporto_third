<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\LegalController;
use App\Http\Controllers\Public\ProjectController;
use App\Http\Controllers\Public\ResumeController;
use App\Http\Controllers\Public\SitemapController;
use Illuminate\Support\Facades\Route;

// Public Routes per PRD 4 & 10
Route::get('/', HomeController::class)->name('home');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/resume', ResumeController::class)->name('resume');
Route::get('/privacy', [LegalController::class, 'privacy'])->name('privacy');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/sitemap.xml', [SitemapController::class, 'sitemap'])->name('sitemap');
Route::get('/robots.txt', [SitemapController::class, 'robots'])->name('robots');

// Dashboard redirect to Admin
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth'])->name('dashboard');

// Admin CMS Routes per PRD 7.2
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', \App\Http\Controllers\Admin\DashboardController::class)->name('dashboard');

    // Profile
    Route::get('/profile', [\App\Http\Controllers\Admin\ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [\App\Http\Controllers\Admin\ProfileController::class, 'update'])->name('profile.update');

    // Experiences
    Route::get('/experiences', [\App\Http\Controllers\Admin\ExperienceController::class, 'index'])->name('experiences.index');
    Route::post('/experiences', [\App\Http\Controllers\Admin\ExperienceController::class, 'store'])->name('experiences.store');
    Route::put('/experiences/{experience}', [\App\Http\Controllers\Admin\ExperienceController::class, 'update'])->name('experiences.update');
    Route::delete('/experiences/{experience}', [\App\Http\Controllers\Admin\ExperienceController::class, 'destroy'])->name('experiences.destroy');
    Route::post('/experiences/{experience}/toggle-publish', [\App\Http\Controllers\Admin\ExperienceController::class, 'togglePublish'])->name('experiences.toggle-publish');

    // Skills
    Route::get('/skills', [\App\Http\Controllers\Admin\SkillController::class, 'index'])->name('skills.index');
    Route::post('/skills/groups', [\App\Http\Controllers\Admin\SkillController::class, 'storeGroup'])->name('skills.groups.store');
    Route::put('/skills/groups/{group}', [\App\Http\Controllers\Admin\SkillController::class, 'updateGroup'])->name('skills.groups.update');
    Route::delete('/skills/groups/{group}', [\App\Http\Controllers\Admin\SkillController::class, 'destroyGroup'])->name('skills.groups.destroy');
    Route::post('/skills', [\App\Http\Controllers\Admin\SkillController::class, 'storeSkill'])->name('skills.store');
    Route::delete('/skills/{skill}', [\App\Http\Controllers\Admin\SkillController::class, 'destroySkill'])->name('skills.destroy');

    // Projects
    Route::get('/projects', [\App\Http\Controllers\Admin\ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [\App\Http\Controllers\Admin\ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [\App\Http\Controllers\Admin\ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}/edit', [\App\Http\Controllers\Admin\ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [\App\Http\Controllers\Admin\ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [\App\Http\Controllers\Admin\ProjectController::class, 'destroy'])->name('projects.destroy');
    Route::post('/projects/{project}/toggle-publish', [\App\Http\Controllers\Admin\ProjectController::class, 'togglePublish'])->name('projects.toggle-publish');
    Route::get('/projects/{project}/preview', [\App\Http\Controllers\Admin\ProjectController::class, 'preview'])->name('projects.preview');

    // Media & CV
    Route::get('/media', [\App\Http\Controllers\Admin\MediaController::class, 'index'])->name('media.index');
    Route::post('/media/upload', [\App\Http\Controllers\Admin\MediaController::class, 'upload'])->name('media.upload');
    Route::delete('/media/{media}', [\App\Http\Controllers\Admin\MediaController::class, 'destroy'])->name('media.destroy');
    Route::post('/media/{media}/set-as-resume', [\App\Http\Controllers\Admin\MediaController::class, 'setAsResume'])->name('media.set-as-resume');
    Route::post('/media/{media}/set-as-portrait', [\App\Http\Controllers\Admin\MediaController::class, 'setAsPortrait'])->name('media.set-as-portrait');

    // Messages
    Route::get('/messages', [\App\Http\Controllers\Admin\MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [\App\Http\Controllers\Admin\MessageController::class, 'show'])->name('messages.show');
    Route::patch('/messages/{message}/status', [\App\Http\Controllers\Admin\MessageController::class, 'updateStatus'])->name('messages.status');
    Route::post('/messages/{message}/retry-notification', [\App\Http\Controllers\Admin\MessageController::class, 'retryNotification'])->name('messages.retry');
    Route::delete('/messages/{message}', [\App\Http\Controllers\Admin\MessageController::class, 'destroy'])->name('messages.destroy');
});

// User Profile Settings
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
