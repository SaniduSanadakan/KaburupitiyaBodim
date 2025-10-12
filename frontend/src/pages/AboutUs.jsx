import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';
import Navigation from '../components/Navigation';

export default function AboutUs() {
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        // Simulate API call to fetch team data
        const fetchTeam = async () => {
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mock team data
                const mockTeam = [
                    { id: 1, name: 'John Doe', role: 'Founder & CEO' },
                    { id: 2, name: 'Jane Smith', role: 'CTO' },
                    { id: 3, name: 'Mike Johnson', role: 'Lead Developer' },
                ];
                
                setTeam(mockTeam);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching team data:', error);
                setIsLoading(false);
            }
        };

        fetchTeam();
    }, []);


    return (
        <div>
            <Navigation />
        <div className="p-6 max-w-4xl mx-auto">
            
            <h1 className="text-3xl font-bold mb-6">About Our Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map(member => (
                    <div key={member.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}