import { test, expect } from "@playwright/test";

test("Should Find the Sign In Page", async ({ page }) => {
  await page.goto("/login");
  await expect(page.locator("button")).toContainText("🚗 Lessgo 🚗");
});
