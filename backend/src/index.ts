import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { config } from './config.js'
import { ApiError, errorHandler } from './errors.js'
import { rateLimit } from './rate-limit.js'
import { waitlistRouter } from './routes/waitlist.js'
import { razorpayRouter } from './routes/razorpay.js'

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', config.TRUST_PROXY)
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 86400,
    optionsSuccessStatus: 204
  })
)
app.use(rateLimit({ keyPrefix: 'public', max: 100, windowMs: 60 * 1000 }))
app.use(express.json({ limit: '10kb' }))

app.get('/health', (_request, response) => {
  response.json({
    success: true,
    status: 'ok',
    service: '0to1-backend'
  })
})

app.use('/api/waitlist', waitlistRouter)
app.use('/api/razorpay', razorpayRouter)

app.use((_request, _response, next) => {
  next(new ApiError(404, 'NOT_FOUND', 'Not found.'))
})

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`0to1 backend listening on http://localhost:${config.PORT}`)
})
