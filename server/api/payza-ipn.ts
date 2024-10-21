import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Read incoming IPN data

  // Verify the IPN by sending the data back to Payza
  const response = await $fetch<string>('https://secure.payza.com/ipn2.ashx', {
    method: 'POST',
    body
  });

  if (response === 'VERIFIED') {
    // Process the payment, e.g., update order status
    console.log('Payment verified:', body);
  } else {
    // Handle IPN verification failure
    console.error('Payment verification failed');
  }

  return { status: 'ok' };
});
