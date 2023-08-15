import Router from './router/router';
import { Pages } from './util/enums/pages';
import FooterView from './view/footer/footer-view';
import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';
import View from './view/view';

interface Route {
  path: string;
  callback: (param: string) => void;
}

export default class App {
  private header: HeaderView | null;

  private main: MainView | null;

  private footer: FooterView | null;

  private router: Router;

  constructor() {
    this.header = null;
    this.main = null;
    this.footer = null;
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.createView();
  }

  private createView(): void {
    this.header = new HeaderView(this.router);
    this.main = new MainView();
    this.footer = new FooterView();

    document.body.append(
      this.header.getHTMLElement() || '',
      this.main.getHTMLElement() || '',
      this.footer.getHTMLElement() || '',
    );
  }

  public createRoutes(): Route[] {
    return [
      {
        path: ``,
        callback: async (): Promise<void> => {
          const { default: LoginView } = await import('./view/main/form-login/login-view');
          this.setContent(Pages.LOGIN, new LoginView());
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: async (): Promise<void> => {
          const { default: LoginView } = await import('./view/main/form-login/login-view');
          this.setContent(Pages.LOGIN, new LoginView());
        },
      },
      {
        path: `${Pages.REGISTRATION}`,
        callback: async (): Promise<void> => {
          const { default: RegistrationView } = await import('./view/main/form-registration/registration-view');
          this.setContent(Pages.REGISTRATION, new RegistrationView());
        },
      },
      {
        path: `${Pages.MAIN}`,
        callback: async (): Promise<void> => {
          const { default: EmptyMainView } = await import('./view/main/empty-main/empty-main-view');
          this.setContent(Pages.MAIN, new EmptyMainView());
        },
      },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: async (): Promise<void> => {
          const { default: Error404View } = await import('./view/main/error-404/error-404-view');
          this.setContent(Pages.NOT_FOUND, new Error404View(this.router));
        },
      },
    ];
  }

  public setContent(page: string, view: View): void {
    this.main?.setContent(view);
  }
}
