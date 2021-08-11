import express, { Request, Response } from 'express'
//import bodyParser from 'body-parser'
import prod_routes from './handlers/product_routes'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(express.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

prod_routes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
