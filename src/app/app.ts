import FooterView from './view/footer/footer-view';
import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';

export default class App {
  private header: HeaderView | null;

  private main: MainView | null;

  private footer: FooterView | null;

  constructor() {
    this.header = null;
    this.main = null;
    this.footer = null;
    this.createView();
  }

  private createView(): void {
    this.header = new HeaderView();
    this.main = new MainView();
    this.footer = new FooterView();

    document.body.append(
      this.header.getHTMLElement() || '',
      this.main.getHTMLElement() || '',
      this.footer.getHTMLElement() || '',
    );
  }
}
