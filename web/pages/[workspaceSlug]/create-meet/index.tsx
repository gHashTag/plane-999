import { ReactElement, useEffect, useState } from "react";
import { observer } from "mobx-react";
// components
import { PageHead } from "components/core";
import { WorkspaceCreateMeetHeader } from "components/headers";
import { WorkspaceCreateMeet } from "components/workspace";
// layouts
import { useWorkspace } from "hooks/store";
import { AppLayout } from "layouts/app-layout";
// types
import { NextPageWithLayout } from "lib/types";
// hooks

import { useRouter } from "next/navigation";
import { getAllRecordings } from "@/services/supabase/edge-functions";
import { useWorkspaces } from "@/services/supabase/useWorkspaces";
import { RecordingsArray } from "@/services/supabase/typesSupabase";

const WorkspaceCreateMeetPage: NextPageWithLayout = observer(() => {
  const { room_id, currentWorkspace } = useWorkspaces();
  const [recordings, setRecordings] = useState<RecordingsArray>([]);
  console.log(recordings, "recordings");
  // derived values
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - CreateMeet` : undefined;

  useEffect(() => {
    if (currentWorkspace) {
      const { slug } = currentWorkspace;
      (async () => {
        if (room_id && slug) {
          const responseData = await getAllRecordings(room_id, slug);
          if (responseData) {
            setRecordings(responseData);
          }
        }
      })();
    }
  }, [currentWorkspace]);

  return (
    <>
      <PageHead title={pageTitle} />
      <WorkspaceCreateMeet recordings={recordings} />
    </>
  );
});

WorkspaceCreateMeetPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout header={<WorkspaceCreateMeetHeader />}>{page}</AppLayout>;
};

export default WorkspaceCreateMeetPage;
