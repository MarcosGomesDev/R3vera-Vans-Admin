"use server";

import { AddCustomerForm } from "@/app/(withoutLayout)/customers/new/components/AddForm/formSchema";
import { CustomerServiceFactory } from "@/services/customer.service";

export async function createCustomer(form: AddCustomerForm) {
  const customerService = CustomerServiceFactory.create();

  const response = await customerService.createCustomer(form);

  if (response.error) {
    return { error: response.error };
  }

  return { data: response.data };
}
