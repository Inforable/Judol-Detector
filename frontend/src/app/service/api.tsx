export async function detectComments({
    videoUrl,
    algorithm,
    pattern,
}: {
    videoUrl: string;
    algorithm: string;
    pattern?: string[];
}) {
    const response = await fetch("http://localhost:5000/api/detect", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            videoUrl,
            algorithm,
            pattern,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to detect comments");
    }

    return response.json();
}