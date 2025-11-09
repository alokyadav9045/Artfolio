import { test, expect } from '@playwright/test'

test.describe('Artfolio E2E Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')

    // Check if the page loads
    await expect(page).toHaveTitle(/Artfolio/)

    // Check for main elements
    await expect(page.locator('text=Welcome to Artfolio')).toBeVisible()
  })

  test('should navigate to explore page', async ({ page }) => {
    await page.goto('/')

    // Click explore link
    await page.locator('text=Explore').click()

    // Should be on explore page
    await expect(page).toHaveURL(/.*explore/)
  })

  test('should handle login flow', async ({ page }) => {
    await page.goto('/login')

    // Check login page elements
    await expect(page.locator('text=Sign In')).toBeVisible()
    await expect(page.locator('text=GitHub')).toBeVisible()
    await expect(page.locator('text=Google')).toBeVisible()
  })

  test('should handle signup flow', async ({ page }) => {
    await page.goto('/signup')

    // Check signup page elements
    await expect(page.locator('text=Sign Up')).toBeVisible()
    await expect(page.locator('text=GitHub')).toBeVisible()
    await expect(page.locator('text=Google')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/')

    // Check mobile navigation
    const menuButton = page.locator('[aria-label="Toggle menu"]')
    if (await menuButton.isVisible()) {
      await menuButton.click()
      await expect(page.locator('text=Explore')).toBeVisible()
    }
  })
})