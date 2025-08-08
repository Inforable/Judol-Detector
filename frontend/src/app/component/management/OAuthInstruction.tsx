interface OAuthInstructionsProps {
    onClose: () => void;
}

export default function OAuthInstructions({ onClose }: OAuthInstructionsProps) {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">
                <i className="fas fa-info-circle mr-1"></i>
                Cara mendapat Access Token:
            </h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>
                    Buka: <a 
                        href="https://developers.google.com/oauthplayground/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline font-medium hover:text-blue-900"
                    >
                        Google OAuth 2.0 Playground
                    </a>
                </li>
                <li>
                    Klik Setting: Centang "Use your own OAuth credentials"
                </li>
                <li>Masukkan Client ID & Client Secret dari Google Cloud Console</li>
                <li>
                    Input scope: 
                    <code className="bg-white px-1 rounded text-xs ml-1">
                        https://www.googleapis.com/auth/youtube.force-ssl
                    </code>
                </li>
                <li>Klik "Authorize APIs": Login dengan akun Google</li>
                <li>Klik "Exchange authorization code for tokens"</li>
                <li>Copy "Access token" dan paste ke form di atas</li>
            </ol>
            
            <button
                onClick={onClose}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
            >
                <i className="fas fa-times mr-1"></i>
                Sembunyikan instruksi
            </button>
        </div>
    );
}