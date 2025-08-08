export type AppMode = 'detect' | 'insert' | 'delete';

export type Algorithm = 'regex' | 'kmp' | 'bm' | 'rk';

export interface DetectionResult {
    videoId: string;
    algorithm: string;
    pattern?: string[];
    result: {
        totalComments: number;
        detectedCount: number;
        percentage: number;
        detectedComments: DetectedComment[];
    };
}

export interface DetectedComment {
    text: string;
    algorithm: string;
}

export interface InsertResult {
    success: boolean;
    inserted: number;
    failed: number;
    results: {
        success: boolean;
        comment: string;
        id?: string;
        error?: string;
    }[];
}

export interface DeleteResult {
    success: boolean;
    deleted: number;
    failed: number;
    deletedComments: {
        id: string;
        comment: string;
        success: boolean;
        error?: string;
    }[];
}