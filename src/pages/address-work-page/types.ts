import type { addressWorkSchema } from "../../schema/form";
import type { z } from "zod";

export type AddressWorkValues = z.infer<typeof addressWorkSchema>;