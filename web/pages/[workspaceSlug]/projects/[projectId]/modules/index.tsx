import { ReactElement } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
// layouts
import { AppLayout } from "layouts/app-layout";
// components
import { PageHead } from "components/core";
import { ModulesListHeader } from "components/headers";
import { ModulesListView } from "components/modules";
import { ModulesListMobileHeader } from "components/modules/modules-list-mobile-header";
// types
import { NextPageWithLayout } from "lib/types";
// hooks
import { useProject } from "hooks/store";

const ProjectModulesPage: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { projectId } = router.query;
  // store
  const { getProjectById } = useProject();
  // derived values
  const project = projectId ? getProjectById(projectId.toString()) : undefined;
  const pageTitle = project?.name ? `${project?.name} - Modules` : undefined;

  return (
    <>
      <PageHead title={pageTitle} />
      <ModulesListView />
    </>
  );
});

ProjectModulesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout header={<ModulesListHeader />} mobileHeader={<ModulesListMobileHeader />} withProjectWrapper>
      {page}
    </AppLayout>
  );
};

export default ProjectModulesPage;
