import { getRegistrationDetails } from "@/server/services/get-registration-details";
import { ParticipantDetailsView } from "@/components/ad-coo-dashboard/registrations-detail-view";

export default async function Page({ params }: { params: { registrationId: string } }) {
  const { registrationId } = await params; // Await params in Nextjs 15
  
  const response = await getRegistrationDetails(registrationId);
          // console.log("details::",response?.data?.team.members)
  if (!response.success || !response.data) {
    return <div className="text-red-500 p-10 mt-20">Error: {response.message}</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ParticipantDetailsView data={response.data} />
    </div>
  );
}
