const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');

class CalcPage extends BasePage {
  get switchFirstFrame() {
    return By.xpath('//*[@id="cloud-site"]/devsite-iframe/iframe');
  }

  get switchSecondFrame() {
    return By.xpath('//*[@id="myFrame"]');
  }

  get defineNumberOfInstances() {
    return By.id('input_75');
  }

  get chooseOperatingSystem() {
    return By.id('select_88');
  }

  get selectFirstOption() {
    return By.xpath('//*[@id="select_option_77"]/div[@class="md-text"]');
  }

  get chooseSeries() {
    return By.xpath('//md-select[@placeholder="Series"]//span[@class="md-select-icon"]');
  }

  get selectN1Series() {
    return By.xpath('//div[contains(text(),"N1")]');
  }

  get chooseMachineType() {
    return By.xpath('//md-select[@placeholder="Instance type"]//span[@class="md-select-icon"]');
  }

  get selectN1S8Type() {
    return By.xpath('//*[@value="CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8"]');
  }

  get addGPU() {
    return By.xpath(
      '//md-checkbox[@ng-model="listingCtrl.computeServer.addGPUs"]//div[@class="md-label"]'
    );
  }

  get chooseGPUType() {
    return By.xpath('//md-select[@placeholder="GPU type"]');
  }

  get selectV100() {
    return By.xpath('//md-option[@value="NVIDIA_TESLA_V100"]');
  }

  get chooseNumberOfGPUs() {
    return By.xpath('//md-select[@placeholder="Number of GPUs"]//span[@class="md-select-icon"]');
  }

  get selectOneGPU() {
    return By.xpath(
      '//md-option[@ng-disabled="item.value != 0 && item.value < listingCtrl.minGPU"][@value="1"]'
    );
  }

  get chooselocalSSD() {
    return By.xpath(
      '//md-select[@ng-model="listingCtrl.computeServer.ssd"]//span[@class="md-select-icon"]'
    );
  }

  get selectSize() {
    return By.xpath(
      '//div[@class="md-select-menu-container md-active md-clickable"]//md-option[@value="2"]'
    );
  }

  get chooseDatacenterLocation() {
    return By.xpath('//*[@id="select_value_label_73"]//span[@class="md-select-icon"]');
  }

  get selectFrankfurt() {
    return By.xpath('//md-select-menu[@class="md-overflow"]//md-option[@value="europe-west3"]');
  }

  get chooseUsageTerm() {
    return By.xpath('//*[@id="select_value_label_74"]//span[@class="md-select-icon"]');
  }

  get selectOneYear() {
    return By.xpath(
      '//div[@class="md-select-menu-container md-active md-clickable"]//md-option[@ng-value="1"]'
    );
  }

  get addToEstimate() {
    return By.xpath('//button[@ng-click="listingCtrl.addComputeServer(ComputeEngineForm);"]');
  }

  get emailEstimate() {
    return By.xpath('//button[@aria-label="Email Estimate"]');
  }

  get findEmailInput() {
    return By.xpath('//input[@ng-model="emailQuote.user.email"]');
  }

  get sendMailBtn() {
    return By.xpath('//button[@aria-label="Send Email"]');
  }

  get showVMClass() {
    return By.xpath(
      '//md-list-item[@ng-if="item.items.editHook && item.items.editHook.initialInputs.class"]'
    );
  }

  get showType() {
    return By.xpath(
      '//md-list-item[@class="md-1-line md-no-proxy"]//div[contains(text(),"Instance")]'
    );
  }

  get showRegion() {
    return By.xpath(
      '//md-list-item[@class="md-1-line md-no-proxy"]//div[contains(text(),"Region")]'
    );
  }

  get showSSD() {
    return By.xpath('//md-list-item[@ng-if="item.items.ssd && item.items.ssd != 0"]');
  }

  get showTerm() {
    return By.xpath(
      '//md-list-item[@class="md-1-line md-no-proxy ng-scope"]//div[contains(text(),"Commitment")]'
    );
  }

  get showCost() {
    return By.xpath('//h2[@class="md-title"]//b[@class="ng-binding"]');
  }
}

module.exports = CalcPage;
