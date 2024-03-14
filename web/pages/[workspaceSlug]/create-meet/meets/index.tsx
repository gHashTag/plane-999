import { useEffect, ReactElement } from "react";
import { WorkspaceCreateMeetHeader } from "components/headers";
// layouts
import { AppLayout } from "layouts/app-layout";

import { useRouter } from "next/router";
import { useWorkspace } from "hooks/store";
// types
import { NextPageWithLayout } from "lib/types";
import { useWorkspaces } from "@/services/supabase/useWorkspaces";
import { observer } from "mobx-react";

const Meets: NextPageWithLayout = () => {
  const { roomId, role } = useWorkspaces();
  // const roomId = "nur-zlme-mpt";

  const router = useRouter();
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const setRoute = async () => {
      try {
        if (currentWorkspace?.slug && roomId) {
          router.push(
            {
              pathname: `/${currentWorkspace.slug}/create-meet/meets/[roomId]`,
              query: { roomId },
            },
            `/${currentWorkspace.slug}/create-meet/meets/${roomId}`
          );
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    setRoute();
  }, [roomId, currentWorkspace?.slug, router]);
};

Meets.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout header={<WorkspaceCreateMeetHeader />}>{page}</AppLayout>;
};

export default Meets;
