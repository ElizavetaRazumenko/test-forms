import type { LoanFormValues } from "../../types/form";

export const hasAddressAndWork = (values: LoanFormValues): boolean =>
    Boolean(
      values.phone &&
        values.firstName &&
        values.lastName &&
        values.gender &&
        values.workPlace &&
        values.address,
    );