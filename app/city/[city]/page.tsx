import Location from "@/components/Location";
import { getLocations } from "@/lib/apiRequests";
import Link from "next/link";

export default async function City({ params }: { params: { city: string } }) {
    const locations = await getLocations();

    const location = locations.find(loc => loc.mun.mun_slug === params.city);

    if (!location) {
        return <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-2xl">Not found</h1>
                <div className="">Please choose a valid location.</div>
            </div>
            <ul>
                {locations.map(loc => <li key={loc.mun.mun_id}>
                    <Link href={`/city/${loc.mun.mun_slug}`} className="hover:underline">
                        {loc.mun.mun_nombre} ({loc.mun.dep.dep_nombre})
                    </Link>
                </li>)}
            </ul>
        </div>
    }

    return <Location location={location}></Location>
}