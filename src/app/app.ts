import Carts from '../components/carts';
import Router from './router/router';
import { Api } from './util/enums/api';
import { ID_SELECTOR, Pages } from './util/enums/pages';
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

  private readonly router: Router;

  private cart: Carts;

  constructor() {
    this.header = null;
    this.main = null;
    this.footer = null;
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.cart = new Carts();
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

  // eslint-disable-next-line max-lines-per-function
  public createRoutes(): Route[] {
    return [
      {
        path: ``,
        callback: async (): Promise<void> => {
          const { default: EmptyMainView } = await import('./view/main/empty-main/empty-main-view');
          this.setContent(Pages.MAIN, new EmptyMainView(this.router));
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: async (): Promise<void> => {
          const { default: LoginView } = await import('./view/main/form-login/login-view');
          this.setContent(Pages.LOGIN, new LoginView(this.router));
        },
      },
      {
        path: `${Pages.REGISTRATION}`,
        callback: async (): Promise<void> => {
          const { default: RegistrationView } = await import('./view/main/form-registration/registration-view');
          this.setContent(Pages.REGISTRATION, new RegistrationView(this.router));
        },
      },
      {
        path: `${Pages.MAIN}`,
        callback: async (): Promise<void> => {
          const { default: EmptyMainView } = await import('./view/main/empty-main/empty-main-view');
          this.setContent(Pages.MAIN, new EmptyMainView(this.router));
        },
      },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: async (): Promise<void> => {
          const { default: Error404View } = await import('./view/main/error-404/error-404-view');
          this.setContent(Pages.NOT_FOUND, new Error404View(this.router));
        },
      },
      {
        path: `${Pages.PROFILE}`,
        callback: async (): Promise<void> => {
          const { default: ProfileView } = await import('./view/main/profile/profile-view/my-profile');
          this.setContent(Pages.PROFILE, new ProfileView());
        },
      },
      {
        path: `${Pages.CATALOG}`,
        callback: async (): Promise<void> => {
          const { default: CatalogView } = await import('./view/main/catalog/catalog-view');
          this.setContent(Pages.CATALOG, new CatalogView(this.router, this.cart));
        },
      },
      {
        path: `${Pages.CAT_DETAILS}/${ID_SELECTOR}`,
        callback: async (id): Promise<void> => {
          const { default: CatDetailsView } = await import('./view/main/cat-details/cat-details-view');
          this.setContent(Pages.CAT_DETAILS, new CatDetailsView(id, this.cart));
        },
      },
      {
        path: `${Pages.BASKET}`,
        callback: async (): Promise<void> => {
          const { default: BasketPageView } = await import('./view/main/basket-page/basket-page');
          this.setContent(Pages.BASKET, new BasketPageView(this.router, this.cart));
        },
      },
    ];
  }

  public setContent(page: string, view: View): void {
    this.main?.setContent(view);
    this.header?.setSelectedItem(page);
    if (localStorage.getItem(Api.STORAGE)) {
      this.header?.showButtonLogout();
    } else {
      this.header?.showButtonSignUpAndSignIn();
    }
  }
}
