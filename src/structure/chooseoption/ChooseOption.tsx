/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WhatsApp, Upload } from "@mui/icons-material";
import Image from "next/image";
import Container from "../container/Container";
import styles from "./chooseoption.module.css";
import chooseOptionImage from "../../assets/carousel/biodata-1114.png";
import Background from "../background/Background";
import Heading from "../heading/Heading";

export interface UserDetails {
  name?: string;
  [key: string]: unknown;
}

export interface ModelDetails {
  [key: string]: unknown;
}

export interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  primary?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({
  icon,
  title,
  description,
  onClick,
  primary,
}) => (
  <div
    className={`${styles.chooseOptionCard} ${
      primary ? styles.chooseOptionCardPrimary : ""
    }`}
    onClick={onClick}
  >
    <div className={styles.chooseOptionCardIcon}>{icon}</div>
    <h3 className={styles.chooseOptionCardTitle}>{title}</h3>
    <p className={styles.chooseOptionCardDescription}>{description}</p>
  </div>
);

interface ChooseOptionProps {
  requestNumber: string;
  userDetails: UserDetails;
  modelDetails: ModelDetails;
}

const ChooseOption: React.FC<ChooseOptionProps> = ({
  requestNumber,
  userDetails,
  modelDetails,
}) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleWhatsAppClick = async () => {
    try {
      setIsLoading(true);
      router.push(`/confirmation?requestNumber=${requestNumber}`);

      const messageInfo = {
        name: userDetails?.name || "",
        requestNumber,
        modelNumber:
          modelDetails?.modelNumber
      };

      const whatsappMessage = `Hello, I would like to create a Resume
Name: ${messageInfo.name}
Request Number: ${messageInfo.requestNumber}
Model Number: ${messageInfo.modelNumber}`;

      const whatsappUrl = `https://wa.me/919263767441?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadBiodata = () => {
    const searchParams = new URLSearchParams(window.location.search);

    // Prioritize props over URL parameters
    const params = new URLSearchParams();
    params.set(
      "requestNumber",
      requestNumber || searchParams.get("requestNumber") || ""
    );

    if (userDetails || searchParams.get("userDetails")) {
      params.set(
        "userDetails",
        JSON.stringify(
          userDetails ||
            (searchParams.get("userDetails")
              ? JSON.parse(searchParams.get("userDetails")!)
              : {})
        )
      );
    }

    if (modelDetails || searchParams.get("modelDetails")) {
      params.set(
        "modelDetails",
        JSON.stringify(
          modelDetails ||
            (searchParams.get("modelDetails")
              ? JSON.parse(searchParams.get("modelDetails")!)
              : {})
        )
      );
    }

    if (!params.get("requestNumber")) {
      console.error("No request number available");
      return;
    }

    router.push(`/upload-resume?${params.toString()}`);
  };

  return (
    <Background>
      <Container>
        <Heading
          title="How Would You Like to Proceed?"
          subtitle=" Choose the option that best suits your needs"
        />
        <div className={styles.chooseOptionContent}>
          <div className={styles.chooseOptionGrid}>
            <OptionCard
              icon={<WhatsApp />}
              title="Connect on WhatsApp"
              description="Chat with our experts directly on WhatsApp for quick assistance"
              onClick={handleWhatsAppClick}
              primary
            />
          </div>
        </div>
      </Container>
    </Background>
  );
};

export default ChooseOption;
