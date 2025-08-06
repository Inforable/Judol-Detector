export default function DetectedComments({ comments }: { comments: string[] }) {
    if (!comments || comments.length === 0) return null

    return (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle text-red-500"></i>
                Komentar Terdeteksi Judol
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.slice(0, 10).map((comment: any, index: number) => (
                    <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <p className="text-sm text-gray-700">{comment.text}</p>
                        <div className="mt-2 text-xs text-red-600 font-medium">
                            Algoritma: {comment.algorithm?.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}