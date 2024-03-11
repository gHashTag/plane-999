import { ReactElement } from "react";
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

const WorkspaceCreateMeetPage: NextPageWithLayout = observer(() => {
  const { currentWorkspace } = useWorkspace();

  // derived values
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - CreateMeet` : undefined;

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
