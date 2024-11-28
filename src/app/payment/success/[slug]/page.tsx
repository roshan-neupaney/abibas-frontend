import { ServerSideGet } from "@/utilities/apiCalls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getData(token: string, id: string, data: any) {
  try {
    await ServerSideGet(token, `/esewa/initialpayment/${id}?data=${data}`);
  } catch (error) {
    console.error(error);
  }
}

const SuccessPage = async ({ searchParams, params }: any) => {
  const { data } = searchParams;
  const { slug } = params;
  const token = cookies().get("access_token")?.value || "";
  await getData(token, slug, data);
  redirect(`/payment/${slug}`)
};

export default SuccessPage;
