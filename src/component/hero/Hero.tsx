// Hero.tsx
"use client";
import React from "react";
import Slider from "react-slick";
import "../../styles/slick-carousel.css";
import Carousel1 from "../../assets/biodata/resume-1111.png";
import Carousel2 from "../../assets/biodata/resume-1112.png";
import Carousel3 from "../../assets/biodata/resume-1113.png";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./hero.module.css";
import Container from "@/structure/container/Container";
import Background from "@/structure/background/Background";
import Button from "../../structure/button/Button";

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

interface SliderSettings {
  dots?: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  fade: boolean;
  nextArrow: React.ReactElement;
  prevArrow: React.ReactElement;
  cssEase: string;
  responsive: Array<{
    breakpoint: number;
    settings: {
      arrows: boolean;
      dots: boolean;
    };
  }>;
}

const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <ArrowForward
    className={`${className} ${styles.customArrow}`}
    onClick={onClick}
  />
);

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <ArrowBack
    className={`${className} ${styles.customArrow}`}
    onClick={onClick}
  />
);

const Hero: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = (): void => {
    router.push("/resume");
  };

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const carouselImages = [Carousel1, Carousel2, Carousel3];

  return (
    <Background>
      <Container>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroLeftText}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeIcon}>⭐</span>
                Premium Resume Service
              </div>

              <h1 className={styles.heroLeftTextHeading}>
                <span className={styles.highlight}>GET YOUR CUSTOMIZED</span>{" "}
                TRADITIONAL
                <span className={styles.gradientText}> RESUME</span> FROM
                EXPERTS.
              </h1>

              <h2 className={styles.heroLeftTextSubheading}>
                YOUR SATISFACTION COMES FIRST, PAY US ONLY WHEN YOU&apos;RE
                HAPPY.
              </h2>

              <div className={styles.heroButtons}>
                <Button
                  variant="primary"
                  className={styles.heroButton}
                  onClick={handleGetStarted}
                >
                  Create Resume
                </Button>
                <Button
                  className={styles.heroButton}
                  variant="secondary"
                  onClick={() => router.push("/whyus")}
                >
                  Learn More
                </Button>
              </div>

              <div className={styles.heroStats}>
                {[
                  { number: "100+", label: "Happy Clients" },
                  { number: "100%", label: "Satisfaction" },
                  { number: "24 X 7", label: "Customer Support" },
                ].map((stat, index) => (
                  <div key={index} className={styles.statItem}>
                    <span className={styles.statNumber}>{stat.number}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.imageWrapper}>
              <Slider {...settings} className={styles.heroCarousel}>
                {carouselImages.map((img, i) => (
                  <div key={i} className={styles.carouselSlide}>
                    <Image
                      src={img}
                      alt={`Resume Template ${i + 1}`}
                      className={styles.carouselImage}
                      priority={i === 0}
                      quality={100}
                    />
                  </div>
                ))}
              </Slider>

              {[
                { text: "✨ Premium Templates", class: styles.card1 },
                { text: "✨ Traditional Resume", class: styles.card4 },
                { text: "🎯 100% Satisfaction", class: styles.card2 },
                { text: "🚀 Quick Delivery", class: styles.card3 },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`${styles.floatingCard} ${card.class}`}
                >
                  <span>{card.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Background>
  );
};

export default Hero;
