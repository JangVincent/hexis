import { aes256Encrypt } from '@commons/utils/cryptoAES256GCM';
import { db } from '@db/config';
import {
  BoothPaymentOption,
  boothSaleTextTable,
  BoothSaleType,
  boothTable,
} from '@db/schema';
import { HttpStatusCode } from 'axios';
import { count, eq } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';

export const BoothService = {
  async getBooths(page: number, size: number) {
    const [totalCount, list] = await Promise.all([
      db.select({ count: count() }).from(boothTable),
      db
        .select()
        .from(boothTable)
        .limit(size)
        .offset((page - 1) * size),
    ]);

    return {
      count: totalCount[0].count,
      list,
    };
  },

  async getBooth(boothId: string) {
    const booth = await db
      .select()
      .from(boothTable)
      .where(eq(boothTable.id, boothId));

    if (!booth) {
      throw new HTTPException(HttpStatusCode.NotFound);
    }

    return booth;
  },

  async createBooth({
    id,
    owner,
    price,
    previewText,
    boothAddress,
    paymentOption,
    paymentTokenAddress,
    saleType,
    blockNumber,
    fullText,
  }: {
    id: string;
    owner: string;
    price: string;
    previewText: string;
    boothAddress: string;
    paymentOption: BoothPaymentOption;
    paymentTokenAddress: string;
    saleType: BoothSaleType;
    blockNumber: string;
    fullText: string;
  }) {
    try {
      const booth = await db.transaction(async tx => {
        const booth = await tx
          .insert(boothTable)
          .values({
            id,
            owner,
            price,
            previewText,
            boothAddress,
            paymentOption,
            paymentTokenAddress,
            saleType,
            blockNumber,
          })
          .returning();

        const boothId = booth[0].id;

        const { iv, encrypted, authTag } = aes256Encrypt(fullText);
        await tx.insert(boothSaleTextTable).values({
          boothId,
          encryptedText: encrypted,
          iv,
          authTag,
        });

        return booth;
      });

      return booth;
    } catch (err) {
      console.error(err);
      throw new HTTPException(HttpStatusCode.InternalServerError);
    }
  },

  async patchBooth({
    ownerAddress,
    boothId,
    previewText,
  }: {
    ownerAddress: string;
    boothId: string;
    previewText: string;
  }) {
    const booth = await db
      .select()
      .from(boothTable)
      .where(eq(boothTable.id, boothId));

    if (!booth) {
      throw new HTTPException(HttpStatusCode.NotFound);
    }

    if (ownerAddress !== booth[0].owner) {
      throw new HTTPException(HttpStatusCode.Forbidden);
    }

    const updatedBooth = await db
      .update(boothTable)
      .set({ previewText })
      .where(eq(boothTable.id, boothId))
      .returning();

    return updatedBooth;
  },
};
