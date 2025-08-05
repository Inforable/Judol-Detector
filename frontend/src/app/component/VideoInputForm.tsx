"use client";
import { useState } from 'react';

const algorithms = [
    { value: 'regex', label: 'Regex' },
    { value: "kmp", label: "KMP" },
    { value: "bm", label: "BM" },
    { value: "rk", label: "RK" },
]

export default function VideoInputForm({ onSubmit }: { onSubmit: (input: string, algo: string, pattern?: string[]) => void }) {
    const [input, setInput] = useState('');
    const [algo, setAlgo] = useState('regex');
    const [pattern, setPattern] = useState<string[] | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setPattern(text.split('\n').map(line => line.trim()).filter(Boolean));
        };
        reader.readAsText(file);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate input
        if (!input.trim()) {
            setError("Input cannot be empty");
            return;
        }
        if (algo !== "regex" && (!pattern || pattern.length === 0)) {
            setError("Pattern is required for this algorithm");
            return;
        }
        setError(null);
        onSubmit(input, algo, pattern);
    }

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={e => {
                e.preventDefault();
                onSubmit(input, algo);
            }}
        >
            <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Please enter a video URL"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <div className="flex gap-4">
                {algorithms.map(a => (
                    <label key={a.value} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="algorithm"
                            value={a.value}
                            checked={algo === a.value}
                            onChange={() => setAlgo(a.value)}
                            className="form-radio text-blue-600 focus:ring-blue-500"
                        />
                        {a.label}
                    </label>
                ))}
            </div>
            {/* Pattern Input Section */}
            {algo !== 'regex' && (
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                    placeholder="Upload pattern file (.txt)"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            )}
            {/* Preview Patterns */}
            {algo !== "regex" && pattern && pattern.length > 0 && (
                <div className="bg-gray-100 rounded p-2 text-xs max-h-32 overflow-y-auto">
                    <div className="font-semibold mb-1">Pattern Preview:</div>
                    <ul className="list-disc pl-5">
                        {pattern.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </div>
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" type="submit">
                Check
            </button>
        </form>
    );
} 