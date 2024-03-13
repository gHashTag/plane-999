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
fetch("https://api.100ms.live/v2/recordings?room_id=65e5d8273e7524ee22fc0423", {
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTAwNjA4MDYsImV4cCI6MTcxMDY2NTYwNiwianRpIjoiYzY5OGNkMzctNzA4YS00OGY5LTlmYzMtOTE3Y2U3ZTM1NWNiIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3MTAwNjA4MDYsImFjY2Vzc19rZXkiOiI2NWU0NGYwNzFkNWZkNzQ5Y2QxZjIwNDMifQ.4vfQvA6EAC1Ll4G1AFSPfHdheMaqK-GpHo4eDTUq48Q",
  },
});
export async function getAllRecordings(room_id: string) {
  try {
    const response = await fetch(`https://api.100ms.live/v2/recordings?room_id=${room_id}`, {
      headers: IOOmsHeaders,
      method: "GET",
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
