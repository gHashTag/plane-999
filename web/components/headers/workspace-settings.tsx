import { FC } from "react";
import { useRouter } from "next/router";
// ui
import { Breadcrumbs, CustomMenu } from "@plane/ui";
import { Settings } from "lucide-react";
// hooks
import { observer } from "mobx-react-lite";
// components
import { WORKSPACE_SETTINGS_LINKS } from "constants/workspace";
import { BreadcrumbLink } from "components/common";

export interface IWorkspaceSettingHeader {
  title: string;
}

export const WorkspaceSettingHeader: FC<IWorkspaceSettingHeader> = observer((props) => {
  const { title } = props;
  const router = useRouter();

  const { workspaceSlug } = router.query;

  return (
    <div className="relative z-10 flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 bg-custom-sidebar-background-100 p-4">
      <div className="flex w-full flex-grow items-center gap-2 overflow-ellipsis whitespace-nowrap">
        <Breadcrumbs onBack={router.back}>
          <Breadcrumbs.BreadcrumbItem
            type="text"
            link={
              <BreadcrumbLink
                href={`/${workspaceSlug}/settings`}
                label="Settings"
                icon={<Settings className="h-4 w-4 text-custom-text-300" />}
              />
            }
          />
          <div className="hidden sm:hidden md:block lg:block">
            <Breadcrumbs.BreadcrumbItem type="text" link={<BreadcrumbLink label={title} />} />
          </div>
        </Breadcrumbs>
      </div>
    </div>
  );
});
