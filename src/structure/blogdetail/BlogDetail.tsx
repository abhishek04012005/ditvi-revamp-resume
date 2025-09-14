// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import styles from "./blogdetail.module.css";
// import Background from "../background/Background";
// import Container from "../container/Container";
// import {
//   ThumbUp,
//   Bookmark,
//   BookmarkBorder,
//   Share,
//   Person,
//   CalendarToday,
//   AccessTime,
//   ArrowBack,
// } from "@mui/icons-material";
// import { Snackbar } from "@mui/material";
// import blogPosts from "../../data/blog";
// import Heading from "../heading/Heading";
// import Button from "../button/Button";
// import Image, { StaticImageData } from "next/image";

// interface BlogPost {
//   id: number;
//   title: string;
//   excerpt: string;
//   content: string;
//   author: string;
//   date: string;
//   readTime: string;
//   category: string;
//   image: string | StaticImageData;
//   likes: number;
//   tags: string[];
//   meta?: {
//     title?: string;
//     description?: string;
//     keywords?: string;
//     ogImage?: string;
//     lastModified?: string;
//   };
// }

// const createSlug = (title: string): string => {
//   return title
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };
// interface BlogDetailProps {
//   params?: {
//     slug: string;
//   };
// }
// const BlogDetail: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const slug = params?.slug as string;

//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
//   const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
//   const [hasLiked, setHasLiked] = useState<boolean>(false);
//   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
//   const [snackbarMessage, setSnackbarMessage] = useState<string>("");

//   useEffect(() => {
//     if (!slug) return;

//     const currentPost = blogPosts.find(
//       (post) => createSlug(post.title) === slug
//     );
//     if (currentPost) {
//       setPost(currentPost);
//       setRelatedPosts(
//         blogPosts
//           .filter(
//             (p) =>
//               p.id !== currentPost.id && p.category === currentPost.category
//           )
//           .slice(0, 3)
//       );
//     } else {
//       router.push("/blog");
//     }
//   }, [slug, router]);

//   const handleLike = (): void => {
//     if (!hasLiked && post) {
//       setPost({
//         ...post,
//         likes: post.likes + 1,
//       });
//       setHasLiked(true);
//     }
//   };

//   const handleBookmark = (): void => {
//     setIsBookmarked(!isBookmarked);
//   };

//   const handleShare = async (): Promise<void> => {
//     const url = window.location.href;

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: post?.title || "",
//           text: post?.excerpt || "",
//           url: url,
//         });
//       } catch (error) {
//         console.log("Error sharing:", error);
//       }
//     } else {
//       try {
//         await navigator.clipboard.writeText(url);
//         setSnackbarMessage("Link copied to clipboard!");
//         setOpenSnackbar(true);
//       } catch {
//         setSnackbarMessage("Failed to copy link");
//         setOpenSnackbar(true);
//       }
//     }
//   };

//   const handleCloseSnackbar = (): void => {
//     setOpenSnackbar(false);
//   };

//   if (!post) return null;

//   return (
//     <>
//       <Background>
//         <div className={styles.blogDetails}>
//           <Container>
//             <div className={styles.blogdetailWrapper}>
//               <div className={styles.blogdetailNavigation}>
//                 <Button variant="secondary" onClick={() => router.back()}>
//                   <ArrowBack />
//                   Back
//                 </Button>

//                 <div className={styles.blogdetailActions}>
//                   <button
//                     className={`${styles.blogdetailLike} ${
//                       hasLiked ? styles.active : ""
//                     }`}
//                     onClick={handleLike}
//                   >
//                     <ThumbUp />
//                     <span>{post?.likes || 0}</span>
//                   </button>
//                   <button
//                     className={`${styles.blogdetailBookmark} ${
//                       isBookmarked ? styles.active : ""
//                     }`}
//                     onClick={handleBookmark}
//                   >
//                     {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
//                   </button>
//                   <button
//                     className={styles.blogdetailShareBtn}
//                     onClick={handleShare}
//                   >
//                     <Share />
//                     <span>Share</span>
//                   </button>
//                 </div>
//               </div>

//               <div className={styles.blogdetailHeader}>
//                 <div className={styles.blogdetailCategory}>{post.category}</div>
//                 <h1 className={styles.blogdetailTitle}>{post.title}</h1>

//                 <div className={styles.blogdetailMeta}>
//                   <div className={styles.blogdetailMetaItem}>
//                     <Person />
//                     <span>{post.author}</span>
//                   </div>
//                   <div className={styles.blogdetailMetaItem}>
//                     <CalendarToday />
//                     <span>{post.date}</span>
//                   </div>
//                   <div className={styles.blogdetailMetaItem}>
//                     <AccessTime />
//                     <span>{post.readTime}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.blogdetailFeaturedImage}>
//                 <Image src={post.image} alt={post.title} />
//               </div>

//               <div className={styles.blogdetailContent}>
//                 <div
//                   className={styles.blogdetailText}
//                   dangerouslySetInnerHTML={{ __html: post.content }}
//                 />

