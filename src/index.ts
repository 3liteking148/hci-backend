import logger from 'jet-logger';

import ENV from '@src/common/constants/ENV';
import server from './server';
import { connectToDatabase } from './db/mongo';


/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG = (
  `🚀 Server running at http://localhost:${ENV.Port.toString()}`
);


/******************************************************************************
                                  Run
******************************************************************************/

// Start the server
(async () => {
  try {
    await connectToDatabase();
    server.listen(ENV.Port, err => {
      if (!!err) {
        logger.err(err.message);
      } else {
        logger.info(SERVER_START_MSG);
      }
    });
  } catch (error) {
    logger.err('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
})();

