const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');

class FinalPage extends BasePage {
  get showFinalCost() {
    return By.xpath('//h3[contains(text(),"USD")]');
  }

  get switchFinalFrame() {
    return By.xpath('//*[@name="ifmail"]');
  }
}

module.exports = FinalPage;
