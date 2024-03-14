import { useState, useEffect, ReactElement } from "react";
import { observer } from "mobx-react";
// layouts
import { AppLayout } from "layouts/app-layout";
import { WorkspaceCreateMeetHeader } from "components/headers";
// types
import { NextPageWithLayout } from "lib/types";

import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useUser } from "hooks/store";

const HMSPrebuilt = dynamic(() => import("@100mslive/roomkit-react").then((mod) => mod.HMSPrebuilt), { ssr: false });

const Rooms: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { currentUser } = useUser();
  const { code } = router.query as { code: string };

  const [token, setToken] = useState<string | undefined>(undefined);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (typeof code === "string") {
          const authToken = await hmsActions.getAuthTokenByRoomCode({
            roomCode: code,
          });
          setToken(authToken);
        } else {
          throw new Error("code is not a string");
        }
      } catch (error) {
        console.error("Ошибка при получении токена: ", error);
      }
    };

    fetchToken();
  }, [hmsActions, code]);

  useEffect(() => {
    const handleUnload = async () => {
      if (isConnected) {
        try {
          await hmsActions.leave();
        } catch (error) {
          console.error("Ошибка при попытке покинуть комнату: ", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [hmsActions, isConnected]);

  return (
    <>
      {token && (
        <HMSPrebuilt
          authToken={token}
          roomCode={code}
          options={{ userName: currentUser?.first_name + " " + currentUser?.last_name }}
        />
      )}
    </>
  );
});

Rooms.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout header={<WorkspaceCreateMeetHeader />}>{page}</AppLayout>;
};

export default Rooms;
