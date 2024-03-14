import { useState, useEffect } from "react";
import { IPasswordSignInData } from "@plane/types";

import { UserService } from "services/user.service";
import { supabaseClient } from "@/services/supabase/supabase";
import { useWorkspace } from "@/hooks/store/use-workspace";
import { getUserFromSupabase } from "./auth";

const userService = new UserService();

const useWorkspaces = () => {
  const [code, setCode] = useState(null);
  const [room_id, setRoomId] = useState(null);
  const [role, setRole] = useState("host");
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const fetchRoomId = async () => {
      const supabaseUser = await getUserFromSupabase();
      const response = await userService.currentUser();

      try {
        const { data, error } = await supabaseClient
          .from("workspaces")
          .select("*")
          .eq("user_id", supabaseUser[0].user_id)
          .eq("name", currentWorkspace?.slug)
          .eq("email", response.email);

        if (error) {
          console.log("error", error);
          throw error;
        }

        if (data) {
          const code100ms = data[0].codes.data[0].code;
          const roomId100ms = data[0].codes.data[0].room_id;
          const roleName = data[0].codes.data[0].role;
          setCode(code100ms);
          setRole(roleName);
          setRoomId(roomId100ms);
        }
      } catch (error: any) {
        console.error(error.response?.data ?? error);
      }
    };

    fetchRoomId();
  }, [currentWorkspace]);

  return { code, role, room_id, currentWorkspace };
};

export { useWorkspaces };
