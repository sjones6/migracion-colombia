import { SedesResponse } from "@/lib/apiRequests";
import { Suspense } from "react";
import Horadio from "./Horadio";

export default function Sede({ sede }: { sede: SedesResponse }) {
  return (
    <div>
      <div className="text-2xl">
        <span className="font-bold">{sede.mun.mun_nombre}</span>{" "}
        <span className="text-gray-400">({sede.mun.dep.dep_nombre})</span>
      </div>
      <div className="mb-8">{sede.sedes.se_direccion}</div>
      <Suspense fallback={<div>loading schedule...</div>}>
        <Horadio id={sede.sedes.se_id} />
      </Suspense>
    </div>
  );
}
