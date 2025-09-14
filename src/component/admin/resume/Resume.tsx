/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import {
  Dashboard,
  FiberNew,
  Description,
  CheckCircle,
  Search,
  ArrowBack,
  ArrowForward,
  Delete,
  PendingActions,
  Payment,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  BiodataRequest,
  BiodataRequestStorage,
} from "../../../supabase/ResumeRequest";
import formatDate from "../../../data/formatDate";
import {
  getLatestStatusId,
  getLatestStatusText,
  getStatusStyle,
} from "../../../data/StatusHelper";
import { MOVE_BACKWARD, MOVE_FORWARD } from "../../../constants/StatusSteps";
import {
  getFlowTypeById,
  getFlowTypeStyle,
  FlowType,
} from "../../../data/flowtype";
import { ProductionRequestStorage } from "../../../supabase/ProductionRequestStorage";
import styles from "./resume.module.css";
import Background from "@/structure/background/Background";
import { ModelDetails } from "@/structure/chooseoption/ChooseOption";


interface UserDetails {
  biodataFilename: string;
  name?: string;
  mobileNumber?: string;
}

interface StatItem {
  icon: React.ReactNode;
  title: string;
  value: number;
  color?: string;
}

const ResumeDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [requests, setRequests] = useState<BiodataRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchRequests();
  }, []);

  const fetchRequests = async (): Promise<void> => {
    try {
      setError(null);
      const response = await BiodataRequestStorage.getAllBiodataRequest();
      if (response) {
        setRequests(response);
      } else {
        setError("No requests found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching requests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const stats: StatItem[] = [
    { icon: <Dashboard />, title: "Total Requests", value: requests.length },
    {
      icon: <CheckCircle />,
      title: "Completed",
      value: requests.filter((request) => request.completed === true).length,
    },
    {
      icon: <Description />,
      title: "In Production",
      value: requests.filter(
        (request) => getLatestStatusId(request.status) > 0 && !request.completed
      ).length,
    },
    {
      icon: <FiberNew />,
      title: "New Requests",
      value: requests.filter(
        (request) => getLatestStatusId(request.status) === 0
      ).length,
    },
    {
      icon: <PendingActions />,
      title: "Pending User Approval",
      value: requests.filter(
        (request) => getLatestStatusId(request.status) === 2
      ).length,
      color: "#FF9800",
    },
    {
      icon: <Payment />,
      title: "Payment to Collect",
      value: requests.filter(
        (request) => getLatestStatusId(request.status) === 3
      ).length,
      color: "#F44336",
    },
  ];

  const isBackwardDisabled = (statusId: number): boolean =>
    [0, 1].includes(statusId);
  const isForwardDisabled = (statusId: number): boolean => statusId === 5;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const value = searchValue.trim();
    if (!value) {
      void fetchRequests();
      return;
    }

    const searchNumber = parseInt(value, 10);
    if (isNaN(searchNumber)) {
      setRequests([]);
      return;
    }

    const filteredRequests = requests.filter((request) =>
      request.request_number.toString().includes(value)
    );

    if (filteredRequests.length > 0) {
      setRequests(filteredRequests);
    } else {
      setError("No records found");
    }
  };

  const moveToProduction = async (request: BiodataRequest): Promise<void> => {
    if (!request.id) throw new Error("Request ID is required");

    await ProductionRequestStorage.saveProductionRequest({
      biodataRequestId: request.id,
      requestNumber: request.request_number,
      flowType: request.flow_type as FlowType,
      userDetails: request.user_details,
      modelDetails: request.model_details,
      profileUrl: request.profile_url,
      biodataUrl: request.biodata_url,
      personalDetails: request.personal_details,
      professionalDetails: request.professional_details,
      examinationDetails: request.examination_details,
      educationDetails: request.education_details,
      familyDetails: request.family_details,
      contactDetails: request.contact_details,
    });
  };

  const handleStatusChange = async (
    direction: string,
    requestId: number
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const request = requests.find((r) => r.id === requestId);
      if (!request) {
        setError("Request not found");
        return;
      }

      const currentStatusArray = request.status || [];
      const latestStatusId = getLatestStatusId(currentStatusArray);

      if (latestStatusId === 0) {
        await moveToProduction(request);
      }

      if (direction === MOVE_FORWARD.toString()) {
        currentStatusArray.push({
          id: latestStatusId + 1,
          created: new Date().toISOString(),
        });
      } else if (currentStatusArray.length) {
        currentStatusArray.pop();
      }

      await BiodataRequestStorage.updateStatusBiodataRequestById(
        requestId,
        currentStatusArray
      );
      await fetchRequests();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error updating status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await BiodataRequestStorage.deleteBiodataRequestById(id);
      await fetchRequests();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error deleting request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Background>
        {/* <div className={styles.adminDashboard}> */}
        <div className={styles.dashboardContent}>
          {/* Stats Section */}
          <div className={styles.dashboardStats}>
            {stats.map((stat, index) => (
              <div className={styles.dashboardStatCard} key={index}>
                {stat.icon}
                <div className={styles.dashboardStatInfo}>
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table Section */}
          <div className={styles.dashboardTableSection}>
            <div className={styles.dashboardTableHeader}>
              <h2>Recent Requests</h2>
              <div className={styles.dashboardSearchBar}>
                <Search />
                <input
                  type="text"
                  placeholder="Search by Request No."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className={styles.dashboardTableContainer}>
              <table className={styles.dashboardTable}>
                <thead>
                  <tr>
                    <th>Request No.</th>
                    <th>Flow Type</th>
                    <th>Name</th>
                    <th>Whatsapp Number</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Status Action</th>
                    <th>Model No.</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {requests
                    .filter((request) => !request.completed)
                    .map((request) => (
                      <tr key={request.id}>
                        <td>{request.request_number}</td>
                        <td>
                          <span style={getFlowTypeStyle(request.flow_type)}>
                            {getFlowTypeById(request.flow_type)}
                          </span>
                        </td>

                        <td>{(request.user_details as unknown as UserDetails)?.biodataFilename}</td>

                        <td>
                          {(request.user_details as unknown as UserDetails)?.mobileNumber}
                        </td>
                        <td>
                          {request.created_at
                            ? formatDate(request.created_at)
                            : "-"}
                        </td>
                        <td>
                          <span
                            style={getStatusStyle(
                              getLatestStatusId(request.status)
                            )}
                          >
                            {getLatestStatusText(request.status)}
                          </span>
                        </td>
                        <td className={styles.dashboardStatusActions}>
                          <button
                            className={`${styles.dashboardActionBtn} ${styles.backward}`}
                            onClick={() =>
                              void handleStatusChange(
                                MOVE_BACKWARD.toString(),
                                request.id!
                              )
                            }
                            disabled={isBackwardDisabled(
                              getLatestStatusId(request.status)
                            )}
                          >
                            <ArrowBack />
                          </button>
                          <button
                            className={`${styles.dashboardActionBtn} ${styles.forward}`}
                            onClick={() =>
                              void handleStatusChange(
                                MOVE_FORWARD.toString(),
                                request.id!
                              )
                            }
                            disabled={isForwardDisabled(
                              getLatestStatusId(request.status)
                            )}
                          >
                            <ArrowForward />
                          </button>
                        </td>
                        
                        <td>
                          {(request.user_details as unknown as UserDetails)?.mobileNumber}
                        </td>
                        <td>
                          <button
                            className={styles.dashboardDeleteBtn}
                            onClick={() => void handleDelete(request.id!)}
                          >
                            <Delete />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Background>
    </>
  );
};

export default ResumeDashboard;
