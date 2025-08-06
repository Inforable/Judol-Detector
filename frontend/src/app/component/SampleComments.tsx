export default function SampleComments({ comments }: { comments: string[] }) {
    if (!comments || comments.length === 0) return null;
    return (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-comments text-blue-500"></i>
                Contoh Komentar
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.slice(0, 5).map((comment: string, index: number) => (
                    <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <p className="text-sm text-gray-700">{comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}