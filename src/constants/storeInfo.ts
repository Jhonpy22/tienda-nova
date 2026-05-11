export const STORE_LOCATION = 'Nicoya, Guanacaste, cerca del parque central de Nicoya'

export const STORE_HOURS = {
    weekdays: 'lunes a viernes de 9:00 a. m. a 7:00 p. m.',
    saturday: 'sábados de 8:00 a. m. a 5:00 p. m.',
    afterHours: 'Fuera de ese horario, podés dejar tu consulta y el equipo la revisará cuando vuelva la atención.',
} as const

export const STORE_CONTACT_LINKS = {
    whatsapp: {
        label: 'WhatsApp',
        phone: '6295-3009',
        url: 'https://wa.me/50662953009',
    },
    instagram: {
        label: 'Instagram',
        url: 'https://www.instagram.com/',
    },
    facebook: {
        label: 'Facebook',
        url: 'https://www.facebook.com/',
    },
} as const

export const WARRANTY_POLICY = {
    defectCoverage: '1 mes de garantía por defectos',
    reviewRequirement: 'Un empleado debe validar el caso antes de aprobar cambio, devolución o garantía.',
    photoRequirement: 'Si es por garantía, enviá fotos claras del problema para que el equipo revise si aplica.',
    refundRequirement: 'La devolución del dinero solo puede aprobarse después de revisar el caso.',
} as const

export const STORE_SUPPORT_RESPONSES = {
    contactGeneral:
        'Podés contactarnos por estos medios:\n' +
        `WhatsApp: ${STORE_CONTACT_LINKS.whatsapp.phone}\n` +
        `Instagram: ${STORE_CONTACT_LINKS.instagram.url}\n` +
        `Facebook: ${STORE_CONTACT_LINKS.facebook.url}\n` +
        'Si es por garantía, enviá fotos claras del problema para que el equipo revise si aplica.',
    whatsapp:
        `Podés escribirnos por WhatsApp al ${STORE_CONTACT_LINKS.whatsapp.phone}:\n` +
        `${STORE_CONTACT_LINKS.whatsapp.url}\n` +
        'Si es por garantía o devolución, enviá fotos claras del problema.',
    instagram:
        `Podés contactarnos por Instagram:\n${STORE_CONTACT_LINKS.instagram.url}\n` +
        'Si es por garantía, enviá fotos claras del problema para que el equipo revise si aplica.',
    facebook:
        `Podés contactarnos por Facebook:\n${STORE_CONTACT_LINKS.facebook.url}\n` +
        'Si es por garantía, enviá fotos claras del problema para que el equipo revise si aplica.',
    hours:
        `Nuestro horario es de ${STORE_HOURS.weekdays} y ${STORE_HOURS.saturday}\n` +
        STORE_HOURS.afterHours,
    warranty:
        `Los productos cuentan con ${WARRANTY_POLICY.defectCoverage}.\n` +
        'Para revisar si aplica, podés acercarte a la tienda o enviar fotos por WhatsApp, Instagram o Facebook.\n' +
        'Un empleado debe validar el caso antes de aprobar cambio o devolución.',
    refund:
        `${WARRANTY_POLICY.refundRequirement}\n` +
        'Podés enviar fotos del problema por WhatsApp, Instagram o Facebook, o acercarte a la tienda.\n' +
        'Un empleado confirmará si aplica según la garantía.',
    location:
        `Estamos en ${STORE_LOCATION}.\n` +
        'Por ahora realizamos envíos dentro de Guanacaste.\n' +
        'Si querés, puedo ayudarte a revisar productos del catálogo.',
} as const
