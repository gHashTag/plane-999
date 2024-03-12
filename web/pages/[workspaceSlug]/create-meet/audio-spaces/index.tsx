import { useEffect, ReactElement } from "react";

import { useRouter } from "next/router";
// components
import { PageHead } from "components/core";
import { WorkspaceCreateMeetHeader } from "components/headers";

// types
import { NextPageWithLayout } from "lib/types";
// layouts
import { useWorkspace } from "hooks/store";
import { AppLayout } from "layouts/app-layout";

const Meets: NextPageWithLayout = () => {
  const roomId = "gcy-elue-bot";
  const router = useRouter();
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const setRoute = async () => {
      try {
        router.push({
          pathname: `/${currentWorkspace?.slug}/create-meet/audio-spaces/[roomId]`,
          query: { roomId },
        });
      } catch (error) {
        console.error("Error", error);
      }
    };

    setRoute();
  }, []);
};

Meets.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout header={<WorkspaceCreateMeetHeader />}>{page}</AppLayout>;
};

export default Meets;
