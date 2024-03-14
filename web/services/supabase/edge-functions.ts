import { IUserRootStore } from "@/store/user";
import { IWorkspace } from "@plane/types";
import { headers } from "./headers";
import { getUserFromSupabase } from "./auth";

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

export async function getAllRecordings(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-all-recordings?secret=${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_SECRET}`;
  const supabaseUser = await getUserFromSupabase();

  const newData = {
    user_id: supabaseUser[0].user_id,
    slug,
    email: supabaseUser[0].email,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export { createRoom };