//                 <div className={styles.blogdetailTags}>
//                   {post.tags.map((tag, index) => (
//                     <span key={index} className={styles.blogdetailTag}>
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {relatedPosts.length > 0 && (
//                 <div className={styles.blogdetailRelated}>
//                   <Heading
//                     title="Related Articles"
//                     subtitle="Here are related posts"
//                   />
//                   <div className={styles.blogdetailRelatedGrid}>
//                     {relatedPosts.map((relatedPost) => (
//                       <div
//                         key={relatedPost.id}
//                         className={styles.blogdetailRelatedCard}
//                         onClick={() =>
//                           router.push(`/blog/${createSlug(relatedPost.title)}`)
//                         }
//                       >
//                         <div className={styles.relatedImage}>
//                           <Image
//                             src={relatedPost.image}
//                             alt={relatedPost.title}
//                             layout="fill"
//                             objectFit="cover"
//                           />
//                           <div className={styles.relatedCategory}>
//                             {relatedPost.category}
//                           </div>
//                         </div>
//                         <div className={styles.relatedContent}>
//                           <h3>{relatedPost.title}</h3>
//                           <p>{relatedPost.excerpt}</p>
//                           <div className={styles.relatedMeta}>
//                             <span>{relatedPost.date}</span>
//                             <span>{relatedPost.readTime}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={3000}
//                 onClose={handleCloseSnackbar}
//                 message={snackbarMessage}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//               />
//             </div>
//           </Container>
//         </div>
//       </Background>
//     </>
//   );
// };

// export default BlogDetail;


// src/structure/blogdetail/BlogDetail.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./blogdetail.module.css";
import Background from "../background/Background";
import Container from "../container/Container";
import {
  ThumbUp,
  Bookmark,
  BookmarkBorder,
  Share,
  Person,
  CalendarToday,
  AccessTime,
  ArrowBack,
} from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import Heading from "../heading/Heading";
import Button from "../button/Button";
import Image from "next/image";
import blogPosts from "../../data/blog";
import type { StaticImageData } from "next/image";
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string | StaticImageData;
  likes: number;
  tags: string[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    lastModified?: string;
  };
}

interface BlogDetailProps {
  post: BlogPost;
}

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const BlogDetail: React.FC<BlogDetailProps> = ({ post: initialPost }) => {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>(initialPost);
  const [relatedPosts] = useState<BlogPost[]>(
    blogPosts
      .filter(
        (p) => p.id !== initialPost.id && p.category === initialPost.category
      )
      .slice(0, 3)
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleLike = (): void => {
    if (!hasLiked) {
      setPost({
        ...post,
        likes: post.likes + 1,
      });
      setHasLiked(true);
    }
  };

  const handleBookmark = (): void => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async (): Promise<void> => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setSnackbarMessage("Link copied to clipboard!");
        setOpenSnackbar(true);
      } catch {
        setSnackbarMessage("Failed to copy link");
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  return (
    <Background>
      <div className={styles.blogDetails}>
        <Container>
          <div className={styles.blogdetailWrapper}>
            <div className={styles.blogdetailNavigation}>
              <Button variant="secondary" onClick={() => router.back()}>
                <ArrowBack />
                Back
              </Button>

              <div className={styles.blogdetailActions}>
                <button
                  className={`${styles.blogdetailLike} ${hasLiked ? styles.active : ""}`}
                  onClick={handleLike}
                >
                  <ThumbUp />
                  <span>{post.likes}</span>
                </button>
                <button
                  className={`${styles.blogdetailBookmark} ${isBookmarked ? styles.active : ""}`}
                  onClick={handleBookmark}
                >
                  {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                </button>
                <button
                  className={styles.blogdetailShareBtn}
                  onClick={handleShare}
                >
                  <Share />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className={styles.blogdetailHeader}>
              <div className={styles.blogdetailCategory}>{post.category}</div>
              <h1 className={styles.blogdetailTitle}>{post.title}</h1>

              <div className={styles.blogdetailMeta}>
                <div className={styles.blogdetailMetaItem}>
                  <Person />
                  <span>{post.author}</span>
                </div>
                <div className={styles.blogdetailMetaItem}>
                  <CalendarToday />
                  <span>{post.date}</span>
                </div>
                <div className={styles.blogdetailMetaItem}>
                  <AccessTime />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className={styles.blogdetailFeaturedImage}>
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={630}
                priority
              />
            </div>

            <div className={styles.blogdetailContent}>
              <div
                className={styles.blogdetailText}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className={styles.blogdetailTags}>
                {post.tags.map((tag: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                  <span key={index} className={styles.blogdetailTag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className={styles.blogdetailRelated}>
                <Heading
                  title="Related Articles"
                  subtitle="Here are related posts"
                />
                <div className={styles.blogdetailRelatedGrid}>
                  {relatedPosts.map((relatedPost) => (
                    <div
                      key={relatedPost.id}
                      className={styles.blogdetailRelatedCard}
                      onClick={() =>
                        router.push(`/blog/${createSlug(relatedPost.title)}`)
                      }
                    >
                      <div className={styles.relatedImage}>
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          width={400}
                          height={225}
                          style={{ objectFit: 'cover' }}
                        />
                        <div className={styles.relatedCategory}>
                          {relatedPost.category}
                        </div>
                      </div>
                      <div className={styles.relatedContent}>
                        <h3>{relatedPost.title}</h3>
                        <p>{relatedPost.excerpt}</p>
                        <div className={styles.relatedMeta}>
                          <span>{relatedPost.date}</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message={snackbarMessage}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
          </div>
        </Container>
      </div>
    </Background>
  );
};

export default BlogDetail;