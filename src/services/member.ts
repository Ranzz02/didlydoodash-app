import { OrgMember } from "@/utils/types";
import { API } from "./api";

export type GetMembersResponse = {
  members: OrgMember[];
};

export const getMembers = async (id: string): Promise<OrgMember[]> => {
  return API.get<GetMembersResponse>(`/organisations/${id}/members`)
    .then((resp) => {
      return resp.data.members;
    })
    .catch((err) => {
      console.error("Failed to get members: ", err);

      return [];
    });
};
