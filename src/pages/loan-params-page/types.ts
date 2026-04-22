import type { loanParamsSchema } from "../../schema/form";
import type { z } from "zod";

export type LoanParamsValues = z.infer<typeof loanParamsSchema>;