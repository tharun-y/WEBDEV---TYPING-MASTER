import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { 
  Rocket, Circle, Triangle, Square, Hexagon, 
  Keyboard, Gauge, Award, Brain, Target, Zap, 
  Trophy, Crown, Settings, Users, Share2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Body = () => {
  const shapes = [Circle, Triangle, Square, Hexagon];

  const features = [
    {
      icon: <Keyboard className="w-12 h-12 mb-4 text-[#58deff]" />,
      title: "Story-Driven Missions",
      description: "Decode alien transmissions and program your ship's AI through immersive typing challenges."
    },
    {
      icon: <Gauge className="w-12 h-12 mb-4 text-[#58deff]" />,
      title: "Real-Time Feedback",
      description: "Watch your spaceship respond to every keystroke with dynamic visual and sound effects."
    },
    {
      icon: <Award className="w-12 h-12 mb-4 text-[#58deff]" />,
      title: "Adaptive Learning",
      description: "Experience challenges that evolve with your skill level for optimal growth."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Header added inside the body */}
      <Header />

      <main>
        {/* Hero Section */}
        <section 
          id="home" 
          className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/70"
        >
          {/* Animated Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => {
              const ShapeComponent = shapes[i % shapes.length];
              const size = Math.random() * 30 + 20;
              const duration = Math.random() * 20 + 10;
              const delay = Math.random() * 5;
              return (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`
                  }}
                >
                  <ShapeComponent
                    className="text-[#58deff]/20 animate-spin"
                    style={{
                      width: size,
                      height: size,
                      animationDuration: `${duration * 2}s`,
                      filter: 'blur(1px)'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Glowing Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={`orb-${i}`}
                className="absolute rounded-full animate-pulse"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  background: 'radial-gradient(circle, rgba(88, 222, 255, 0.2) 0%, rgba(88, 222, 255, 0) 70%)',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 4 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 pt-32 pb-16 min-h-screen flex flex-col items-center justify-center text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Cosmic Typing
              <span className="text-[#58deff] block">Odyssey</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl">
              Navigate through the galaxy with your keyboard as your spaceship. Master the art of typing while exploring new sectors, dodging asteroids, and unlocking cosmic achievements.
            </p>
            <Link to="/practice"><button className="group relative bg-[#58deff] text-black font-bold text-lg px-12 py-4 rounded-full hover:bg-[#3ac8e9] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#58deff]/50 flex items-center gap-3">
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
              Begin Your Journey
              <span className="absolute inset-0 rounded-full border-2 border-[#58deff] scale-110 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
            </button></Link>

            {/* Features Overview */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold text-[#58deff] mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practice Section */}
        <section id="practice" className="relative py-24 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Master Your Skills</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">Enhance your typing abilities through progressive challenges and real-time feedback.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Brain className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Adaptive Learning</h3>
                <p className="text-gray-300">Dynamic difficulty adjustment ensures optimal learning progression.</p>
              </div>
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Target className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Focused Practice</h3>
                <p className="text-gray-300">Targeted exercises to improve specific typing skills and techniques.</p>
              </div>
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Zap className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Real-time Analytics</h3>
                <p className="text-gray-300">Instant feedback on speed, accuracy, and improvement areas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section id="challenges" className="relative py-24 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Epic Challenges</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">Test your skills in competitive missions and unlock achievements.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Trophy className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Daily Missions</h3>
                <p className="text-gray-300">Complete unique challenges each day to earn rewards and climb the ranks.</p>
              </div>
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Crown className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Competitive Modes</h3>
                <p className="text-gray-300">Race against others in real-time typing competitions.</p>
              </div>
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Settings className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Custom Challenges</h3>
                <p className="text-gray-300">Create and share your own typing challenges with the community.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Friends Section */}
        <section id="friends" className="relative py-24 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Connect & Compete</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">Join a thriving community of typing enthusiasts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Users className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Global Community</h3>
                <p className="text-gray-300">Connect with typing enthusiasts from around the world.</p>
              </div>
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Share2 className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Social Features</h3>
                <p className="text-gray-300">Share achievements, challenge friends, and join typing teams.</p>
              </div>
              <div className="bg-black/40 p-8 rounded-xl border border-[#58deff]/20 hover:border-[#58deff]/50 transition-all duration-300 group hover:transform hover:scale-105">
                <Trophy className="w-12 h-12 text-[#58deff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Leaderboards</h3>
                <p className="text-gray-300">Compete for top positions on global and friend leaderboards.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer added inside the body */}
      <Footer />
    </div>
  );
};

export default Body;
