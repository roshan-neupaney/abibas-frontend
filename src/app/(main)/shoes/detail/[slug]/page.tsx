import React from "react";
import Detail from "./detail";
import { ServerSideGetWithId } from "@/utilities/apiCalls";
import { cookies } from "next/headers";
import {
  CRUD_SHOE,
  HYBRID_RECOMMENDATION,
} from "../../../../../../config/endpoints";

interface detailPageProps {
  params: { slug: string };
}

async function getData(slug_url: string) {
  try {
    const res = [
      await ServerSideGetWithId(undefined, CRUD_SHOE, slug_url),
      await ServerSideGetWithId(undefined, HYBRID_RECOMMENDATION, slug_url ),
    ];
    const [shoe_details, hybrid_recommends]: any = res;
    return { shoe_details, hybrid_recommends };
  } catch (error: any) {
    console.log(error);
  }
}

const DetailPage = async ({ params }: detailPageProps) => {
  const { slug } = params;
  const token = cookies().get("access_token")?.value;
  const { shoe_details, hybrid_recommends }: any = await getData(slug);
  return (
    <div className="">
      <div className="shoe_id hidden">{shoe_details?.data?.id}</div>
      <Detail shoeDetails={shoe_details?.data} token={token} slug={slug} recommends={hybrid_recommends?.data} />
    </div>
  );
};

export default DetailPage;
