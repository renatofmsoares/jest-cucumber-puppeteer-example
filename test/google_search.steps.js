const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./test/features/google_search.feature", 
{
  tagFilter: 'not @excluded'
});

const PAGE = "http://www.google.com.br";
const ENTER_EVENT = "Enter";
const INPUT_SELECTOR = "input[name=\"q\"]";

defineFeature(feature, test => {

  beforeEach(async () => {
    await page.goto(PAGE);
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
  });

  test("Google search", ({ given, when, then }) => {

    when(/^I search "(.*)"$/, async label => {
      await expect(page).toFill(INPUT_SELECTOR, label);
    });

    when("I press enter", async () => {
      const inputElement = await expect(page).toMatchElement(INPUT_SELECTOR);
      inputElement.press(ENTER_EVENT);
      await page.waitForNavigation();
    });
  });
});
