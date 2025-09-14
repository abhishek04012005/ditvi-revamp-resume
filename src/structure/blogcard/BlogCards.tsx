"use client";
import React from "react";
import { Person, AccessTime, ArrowForward, ArrowBack } from "@mui/icons-material";
import Heading from "../heading/Heading";
import Button from "../button/Button";
import Container from "../container/Container";
import Image from "next/image";
import Background from "../background/Background";
import { useRouter } from "next/navigation";
import styles from "./blogcard.module.css";

// BlogCardProps interface defines the expected shape of the post prop
interface BlogCardProps {
  post: {
    id: string | number;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    author: string;
    readTime: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const router = useRouter();

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <div className={styles.blogCard}>
      <div className={styles.blogCardImage}>
        <Image 
          src={post.image} 
          alt={post.title}
          width={400}
          height={250}
          priority
        />
        <div className={styles.blogCardContent}>{post.category}</div>
      </div>
      <div className={styles.blogCardContent}>
        <div className={styles.blogMeta}>
          <div className={styles.blogMetaItem}>
            <Person />
            <span>{post.author}</span>
          </div>
          <div className={styles.blogMetaItem}>
            <AccessTime />
            <span>{post.readTime}</span>
          </div>
        </div>
        <h3 className={styles.blogTitle}>{post.title}</h3>
        <p className={styles.blogExcerpt}>{post.excerpt}</p>
        <Button
          variant="primary"
          className={styles.blogReadMoreMobile}
          onClick={() => router.push(`/blog/${createSlug(post.title)}`)}
        >
          Read More
          <ArrowForward />
        </Button>
      </div>
    </div>
  );
};

interface BlogStructureProps {
  title: string;
  blogPosts: BlogCardProps["post"][];
  limit?: number;
  subtitle?: string;
  showBackButton?: boolean;
}

const BlogStructure: React.FC<BlogStructureProps> = ({
  title,
  blogPosts,
  limit,
  subtitle,
  showBackButton,
}) => {
  const router = useRouter();
  const displayedPosts = limit ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <>
      <Background>
        <Container>
          <Heading title={title} subtitle={subtitle ?? ""} />
          {showBackButton && (
            <Button 
              variant="secondary" 
              onClick={() => router.back()}
              className={styles.blogBackButton}
            >
              <ArrowBack/>
              Back
            </Button>
          )}

          <div className={styles.blogGrid}>
            {displayedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {limit && blogPosts.length > limit && (
            <div className={styles.blogMore}>
              <Button
                variant="primary"
                onClick={() => router.push("/blog")}
                // className={styles.blogMoreBtnMobile}
              >
                View More
                <ArrowForward />
              </Button>
            </div>
          )}
        </Container>
      </Background>
    </>
  );
};

export default BlogStructure;
