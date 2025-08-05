"use client";
import VideoInputForm from "./component/VideoInputForm";

export default function Home() {
    const handleSubmit = (input: string, algo: string, pattern?: string[]) => {
        alert(
            `Input: ${input}\nAlgoritma: ${algo}` +
            (pattern ? `\nPatterns: \n${pattern.join('\n')}` : "")
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col">
            {/* Header Section */}
            <header className="w-full py-6 bg-white shadow-md">
                <h1 className="text-3xl font-extrabold text-blue-700 text-center tracking-tight">Judol Detector</h1>
            </header>

            {/* Main Content Section */}
            <main className="flex-1 flex flex-col items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Detektor Judol</h2>
                    <VideoInputForm onSubmit={handleSubmit} />
                </div>
            </main>

            {/* Footer Section */}
            <footer className="w-full py-4 bg-white shadow-inner text-center text-gray-400 text-sm">
                @ 2025 Judol Detector. All rights reserved.
            </footer>
        </div>
    );
}