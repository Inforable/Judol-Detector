export default function Header() {
    return (
        <header className="bg-white shadow border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-blue-700 mb-3 tracking-tight">
                        Judol Detector
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Deteksi komentar judol di Youtube dengan Regex, Knuth-Morris-Pratt, Boyer-Moore, dan Rabin-Karp
                    </p>
                </div>
            </div>
        </header>
    );
}