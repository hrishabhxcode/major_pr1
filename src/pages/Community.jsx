import React, { useState } from 'react';
import { MessageSquare, Users, Calendar, Award, Code, Twitter, Github, Youtube, FileText, MessageCircle } from 'lucide-react';

const Community = () => {
  // Get the tab from URL params or default to 'feed'
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab') || 'feed';
  
  // Initialize state with the tab from URL or default to 'feed'
  const [activeTab, setActiveTab] = useState(tabParam);
  const [postContent, setPostContent] = useState('');
  
  // Mock data
  const posts = [
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        avatar: 'AJ',
        role: 'Core Developer',
        joinDate: 'Member since Jan 2023',
      },
      content: 'Just pushed a major update to our documentation with new API references and tutorials. Check it out and let me know if you have any questions! #dev #update',
      time: '2h ago',
      likes: 24,
      comments: 8,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 2,
      user: {
        name: 'Sarah Chen',
        avatar: 'SC',
        role: 'Community Manager',
        joinDate: 'Member since Nov 2022',
      },
      content: 'Our next community call is scheduled for Friday at 2 PM UTC! We\'ll be discussing the upcoming governance proposals and roadmap updates. Join us! 📅',
      time: '5h ago',
      likes: 42,
      comments: 15,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: 3,
      user: {
        name: 'Miguel Rodriguez',
        avatar: 'MR',
        role: 'Contributor',
        joinDate: 'Member since Mar 2023',
      },
      content: 'Just submitted a PR (#1247) that improves transaction processing speed by ~15%. Would love some feedback from the team!',
      time: '1d ago',
      likes: 37,
      comments: 12,
      isLiked: false,
      isBookmarked: false,
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Community AMA with Founders',
      date: '2024-01-15T18:00:00Z',
      type: 'virtual',
      attendees: 124,
    },
    {
      id: 2,
      title: 'Developer Workshop: Smart Contracts',
      date: '2024-01-20T15:00:00Z',
      type: 'virtual',
      attendees: 89,
    },
    {
      id: 3,
      title: 'Community Meetup - Berlin',
      date: '2024-02-05T19:00:00Z',
      type: 'in-person',
      location: 'Berlin, Germany',
      attendees: 42,
    },
  ];

  const members = [
    { id: 1, name: 'Alex Johnson', role: 'Core Dev', joined: 'Jan 2023', contributions: 142 },
    { id: 2, name: 'Sarah Chen', role: 'Community', joined: 'Nov 2022', contributions: 98 },
    { id: 3, name: 'Miguel R.', role: 'Contributor', joined: 'Mar 2023', contributions: 76 },
    { id: 4, name: 'Priya K.', role: 'Ambassador', joined: 'Feb 2023', contributions: 65 },
    { id: 5, name: 'James W.', role: 'Moderator', joined: 'Dec 2022', contributions: 112 },
  ];

  const resources = [
    { 
      title: 'Developer Documentation', 
      description: 'Comprehensive guides and API references',
      icon: <FileText className="h-5 w-5 text-blue-400" />,
      link: '#',
    },
    { 
      title: 'GitHub Repository', 
      description: 'Contribute to our open-source codebase',
      icon: <Github className="h-5 w-5 text-gray-400" />,
      link: '#',
    },
    { 
      title: 'Community Forum', 
      description: 'Discuss ideas and get help',
      icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
      link: '#',
    },
    { 
      title: 'Discord Server', 
      description: 'Chat with the community in real-time',
      icon: <Discord className="h-5 w-5 text-indigo-400" />,
      link: '#',
    },
  ];

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleLike = (postId) => {
    // In a real app, this would update the backend
    console.log(`Liked post ${postId}`);
  };

  const handleBookmark = (postId) => {
    // In a real app, this would update the backend
    console.log(`Bookmarked post ${postId}`);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    
    // In a real app, this would submit to a backend
    console.log('New post:', postContent);
    setPostContent('');
  };

  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without page reload
    window.history.pushState({}, '', `${window.location.pathname}?tab=${tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Hub</h1>
          <p className="text-gray-400">Connect with developers, contributors, and enthusiasts</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* User Profile Card */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                  YT
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Your Name</h2>
                  <p className="text-sm text-gray-400">Community Member</p>
                </div>
              </div>
              <div className="text-sm text-gray-300 mb-4">
                <p>Member since May 2023</p>
                <p>42 contributions</p>
              </div>
              <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium">
                Edit Profile
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-medium mb-4">Quick Links</h3>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="p-2 bg-gray-700 rounded-lg mr-3">
                      {resource.icon}
                    </div>
                    <div>
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-xs text-gray-400">{resource.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Upcoming Events</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
              </div>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="text-sm font-medium mb-1">{event.title}</div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(event.date)}</span>
                      {event.location && (
                        <span className="ml-2">• {event.location}</span>
                      )}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-6 w-6 rounded-full bg-gray-600 border-2 border-gray-800"></div>
                        ))}
                        <div className="h-6 w-6 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs">
                          +{event.attendees - 3}
                        </div>
                      </div>
                      <button className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-full">
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-gray-700 hover:bg-gray-700/50 rounded-lg text-sm">
                Create Event
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/4">
            {/* Create Post */}
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <div className="flex space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-sm font-medium">
                  YT
                </div>
                <form onSubmit={handleSubmitPost} className="flex-1">
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    placeholder="What's on your mind?"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button type="button" className="p-2 text-gray-400 hover:text-blue-400 rounded-full hover:bg-gray-700">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button type="button" className="p-2 text-gray-400 hover:text-green-400 rounded-full hover:bg-gray-700">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                    </div>
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50"
                      disabled={!postContent.trim()}
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800 mb-6">
              {[
                { id: 'feed', label: 'Feed', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
                { id: 'events', label: 'Events', icon: <Calendar className="h-4 w-4 mr-2" /> },
                { id: 'members', label: 'Members', icon: <Users className="h-4 w-4 mr-2" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-sm font-medium">
                        {post.user.avatar}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-semibold">{post.user.name}</h3>
                          <span className="ml-2 px-2 py-0.5 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                            {post.user.role}
                          </span>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-sm text-gray-400">{post.time}</span>
                        </div>
                        <p className="mt-1 text-gray-300">{post.content}</p>
                        <div className="flex items-center mt-4 text-sm text-gray-400">
                          <button 
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center mr-6 ${post.isLiked ? 'text-red-500' : 'hover:text-gray-300'}`}
                          >
                            <svg 
                              className="h-5 w-5 mr-1" 
                              fill={post.isLiked ? 'currentColor' : 'none'} 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                              />
                            </svg>
                            {post.likes}
                          </button>
                          <button className="flex items-center mr-6 hover:text-gray-300">
                            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {post.comments}
                          </button>
                          <button className="flex items-center mr-6 hover:text-gray-300">
                            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share
                          </button>
                          <button 
                            onClick={() => handleBookmark(post.id)}
                            className="ml-auto text-gray-400 hover:text-yellow-400"
                          >
                            {post.isBookmarked ? (
                              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2.5 border border-gray-700 hover:bg-gray-800 rounded-lg font-medium">
                Load More Posts
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Top Contributors */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Top Contributors</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
              </div>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">{member.name}</div>
                        <div className="text-xs text-gray-400">{member.role}</div>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 bg-gray-700 rounded-full">
                      {member.contributions}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-medium mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Members</span>
                  <span className="font-medium">12,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Today</span>
                  <span className="font-medium">1,243</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Online Now</span>
                  <span className="font-medium">387</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">New This Week</span>
                  <span className="font-medium">+243</span>
                </div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-medium mb-3">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Be respectful and inclusive</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No spamming or self-promotion</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Keep discussions on-topic</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No illegal or harmful content</span>
                </li>
              </ul>
              <button className="mt-4 text-sm text-blue-400 hover:text-blue-300">
                Read Full Guidelines
              </button>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-medium mb-4">Join Us</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  <Twitter className="h-5 w-5 mr-2 text-blue-400" />
                  <span>Twitter</span>
                </a>
                <a href="#" className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  <MessageCircle className="h-5 w-5 mr-2 text-indigo-400" />
                  <span>Discord</span>
                </a>
                <a href="#" className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  <Github className="h-5 w-5 mr-2 text-gray-300" />
                  <span>GitHub</span>
                </a>
                <a href="#" className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  <Youtube className="h-5 w-5 mr-2 text-red-400" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
