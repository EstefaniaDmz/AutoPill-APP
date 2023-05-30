export interface Dose {
    id?: string;
    medicamento?: string;
    cantidadTomar?: number;
    cuantosDias?: number;
    cadaHora?: number;
    fechaPrimeraToma?: Date;
    fechaUltimaToma?: Date;
    recipiente?: string;
    idReceta?: string;
    estatus?: boolean;
};