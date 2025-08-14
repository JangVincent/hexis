import { aes256Encrypt } from '@commons/utils/cryptoAES256GCM';
import { db } from '@db/config';
import { boothSaleTextTable, boothTable } from '@db/schema';
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
    owner,
    sampleText,
    blockNumber,
    fullText,
  }: {
    owner: string;
    sampleText: string;
    blockNumber: string;
    fullText: string;
  }) {
    try {
      const booth = await db.transaction(async tx => {
        const booth = await tx
          .insert(boothTable)
          .values({
            owner,
            sampleText,
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
    sampleText,
  }: {
    ownerAddress: string;
    boothId: string;
    sampleText: string;
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
      .set({ sampleText })
      .where(eq(boothTable.id, boothId))
      .returning();

    return updatedBooth;
  },
};
