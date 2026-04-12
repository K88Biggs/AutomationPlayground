// API tests for JSONPlaceholder posts endpoint
// Demonstrates testing REST API endpoints with Playwright
// Uses Playwright's request context instead of browser automation
// Run with: npm run test:api

const { test, expect } = require('@playwright/test');

// Test suite for JSONPlaceholder API
test.describe('JSONPlaceholder API Tests', () => {
  // Base URL for all API calls in this suite
  const baseURL = 'https://jsonplaceholder.typicode.com';

  // Test GET single post endpoint
  test('GET /posts/1 - should return a single post', async ({ request }) => {
    // request is Playwright's API testing context (not a browser page)

    // Make GET request to retrieve post with ID 1
    const response = await request.get(`${baseURL}/posts/1`);

    // Verify HTTP status code is 200 (OK)
    expect(response.status()).toBe(200);

    // Verify response is considered successful
    expect(response.ok()).toBeTruthy();

    // Parse JSON response body
    const body = await response.json();

    // Verify response structure contains expected properties
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('id', 1); // Specific ID we're requesting
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');

    // Verify data types of response properties
    expect(typeof body.userId).toBe('number');
    expect(typeof body.title).toBe('string');
    expect(typeof body.body).toBe('string');
  });

  // Test GET all posts endpoint
  test('GET /posts - should return a list of posts', async ({ request }) => {
    // Make GET request to retrieve all posts
    const response = await request.get(`${baseURL}/posts`);

    // Verify successful response
    expect(response.status()).toBe(200);

    // Parse response as JSON array
    const body = await response.json();

    // Verify response is an array
    expect(Array.isArray(body)).toBe(true);

    // Verify array is not empty
    expect(body.length).toBeGreaterThan(0);

    // Validate structure of first item in array
    expect(body[0]).toHaveProperty('userId');
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('title');
    expect(body[0]).toHaveProperty('body');
  });

  // Test POST create new post endpoint
  test('POST /posts - should create a new post', async ({ request }) => {
    // Define data for new post
    const newPost = {
      title: 'Interview test post',
      body: 'This post was created by Playwright API test',
      userId: 101
    };

    // Make POST request to create new post
    const response = await request.post(`${baseURL}/posts`, {
      data: newPost
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toMatchObject({
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId
    });

    // Common API validation: created resource should include an id
    expect(body).toHaveProperty('id');
  });

  test('GET /posts/9999 - should return empty object or not found behavior', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts/9999`);

    // JSONPlaceholder often returns 404 or an empty object depending on endpoint behavior.
    // In an interview, call out that expected behavior should be confirmed with API documentation.
    expect([200, 404]).toContain(response.status());

    const body = await response.json();
    expect(typeof body).toBe('object');
  });

  test('GET /posts/1 - response time should be reasonable', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${baseURL}/posts/1`);
    const end = Date.now();

    expect(response.status()).toBe(200);

    const responseTime = end - start;

    // Keep threshold loose for public APIs
    expect(responseTime).toBeLessThan(3000);
  });
});
