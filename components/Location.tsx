import { LocationsResponse } from "@/lib/apiRequests";
import { Suspense } from "react";
import Schedule from "./Schedule";
import Link from "next/link";

export default function Sede({ location }: { location: LocationsResponse }) {
  return (
    <div>
      <Link href={`/city/${location.mun.mun_slug}`} className="hover:underline">
        <div className="text-2xl">
          <span className="font-bold">{location.mun.mun_nombre}</span>{" "}
          <span className="text-gray-400">({location.mun.dep.dep_nombre})</span>
        </div>
      </Link>
      <div className="mb-8">{location.sedes.se_direccion}</div>
      <Suspense fallback={<div>loading schedule...</div>}>
        <Schedule id={location.sedes.se_id} />
      </Suspense>
    </div>
  );
}
