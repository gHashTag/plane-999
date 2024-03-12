import { useState, useEffect, ReactElement } from "react";
import { observer } from "mobx-react";
// layouts
import { AppLayout } from "layouts/app-layout";
import { WorkspaceCreateMeetHeader } from "components/headers";
// types
import { NextPageWithLayout } from "lib/types";

import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { useRouter } from "next/router";
import { useUser } from "hooks/store";
import dynamic from "next/dynamic";

const HMSPrebuilt = dynamic(() => import("@100mslive/roomkit-react").then((mod) => mod.HMSPrebuilt), { ssr: false });

const Rooms: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { currentUser } = useUser();
  console.log(currentUser, "currentUser");
  const { roomId } = router.query as { roomId: string };

  const [token, setToken] = useState<string | undefined>(undefined);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (typeof roomId === "string") {
          const authToken = await hmsActions.getAuthTokenByRoomCode({
            roomCode: roomId,
          });
          setToken(authToken);
        } else {
          throw new Error("roomCode is not a string");
        }
      } catch (error) {
        console.error("Ошибка при получении токена: ", error);
      }
    };

    fetchToken();
  }, [hmsActions, roomId]);

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
          roomCode={roomId}
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
