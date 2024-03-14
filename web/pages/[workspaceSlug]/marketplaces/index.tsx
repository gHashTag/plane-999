import { ReactElement, useEffect, useState } from "react";
import { observer } from "mobx-react";
// components
import { PageHead } from "components/core";
// layouts
import { useWorkspace } from "hooks/store";
import { AppLayout } from "layouts/app-layout";
// types
import { NextPageWithLayout } from "lib/types";
// hooks

import { useRouter } from "next/navigation";
import { getAllRecordings } from "@/services/supabase/edge-functions";
import { Wallet } from "lucide-react";
import { WorkspaceWalletHeader } from "@/components/headers/workspace-wallet";

const WorkspaceMarketplacesPage: NextPageWithLayout = observer(() => {
  const { currentWorkspace } = useWorkspace();
  const [recordings, setRecordings] = useState([]);
  console.log(recordings, "recordings");
  // derived values
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - Marketplaces` : undefined;

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
      <span>Marketplaces</span>
    </>
  );
});

WorkspaceMarketplacesPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout header={<WorkspaceWalletHeader />}>{page}</AppLayout>;
};

export default WorkspaceMarketplacesPage;
