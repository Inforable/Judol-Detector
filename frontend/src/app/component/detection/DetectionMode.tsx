"use client";
import { useState } from 'react';
import InputSection from './InputSection';
import InstructionCard from './InstructionCard';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';
import ResultSummary from './ResultSummary';
import DetectedComments from './DetectedComments';
import EmptyState from '../shared/EmptyState';
import { ApiService } from '../../service/api';
import { DetectionResult } from '../../type';

export default function DetectionMode() {
    const [result, setResult] = useState<DetectionResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle form submission
    const handleSubmit = async (videoUrl: string, algorithm: string, pattern?: string[]) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const detectionResult = await ApiService.detectComments({ 
                videoUrl, 
                algorithm, 
                pattern 
            });
            setResult(detectionResult);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Gagal melakukan deteksi komentar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-search text-blue-600 text-xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Mode Deteksi Komentar Judol</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left column for input & instruction */}
                <div className="space-y-6">
                    <InputSection onSubmit={handleSubmit} />
                    <InstructionCard />
                </div>
                
                {/* Right column for Result */}
                <div className="space-y-6">
                    {loading && <LoadingState />}
                    {error && !loading && <ErrorState error={error} />}
                    {result && !loading && (
                        <div className="space-y-6">
                            <ResultSummary result={result} />
                            <DetectedComments 
                                comments={result.result?.detectedComments || []} 
                                patterns={result.pattern || []}
                            />
                        </div>
                    )}
                    {!result && !loading && !error && <EmptyState />}
                </div>
            </div>
        </>
    );
}