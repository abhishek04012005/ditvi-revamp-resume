'use client';

import React from "react";
import Slider from "react-slick";
import "../../styles/slick-carousel.css";
import styles from "./testimonial.module.css";
import Container from "@/structure/container/Container";
import {
  ArrowBack,
  ArrowForward,
  Star,
  FormatQuote,
} from "@mui/icons-material";
import testimonials from "../../data/testimonial";
import Background from "@/structure/background/Background";
import Heading from "@/structure/heading/Heading";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type TestimonialCardProps = {
  data: {
    id: string | number;
    name: string;
    role: string;
    image: string | StaticImageData;
    testimonial: string;
    rating: number;
    gradientColors: [string, string];
  };
};

type ArrowProps = {
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <ArrowForward className={`${className} ${styles.customArrow}`} onClick={onClick} />
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <ArrowBack className={`${className} ${styles.customArrow}`} onClick={onClick} />
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ data }) => {
  const stars = Array(data.rating).fill(null);

  return (
    <div className={styles.testimonialCard}>
      <div
        className={styles.cardInner}
    
      >
        <div className={styles.quoteIcon}>
          <FormatQuote />
        </div>

        <div className={styles.testimonialContent}>
          <div className={styles.rating}>
            {stars.map((_, index) => (
              <Star key={index} className={styles.star} />
            ))}
          </div>

          <p className={styles.testimonialText}>{data.testimonial}</p>

          <div className={styles.authorInfo}>
            <div className={styles.authorImage}>
              <Image src={data.image} alt={data.name} className={styles.imageTag}/>
            </div>
            <div className={styles.authorDetails}>
              <h4 className={styles.authorName}>{data.name}</h4>
              <p className={styles.authorRole}>{data.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonial: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1225, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Background>
      <Container>
        <Heading
          title="Client Testimonials"
          subtitle="What our clients say about our biodata design service"
        />

        <div className={styles.testimonialsSlider}>
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} data={testimonial} />
            ))}
          </Slider>
        </div>
      </Container>
    </Background>
  );
};

export default Testimonial;
