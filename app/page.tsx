import { redirect } from "next/navigation";

import { DEFAULT_LOCALE } from "@/content";

export default function IndexPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
