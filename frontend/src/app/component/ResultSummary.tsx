export default function ResultSummary({ result }: { result: any }) {
    return (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-chart-bar text-green-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Hasil Deteksi</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{result.result?.totalComments || 0}</div>
                    <div className="text-sm text-blue-700 font-medium">Total Komentar</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                    <div className="text-2xl font-bold text-red-600">{result.result?.detectedCount || 0}</div>
                    <div className="text-sm text-red-700 font-medium">Terdeteksi Judol</div>
                </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{result.result?.percentage || 0}%</div>
                <div className="text-sm text-purple-700 font-medium">Persentase Judol</div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Video ID:</span> {result.videoId}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Algoritma:</span> {result.algorithm?.toUpperCase()}
                </div>
            </div>
        </div>
    );
}