import express, { Request, Response } from 'express'
import product_routes from './handlers/product_routes'
import user_routes from './handlers/user_routes'
import order_routes from './handlers/order_routes'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(express.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

product_routes(app)
user_routes(app)
order_routes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
