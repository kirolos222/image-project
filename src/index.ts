import routes from './routes'
import express from 'express'
const index = express()
const prot = 4000
index.use(routes)
index.listen(prot, () => {
  console.log(`server has startted at http://localhost:${prot}`)
})

export default index
