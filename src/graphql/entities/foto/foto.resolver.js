'use strict'

let Jimp = require("jimp");


const fotoResolver = {
    Foto: {
        marker: async (foto, args, { db }) => {
            if (!foto.get('base64')) {
                return '';
            }

            let base = '';
            let buffer = Buffer.from(foto.get('base64').replace(/^data:image\/jpeg;base64,/, ''), 'base64');

            await Jimp.read(buffer).then((marker) => {
                marker.resize(50, 50).getBuffer(Jimp.MIME_JPEG, (err, newMarkerBuffer) => {
                    base = `data:image/jpeg;base64,${newMarkerBuffer.toString('base64')}`;
                })
            })

            return base;
        }
    }
}

module.exports = fotoResolver;