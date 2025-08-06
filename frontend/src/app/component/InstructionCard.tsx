export default function InstructionCard() {
    return (
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <i className="fas fa-into-circle text-blue-600"></i>
                Cara Penggunaan
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                    <i className="fas fa-chevron-right text-blue-500 mt-1 text-xs"></i>
                    Masukkan link atau ID video Youtube
                </li>
                <li className="flex items-start gap-3">
                    <i className="fas fa-chevron-right text-blue-500 mt-1 text-xs"></i>
                    Pilih algoritma deteksi (Regex, Knuth-Morris-Pratt, Boyer-Moore, Rabin-Karp)
                </li>
                <li className="flex items-start gap-3">
                    <i className="fas fa-chevron-right text-blue-500 mt-1 text-xs"></i>
                    Jika menggunakan algoritma selain Regex, unggah file teks (.txt) berisi pola yang ingin dideteksi
                </li>
                <li className="flex items-start gap-3">
                    <i className="fas fa-chevron-right text-blue-500 mt-1 text-xs"></i>
                    Klik pada "Analisis" untuk mulai proses deteksi
                </li>
            </ul>
        </div>
    );
}