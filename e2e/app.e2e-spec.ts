import { Angular2MaterialLitePage } from './app.po';

describe('angular2-material-lite App', () => {
  let page: Angular2MaterialLitePage;

  beforeEach(() => {
    page = new Angular2MaterialLitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
