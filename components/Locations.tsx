import { getLocations } from "@/lib/apiRequests";
import Location from "./Location";

export default async function Locations() {
  const locations = await getLocations();
  return (
    <ul className="max-w-5xl mx-auto">
      {locations.map((location) => (
        <li
          key={location.sedes.se_id}
          className="mb-3 border-b-2 border-gray-700 py-12 px-8 rounded-sm"
        >
          <Location location={location} />
        </li>
      ))}
    </ul>
  );
}
