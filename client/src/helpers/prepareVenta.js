import moment from 'moment'


export const prepareVentas = ( ventas = [] ) => {

    return ventas.map(
        (e) => ({
            ...e,
            fecha: moment( e.fecha ).toDate(),
        })
    );

}