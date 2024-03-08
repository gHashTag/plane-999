import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
// ui
import { Breadcrumbs } from "@plane/ui";
// helper
import { BreadcrumbLink } from "components/common";
import { EUserProjectRoles } from "constants/project";
// hooks
import { useProject, useUser } from "hooks/store";
import { ProjectLogo } from "components/project";
// constants
// components

export interface IProjectSettingHeader {
  title: string;
}

export const ProjectSettingHeader: FC<IProjectSettingHeader> = observer((props) => {
  const { title } = props;
  // router
  const router = useRouter();
  const { workspaceSlug } = router.query;
  // store hooks
  const {
    membership: { currentProjectRole },
  } = useUser();
  const { currentProjectDetails } = useProject();

  if (currentProjectRole && currentProjectRole <= EUserProjectRoles.VIEWER) return null;

  return (
    <div className="relative z-10 flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 bg-custom-sidebar-background-100 p-4">
      <div className="flex w-full flex-grow items-center gap-2 overflow-ellipsis whitespace-nowrap">
        <div>
          <div className="z-50">
            <Breadcrumbs onBack={router.back}>
              <Breadcrumbs.BreadcrumbItem
                type="text"
                link={
                  <BreadcrumbLink
                    href={`/${workspaceSlug}/projects/${currentProjectDetails?.id}/issues`}
                    label={currentProjectDetails?.name ?? "Project"}
                    icon={
                      currentProjectDetails && (
                        <span className="grid place-items-center flex-shrink-0 h-4 w-4">
                          <ProjectLogo logo={currentProjectDetails?.logo_props} className="text-sm" />
                        </span>
                      )
                    }
                  />
                }
              />
              <div className="hidden sm:hidden md:block lg:block">
                <Breadcrumbs.BreadcrumbItem type="text" link={<BreadcrumbLink label={title} />} />
              </div>
            </Breadcrumbs>
          </div>
        </div>
      </div>
    </div>
  );
});
