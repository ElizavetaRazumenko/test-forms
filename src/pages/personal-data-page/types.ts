import { z } from "zod";
import { personalDataSchema } from "../../schema/form";

export type PersonalDataValues = z.infer<typeof personalDataSchema>;