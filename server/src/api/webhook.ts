import { Request, Response } from 'express';
import stripeAPI from '../stripe';
import httpStatus from 'http-status';
import { ICustomRequest } from '..';
import { envStripe } from '../config/config';

const webHookHandlers: { [key: string]: (data: any) => void } = {
  'checkout.session.completed': (data) => {
    console.log('Checkout completed successfully', data);
    // other business logic
  },

  'payment_intent.succeeded': (data) => {
    console.log('Payment succeeded', data);
  },
  'payment_intent.payment_failed': (data) => {
    console.log('Payment Failed', data);
  },
};

export const webhook = (req: Request, res: Response) => {
  const request = req as ICustomRequest;

  const sig = request.headers['stripe-signature'] as string;
  let event;
  try {
    if (!request['rawBody']) {
      return res.status(httpStatus.BAD_REQUEST).send('Missing raw body');
    }

    event = stripeAPI.webhooks.constructEvent(
      request['rawBody'] as string | Buffer,
      sig,
      envStripe.webhookSecret
    );
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(`Webhook error: ${error}`);
  }

  if (webHookHandlers[event.type]) {
    webHookHandlers[event.type](event.data.object);
  }
};
