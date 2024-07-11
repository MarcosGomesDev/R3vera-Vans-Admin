import { AddCustomerForm } from "@/app/(withoutLayout)/customers/new/components/AddForm/formSchema";
import { AuthService } from "./auth.service";

export class CustomerService {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  async createCustomer(input: AddCustomerForm) {
    const response = await fetch(`${process.env.BASE_URL}/customers/create`, {
      method: "POST",
      body: JSON.stringify({
        name: input.name,
        authorized: input.authorized,
        sounds: input.sounds,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();

      return { error };
    }

    const data = await response.json();

    return { data };
  }
}

export const CustomerServiceFactory = {
  create: () => new CustomerService(new AuthService()),
};
