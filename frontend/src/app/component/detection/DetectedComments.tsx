import { DetectedComment } from '../../type';

interface DetectedCommentsProps {
    comments: DetectedComment[];
    patterns: string[];
}


// Highlight text berdasarkan pattern
function highlightText(text: string, patterns: string[]) {
    if (!patterns || patterns.length === 0) return text;
    
    const regex = new RegExp(
        `(${patterns.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 
        'gi'
    );
    
    return text.split(regex).map((part, i) =>
        patterns.some(p => new RegExp(`^${p}$`, 'i').test(part))
            ? <span key={i} className="font-bold text-red-600">{part}</span>
            : part
    );
}

export default function DetectedComments({ comments, patterns }: DetectedCommentsProps) {
    if (!comments || comments.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
            {/* Header */}
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle text-red-500"></i>
                Komentar Terdeteksi Judol
            </h3>
            
            {/* Comments List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.slice(0, 10).map((comment, index) => (
                    <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <p className="text-sm text-gray-700">
                            {highlightText(comment.text, patterns)}
                        </p>
                        <div className="mt-2 text-xs text-red-600 font-medium">
                            Algoritma: {comment.algorithm?.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Show more indicator */}
            {comments.length > 10 && (
                <div className="mt-4 text-center text-sm text-gray-500">
                    Dan {comments.length - 10} komentar lainnya...
                </div>
            )}
        </div>
    );
}