import { IUserRootStore } from "@/store/user";
import { IWorkspace } from "@plane/types";
import { headers } from "./headers";

async function createRoom(formData: IWorkspace, id: string) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-room?secret=${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_SECRET}`;
  console.log(url, "url");

  const newData = { name: formData.name, id };
  console.log(newData, "newData");
  // const body = JSON.stringify(newData);
  // console.log(body, "body");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    console.log(response, "response");
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }

    const data = await response.json();
    console.log(data, "data");
    return data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export { createRoom };
