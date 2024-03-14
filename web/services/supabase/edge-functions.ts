import { IUserRootStore } from "@/store/user";
import { IWorkspace } from "@plane/types";
import { headers } from "./headers";
import { getUserFromSupabase } from "./auth";
import { supabaseClient } from "@/services/supabase/supabase";

async function createRoom(id: string, slug: string, email: string) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-room?secret=${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_SECRET}`;
  const supabaseUser = await getUserFromSupabase();
  const newData = { id, slug, email, user_id: supabaseUser[0].user_id };
  console.log(newData, "newData");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    console.log(response, "response");

    const data = await response.json();
    console.log(data, "data");
    return data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export async function getAllRecordings(room_id: string, slug: string) {
  try {
    const { data } = await supabaseClient.from("room_assets").select("*").eq("room_id", room_id).eq("room_name", slug);

    return data;
  } catch (error) {
    console.error("Error get getAllRecordings", error);
    throw error;
  }
}

export { createRoom };
