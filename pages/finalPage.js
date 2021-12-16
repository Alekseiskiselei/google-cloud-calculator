const { By } = require('selenium-webdriver');

class FinalPage {
  get showFinalCost() {
    return By.xpath('//h3[contains(text(),"USD")]');
  }

  get switchFinalFrame() {
    return By.xpath('//*[@name="ifmail"]');
  }
}

module.exports = FinalPage;
