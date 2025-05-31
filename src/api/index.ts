import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

import express from 'express';
import payload from 'payload';
import { seed } from '../seed';

const app = express();

app.get('/', (_, res) => {
  res.redirect('/admin');
});

let initialized = false;

const start = async () => {
  if (!initialized) {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);

        if (process.env.PAYLOAD_SEED === 'true') {
          payload.logger.info('---- SEEDING DATABASE ----');
          await seed(payload);
        }
      },
    });

    initialized = true;
  }
};

export default async (req, res) => {
  await start();
  app(req, res); // Pass request to Express app
};
