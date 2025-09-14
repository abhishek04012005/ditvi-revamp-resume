/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/GetNow/GetNow.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./getnow.module.css";
import { UserDetailsStorage } from "../../supabase/UserDetails";
import Button from "../button/Button";

interface GetNowProps {
  isOpen: boolean;
  onClose: () => void;
  modelDetails: {
    modelNumber: string;
    language: string;
    type: string;
    amount: number;
  };
  heading?: string;
  paragraph?: string;
  buttonTitle?: string;
  isLeadMagnet?: boolean;
}

const GetNow: React.FC<GetNowProps> = ({
  isOpen,
  onClose,
  modelDetails,
  heading = "Request Biodata",
  paragraph = "Please fill these details.",
  buttonTitle = "Save and Continue",
  isLeadMagnet = false,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
  });

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       setIsLoading(true);
  //       const userDetail = await UserDetailsStorage.saveUserDetails({
  //         userDetails: {
  //           name: formData.name,
  //           mobileNumber: formData.mobileNumber,
  //         },
  //         modelDetails: modelDetails,
  //       });

  //       setFormData({ name: "", mobileNumber: "" });
  //       onClose();

  //       if (isLeadMagnet) {
  //         router.push("/resume");
  //       } else {
  //         const searchParams = new URLSearchParams({
  //           requestNumber: userDetail.request_number,
  //           name: formData.name,
  //           mobileNumber: formData.mobileNumber,
  //           modelNumber: modelDetails.modelNumber,
  //           language: modelDetails.language,
  //           type: modelDetails.type,
  //           amount: modelDetails.amount.toString(),
  //         });

  //         router.push(`/choose-option `);
  //       }
  //     } catch (error) {
  //       setError(true);
  //       console.error("Error submitting form:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userDetail = await UserDetailsStorage.saveUserDetails({
        userDetails: {
          name: formData.name,
          mobileNumber: formData.mobileNumber,
        },
        modelDetails: modelDetails,
      });

      setFormData({ name: "", mobileNumber: "" });
      onClose();

      if (isLeadMagnet) {
        router.push("/resume");
      } else {
        // Store request number in localStorage for recovery
        localStorage.setItem("currentRequestNumber", userDetail.request_number);

        // Build query params
        const queryParams = new URLSearchParams({
          requestNumber: userDetail.request_number,
          name: formData.name,
          mobileNumber: formData.mobileNumber,
          modelNumber: modelDetails.modelNumber,
          language: modelDetails.language,
          type: modelDetails.type,
          amount: modelDetails.amount.toString(),
        }).toString();

        // Navigate with query params
        router.push(`/choose-option?${queryParams}`);
      }
    } catch (error) {
      setError(true);
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };



  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value || /^[6-9]/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        mobileNumber: value,
      }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.getnowOverlay} onClick={handleOverlayClick}>
      <div
        className={styles.getnowContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.getnowCloseButton}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className={styles.getnowHeader}>
          <h2>{heading}</h2>
          <p>{paragraph}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.getnowFormGroup}>
            <label htmlFor="name">Full Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleNameChange}
              onKeyPress={(e) => {
                if (!/[A-Za-z\s]/.test(e.key) && e.key.length === 1) {
                  e.preventDefault();
                }
              }}
              pattern="[A-Za-z\s]{3,50}"
              required
              minLength={3}
              maxLength={50}
              title="Please enter a valid name (letters and spaces only)"
              aria-label="Full name"
            />
          </div>
          <div className={styles.getnowFormGroup}>
            <label htmlFor="whatsapp">WhatsApp Number:</label>
            <input
              id="mobileNumber"
              type="tel"
              name="mobileNumber"
              placeholder="Enter your WhatsApp number"
              value={formData.mobileNumber}
              onChange={handleMobileNumberChange}
              onKeyPress={(e) => {
                if (
                  (formData.mobileNumber.length === 0 &&
                    !/[6-9]/.test(e.key)) ||
                  !/[0-9]/.test(e.key) ||
                  formData.mobileNumber.length >= 10
                ) {
                  e.preventDefault();
                }
              }}
              pattern="[6-9][0-9]{9}"
              maxLength={10}
              minLength={10}
              inputMode="numeric"
              autoComplete="tel"
              title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
              required
              aria-label="WhatsApp number"
            />
          </div>
          <Button variant="primary" className={styles.getnowSubmitButton}>
            {buttonTitle}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GetNow;
