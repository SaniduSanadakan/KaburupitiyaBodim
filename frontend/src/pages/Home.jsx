import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';
import Navigation from '../components/Navigation';

export default function Home() {
    const [content, setContent] = useState({
        title: 'Welcome to Kaburupitiya Bodim',
        description: 'We are a team of passionate individuals dedicated to providing the best possible service to our clients.',
    });

    return (
        <div>
            <Navigation />
        <div className="p-6 max-w-4xl mx-auto">
            
            <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
            <p className="text-gray-700">{content.description}</p>
        </div>
        </div>
    );
}