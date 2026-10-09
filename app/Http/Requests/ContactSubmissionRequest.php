<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => is_string($this->name) ? trim($this->name) : $this->name,
            'email' => is_string($this->email) ? trim(strtolower($this->email)) : $this->email,
            'company' => is_string($this->company) ? trim($this->company) : $this->company,
            'message' => is_string($this->message) ? trim($this->message) : $this->message,
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:100'],
            'email' => ['required', 'email', 'max:254'],
            'company' => ['nullable', 'string', 'max:150'],
            'purpose' => ['required', 'string', 'in:cooperation,opportunity,discussion'],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
            'consent' => ['accepted'],
            'submission_token' => ['required', 'string'],
            'website_url' => ['nullable', 'max:0'], // Honeypot
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama lengkap wajib diisi.',
            'name.min' => 'Nama lengkap minimal 2 karakter.',
            'name.max' => 'Nama lengkap maksimal 100 karakter.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format alamat email tidak valid.',
            'email.max' => 'Alamat email maksimal 254 karakter.',
            'company.max' => 'Nama perusahaan maksimal 150 karakter.',
            'purpose.required' => 'Silakan pilih tujuan diskusi.',
            'purpose.in' => 'Tujuan diskusi yang dipilih tidak valid.',
            'message.required' => 'Pesan wajib diisi.',
            'message.min' => 'Pesan minimal 20 karakter agar konteks dapat dipahami.',
            'message.max' => 'Pesan maksimal 5.000 karakter.',
            'consent.accepted' => 'Anda harus menyetujui pemrosesan data kontak untuk mengirim pesan.',
            'website_url.max' => 'Pengiriman otomatis terdeteksi (spam bot).',
        ];
    }
}
