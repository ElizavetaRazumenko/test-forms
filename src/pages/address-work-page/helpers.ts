import type { LoanFormValues } from "../../types/form";

export const hasPersonalData = (values: LoanFormValues): boolean =>
    Boolean(values.phone && values.firstName && values.lastName && values.gender);