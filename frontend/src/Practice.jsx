import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RefreshCw, Rocket, BarChart2, Clock } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const sampleTexts = [
  "The cosmic winds whisper secrets of distant galaxies, where starlight dances through nebulous clouds.",
  "Astronauts navigate through the endless void, their spacecraft a beacon of human achievement.",
  "Among the celestial bodies, Earth remains our precious blue oasis in the vast cosmic ocean."
];

const TypingTest = () => {
  const [text, setText] = useState(sampleTexts[0]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stats, setStats] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [selectedTime, setSelectedTime] = useState(60); // Default 60 seconds
  const [timeLeft, setTimeLeft] = useState(null);
  const startTimeRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const API_KEY = 'AIzaSyCOwa9U5_I5H8ZMT9pgH3TxfgC7-c5DxyA';
  const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const timerOptions = [30, 60, 120, 300]; // Timer options in seconds

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const reset = () => {
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    setInput('');
    setStarted(false);
    setFinished(false);
    setFeedback('');
    setTimeLeft(null);
    startTimeRef.current = null;
    clearInterval(timerRef.current);
    if (inputRef.current) inputRef.current.focus();
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(selectedTime);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          calculateStats();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const calculateStats = async () => {
    const endTime = Date.now();
    const timeElapsed = startTimeRef.current ? (endTime - startTimeRef.current) / 1000 / 60 : selectedTime / 60;
    const words = input.trim().split(' ').length;
    const wpm = Math.round(words / timeElapsed);
    
    let errors = 0;
    const inputChars = input.split('');
    const textChars = text.split('');
    inputChars.forEach((char, i) => {
      if (char !== textChars[i]) errors++;
    });

    const accuracy = Math.round(((text.length - errors) / text.length) * 100);
    const newStats = {
      wpm,
      accuracy,
      errors,
      time: timeLeft === 0 ? selectedTime : Math.round((selectedTime - timeLeft) || 0),
      date: new Date().toISOString().split('T')[0]
    };

    setStats(prev => [...prev, newStats]);
    await getAIFeedback(newStats);
  };

  const getAIFeedback = async (stats) => {
    try {
      const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze these typing test results and provide feedback: WPM: ${stats.wpm}, Accuracy: ${stats.accuracy}%, Errors: ${stats.errors}, Time: ${stats.time}s`
            }]
          }]
        })
      });
      
      const data = await response.json();
      setFeedback(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setFeedback('Error getting AI feedback. Please try again.');
      console.error(error);
    }
  };

  const handleInput = (e) => {
    const newInput = e.target.value;
    if (!started) {
      setStarted(true);
      startTimeRef.current = Date.now();
      startTimer();
    }
    
    setInput(newInput);
    
    if (newInput === text) {
      clearInterval(timerRef.current);
      setFinished(true);
      calculateStats();
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    return () => clearInterval(timerRef.current);
  }, []);

  const chartData = {
    labels: stats.map(s => s.date),
    datasets: [
      {
        label: 'WPM',
        data: stats.map(s => s.wpm),
        borderColor: '#60A5FA',
        tension: 0.1
      },
      {
        label: 'Accuracy (%)',
        data: stats.map(s => s.accuracy),
        borderColor: '#34D399',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-blue-400 p-8">
      <div className="max-w-5xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            TypeVerse
          </h1>
          <div className="flex gap-4">
            <button onClick={speak} className="p-2 hover:bg-blue-600/20 rounded-full transition-all duration-200">
              <Volume2 size={24} />
            </button>
            <button onClick={reset} className="p-2 hover:bg-blue-600/20 rounded-full transition-all duration-200">
              <RefreshCw size={24} />
            </button>
          </div>
        </div>

        {!started && (
          <div className="mb-6 flex gap-4 items-center">
            <Clock size={24} />
            <div className="flex gap-2">
              {timerOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedTime === time 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700/50 text-blue-300 hover:bg-gray-700'
                  }`}
                >
                  {time}s
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-900/50 p-6 rounded-lg mb-8 border border-blue-500/20">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-400">
              {timeLeft !== null ? `Time Left: ${timeLeft}s` : `Selected Time: ${selectedTime}s`}
            </p>
          </div>
          <p className="text-xl mb-6 leading-relaxed font-mono">
            {text.split('').map((char, i) => {
              let color = 'text-gray-400';
              if (i < input.length) {
                color = input[i] === char ? 'text-blue-400' : 'text-red-500';
              }
              return <span key={i} className={`${color} transition-colors duration-100`}>{char}</span>;
            })}
          </p>
          
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            disabled={finished}
            className="w-full bg-gray-800/50 text-blue-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500/30 transition-all duration-200"
            placeholder="Start typing to begin..."
          />
        </div>

        {finished && stats.length > 0 && (
          <div className="space-y-8">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-blue-500/20">
              <h2 className="text-2xl font-bold mb-6 text-blue-300">Your Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'WPM', value: stats[stats.length - 1].wpm },
                  { label: 'Accuracy', value: `${stats[stats.length - 1].accuracy}%` },
                  { label: 'Errors', value: stats[stats.length - 1].errors },
                  { label: 'Time', value: `${stats[stats.length - 1].time}s` }
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-lg bg-gray-800/30">
                    <p className="text-3xl font-bold text-blue-400">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {feedback && (
              <div className="bg-gray-900/50 p-6 rounded-lg border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">AI Feedback</h2>
                <p className="text-gray-300">{feedback}</p>
              </div>
            )}

            {stats.length > 1 && (
              <div className="bg-gray-900/50 p-6 rounded-lg border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-4 text-blue-300 flex items-center gap-2">
                  <BarChart2 size={24} /> Progress Over Time
                </h2>
                <Line data={chartData} options={{
                  responsive: true,
                  scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
                    x: { grid: { color: 'rgba(255,255,255,0.1)' } }
                  }
                }} />
              </div>
            )}

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Rocket size={20} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;