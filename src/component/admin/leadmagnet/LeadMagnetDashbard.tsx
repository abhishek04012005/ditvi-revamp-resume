/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/admin/leadmagnet/LeadDashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Refresh,
  Search,
  Person,
  Email,
  WhatsApp,
  AccessTime,
  Campaign,
  Visibility,
  Close,
} from "@mui/icons-material";
import { UserDetailsStorage } from "@/supabase/UserDetails";
import {
  BiodataRequestStorage,
  BiodataRequest,
} from "@/supabase/ResumeRequest";
// import Loader from "@/structure/Loader/Loader";
import formatDate from "../../../data/formatDate";
import { UserDetails } from "@/structure/chooseoption/ChooseOption";
import styles from "./leadmagnet.module.css";
import Background from "@/structure/background/Background";

interface StatItem {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: string;
}

interface SortConfig {
  key: keyof BiodataRequest;
  direction: "asc" | "desc";
}

const LeadMagnetDashboard: React.FC = () => {
  const [leads, setLeads] = useState<UserDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLead, setSelectedLead] = useState<UserDetails | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "created_at",
    direction: "desc",
  });

  const stats: StatItem[] = [
    {
      icon: <Campaign />,
      title: "Total Leads",
      value: leads.length,
      color: "#4CAF50",
    },
    {
      icon: <WhatsApp />,
      title: "WhatsApp Available",
      value: leads.filter(
        (lead) => (lead.user_details as { mobileNumber?: string })?.mobileNumber
      ).length,
      color: "#2196F3",
    },
    {
      icon: <Email />,
      title: "Email Available",
      value: leads.filter(
        (lead) => (lead.user_details as { email?: string })?.email
      ).length,
      color: "#FFC107",
    },
    {
      icon: <Person />,
      title: "New Leads",
      value: leads.filter((lead) => {
        const date = new Date(lead.created_at as string | number | Date);
        const now = new Date();
        return now.getTime() - date.getTime() < 24 * 60 * 60 * 1000;
      }).length,
      color: "#9C27B0",
    },
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const users = await UserDetailsStorage.getAllUsers();
      const requests =
        await BiodataRequestStorage.getAllBiodataRequestWithoutAnyFilters();

        const potentialLeads = users.filter(
          (user) =>
            !requests.some(
              (request) =>
                (request.user_details as { mobileNumber?: string })
                  ?.mobileNumber ===
                (user.user_details as { mobileNumber?: string })?.mobileNumber
            )
        );

      setLeads(potentialLeads as unknown as UserDetails[]);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleViewDetails = (lead: UserDetails): void => {
    setSelectedLead(lead);
  };

  const handleWhatsAppClick = (mobileNumber?: string): void => {
    if (!mobileNumber) return;
    const message = encodeURIComponent(
      "Hello! We noticed you're interested in our biodata services. How may we assist you today?"
    );
    window.open(`https://wa.me/91${mobileNumber}?text=${message}`, "_blank");
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    if (sortConfig.direction === "asc") {
      return (a[sortConfig.key] as string | number) >
        (b[sortConfig.key] as string | number)
        ? 1
        : -1;
    }
    return (a[sortConfig.key] as string | number) <
      (b[sortConfig.key] as string | number)
      ? 1
      : -1;
  });

  const filteredLeads = sortedLeads.filter((lead) => {
    const userDetails = lead.user_details as {
      name?: string;
      email?: string;
      mobileNumber?: string;
    };

    return (
      userDetails.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userDetails.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userDetails.mobileNumber?.includes(searchTerm)
    );
  });

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Background>
          <div className={styles.dashboard}>
            <div className={styles.dashboardContent}>
              <div className={styles.dashboardStats}>
                {stats.map((stat, index) => (
                  <div
                    className={styles.statCard}
                    key={index}
                    style={{ borderLeft: `4px solid ${stat.color}` }}
                  >
                    <div className={styles.statIcon}>{stat.icon}</div>
                    <div className={styles.statInfo}>
                      <h3>{stat.title}</h3>
                      <p>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.tableSection}>
                <div className={styles.tableHeader}>
                  <h2>Potential Leads</h2>
                  <div className={styles.actions}>
                    <div className={styles.searchBar}>
                      <Search />
                      <input
                        type="text"
                        placeholder="Search by name, email or mobile..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className={styles.refreshBtn} onClick={fetchLeads}>
                      <Refresh /> Refresh
                    </button>
                  </div>
                </div>

                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Whatsapp Number</th>
                        <th>Date</th>
                        <th>Model No.</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => {
                        const userDetails = lead.user_details as {
                          name?: string;
                          mobileNumber?: string;
                        };
                        const modelDetails = lead.model_details as {
                          modelNumber?: string;
                          amount?: number;
                        };
                        return (
                          <tr key={String(lead.id)}>
                            <td>{userDetails.name}</td>
                            <td>{userDetails.mobileNumber}</td>
                            <td>{formatDate(String(lead.created_at))}</td>
                            <td>{modelDetails?.modelNumber ?? "N/A"}</td>
                            <td>
                              <button
                                className={styles.viewBtn}
                                onClick={() => handleViewDetails(lead)}
                                title="View Details"
                              >
                                <Visibility />
                              </button>
                              {userDetails.mobileNumber && (
                                <button
                                  className={styles.whatsappBtn}
                                  onClick={() =>
                                    handleWhatsAppClick(
                                      userDetails.mobileNumber
                                    )
                                  }
                                  title="Contact on WhatsApp"
                                >
                                  <WhatsApp />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {selectedLead && (
            <div
              className={styles.modalOverlay}
              onClick={() => setSelectedLead(null)}
            >
              <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <div className={styles.modalTitle}>
                    <Person
                      sx={{ color: "var(--primary-color)", fontSize: 28 }}
                    />
                    <h2>Lead Details</h2>
                  </div>
                  <button
                    className={styles.modalClose}
                    onClick={() => setSelectedLead(null)}
                    aria-label="Close modal"
                  >
                    <Close />
                  </button>
                </div>

                <div className={styles.modalContent}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>
                        <Person className={styles.labelIcon} />
                        <span>Full Name</span>
                      </div>
                      <div className={styles.infoValue}>
                        {(selectedLead.user_details as { name?: string })?.name}
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>
                        <WhatsApp className={styles.labelIcon} />
                        <span>WhatsApp Number</span>
                      </div>
                      <div className={styles.infoValue}>
                        {
                          (
                            selectedLead.user_details as {
                              mobileNumber?: string;
                            }
                          )?.mobileNumber
                        }
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>
                        <AccessTime className={styles.labelIcon} />
                        <span>Registration Date</span>
                      </div>
                      <div className={styles.infoValue}>
                        {selectedLead.created_at &&
                        (typeof selectedLead.created_at === "string" ||
                          typeof selectedLead.created_at === "number" ||
                          selectedLead.created_at instanceof Date)
                          ? new Date(selectedLead.created_at).toLocaleString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.actionBtn} ${styles.whatsappActionBtn}`}
                      onClick={() =>
                        handleWhatsAppClick(
                          (
                            selectedLead.user_details as {
                              mobileNumber?: string;
                            }
                          )?.mobileNumber
                        )
                      }
                    >
                      <WhatsApp /> Contact on WhatsApp
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.closeBtn}`}
                      onClick={() => setSelectedLead(null)}
                    >
                      <Close /> Close Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </Background>
    </>
  );
};

export default LeadMagnetDashboard;
