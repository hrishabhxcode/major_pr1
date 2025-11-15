import React from 'react';
import { CheckCircle2, Download, Clock, Zap } from 'lucide-react';

const releases = [
  {
    version: '1.2.0',
    date: '2023-11-15',
    title: 'Performance Update',
    highlights: [
      'Improved rendering performance by 40%',
      'Reduced initial load time',
      'Optimized memory usage'
    ],
    isLatest: true
  },
  {
    version: '1.1.0',
    date: '2023-10-20',
    title: 'New Features',
    highlights: [
      'Added dark mode support',
      'New dashboard layout',
      'Enhanced security features'
    ]
  },
  {
    version: '1.0.0',
    date: '2023-09-01',
    title: 'Initial Release',
    highlights: [
      'Core functionality implemented',
      'User authentication system',
      'Basic dashboard interface'
    ]
  }
];

const Releases = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <Zap className="w-8 h-8 text-orange-500 mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
            Release Notes
          </h1>
        </div>
        
        <div className="space-y-8">
          {releases.map((release, index) => (
            <div 
              key={release.version}
              className={`relative p-6 rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm 
                ${release.isLatest ? 'ring-2 ring-orange-500' : ''}`}
            >
              {release.isLatest && (
                <div className="absolute -top-3 -right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  LATEST
                </div>
              )}
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">v{release.version}</h2>
                  <h3 className="text-xl text-gray-300">{release.title}</h3>
                </div>
                <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{new Date(release.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
              
              <ul className="space-y-2 mt-4">
                {release.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <button className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download v{release.version}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Looking for older releases? Check out our <a href="#" className="text-orange-400 hover:underline">archive</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Releases;
