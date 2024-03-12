
import { useEffect, ReactElement } from "react";
import { WorkspaceCreateMeetHeader } from "components/headers";
// layouts
import { AppLayout } from "layouts/app-layout";

import { useRouter } from "next/router";
import { useWorkspace } from "hooks/store";
// types
import { NextPageWithLayout } from "lib/types";

const Meets: NextPageWithLayout = () => {
  const roomId = "nur-zlme-mpt";
  const router = useRouter();
  const { currentWorkspace } = useWorkspace();
  
  useEffect(() => {
    const setRoute = async () => {
      try {
        router.push({
          pathname: `/${currentWorkspace?.slug}/create-meet/meets/[roomId]`,
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
