import { MrgreenAppPage } from './app.po';

describe('mrgreen-app App', () => {
  let page: MrgreenAppPage;

  beforeEach(() => {
    page = new MrgreenAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
