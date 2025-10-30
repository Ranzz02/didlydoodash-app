import MemberItem from "@/components/organisation/member/item/MemberItem";
import { useAuth } from "@/context/AuthContext";
import { getMembers } from "@/services/member";
import { useOrgStore } from "@/stores/organisation";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export default function OrganisationDashboard() {
  const { organisation } = useOrgStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isOwner = organisation?.owner?.user?.id === user?.id;

  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useQuery(
    ["members", organisation?.id],
    () => getMembers(organisation!.id),
    { enabled: !!organisation?.id }
  );

  // const {
  //   announcements,
  //   showAnnouncementBox,
  //   postAnnouncement,
  //   deleteAnnouncement,
  //   toggleAnnouncementBox,
  // } = useAnnouncements(organisation?.id);

  if (!organisation) {
    navigate("/", { replace: true });
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error as any}</div>;

  return (
    <div className="dashboardContainer">
      <h1>{organisation.name}</h1>

      <div className="texts">
        <span>Owner:</span>
        <MemberItem member={organisation.owner} />
      </div>
      {/* 
      <MemberList members={members} isOwner={isOwner} />
      <AnnouncementSection
        announcements={announcements}
        onPost={postAnnouncement}
        onDelete={deleteAnnouncement}
        showBox={showAnnouncementBox}
        toggleBox={toggleAnnouncementBox}
      /> */}

      {/* {isOwner && <RemoveOrg />} */}
    </div>
  );
}
