const baseUrl = 'https://agendamigracol.naturasoftware.com';

async function get<ResponseData>(url: string): Promise<ResponseData> {
    const res = await fetch(`${baseUrl}${url}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        next: { revalidate: 3600 }
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

async function post<RequestData, ResponseData>(url: string, body: RequestData): Promise<ResponseData> {
    const res = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(body),
        next: { revalidate: 3600 }
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

type Municipio = {
    mun_id: string;
    mun_nombre: string;
    mun_estado: string;
    dep_id: string;
}

type Departamento = {
    dep_id: string;
    dep_nombre: string;
    dep_estado: string;
    municipios: Municipio[]
};

type MunicipioResponse = Municipio & {
    dep: Departamento;
};
type Sedes = {
    se_id: string
    se_nombre: string
    se_direccion: string
    se_cantidad_modulos: string
    se_duracion_cita: string
    se_fecha_creacion: string
    se_fecha_duracion_inicio: string
    se_fecha_duracion_fin: string
    se_horas_no_habil: string
    se_estado: string
    dep_id: string
    mun_id: string
}

export type SedesResponse = {
    sedes: Sedes;
    mun: MunicipioResponse;
}

type Tramite = {
    tra_id: string;
    tra_nombre: string;
    tra_estado: string;
}

type CitasDisponible = {
    title: string;
    date: string;
}

export const getSedes = async (): Promise<SedesResponse[]> => {
    try {
        const departamentos = await get<Departamento[]>('/backend/api/v1/cita/obtener_ubicacion_sedes');
        const municipios = departamentos.flatMap(dep => dep.municipios.map(mun => ({
            ...mun,
            dep
        })));

        const all = await Promise.all(municipios.map(async mun => {
            try {
                const sedes = await post<{
                    dep_id: string;
                    mun_id: string;
                }, Sedes[]>('/backend/api/v1/cita/obtener_sedes', { dep_id: mun.dep_id, mun_id: mun.mun_id });
                return sedes.flatMap(s => ({
                    sedes: s,
                    mun
                }));
            } catch (err) {
                console.error('error fetching sedes', err, { dep_id: mun.dep_id, mun_id: mun.mun_id });
                return []
            }
        }));

        return all.flatMap(s => s).sort((a, b) => {
            return a.mun.mun_nombre < b.mun.mun_nombre ? -1 : 1;
        });
    } catch (err) {
        console.error('error fetching ubicaciones', err);
        return [];
    }
}

export const getSchedule = async (se_id: string): Promise<Array<Tramite & {
    error?: string;
    disponibles: CitasDisponible[]
}>> => {
    try {
        const tramites = await post<{
            se_id: string;
        }, Tramite[]>('/backend/api/v1/cita/obtener_tramites', { se_id });

        return await Promise.all(tramites.map(async tramite => {
            try {
                const disponibles = await post<{
                    se_id: string;
                    tra_id: string;
                }, CitasDisponible[]>('/backend/api/v1/cita/ver_agendas_disponibles', { se_id, tra_id: tramite.tra_id });
                return {
                    ...tramite,
                    disponibles
                };
            } catch (err) {
                console.error(err);
                return {
                    ...tramite,
                    error: 'failed to fetch',
                    disponibles: []
                }
            }
        }));
    } catch (err) {
        console.error('error fetching tramites', err, { se_id });
        return [];
    }
}