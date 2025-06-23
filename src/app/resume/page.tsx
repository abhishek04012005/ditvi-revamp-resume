// app/biodata/page.tsx

import React from "react";
import ResumeCard from "../../structure/resume/resume";
import resumeList from "../../data/resume";
import Script from "next/script";

// Export generateMetadata to set up dynamic static SEO meta tags
export async function generateMetadata() {
  return {
    title: "Professional Biodata Templates | Traditional Marriage Biodata Designs",
    description:
      "Browse our collection of professional and traditional marriage biodata templates. Choose from various designs to create your perfect matrimonial profile.",
    keywords:
      "biodata templates, marriage biodata formats, traditional biodata designs, matrimonial profile templates, professional biodata maker",
    openGraph: {
      title: "Professional Biodata Templates | Traditional Marriage Biodata Designs",
      description:
        "Browse our collection of professional and traditional marriage biodata templates. Choose from various designs to create your perfect matrimonial profile.",
      images: ["https://your-domain.com/images/biodata-templates-preview.jpg"],
    },
  };
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Professional Biodata Templates",
  description: "Collection of traditional marriage biodata templates",
  publisher: {
    "@type": "Organization",
    name: "Biodata Maker",
    logo: {
      "@type": "ImageObject",
      url: "https://your-domain.com/logo.png",
    },
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: resumeList.length,
    itemListElement: resumeList.map((template, index) => ({
      "@type": "Product",
      position: index + 1,
      name: template.title,
      description: template.description,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    })),
  },
};

const AllResume: React.FC = () => {
  return (
    <>
      {/* Adding JSON‑LD Schema using Next.js Script component */}
      <Script type="application/ld+json" id="schema-jsonld">
        {JSON.stringify(schemaData)}
      </Script>
      <div className="allbiodata">
        <ResumeCard
          title="Resume"
          subtitle="Discover our handcrafted traditional biodata designs"
          resumeDetails={resumeList.map(item => ({
            ...item,
            image: typeof item.image === "string" ? item.image : (item.image.src ?? ""),
          }))}
          isSlider={false}
          showButton={true}
        />
      </div>
    </>
  );
};

export default AllResume;
