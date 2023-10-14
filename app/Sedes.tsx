import { getSedes } from '@/lib/apiRequests'
import Sede from './Sede';

export default async function Sedes() {
    const sedes = await getSedes();
    return (
        <ul className='max-w-5xl mx-auto'>
            {sedes.map(sedes => <li key={sedes.sedes.se_id} className='mb-3 border-b-2 border-gray-700 py-12 px-8 rounded-sm'>
                <Sede sede={sedes} />
            </li>)}
        </ul>
    )
}
