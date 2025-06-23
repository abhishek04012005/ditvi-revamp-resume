"use client";
import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../../public/logo.png";
import socialLinks from "../../data/socialmedia";
import {
  footerQuickLinks,
  contactInfo,
  type QuickLink,
  type ContactInfo,
} from "../../data/footer";
import Background from "@/structure/background/Background";

const Footer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const handleLinkClick = (id: string, path: string): void => {
    if (isHomePage && id !== "article") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(path);
    }
  };

  return (
    <Background>
      <div className={styles.footerSection}>
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.footerLogo}>
                <Image src={Logo} alt="Ditvi Biodata Logo" priority />
              </Link>
              <p className={styles.footerDescription}>
                Creating lasting impressions with our expertly crafted
                traditional biodata designs.
              </p>
              <div className={styles.footerSocialLinkWrapper}>
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      className={`${styles.footerSocialLink} ${
                        styles[link.className]
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Quick Links</h3>
              <ul className={styles.footerList}>
                {footerQuickLinks.map((link: QuickLink) => (
                  <li key={link.id}>
                    <a
                      href={link.path}
                      className={styles.footerLink}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        handleLinkClick(link.id, link.path);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Contact Info</h3>
              <ul className={styles.footerList}>
                {contactInfo.map((info: ContactInfo) => {
                  const Icon = info.icon;
                  return (
                    <li key={info.id} className={styles.footerContactItem}>
                      <Icon className={styles.footerIcon} />
                      {info.isText ? (
                        <span className={styles.footerText}>
                          {info.content}
                        </span>
                      ) : (
                        <a href={info.href} className={styles.footerLink}>
                          {info.content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            <p>
              Ditvi Biodata is a unit of <strong>Ditvi Foundation</strong> | ©{" "}
              {new Date().getFullYear()} Ditvi Biodata. All rights reserved.
            </p>
          </div>
          <div className={styles.footerLegal}>
            <Link href="/privacy" className={styles.footerLegalLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.footerLegalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Footer;
