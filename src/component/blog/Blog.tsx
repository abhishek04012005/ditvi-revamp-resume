"use client";
import React from 'react';
import blogPosts from '../../data/blog';
import BlogStructure from '@/structure/blogcard/BlogCards';

const BlogHome: React.FC = () => {
  return (
    <>
      <div className="blog">
        <BlogStructure 
          title="Latest Blogs" 
          subtitle="Stay updated with our latest articles and biodata creation tips" 
          blogPosts={blogPosts.map(post => ({
            ...post,
            image: typeof post.image === "string" ? post.image : (post.image.src ?? "")
          }))} 
          limit={3}
        />
      </div>
    </>
  );
};

export default BlogHome;
