import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Lock, Code, Server } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Secure. Fast. Decentralized.
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-10">
              Experience the future of secure digital interactions with our cutting-edge Web3 and cryptographic solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/features"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Features <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/signup"
                className="bg-transparent hover:bg-neutral-800 border-2 border-neutral-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-neutral-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Built with the latest Web3 technologies to provide you with the most secure and efficient experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10 text-blue-400" />,
                title: "End-to-End Encryption",
                description: "Your data is protected with industry-standard encryption protocols."
              },
              {
                icon: <Zap className="w-10 h-10 text-yellow-400" />,
                title: "Lightning Fast",
                description: "Experience blazing fast transactions and data processing."
              },
              {
                icon: <Lock className="w-10 h-10 text-green-400" />,
                title: "Secure Authentication",
                description: "Multi-factor and biometric authentication options available."
              },
              {
                icon: <Code className="w-10 h-10 text-purple-400" />,
                title: "Developer Friendly",
                description: "Comprehensive APIs and documentation for easy integration."
              },
              {
                icon: <Server className="w-10 h-10 text-red-400" />,
                title: "Decentralized",
                description: "Built on blockchain technology for maximum security and transparency."
              },
              {
                icon: <Shield className="w-10 h-10 text-cyan-400" />,
                title: "Privacy First",
                description: "We don't store your sensitive data. You're in control."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neutral-700/50 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-neutral-300 mb-8">
            Join thousands of users who trust our platform for their Web3 and cryptographic needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              Create Free Account
            </Link>
            <Link
              to="/features"
              className="bg-transparent hover:bg-neutral-800 border-2 border-neutral-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
