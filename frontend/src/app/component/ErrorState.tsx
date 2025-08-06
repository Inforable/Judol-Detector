export default function ErrorState({ error }: { error: string}) {
    return (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-3">
                <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                <div>
                    <h3 className="text-lg font-semibold text-red-800">Terjadi Kesalahan</h3>
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            </div>
        </div>
    )
}