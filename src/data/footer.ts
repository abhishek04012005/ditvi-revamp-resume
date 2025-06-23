import { Phone, Email, LocationOn } from "@mui/icons-material";

interface QuickLink {
  id: string;
  label: string;
  path: string;
}

interface ContactInfo {
  id: string;
  icon: React.ElementType;
  content: string;
  href?: string;
  isText?: boolean;
}

const footerQuickLinks: QuickLink[] = [
  { id: "hero", label: "Home", path: "/" },
  { id: "whyus", label: "Why Us", path: "/whyus" },
  { id: "how-we-work", label: "How We Work", path: "/how-we-work" },
  { id: "biodata", label: "Resume", path: "/resume" },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "article", label: "Article", path: "/articles" },
];

const contactInfo: ContactInfo[] = [
  {
    id: "phone",
    icon: Phone,
    content: "+91 9263767441",
    href: "tel:+919263767441",
  },
  {
    id: "email",
    icon: Email,
    content: "care@ditvi.org",
    href: "mailto:care@ditvi.org",
  },
  {
    id: "location",
    icon: LocationOn,
    content: "Thane, Maharashtra, India",
    isText: true,
  },
];

export { footerQuickLinks, contactInfo };
export type { QuickLink, ContactInfo };
