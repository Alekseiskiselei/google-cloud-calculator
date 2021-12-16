const { By } = require('selenium-webdriver');

class SearchResultPage {
  get chooseSearchResult() {
    return By.xpath(
      '//div[@class="gs-title"]//a[@data-ctorig="https://cloud.google.com/products/calculator"]'
    );
  }
}

module.exports = SearchResultPage;
