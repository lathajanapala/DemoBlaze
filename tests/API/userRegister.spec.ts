import { test, expect } from '@playwright/test';

const baseUrl = 'https://goal-tracker-api.onrender.com/api/v1';
let sharedEmail: string;

test.beforeAll(async ({ request }) => {
  sharedEmail = `user_${Date.now()}@example.com`;

  const response = await request.post(`${baseUrl}/auth/register`, {
    data: {
      name: 'Pushpa',
      email: sharedEmail,
      password: 'Password123!'
    }
  });

  expect(response.status()).toBe(201);
});

test('If the email address is already taken, you will not be able to register a new user.', async ({ request }) => {
  const response = await request.post(`${baseUrl}/auth/register`, {
    data: {
      name: 'Pushpa',
      email: sharedEmail,
      password: 'Password123!'
    }
  });

  expect(response.status()).toBe(400);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('msg');
  expect(responseBody.msg).toContain('already');
});
test("If one of the property value not provided it should give 'Please provide a name, email address and password'",async({request})=>{
  const response = await request .post(`${baseUrl}/auth/register`,{
    data:{
        
    }
  })
  expect(response.status()).toBe(400);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('msg');
  expect(responseBody.msg).toContain('Please provide a name, email address and password')
})

