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

const WorkspaceCreateMeetPage: NextPageWithLayout = observer(() => {
  const { currentWorkspace } = useWorkspace();
  const [recordings, setRecordings] = useState([]);
  console.log(recordings, "recordings");
  // derived values
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - CreateMeet` : undefined;

  useEffect(() => {
    if (currentWorkspace) {
      const { slug } = currentWorkspace;
      (async () => {
        const responseData = await getAllRecordings(slug);
        setRecordings(responseData.data);
      })();
    }
  }, [currentWorkspace]);

  return (
    <>
      <PageHead title={pageTitle} />
      <WorkspaceCreateMeet />
    </>
  );
});

WorkspaceCreateMeetPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout header={<WorkspaceCreateMeetHeader />}>{page}</AppLayout>;
};

export default WorkspaceCreateMeetPage;
