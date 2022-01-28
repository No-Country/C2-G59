
// Convierte el ID en un formato de factura de 10 digitos
const setIdInInvoiceFormat = (id) => {
    let invoice = `${id}`;

    for (let i = 0; invoice.length < 8; i++) {
        invoice = '0' + invoice;
    }

    return invoice;
};

module.exports = {
    setIdInInvoiceFormat,
};