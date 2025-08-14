import { HttpStatusCode } from 'axios';
import { gql, request } from 'graphql-request';
import { HTTPException } from 'hono/http-exception';
import { BoothCreated } from './types';

const URL = process.env.SUB_GRAPH_URL;

export const SubGraphService = {
  async getCreatedBoothsByBoothId(boothId: string): Promise<BoothCreated> {
    const query = gql`
      {
        boothCreated(
          id: "${boothId}"
        ) {
          id
          blockNumber
          blockTimestamp
          boothAddress
          owner
          paymentOption
          paymentTokenAddress
          previewText
          price
          saleType
          transactionHash
        }
      }
    `;

    const headers = {
      Authorization: `Bearer ${process.env.SUB_GRAPH_API_KEY}`,
    };

    try {
      const data = await request(URL, query, {}, headers);
      return data['boothCreated'] as BoothCreated;
    } catch (error) {
      console.error(error);
      throw new HTTPException(HttpStatusCode.InternalServerError, {
        message: 'Failed to get created booth from Subgraph',
      });
    }
  },
};
