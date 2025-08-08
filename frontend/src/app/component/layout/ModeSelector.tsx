import { AppMode } from '../../type'

interface ModeSelectorProps {
    currentMode: AppMode;
    onModeChange: (mode: AppMode) => void;
}

export default function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
    // Konfigurasi mode dengan metadata
    const modes: Array<{
        key: AppMode,
        title: string,
        description: string,
        icon: string,
        color: string
    }> = [
        {
            key: 'detect' as AppMode,
            title: 'Deteksi Komentar Judol',
            description: 'Deteksi komentar judol dari video YouTube menggunakan berbagai algoritma.',
            icon: 'fas fa-search',
            color: 'blue'
        },
        {
            key: 'insert' as AppMode,
            title: 'Insert Komentar',
            description: 'Masukkan komentar ke video YouTube (hanya untuk akun sendiri).',
            icon: 'fas fa-plus',
            color: 'green'
        },
        {
            key: 'delete' as AppMode,
            title: 'Hapus Komentar',
            description: 'Hapus komentar dari video YouTube (hanya untuk akun sendiri).',
            icon: 'fas fa-trash',
            color: 'red'
        }
    ];

    const handleModeSelect = (mode: AppMode) => {
        onModeChange(mode);
    }

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Pilih Mode Operasi
                </h2>
                <p className="text-gray-600">
                    Pilih mode yang ingin digunakan untuk mengelola komentar judol di YouTube.
                </p>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 gap-y-8">
                {modes.map((mode) => {
                    const isActive = currentMode === mode.key;
                    const baseClasses = "p-6 rounded-2xl transition-all duration-200 flex flex-col items-center min-w-[220px] cursor-pointer";
                    const activeClasses = isActive
                        ? `bg-${mode.color}-600 text-white shadow-lg scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md';

                    return (
                        <button
                            key={mode.key}
                            onClick={() => handleModeSelect(mode.key)}
                            className={`${baseClasses} ${activeClasses}`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                isActive ? `bg-${mode.color}-500` : `bg-${mode.color}-100`
                            }`}>
                                <i className={`${mode.icon} text-2xl ${
                                    isActive ? 'text-white' : `text-${mode.color}-600`
                                }`}></i>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <h3 className="text-lg font-bold">{mode.title}</h3>
                                <p className={`text-sm text-center ${
                                    isActive ? `text-${mode.color}-100` : 'text-gray-500'
                                }`}>
                                    {mode.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}