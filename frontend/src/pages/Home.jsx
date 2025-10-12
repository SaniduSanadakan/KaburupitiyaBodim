import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState(null);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setContent({
                title: 'Welcome to Our Application',
                description: 'This is a sample home page with loading state.'
            });
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading fullScreen={true} text="Loading home content..." />;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
            <p className="text-gray-700">{content.description}</p>
        </div>
    );
}