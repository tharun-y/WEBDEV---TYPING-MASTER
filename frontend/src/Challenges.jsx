// ChallengesPage.jsx
import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Crown } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

function ChallengesPage() {
    const [timeLeft, setTimeLeft] = useState('');
    
    // Mock data - in a real app this would come from an API
    const contestInfo = {
        name: "Daily Speed Challenge",
        startTime: new Date(new Date().setHours(20, 0, 0, 0)), // 8 PM today
        prizeMoney: {
            first: 100,
            second: 50,
            third: 25
        }
    };

    const leaderboard = [
        { rank: 1, username: "speedmaster", wpm: 120, accuracy: 98.5 },
        { rank: 2, username: "typeking", wpm: 115, accuracy: 97.8 },
        { rank: 3, username: "swiftfingers", wpm: 112, accuracy: 96.9 },
        { rank: 4, username: "keyboardwarrior", wpm: 108, accuracy: 95.5 },
        { rank: 5, username: "typingpro", wpm: 105, accuracy: 94.2 },
    ];

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const timeDiff = contestInfo.startTime.getTime() - now.getTime();
            
            if (timeDiff <= 0) {
                setTimeLeft('Contest is Live!');
                return;
            }

            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black p-8 pt-20"> {/* Changed bg-gray-100 to bg-black and added pt-20 for header spacing */}
            <Header/>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Contest Info */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 text-white">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center">
                            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                            {contestInfo.name}
                        </h2>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-2" />
                            <span className="font-semibold">{timeLeft}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-yellow-900 to-yellow-700 p-4 rounded-lg text-center">
                            <Crown className="w-8 h-8 mx-auto text-yellow-300 mb-2" />
                            <p className="text-sm">1st Place</p>
                            <p className="text-xl font-bold">${contestInfo.prizeMoney.first}</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-700 to-gray-600 p-4 rounded-lg text-center">
                            <Crown className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                            <p className="text-sm">2nd Place</p>
                            <p className="text-xl font-bold">${contestInfo.prizeMoney.second}</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900 to-orange-700 p-4 rounded-lg text-center">
                            <Crown className="w-8 h-8 mx-auto text-orange-300 mb-2" />
                            <p className="text-sm">3rd Place</p>
                            <p className="text-xl font-bold">${contestInfo.prizeMoney.third}</p>
                        </div>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Previous Contest Leaderboard</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">WPM</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Accuracy</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {leaderboard.map((entry) => (
                                    <tr key={entry.rank} className={entry.rank <= 3 ? 'bg-yellow-900/50' : ''}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                                                entry.rank === 1 ? 'bg-yellow-600 text-yellow-100' :
                                                entry.rank === 2 ? 'bg-gray-600 text-gray-200' :
                                                entry.rank === 3 ? 'bg-orange-600 text-orange-100' :
                                                'bg-gray-500 text-gray-300'
                                            }`}>
                                                {entry.rank}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{entry.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{entry.wpm}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{entry.accuracy}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default ChallengesPage;