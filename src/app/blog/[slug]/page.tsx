// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import blogPosts from "../../../data/blog";
import BlogDetail from "@/structure/blogdetail/BlogDetail";

interface BlogPageParams {
  slug: Promise<string>;
}


const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: createSlug(post.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPageParams>;
}): Promise<Metadata> {
  const post = blogPosts.find(async (post) => createSlug(post.title) === await (await params).slug);

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The requested blog does not exist.",
    };
  }

  const imageUrl = typeof post.image === "string" ? post.image : post.image.src;

  return {
    title: `${post.title} | Your Blog Name`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      siteName: "Your Blog Name",
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogPageParams>;
}) {
  const post = blogPosts.find(async (post) => createSlug(post.title) === await (await params).slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <BlogDetail post={post} />
    </main>
  );
}
