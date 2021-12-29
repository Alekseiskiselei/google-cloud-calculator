const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');

class SearchResultPage extends BasePage {
  get chooseSearchResult() {
    return By.xpath(
      '//div[@class="gs-title"]//a[@data-ctorig="https://cloud.google.com/products/calculator"]'
    );
  }
}

module.exports = SearchResultPage;
