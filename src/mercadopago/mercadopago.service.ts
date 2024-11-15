import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MercadoPagoConfig, Preference } from 'mercadopago';
require('dotenv').config();

const MERCADO_PAGO_TOKEN = process.env.ACCESS_TOKEN;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generatePaymentLink(): Promise<any> {
    const client = new MercadoPagoConfig({
      accessToken: MERCADO_PAGO_TOKEN,
    });

    const preference = new Preference(client);
    return await preference.create({
      body: {
        items: [
          {
            id: '1',
            title: 'Novo pagamento',
            quantity: 1,
            unit_price: 1,
          },
        ],
      },
    });
  }

  async getPayments(): Promise<any> {
    return await axios.get(
      'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=ID_REF&range=date_created&begin_date=NOW-30DAYS&end_date=NOW&store_id=47792478&pos_id=58930090',
      {
        headers: {
          Authorization: `Bearer ${MERCADO_PAGO_TOKEN}`,
          ContentType: 'application/json',
        },
      },
    );
  }
}
