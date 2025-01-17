import React from "react";
import Detail from "./detail";
import { ServerSideGetWithId } from "@/utilities/apiCalls";
import { cookies } from "next/headers";
import { CRUD_SHOE } from "../../../../../config/endpoints";
import { authorization } from "../../../../../hoc/auth";

interface detailPageProps {
  params: { slug: string };
}

async function getData(slug_url: string, token: string | undefined) {
  authorization(token)
  try {
    const res = [await ServerSideGetWithId(token, CRUD_SHOE, slug_url)];
    const [shoe_details]:any = res;
    return { shoe_details };
  } catch (error: any) {
    console.log(error)
  }
}

const DetailPage = async ({ params }: detailPageProps) => {
  const { slug } = params;
  const token = cookies().get("access_token")?.value;
  const { shoe_details }: any = await getData(slug, token);
  return (
    <div className="">
      <Detail shoeDetails={shoe_details?.data} token={token} slug={slug} />
    </div>
  );
};

export default DetailPage;
