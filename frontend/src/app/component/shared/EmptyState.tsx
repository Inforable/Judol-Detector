export default function EmptyState() {
    return (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
            <div className="text-center py-12">
                <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Yuk Cek Komentar Judol di YouTube
                </h3>
                <p className="text-gray-500">
                    Masukkan link video YouTube dan pilih algoritma untuk memulai deteksi
                </p>
            </div>
        </div>
    );
}