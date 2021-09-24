import { MultiWorkAPITemplatePage } from './app.po';

describe('MultiWorkAPI App', function() {
  let page: MultiWorkAPITemplatePage;

  beforeEach(() => {
    page = new MultiWorkAPITemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
