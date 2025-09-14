/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Description,
  Check,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import styles from "./uploadresume.module.css";
import Container from "../../structure/container/Container";
import { UploadFile } from "../../supabase/UploadFile";
import { BiodataRequestStorage } from "../../supabase/ResumeRequest";
import { StorageBucket } from "../../data/StorageBucket";
import Background from "../background/Background";
import Heading from "../heading/Heading";
import Image from "next/image";

interface Step {
  title: string;
  isComplete: boolean;
}

interface UploadBiodataProps {
  initialRequestNumber?: string;
  initialUserDetails?: Record<string, unknown>;
  initialModelDetails?: Record<string, unknown>;
}

const UploadBiodata: React.FC<UploadBiodataProps> = ({
  initialRequestNumber,
  initialUserDetails,
  initialModelDetails,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [requestNumber, setRequestNumber] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<Record<string, unknown>>({});
  const [modelDetails, setModelDetails] = useState<Record<string, unknown>>({});

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [biodataFile, setBiodataFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [biodataPreview, setBiodataPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const biodataInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 1) pull from URL
    const paramReq = searchParams.get("requestNumber");
    console.log("URL requestNumber:", paramReq);

    // 2) pull from localStorage
    const storedReq = localStorage.getItem("currentRequestNumber");
    console.log("localStorage requestNumber:", storedReq);

    // 3) if neither, error + redirect
    if (!paramReq && !storedReq) {
      console.error("No request number found");
      setError("Invalid request. Please try again.");
      router.push("/");
      return;
    }

    // 4) choose one, stash it, and set state
    const finalReq = paramReq || storedReq;
    console.log("Using requestNumber:", finalReq);
    setRequestNumber(finalReq);
    localStorage.setItem("currentRequestNumber", finalReq ?? "");

    // 5) optional JSON-encoded params
    const udParam = searchParams.get("userDetails");
    if (udParam) {
      try {
        setUserDetails(JSON.parse(udParam));
      } catch {
        console.warn("Could not parse userDetails");
      }
    }

    const mdParam = searchParams.get("modelDetails");
    if (mdParam) {
      try {
        setModelDetails(JSON.parse(mdParam));
      } catch {
        console.warn("Could not parse modelDetails");
      }
    }
  }, [searchParams, router]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPG, PNG)");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setError("Image size should be less than 1MB");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBiodataUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid file type (PDF, DOC, DOCX, or Image)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    setBiodataFile(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBiodataPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBiodataPreview(null);
    }
  };

  const steps: Step[] = [
    {
      title: "Upload Profile Photo",
      isComplete: !!imageFile,
    },
    {
      title: "Upload Existing Biodata",
      isComplete: !!biodataFile,
    },
    {
      title: "Review & Submit",
      isComplete: currentStep === 3 && !!imageFile && !!biodataFile,
    },
  ];

  const handleSubmit = async () => {
    try {
      if (!imageFile || !biodataFile || !requestNumber) {
        throw new Error(
          "Please upload both files and ensure request number exists"
        );
      }

      setIsLoading(true);
      setError("");

      const profileUrl = await UploadFile({
        file: imageFile,
        requestNumber: `${requestNumber}_profile`,
        folderName: StorageBucket.UPLOAD_BIODATA,
      });

      const biodataUrl = await UploadFile({
        file: biodataFile,
        requestNumber: `${requestNumber}_biodata`,
        folderName: StorageBucket.UPLOAD_BIODATA,
      });

      const params = new URLSearchParams({
        requestNumber,
        mobileNumber: "1234567890", // Replace with actual mobile number
        modelNumber: "BIO-001", // Replace with actual model number
        type: "Standard", // Replace with actual type
        name: "User Name", // Replace with actual name
        profileUrl,
        biodataUrl,
        uploadDate: new Date().toISOString(),
      });

      await BiodataRequestStorage.saveBiodataRequestFromUploadBiodata({
        requestNumber,
        userDetails,
        modelDetails,
        profileUrl,
        biodataUrl,
      });

      localStorage.removeItem("currentRequestNumber");
      router.push(`/confirmation?${params.toString()}`);
    } catch (error) {
      console.error("Upload error:", error);
      setError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <Container>
        <Heading
          title="Upload Biodata"
          subtitle="Upload Your Profile Photo and Existing Biodata."
        />
        <div className={styles.uploadFilesContent}>
          <div className={styles.stepsProgress}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${styles.step}
                  ${currentStep === index + 1 ? styles.active : ""}
                  ${step.isComplete ? styles.completed : ""}`}
              >
                <div className={styles.stepNumber}>{index + 1}</div>
                <div className={styles.stepContent}>
                  <h4>{step.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div
            className={styles.uploadSection}
            style={{ display: currentStep === 1 ? "block" : "none" }}
          >
            <div className={styles.uploadBox}>
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
              <div
                className={`${styles.uploadArea} ${
                  imagePreview ? styles.hasFile : ""
                }`}
                onClick={() => imageInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className={styles.previewSection}>
                    <div className={styles.previewContainer}>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        className={styles.imagePreview}
                      />
                    </div>
                    <button
                      className={styles.changeImageBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        imageInputRef.current?.click();
                      }}
                    >
                      <Check className={styles.successIcon} />
                      Change Image
                    </button>
                  </div>
                ) : (
                  <>
                    <h3>Upload Profile Photo</h3>
                    <button className={styles.uploadBtn}>Upload Photo</button>
                    <p>Click to upload your photo</p>
                    <span className={styles.fileHint}>
                      JPG, PNG or JPEG (Max 1MB)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className={styles.uploadSection}
            style={{ display: currentStep === 2 ? "block" : "none" }}
          >
            <div className={styles.uploadBox}>
              <input
                type="file"
                ref={biodataInputRef}
                onChange={handleBiodataUpload}
                accept=".pdf,.doc,.docx,image/*"
                style={{ display: "none" }}
              />
              <div
                className={`${styles.uploadArea} ${
                  biodataFile ? styles.hasFile : ""
                }`}
                onClick={() => biodataInputRef.current?.click()}
              >
                {biodataFile ? (
                  <div className={styles.fileSuccess}>
                    {biodataPreview ? (
                      <div className={styles.previewSection}>
                        <div className={styles.previewContainer}>
                          <Image
                            src={biodataPreview}
                            alt="Biodata"
                            className={styles.imagePreview}
                          />
                        </div>
                        <button
                          className={styles.changeImageBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            biodataInputRef.current?.click();
                          }}
                        >
                          <Check className={styles.successIcon} />
                          Change File
                        </button>
                      </div>
                    ) : (
                      <div className={styles.fileInfo}>
                        <Description className={styles.fileIcon} />
                        <span>{biodataFile.name}</span>
                        <button
                          className={styles.changeFileBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            biodataInputRef.current?.click();
                          }}
                        >
                          <Check className={styles.successIcon} />
                          Change File
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <h3>Upload Existing Biodata</h3>
                    <button className={styles.uploadBtn}>Upload Biodata</button>
                    <p>Click to upload your existing biodata</p>
                    <span className={styles.fileHint}>
                      PDF, DOC, or Image files (Max 5MB)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className={styles.uploadSection}
            style={{ display: currentStep === 3 ? "block" : "none" }}
          >
            <div className={styles.reviewSection}>
              <div className={styles.reviewItem}>
                <h4>Profile Photo</h4>
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Profile"
                    className={styles.reviewImage}
                  />
                )}
              </div>
              <div className={styles.reviewItem}>
                <h4>Biodata</h4>
                {biodataPreview ? (
                  <Image
                    src={biodataPreview}
                    alt="Biodata"
                    className={styles.reviewImage}
                  />
                ) : (
                  biodataFile && (
                    <div className={styles.fileInfo}>
                      <Description className={styles.fileIcon} />
                      <span>{biodataFile.name}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className={styles.navigationButtons}>
            {currentStep > 1 && (
              <button
                className={`${styles.navButton} ${styles.back}`}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
              >
                <ArrowBack /> Back
              </button>
            )}
            {currentStep < 3 ? (
              <button
                className={`${styles.navButton} ${styles.next}`}
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={currentStep === 1 ? !imageFile : !biodataFile}
              >
                Next <ArrowForward />
              </button>
            ) : (
              <button
                className={`${styles.navButton} ${styles.submit}`}
                onClick={handleSubmit}
                disabled={!imageFile || !biodataFile}
              >
                Submit
              </button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </Container>
    </Background>
  );
};

export default UploadBiodata;
