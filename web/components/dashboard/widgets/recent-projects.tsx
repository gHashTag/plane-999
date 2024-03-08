import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { Plus } from "lucide-react";
// hooks
import { Avatar, AvatarGroup } from "@plane/ui";
import { WidgetLoader, WidgetProps } from "components/dashboard/widgets";
import { PROJECT_BACKGROUND_COLORS } from "constants/dashboard";
import { EUserWorkspaceRoles } from "constants/workspace";
import { useApplication, useEventTracker, useDashboard, useProject, useUser } from "hooks/store";
// components
// ui
// helpers
// types
import { TRecentProjectsWidgetResponse } from "@plane/types";
import { ProjectLogo } from "components/project";
// constants

const WIDGET_KEY = "recent_projects";

type ProjectListItemProps = {
  projectId: string;
  workspaceSlug: string;
};

const ProjectListItem: React.FC<ProjectListItemProps> = observer((props) => {
  const { projectId, workspaceSlug } = props;
  // store hooks
  const { getProjectById } = useProject();
  const projectDetails = getProjectById(projectId);

  const randomBgColor = PROJECT_BACKGROUND_COLORS[Math.floor(Math.random() * PROJECT_BACKGROUND_COLORS.length)];

  if (!projectDetails) return null;

  return (
    <Link
      href={`/${workspaceSlug}/projects/${projectId}/issues`}
      className="group relative flex items-center overflow-hidden gap-8"
    >
      <div
        className={`flex-shrink-0 relative h-[3.375rem] w-[3.375rem] grid place-items-center rounded border border-transparent  ${randomBgColor}`}
      >
        <div className="h-7 w-7 grid place-items-center">
          <ProjectLogo logo={projectDetails.logo_props} className="text-xl" />
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="text-sm text-custom-text-300 group-hover:underline group-hover:text-custom-text-100 overflow-hidden">
          {projectDetails.name}
        </div>
        <div className="mt-2">
          <AvatarGroup>
            {projectDetails.members?.map((member) => (
              <Avatar key={member.member_id} src={member.member__avatar} name={member.member__display_name} />
            ))}
          </AvatarGroup>
        </div>
      </div>
    </Link>
  );
});

export const RecentProjectsWidget: React.FC<WidgetProps> = observer((props) => {
  const { dashboardId, workspaceSlug } = props;
  // store hooks
  const {
    commandPalette: { toggleCreateProjectModal },
  } = useApplication();
  const { setTrackElement } = useEventTracker();
  const {
    membership: { currentWorkspaceRole },
  } = useUser();
  const { fetchWidgetStats, getWidgetStats } = useDashboard();
  // derived values
  const widgetStats = getWidgetStats<TRecentProjectsWidgetResponse>(workspaceSlug, dashboardId, WIDGET_KEY);
  const canCreateProject = currentWorkspaceRole && currentWorkspaceRole >= EUserWorkspaceRoles.MEMBER;

  useEffect(() => {
    fetchWidgetStats(workspaceSlug, dashboardId, {
      widget_key: WIDGET_KEY,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!widgetStats) return <WidgetLoader widgetKey={WIDGET_KEY} />;

  return (
    <div className="bg-custom-background-100 rounded-xl border-[0.5px] border-custom-border-200 w-full py-6 hover:shadow-custom-shadow-4xl duration-300 min-h-96">
      <Link
        href={`/${workspaceSlug}/projects`}
        className="text-lg font-semibold text-custom-text-300 mx-7 hover:underline"
      >
        Recent projects
      </Link>
      <div className="space-y-8 pt-4 px-7 relative overflow-hidden">
        {canCreateProject && (
          <button
            type="button"
            className="relative group flex items-center gap-8 text-left"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTrackElement("Sidebar");
              toggleCreateProjectModal(true);
            }}
          >
            <div className="h-[3.375rem] w-[3.375rem] bg-custom-primary-100/20 text-custom-primary-100 grid place-items-center rounded border border-dashed border-custom-primary-60 flex-shrink-0">
              <Plus className="h-6 w-6" />
            </div>
            <p className="text-sm text-custom-text-300 font-medium group-hover:underline group-hover:text-custom-text-100">
              Create new project
            </p>
          </button>
        )}

        {widgetStats.map((projectId) => (
          <ProjectListItem key={projectId} projectId={projectId} workspaceSlug={workspaceSlug} />
        ))}
      </div>
    </div>
  );
});
