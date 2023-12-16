import cors from 'cors'

export function corsConfig() {
  const whiteList = ['https://myapp.com', 'http://127.0.0.1:5500']
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || whiteList.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Origen no permitido'), false)
      }
    },
  }
  return cors(corsOptions)
}
