import { IUserRootStore } from "@/store/user";
import { IWorkspace } from "@plane/types";
import { headers } from "./headers";
import { supabaseClient } from "./supabase";
import { IOOmsHeaders } from "./100-ms-headers";
import { createCodes } from "./create-codes";

async function createRoom(formData: IWorkspace, email: string) {
  try {
    const roomData = {
      name: `${email}-${formData.name}`,
      description: `Room for ${email}-${formData.name}`,
      template_id: "65efdfab48b3dd31b94ff0dc",
    };
    console.log("roomData", roomData);
    const roomResponse = await fetch("https://api.100ms.live/v2/rooms", {
      method: "POST",
      body: JSON.stringify(roomData),
      headers: { ...IOOmsHeaders, ...headers },
    });
    console.log("roomResponse", roomResponse);
    if (!roomResponse.ok) {
      throw new Error(`Failed to create room: ${roomResponse.statusText}`);
    }
    const room = await roomResponse.json();
    const codesResponse = await createCodes(room.id);
    if (!codesResponse.ok) {
      throw new Error(`Failed to create codes: ${codesResponse.statusText}`);
    }
    const codes = await codesResponse.json();
    const workspace = { ...room, codes };
    console.log(workspace, "workspace");
    const { error } = await supabaseClient.from("workspaces").insert([workspace]);
    if (error) {
      throw new Error(`Error saving to Supabase: ${error.message}`);
    }
    return new Response(JSON.stringify(workspace), {
      status: 200,
      headers: { ...IOOmsHeaders },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { ...IOOmsHeaders },
    });
  }
}

export { createRoom };
