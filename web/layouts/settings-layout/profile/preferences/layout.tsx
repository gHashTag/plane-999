import { FC, ReactNode } from "react";
// layout
import { SidebarHamburgerToggle } from "components/core/sidebar/sidebar-menu-hamburger-toggle";
import { useApplication } from "hooks/store";
import { ProfileSettingsLayout } from "layouts/settings-layout";
import { ProfilePreferenceSettingsSidebar } from "./sidebar";
import { PreferencesMobileTabs } from "components/profile/preferences/preferences-mobile-tabs";

interface IProfilePreferenceSettingsLayout {
  children: ReactNode;
  header?: ReactNode;
}

export const ProfilePreferenceSettingsLayout: FC<IProfilePreferenceSettingsLayout> = (props) => {
  const { children, header } = props;
  const { theme: themeStore } = useApplication();

  return (
    <ProfileSettingsLayout header={
      <div className="md:hidden flex flex-shrink-0 gap-4 items-center justify-start border-b border-custom-border-200 p-4">
        <SidebarHamburgerToggle onClick={() => themeStore.toggleSidebar()} />
      </div>
    }>
      <div className="relative flex h-full w-full overflow-hidden">
        <ProfilePreferenceSettingsSidebar />
        <main className="relative flex h-full w-full flex-col overflow-hidden bg-custom-background-100">
          {header}
          <PreferencesMobileTabs />
          <div className="h-full w-full overflow-x-hidden overflow-y-scroll vertical-scrollbar scrollbar-md">
            {children}
          </div>
        </main>
      </div>
    </ProfileSettingsLayout>
  );
};
