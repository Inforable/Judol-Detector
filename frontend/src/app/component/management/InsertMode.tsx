"use client";
import { useState } from 'react';
import OAuthInstructions from './OAuthInstruction';
import { ApiService } from '../../service/api';
import { InsertResult } from '../../type';

export default function InsertMode() {
    const [videoInput, setVideoInput] = useState('');
    const [comments, setComments] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<InsertResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showOAuthInstructions, setShowOAuthInstructions] = useState(false);

    // Handler untuk mendapatkan OAuth token
    const handleAuth = async () => {
        setShowOAuthInstructions(true);
    };

    // Handler untuk upload file komentar (.txt)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setComments(text);
        };
        reader.readAsText(file);
    };

    // Handler untuk insert komentar
    const handleInsert = async () => {
        // Validasi input
        if (!videoInput.trim()) {
            setError('Video URL/ID required');
            return;
        }

        // Validasi access token
        if (!accessToken.trim()) {
            setError('Access Token required');
            return;
        }

        // Validasi komentar
        if (!comments.trim()) {
            setError('Komentar required');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        
        // Panggil API untuk insert komentar
        try {
            const data = await ApiService.insertComments({
                videoId: videoInput.trim(),
                comments: comments.trim(),
                accessToken: accessToken.trim()
            });
            setResult(data);
        } catch (error: any) {
            setError(error.message || 'Insert failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-plus text-green-600 text-xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Mode Insert Komentar</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column for Form */}
                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="fas fa-edit text-green-600"></i>
                            Form Input
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    disabled={loading}
                                />
                            </div>
                            
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
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            
                            {/* Comments Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Komentar (pisahkan dengan semicolon ;)
                                </label>
                                <textarea
                                    placeholder="Komentar1; Komentar2; Komentar3"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    disabled={loading}
                                />
                                <div className="mt-2">
                                    <label className="block text-xs text-gray-500 mb-1">
                                        Atau upload file .txt:
                                    </label>
                                    <input
                                        type="file"
                                        accept=".txt"
                                        onChange={handleFileUpload}
                                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={handleInsert}
                                disabled={loading || !videoInput || !accessToken || !comments}
                                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition flex items-center justify-center font-medium"
                            >
                                {loading ? (
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                ) : (
                                    <i className="fas fa-plus mr-2"></i>
                                )}
                                Insert Komentar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column for Instruction & Result */}
                <div className="space-y-6">
                    {/* Instruction */}
                    <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fas fa-info-circle text-green-600"></i>
                            Cara Insert Komentar
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-chevron-right text-green-500 mt-1 text-xs"></i>
                                Masukkan Video URL atau ID video yang ingin diberi komentar
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-chevron-right text-green-500 mt-1 text-xs"></i>
                                Dapatkan Access Token dengan klik "Get Token"
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-chevron-right text-green-500 mt-1 text-xs"></i>
                                Tulis komentar dengan pemisah semicolon (;) atau upload file .txt
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-chevron-right text-green-500 mt-1 text-xs"></i>
                                Klik "Insert Komentar" untuk memproses
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-exclamation-triangle text-yellow-500 mt-1 text-xs"></i>
                                <span className="text-yellow-700 font-medium">Peringatan: Hanya bisa menambah komentar di video milik sendiri</span>
                            </li>
                        </ul>
                    </div>

                    {/* OAuth Instructions */}
                    {showOAuthInstructions && (
                        <OAuthInstructions onClose={() => setShowOAuthInstructions(false)} />
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

                    {/* Result Display */}
                    {result && (
                        <div className="bg-gray-50 rounded-lg border p-4">
                            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                <i className="fas fa-check-circle text-green-600 mr-2"></i>
                                Hasil Insert:
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p className="text-green-600">
                                    <i className="fas fa-check mr-1"></i>
                                    Berhasil insert: {result.inserted || 0} komentar
                                </p>
                                {result.failed > 0 && (
                                    <p className="text-orange-600">
                                        <i className="fas fa-exclamation-triangle mr-1"></i>
                                        Gagal: {result.failed} operasi
                                    </p>
                                )}
                            </div>

                            {/* Detail Results */}
                            {result.results && result.results.length > 0 && (
                                <details className="mt-3">
                                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                                        Lihat detail hasil ({result.results.length} item)
                                    </summary>
                                    <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
                                        {result.results.map((item, index) => (
                                            <div key={index} className={`text-xs p-2 rounded ${item.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                                <span className={item.success ? 'text-green-700' : 'text-red-700'}>
                                                    {item.success ? <i className="fas fa-check mr-1"></i> : <i className="fas fa-times mr-1"></i>} 
                                                    {item.comment}
                                                </span>
                                                {item.error && (
                                                    <div className="text-red-600 text-xs mt-1">{item.error}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}