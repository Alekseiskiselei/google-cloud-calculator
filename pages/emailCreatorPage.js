const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');

class EmailCreator extends BasePage {
  get makeRandomEmail() {
    return By.xpath('//div[@class="txtlien"]/b[contains(text(),"Random")]');
  }
}

module.exports = EmailCreator;
