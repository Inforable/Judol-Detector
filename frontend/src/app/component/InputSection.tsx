import VideoInputForm from "./VideoInputForm";

export default function InputSection({ onSubmit }: { onSubmit: (input: string, algo: string, pattern?: string[]) => void }) {
    return (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-video text-blue-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Input Video</h2>
            </div>
            <VideoInputForm onSubmit={onSubmit} />
        </div>
    );
}