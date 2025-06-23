"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { mainNav } from "../../data/navItems";
import Image from "next/image";
import DitviLogo from '../../../public/logo1.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
            <div className={styles.logoWrapper}>
            <Image
              src={DitviLogo}
              alt="Ditvi Foundation Logo"
              className={styles.logoImage}
            />
            </div>
        </Link>

        <nav className={styles.desktopNav}>
          {mainNav.map((item) =>
          
              <Link
                key={item.id}
                href={item.path}
                className={`${styles.navLink} ${
                  pathname === item.path ? styles.active : ""
                }`}
                aria-label={item.ariaLabel}
              >
                {item.title}
              </Link>
            
          )}
        </nav>

        <button
          className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>

        <div className={`${styles.mobileNav} ${isOpen ? styles.show : ""}`}>
          <div className={styles.mobileNavContent}>
            {mainNav.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`${styles.mobileNavLink} ${pathname === item.path ? styles.active : ""}`}
                aria-label={item.ariaLabel}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;