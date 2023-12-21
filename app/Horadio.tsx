import { getSchedule } from "@/lib/apiRequests";
import DisponibleCitas from "./DisponsibleCitas";

const extractAvailableAppointmentsCount = (text: string): number => {
  const val = parseInt(text.replace(/^\((\d+)\).*$/, "$1"), 10);
  return isNaN(val) ? 0 : val;
};

export default async function Sede({ id }: { id: string }) {
  const tramites = await getSchedule(id);

  const schedule = tramites.map((tramite) => {
    return {
      id: tramite.tra_id,
      nombre: tramite.tra_nombre,
      total: tramite.disponibles.reduce((total, disponsible) => {
        return total + extractAvailableAppointmentsCount(disponsible.title);
      }, 0),
      disponibles: tramite.disponibles.map((disponsible) => {
        return {
          ...disponsible,
          available: extractAvailableAppointmentsCount(disponsible.title),
        };
      }),
    };
  });
  return (
    <div>
      <ul className="flex flex-col gap-4">
        {schedule.map((tramite) => (
          <li className="w-full" key={tramite.id}>
            <DisponibleCitas
              name={tramite.nombre}
              disponibles={tramite.disponibles}
              total={tramite.total}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
