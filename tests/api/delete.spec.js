// API tests for DELETE operations
// Note: JSONPlaceholder API doesn't actually delete resources (it's a mock API)
// This demonstrates testing expected behavior even when API doesn't fully implement the operation
// Run with: npx playwright test tests/api/delete.spec.js

const { test, expect } = require('@playwright/test');

// Test suite for DELETE operations
test.describe('JSONPlaceholder DELETE Tests', () => {
  // Base URL for API endpoints
  const baseURL = 'https://jsonplaceholder.typicode.com';

  // Test DELETE endpoint behavior
  test('DELETE /posts/1 - validate delete behavior', async ({ request }) => {
    // Make DELETE request to remove post with ID 1
    const deleteResponse = await request.delete(`${baseURL}/posts/1`);

    // JSONPlaceholder returns 200 for DELETE (even though it doesn't actually delete)
    expect(deleteResponse.status()).toBe(200);

    // Only parse JSON if response is successful (not 4xx/5xx)
    // Many APIs return HTML error pages for 4xx responses
    if (deleteResponse.status() < 400) {
      const deleteBody = await deleteResponse.json();
      // JSONPlaceholder returns empty object {} for successful DELETE
      expect(deleteBody).toEqual({});
    }

    // Follow-up validation - check if resource is actually gone
    // In a real API, this GET would return 404 after successful DELETE
    const getResponse = await request.get(`${baseURL}/posts/1`);

    // JSONPlaceholder still returns 200 (resource still exists)
    // Real API would return 404 or 405 depending on implementation
    expect([200, 405]).toContain(getResponse.status());
  });
});