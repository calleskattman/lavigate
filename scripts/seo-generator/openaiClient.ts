import "dotenv/config";
import OpenAI from "openai";

/**
 * Gemensam OpenAI-klient för hela SEO-generatorn.
 * API-nyckeln läses från OPENAI_API_KEY i .env.local
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Säkerhetscheck – stoppa direkt om nyckeln saknas
 * (så vi inte felsöker mystiska 401-fel senare)
 */
if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY saknas. Lägg till den i .env.local innan du kör generatorn."
  );
}
