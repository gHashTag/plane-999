import { IOOmsHeaders } from "./100-ms-headers";

export async function createCodes(id: string) {
  try {
    const response = await fetch(`https://api.100ms.live/v2/room-codes/room/${id}`, {
      headers: IOOmsHeaders,
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Error creating codes:", error);
    throw error;
  }
}
