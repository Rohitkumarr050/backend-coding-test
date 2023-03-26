const app = require('./src/app')
const logger = require('./src/utils/logger')

require('./src/config/db')

const port = 8010

app.listen(port, () => logger.info(`App started and listening on port ${port}`))
