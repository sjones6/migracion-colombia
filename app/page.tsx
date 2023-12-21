import { Suspense } from "react";
import Locations from "../components/Locations";
import { LoadingSidebar } from "@/lib/loading";

export default async function Home() {
  return (
    <Suspense fallback={<LoadingSidebar />}>
      <Locations />
    </Suspense>
  );
}
