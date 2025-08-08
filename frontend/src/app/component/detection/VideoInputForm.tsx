"use client";
import React, { useState } from 'react';
import { Algorithm } from '../../type';

interface VideoInputFormProps {
    onSubmit: (videoUrl: string, algorithm: Algorithm, pattern?: string[]) => void;
}

export default function VideoInputForm({ onSubmit }: VideoInputFormProps) {
    const [input, setInput] = useState('');
    const [algorithm, setAlgorithm] = useState<Algorithm>('regex');
    const [pattern, setPattern] = useState<string[] | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    // Konfigurasi algoritma deteksi
    const algorithms: { value: Algorithm; label: string }[] = [
        { value: 'regex', label: 'Regex' },
        { value: 'kmp', label: 'KMP' },
        { value: 'bm', label: 'BM' },
        { value: 'rk', label: 'Rabin-Karp' },
    ];

    // Handler upload file pattern
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            const patterns = text.split('\n').map(line => line.trim()).filter(Boolean);
            setPattern(patterns);
        };
        reader.readAsText(file);
    };

    // Hanlder submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi input
        if (!input) {
            setError('Video URL or ID video is required');
            return;
        }

        // Validasi pattern
        if (algorithm !== 'regex' && (!pattern || pattern.length === 0)) {
            setError('Pattern is required for selected algorithm');
            return;
        }

        setError(null);
        onSubmit(input, algorithm, pattern);
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Input URL atau ID video */}
            <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter video URL or ID"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            {/* Algorithm Selection */}
            <div className="flex gap-4">
                {algorithms.map((algo) => (
                    <label key={algo.value} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="algorithm"
                            value={algo.value}
                            checked={algorithm === algo.value}
                            onChange={() => setAlgorithm(algo.value)}
                            className="form-radio text-blue-600 focus:ring-blue-500"
                        />
                        {algo.label}
                    </label>
                ))}
            </div>

            {/* Input Pattern */}
            {algorithm !== 'regex' && (
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                    placeholder="Upload pattern file (.txt)"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            )}

            {/* Pattern Preview */}
            {algorithm !== 'regex' && pattern && pattern.length > 0 && (
                <div className="bg-gray-100 rounded p-2 text-xs max-h-32 overflow-y-auto">
                    <div className="font-semibold mb-1">Preview Pattern:</div>
                    <ul className="list-disc pl-5">
                        {pattern.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            
            {/* Submit Button */}
            <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" 
                type="submit"
            >
                Analisis
            </button>
        </form>
    );
}