export default function LoadingState() {
    return (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
            <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-6 text-lg font-semibold text-gray-700">
                    Menganalisis Komentar Video...
                </p>
            </div>
        </div>
    );
}