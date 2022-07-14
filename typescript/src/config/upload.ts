import crypto from 'crypto'
import multer from 'multer'
import { resolve } from 'path'

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          // utilizando a lib crypto do node para criar um hash randomico hexadecimal de 16 bytes
          const FileHash = crypto.randomBytes(16).toString('hex')

          // Conctenando o FileHash com o nome original do file
          const filename = `${FileHash}-${file.originalname}`

          return callback(null, filename)
        },
      }),
    }
  },
}
