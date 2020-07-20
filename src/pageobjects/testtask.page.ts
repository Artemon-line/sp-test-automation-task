import Page from './page';
import { ElementArray } from '@wdio/sync';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TestTask extends Page {
  /**
   * define selectors using getter methods
   */

  get slideShow() {
    return $("//span[contains(text(),'Slideshow')]");
  }

  get slideshowRighArrow() {
    return $('button[type="button"][aria-label="Next"]');
  }

  get tiles(): ElementArray {
    return $$('[data-shortpoint-type="tile"]');
  }

  open() {
    return super.open('/internalsite/testtask');
  }
}

export default new TestTask();
