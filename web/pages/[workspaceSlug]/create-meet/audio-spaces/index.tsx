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
import { useWorkspaces } from "@/services/supabase/useWorkspaces";

const Meets: NextPageWithLayout = () => {
  const { code, role } = useWorkspaces();
  const router = useRouter();
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const setRoute = async () => {
      try {
        router.push({
          pathname: `/${currentWorkspace?.slug}/create-meet/audio-spaces/[code]`,
          query: { code },
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
