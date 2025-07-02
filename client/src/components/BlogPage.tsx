import React from 'react';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bee-gray py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-bee-black mb-4">MemberFlow Blog & Tutorials</h1>
          <p className="text-bee-grayMuted text-lg max-w-2xl mx-auto">
            Welcome to our blog! Here you'll find the latest updates, tips, and tutorials to help you get the most out of MemberFlow. Stay tuned for new posts!
          </p>
        </div>
        <div className="bg-bee-white rounded-2xl shadow-sm border border-bee-border p-8 text-center">
          <p className="text-bee-grayMuted text-xl">No blog posts yet. Check back soon for our first article!</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 