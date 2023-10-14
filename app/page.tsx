import { Suspense } from "react";
import Sedes from "./Sedes";
import { LoadingSidebar } from "@/lib/loading";

export default async function Home() {
  return (
    <Suspense fallback={<LoadingSidebar />}>
      <Sedes />
    </Suspense>
  )
}
