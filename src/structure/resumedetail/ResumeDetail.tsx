"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./resumedetail.module.css";
import Background from "../background/Background";
import {
  LocalOffer,
  Star,
  Description,
  ShoppingCart,
} from "@mui/icons-material";
import Container from "../container/Container";
import ModelTypes from "@/data/ModelTypes";
import GetNow from "../getnow/GetNow";
import resumeDetails from "@/data/resume";
import Button from "../button/Button";
import Image from "next/image";

interface ResumeType {
  id: string | number;
  modelNumber: string;
  modelName: string;
  title: string;
  description: string;
  image: string;
  studentImage?: string;
  hindiImage?: string;
  hindiStudentImage?: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  language?: string;
  type?: string;
}

const ResumeDetail: React.FC = () => {
  const router = useRouter();
  const { modelName } = useParams<{ modelName: string }>();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>(
    resumeDetails?.find((resume) => resume.modelName === modelName)
      ?.modelNumber || ""
  );
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>(
    ModelTypes.Professional.Name
  );

  const resume = resumeDetails.find(
    (item) => item.modelName === modelName
  ) as unknown as ResumeType;

  if (!resume) {
    router.push("/resume");
    return null;
  }

  const getCurrentImage = (): string => {
    return (
      resume?.[
        selectedType === ModelTypes.Professional.Name ? "image" : "studentImage"
      ] ||
      resume?.image ||
      ""
    );
  };

  const handleTypeChange = (type: string): void => {
    setSelectedType(type);
    setImageLoaded(false);
  };

  return (
    <Background>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h1 className={styles.title}>{resume.title}</h1>
            <Button variant="secondary" onClick={() => router.push("/resume")}>
              Back
            </Button>
          </div>

          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              <div
                className={`${styles.image} ${
                  imageLoaded ? styles.loaded : ""
                }`}
              >
                <Image
                  src={getCurrentImage()}
                  alt={resume.modelName}
                  width={500}
                  height={600}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
                <div className={styles.tags}>
                  <span className={styles.premium}>Premium</span>
                  <span className={styles.discount}>
                    <LocalOffer />
                    {resume.discount}% OFF
                  </span>
                </div>
              </div>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={styles.star} />
                ))}
                <span className={styles.reviews}>(50+ Reviews)</span>
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.model}>
                <h2>Model No: {resume.modelNumber}</h2>
                <div className={styles.divider}></div>
              </div>

              <div className={styles.price}>
                <div className={styles.priceOriginal}>
                  <span className={styles.priceLabel}>Original Price:</span>
                  <span className={styles.priceValue}>
                    ₹{resume.originalPrice}
                  </span>
                </div>
                <div className={styles.priceFinal}>
                  <span className={styles.priceLabel}>Final Price:</span>
                  <span className={styles.priceValue}>
                    ₹{resume.discountedPrice}
                  </span>
                </div>
              </div>

              <div className={styles.options}>
                <div className={styles.optionsGroup}>
                  <h4 className={styles.optionsTitle}>Type:</h4>
                  <div className={styles.radioGroup}>
                    {Object.values(ModelTypes).map((type) => {
                      const typedType = type as { Name: string };
                      return (
                        <label
                          key={typedType.Name}
                          className={`${styles.variantOption} ${
                            selectedType === typedType.Name ? styles.active : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="type"
                            value={typedType.Name}
                            checked={selectedType === typedType.Name}
                            onChange={() => handleTypeChange(typedType.Name)}
                          />
                          <span className={styles.variantLabel}>
                            {typedType.Name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                className={styles.getNowButton}
                onClick={() => {
                  setSelectedModel(resume.modelNumber);
                  setIsPopupOpen(true);
                }}
              >
                <ShoppingCart />
                Get Now
              </Button>
              <div className={styles.description}>
                <div className={styles.descriptionHeader}>
                  <Description />
                  <h3>Description</h3>
                </div>
                <p className={styles.descriptionText}>{resume.description}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <GetNow
        isOpen={isPopupOpen}
        heading="Request Resume"
        paragraph="Please fill these details."
        buttonTitle="Save and Continue"
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedModel("");
        }}
        modelDetails={{
          modelNumber: selectedModel,
          language: resume.language ?? "English",
          type: selectedType,
          amount:
            resumeDetails.find((resume) => resume.modelNumber === selectedModel)
              ?.discountedPrice ?? 0,
        }}
      />
    </Background>
  );
};

export default ResumeDetail;
