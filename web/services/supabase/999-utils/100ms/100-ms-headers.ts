if (!process.env.NEXT_PUBLIC_100MS) {
  throw new Error("NEXT_PUBLIC_100MS is not set");
}

export const IOOmsHeaders = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_100MS}`,
  "Content-Type": "application/json",
};
