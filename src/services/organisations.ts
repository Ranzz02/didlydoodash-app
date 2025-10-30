import { toast } from "react-toastify";
import { API } from "./api";
import { Organisation } from "@/utils/types";

export type LoadOrganisationsResponse = {
  organisations: Organisation[];
};

export const loadOrganisations = async (): Promise<Organisation[]> => {
  try {
    const result = await API.get<LoadOrganisationsResponse>("/organisations");
    return result.data.organisations ?? [];
  } catch (error: any) {
    // Narrow to Axios-style error if possible
    const message =
      (error as any)?.response?.data?.message ||
      (error as Error)?.message ||
      "Unknown error occurred";

    toast.error(`Failed to get organisations error message: ${message}`, {
      position: "top-left",
    });

    // Return safe fallback instead of undefined
    return [];
  }
};
