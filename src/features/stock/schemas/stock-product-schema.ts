import { z } from "zod";

const stockSchema = z.object({});

export type stockSchema = z.infer<typeof stockSchema>;
