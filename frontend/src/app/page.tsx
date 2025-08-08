"use client";
import { useState } from "react";
import Header from "./component/shared/Header";
import ModeSelector from "./component/layout/ModeSelector";
import DetectionMode from "./component/detection/DetectionMode";
import InsertMode from './component/management/InsertMode';
import DeleteMode from './component/management/DeleteMode';
import { AppMode } from "./type";

export default function Home() {
    const [currentMode, setCurrentMode] = useState<AppMode>('detect');

    const handleModeChange = (mode: AppMode) => {
        setCurrentMode(mode);
    };

    const renderModeComponent = () => {
        switch (currentMode) {
            case 'detect':
                return <DetectionMode />;
            case 'insert':
                return <InsertMode />;
            case 'delete':
                return <DeleteMode />;
            default:
                return <DetectionMode />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Mode Selector */}
            <section className="max-w-7xl mx-auto px-6 py-8">
                <ModeSelector
                    currentMode={currentMode}
                    onModeChange={handleModeChange}
                />
            </section>

            {/* Mode Content */}
            <section className="max-w-7xl mx-auto px-6 pb-12">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                    {renderModeComponent()}
                </div>
            </section>
        </div>
    );
}