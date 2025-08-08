import { DetectionResult, InsertResult, DeleteResult } from '../type';

const API_BASE_URL = 'http://localhost:5000/api';

export class ApiService {
    // Deteksi komentar judol dari video youtube
    static async detectComments({
        videoUrl,
        algorithm,
        pattern,
    }: {
        videoUrl: string;
        algorithm: string;
        pattern?: string[];
    }): Promise<DetectionResult> {
        const response = await fetch(`${API_BASE_URL}/detect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                videoUrl,
                algorithm,
                pattern,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to detect comments');
        }

        return response.json();
    }

    // Mendapatkan URL untuk OAuth authorization
    static async getAuthUrl(): Promise<{ authUrl: string }> {
        const response = await fetch(`${API_BASE_URL}/comments/auth`);

        if (!response.ok) {
            throw new Error('Failed to get auth URL');
        }

        return response.json();
    }

    // Insert komentar ke video youtube (khusus untuk akun sendiri)
    static async insertComments({
        videoId,
        comments,
        accessToken,
    }: {
        videoId: string;
        comments: string;
        accessToken: string;
    }): Promise<InsertResult> {
        const response = await fetch(`${API_BASE_URL}/comments/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                videoId,
                comments,
                accessToken,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to insert comments');
        }

        return response.json();
    }

    // Delete komentar dari video youtube (khusus untuk akun sendiri)
    static async deleteComments({
        videoId,
        accessToken,
    }: {
        videoId: string;
        accessToken: string;
    }): Promise<DeleteResult> {
        const response = await fetch(`${API_BASE_URL}/comments/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                videoId,
                accessToken,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete comments');
        }

        return response.json();
    }
}