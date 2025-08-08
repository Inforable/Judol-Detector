import VideoInputForm from './VideoInputForm';

interface InputSectionProps {
    onSubmit: (input: string, algorithm: string, pattern?: string[]) => void;
}

export default function InputSection({ onSubmit }: InputSectionProps) {
    return (
        <div className="bg-gray-50 rounded-2xl shadow border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-video text-blue-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Input Video</h2>
            </div>
            <VideoInputForm onSubmit={onSubmit} />
        </div>
    )
}