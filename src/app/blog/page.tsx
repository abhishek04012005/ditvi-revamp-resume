import React from 'react';
import blogPosts from '../../data/blog';
import BlogStructure from '@/structure/blogcard/BlogCards';

const BlogPage: React.FC = () => {
  return (
    <BlogStructure
      title="Our Blog"
      subtitle="Explore all our articles and insights"
      blogPosts={blogPosts.map(post => ({
        ...post,
        image: typeof post.image === "string" ? post.image : (post.image.src ?? "")
      }))}
      showBackButton={true}
    />
  );
};

export default BlogPage;