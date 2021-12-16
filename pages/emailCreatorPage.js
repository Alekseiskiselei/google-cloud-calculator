const { By } = require('selenium-webdriver');

class EmailCreator {
  get makeRandomEmail() {
    return By.xpath('//div[@class="txtlien"]/b[contains(text(),"Random")]');
  }
}

module.exports = EmailCreator;
