"use server";

import { cookies } from "next/headers";

export async function setCookie(key, value) {
  try {
    console.log("am the server", value);
    const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
    cookies().set(key, value, { maxAge: thirtyDaysInSeconds });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getCookie(key, value) {
  try {
    console.log("am the server", value);
    let cookie = cookies().get(key);
    return { cookie };
  } catch (error) {
    return { success: false };
  }
}
