import LandingCards from "@components/999/LandingCards/LandingCards";
import SubCard from "@/components/999/LandingCards/SubCard";

import { useRouter } from "next/navigation";

const CreateMeet = () => {
  const router = useRouter();
  // const { workspace_slug: workspaceSlug, project_slug: projectId } = router.query as {
  //   workspace_slug: string;
  //   project_slug: string;
  // };
  // console.log(workspaceSlug, "workspaceSlug");
  // console.log(projectId, "projectId");
  const getRoom = async () => {
    router.push(`/[workspaceSlug]/create-meet/meets`);
  };

  const getSpace = async () => {
    router.push(`/[workspaceSlug]/create-meet/audio-spaces`);
  };

  const getTokenGated = async () => {
    router.push(`/[workspaceSlug]/create-meet/token-gated`);
  };

  return (
    <LandingCards title="Get started quickly" type="Guide" className="flex-col mt-10">
      <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
        <SubCard title="Video Meeting" img="Video Meeting.png" onClick={getRoom} />
        <SubCard title="Audio Spaces" img="Audio Spaces.png" onClick={getSpace} />
        <SubCard title="Token-gated Room" img="Token-gated Room.png" onClick={getTokenGated} />
      </div>
    </LandingCards>
  );
};

export default CreateMeet;
