"use client";
import { useState } from 'react';
import Header from './component/Header';
import InputSection from './component/InputSection';
import InstructionCard from './component/InstructionCard';
import LoadingState from './component/LoadingState';
import ErrorState from './component/ErrorState';
import ResultSummary from './component/ResultSummary';
import DetectedComments from './component/DetectedComments';
import SampleComments from './component/SampleComments';
import EmptyState from './component/EmptyState';
import { detectComments } from './service/api';

export default function Home() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (input: string, algo:string, pattern?: string[]) => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const data = await detectComments({
                videoUrl: input,
                algorithm: algo,
                pattern: pattern,
            });
            setResult(data);
        } catch (error) {
            setError("Failed to detect comments");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Section */}
                    <div className="space-y-6">
                        <InputSection onSubmit={handleSubmit} />
                        <InstructionCard />
                    </div>
                    {/* Right Section */}
                    <div className="space-y-6">
                        {loading && <LoadingState />}
                        {error && <ErrorState error={error} />}
                        {result && !loading && (
                            <div>
                                <ResultSummary result={result} />
                                <DetectedComments comments={result.result?.detectedComments} />
                                <SampleComments comments={result.result?.sampleComments} />
                            </div>
                        )}
                        {!loading && !result && !error && <EmptyState />}
                    </div>
                </div>
            </main>
        </div>
    );
}