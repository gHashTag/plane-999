import React from "react";
import { observer } from "mobx-react";
// helper
import { cn } from "helpers/common.helper";
// hooks
import { useUser, useWorkspace} from "hooks/store";
import { useRouter } from "next/navigation";
import LandingCards from "@components/999/LandingCards/LandingCards";
import SubCard from "@/components/999/LandingCards/SubCard";

export const WorkspaceCreateMeet = observer(() => {
  // store hooks
  const { currentUser } = useUser();
  const { currentWorkspace } = useWorkspace();
  const router = useRouter();
  const getRoom = async () => {
    router.push(`/${currentWorkspace?.slug}/create-meet/meets`);
  };

  const getSpace = async () => {
    router.push(`/${currentWorkspace?.slug}/create-meet/audio-spaces`);
  };

  const getTokenGated = async () => {
    router.push(`/${currentWorkspace?.slug}/create-meet/token-gated`);
  };

  return (
    <div className="flex flex-col gap-10 pt-8 px-8 rounded-xl h-full vertical-scrollbar scrollbar-lg">
      <div
        className={cn("flex item-center justify-between rounded-xl min-h-[25rem]", {
          "bg-gradient-to-l from-[#CFCFCF]  to-[#212121]": currentUser?.theme.theme === "dark",
          "bg-gradient-to-l from-[#3b5ec6] to-[#f5f7fe]": currentUser?.theme.theme === "light",
        })}
      >
        <LandingCards title="Get started quickly" type="Guide" className="flex-col mt-10">
          <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
            <SubCard title="Video Meeting" img="Video Meeting.png" onClick={getRoom} />
            <SubCard title="Audio Spaces" img="Audio Spaces.png" onClick={getSpace} />
            <SubCard title="Token-gated Room" img="Token-gated Room.png" onClick={getTokenGated} />
          </div>
        </LandingCards>
        </div>
    </div>
  );
});
