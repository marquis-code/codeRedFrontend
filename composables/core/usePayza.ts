// Import any necessary types
import { ref } from 'vue';

// Define the composable using TypeScript
export default function usePayza() {
  // Payza's payment URL
  const payzaUrl = 'https://secure.payza.com/checkout';

  // Create a function to generate the payment form and submit it
  const createPaymentForm = (amount: number, currency: string, description: string): void => {
    const form = document.createElement('form');
    form.setAttribute('action', payzaUrl);
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_self');

    // Prepare required fields for Payza payment
    const fields: Record<string, string> = {
      ap_merchant: 'your-merchant-email@example.com',
      ap_amount: amount.toString(),
      ap_currency: currency,
      ap_description: description,
      ap_returnurl: 'http://your-app.com/success',
      ap_cancelurl: 'http://your-app.com/cancel',
      ap_ipnurl: 'http://your-app.com/ipn-handler'
    };

    // Create hidden form fields for each parameter
    Object.keys(fields).forEach((key) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', fields[key]);
      form.appendChild(input);
    });

    // Append the form to the document and submit it
    document.body.appendChild(form);
    form.submit();
  };

  return {
    createPaymentForm
  };
}
