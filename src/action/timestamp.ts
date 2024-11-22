"use server";
import { revalidateTag } from "next/cache";

export async function getTimestamp() {
  const res = await fetch("http://localhost:3000/api/timestamp", {
    cache: "force-cache",
    next: { revalidate: 2, tags: ["timestamp"] },
  });
  return res.json();
}

export async function refreshTimestamp() {
  return revalidateTag("timestamp");
}
