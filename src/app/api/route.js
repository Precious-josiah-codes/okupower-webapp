import { NextResponse } from "next/server";

export async function POST(request) {
  const data = request.json();
  console.log(data, "the data");

  return NextResponse.json({
    data,
  });
}
