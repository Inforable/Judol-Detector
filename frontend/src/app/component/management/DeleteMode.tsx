"use client";
import { useState } from 'react';
import OAuthInstructions from './OAuthInstruction';
import { ApiService } from '../../service/api';
import { DeleteResult, DetectedComment, Algorithm } from '../../type';

export default function DeleteMode() {
    const [videoInput, setVideoInput] = useState('');
    const [algorithm, setAlgorithm] = useState<Algorithm>('regex');
    const [pattern, setPattern] = useState<string[] | undefined>(undefined);
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DeleteResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showOAuthInstructions, setShowOAuthInstructions] = useState(false);
    const [judolComments, setJudolComments] = useState<DetectedComment[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Konfigurasi algoritma deteksi
    const algorithms = [
        { value: 'regex' as Algorithm, label: 'Regex' },
        { value: 'kmp' as Algorithm, label: 'KMP' },
        { value: 'bm' as Algorithm, label: 'BM' },
        { value: 'rk' as Algorithm, label: 'RK' },
    ];

    // Handler untuk mendapatkan OAuth token
    const handleAuth = async () => {
        setShowOAuthInstructions(true);
    };

    // Handler untuk upload file pattern
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            const patterns = text.split('\n')
                .map(line => line.trim())
                .filter(Boolean);
            setPattern(patterns);
        };
        reader.readAsText(file);
    };

    // Handler untuk mencari komentar judol
    const handleFindJudol = async () => {
        // Validasi input
        if (!videoInput.trim()) {
            setError('Video URL/ID required');
            return;
        }

        // Validasi algoritma
        if (algorithm !== 'regex' && (!pattern || pattern.length === 0)) {
            setError('Pattern file required for selected algorithm');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        setJudolComments([]);
        
        // Panggil API untuk mendeteksi komentar judol
        try {
            const data = await ApiService.detectComments({
                videoUrl: videoInput.trim(),
                algorithm: algorithm,
                pattern: pattern
            });

            if (data.result?.detectedComments && data.result.detectedComments.length > 0) {
                setJudolComments(data.result.detectedComments);
                setShowDeleteConfirm(true);
            } else {
                setError('No judol comments found');
            }
        } catch (error: any) {
            setError(error.message || 'Detection failed');
        } finally {
            setLoading(false);
        }
    };

    // Handler untuk proses delete komentar
    const handleDelete = async () => {
        if (!accessToken.trim()) {
            setError('Access Token required');
            return;
        }

        if (algorithm !== 'regex' && (!pattern || pattern.length === 0)) {
            setError('Pattern file required for selected algorithm');
            return;
        }

        setLoading(true);
        setError(null);
        setShowDeleteConfirm(false);
        
        try {
            const data = await ApiService.deleteComments({
                videoId: videoInput.trim(),
                accessToken: accessToken.trim(),
                algorithm: algorithm,
                pattern: pattern,
            });
            setResult(data);
            setJudolComments([]);
        } catch (error: any) {
            setError(error.message || 'Delete failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-trash text-red-600 text-xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Mode Delete Komentar Judol</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column for Form */}
                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="fas fa-search text-red-600"></i>
                            Cari & Hapus Komentar Judol
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Video Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Video URL atau Video ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Masukkan Video URL atau Video ID"
                                    value={videoInput}
                                    onChange={(e) => setVideoInput(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    disabled={loading}
                                />
                            </div>

                            {/* Algorithm Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pilih Algoritma Deteksi
                                </label>
                                <div className="flex gap-4">
                                    {algorithms.map(alg => (
                                        <label key={alg.value} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="algorithm"
                                                value={alg.value}
                                                checked={algorithm === alg.value}
                                                onChange={() => setAlgorithm(alg.value)}
                                                className="form-radio text-red-600 focus:ring-red-500"
                                                disabled={loading}
                                            />
                                            {alg.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Pattern Upload */}
                            {algorithm !== 'regex' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Pattern File (.txt)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".txt"
                                        onChange={handleFileChange}
                                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
                                        disabled={loading}
                                    />
                                    {pattern && pattern.length > 0 && (
                                        <div className="bg-gray-100 rounded p-2 text-xs max-h-32 overflow-y-auto mt-2">
                                            <div className="font-semibold mb-1">Pattern Preview:</div>
                                            <ul className="list-disc pl-5">
                                                {pattern.map((p, i) => (
                                                    <li key={i}>{p}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {/* Access Token */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Access Token
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        placeholder="Paste Access Token (ya29.a0AfH6...)"
                                        value={accessToken}
                                        onChange={(e) => setAccessToken(e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAuth}
                                        disabled={loading}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                                    >
                                        <i className="fas fa-key mr-2"></i>
                                        Get Token
                                    </button>
                                </div>
                            </div>
                            
                            {/* Find Button */}
                            <button
                                type="button"
                                onClick={handleFindJudol}
                                disabled={loading || !videoInput}
                                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition flex items-center justify-center font-medium"
                            >
                                {loading ? (
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                ) : (
                                    <i className="fas fa-search mr-2"></i>
                                )}
                                Cari Komentar Judol
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column for Instruction & Result */}
                <div className="space-y-6">
                    {/* Instruction */}
                    <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fas fa-info-circle text-red-600"></i>
                            Cara Delete Komentar Judol
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-chevron-right text-red-500 mt-1 text-xs"></i>
                                Masukkan Video URL atau ID dari video milik Anda sendiri
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-chevron-right text-red-500 mt-1 text-xs"></i>
                                Pilih algoritma dan upload pattern file jika diperlukan
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-chevron-right text-red-500 mt-1 text-xs"></i>
                                Dapatkan Access Token dengan klik "Get Token"
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-chevron-right text-red-500 mt-1 text-xs"></i>
                                Klik "Cari Komentar Judol" untuk mendeteksi dan konfirmasi
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-exclamation-triangle text-yellow-500 mt-1 text-xs"></i>
                                <span className="text-yellow-700 font-medium">Peringatan: Hanya bisa menghapus komentar di akun milik sendiri</span>
                            </li>
                        </ul>
                    </div>

                    {/* OAuth Instruction */}
                    {showOAuthInstructions && (
                        <OAuthInstructions onClose={() => setShowOAuthInstructions(false)} />
                    )}

                    {/* Delete Confirmation */}
                    {showDeleteConfirm && judolComments.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                Konfirmasi Penghapusan
                            </h3>
                            <p className="text-sm text-yellow-700 mb-3">
                                Ditemukan {judolComments.length} komentar judol yang akan dihapus:
                            </p>
                            <div className="max-h-32 overflow-y-auto mb-4">
                                {judolComments.slice(0, 20).map((comment, index) => (
                                    <div key={index} className="text-xs bg-white p-2 rounded border mb-1">
                                        {comment.text}
                                    </div>
                                ))}
                                {judolComments.length > 20 && (
                                    <p className="text-xs text-yellow-600">
                                        ... dan {judolComments.length - 20} komentar lainnya
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading || !accessToken}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition flex items-center text-sm"
                                >
                                    {loading ? (
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                    ) : (
                                        <i className="fas fa-trash mr-2"></i>
                                    )}
                                    Hapus Sekarang ({judolComments.length})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
                                >
                                    Batal
                                </button>
                            </div>
                            {!accessToken && (
                                <p className="text-xs text-red-600 mt-2">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    Access Token diperlukan untuk menghapus komentar
                                </p>
                            )}
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                            <div className="flex items-center">
                                <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                                <b className="text-red-800">Error:</b>
                            </div>
                            <p className="text-red-700 mt-1">{error}</p>
                        </div>
                    )}

                    {/* Delete Result */}
                    {result && result.deleted !== undefined && (
                        <div className="bg-gray-50 rounded-lg border p-4">
                            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                <i className="fas fa-check-circle text-green-600 mr-2"></i>
                                Hasil Delete:
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p className="text-red-600">
                                    <i className="fas fa-trash mr-1"></i>
                                    Berhasil delete: {result.deleted || 0} komentar judol
                                </p>
                                {result.failed > 0 && (
                                    <p className="text-orange-600">
                                        <i className="fas fa-exclamation-triangle mr-1"></i>
                                        Gagal: {result.failed} operasi
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}