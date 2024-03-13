import { IUserRootStore } from "@/store/user";
import { IWorkspace } from "@plane/types";
import { headers } from "./headers";

async function createRoom(id: string, name: string, email: string) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-room?secret=${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_SECRET}`;

  const newData = { name, id, email };
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

export { createRoom };
