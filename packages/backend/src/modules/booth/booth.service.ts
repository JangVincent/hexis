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
      const booth = await db
        .insert(boothTable)
        .values({
          owner,
          sampleText,
          blockNumber,
        })
        .returning();

      const boothId = booth[0].id;

      // TODO : encryt fullText use AES-256-GCM
      await db.insert(boothSaleTextTable).values({
        boothId,
        text: fullText,
      });

      return booth;
    } catch (err) {
      console.error(err);
      throw new HTTPException(HttpStatusCode.InternalServerError);
    }
  },
};
