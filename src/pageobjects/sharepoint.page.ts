import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SharePointPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('input[type="email"]');
  }
  get inputPassword() {
    return $('input[type="password"]');
  }
  get btnSubmit() {
    return $('input[type="submit"]');
  }

  get pageVisibleContent() {
    return $('[data-automation-id="visibleContent"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  login(username: string, password: string): Boolean {
    if (!this.pageVisibleContent.isDisplayed()) {
      this.inputUsername.setValue(username);
      this.btnSubmit.click();
      this.inputPassword.waitForDisplayed();
      this.inputPassword.setValue(password);
      this.btnSubmit.click();
      this.btnSubmit.waitForEnabled();
      this.btnSubmit.click();
    }
    return this.pageVisibleContent.waitForDisplayed();
  }

  /**
   * overwrite specifc options to adapt it to page object
   */
  open() {
    browser.url('https://login.microsoftonline.com/');
    return this;
  }
}

export default new SharePointPage();
