const { By } = require('selenium-webdriver');

class CreatedEmailPage {
  get copyEmail() {
    return By.xpath('//div[@class="tooltip"]//button[@class="md but text f24 egenbut"]');
  }

  get checkInboxBtn() {
    return By.xpath('//button[@onclick="egengo();"]');
  }
}

module.exports = CreatedEmailPage;
