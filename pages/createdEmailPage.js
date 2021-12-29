const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');

class CreatedEmailPage extends BasePage {
  get copyEmail() {
    return By.xpath('//div[@class="tooltip"]//button[@class="md but text f24 egenbut"]');
  }

  get checkInboxBtn() {
    return By.xpath('//button[@onclick="egengo();"]');
  }
}

module.exports = CreatedEmailPage;
