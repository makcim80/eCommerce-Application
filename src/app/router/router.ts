import { ID_SELECTOR, Pages } from '../util/enums/pages';
import HistoryRouterHandler from './handler/history-router-handler';

interface Route {
  path: string;
  callback: (param: string) => void;
}

export default class Router {
  private routes: Route[];

  private handler: HistoryRouterHandler;

  constructor(routes: Route[]) {
    this.routes = routes;

    this.handler = new HistoryRouterHandler(this.urlChangedHandler.bind(this));

    document.addEventListener('DOMContentLoaded', () => {
      this.handler.navigate(null);
    });
  }

  public navigate(url: string): void {
    this.handler.navigate(url);
  }

  private urlChangedHandler(requestParams: { path: string; resource: string }): void {
    const pathForFind = requestParams.resource === '' ? requestParams.path : `${requestParams.path}/${ID_SELECTOR}`;
    const route = this.routes.find((item) => {
      return item.path === pathForFind;
    });

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }

    route.callback(requestParams.resource);
  }

  private redirectToNotFoundPage(): void {
    const notFoundPage = this.routes.find((item) => item.path === Pages.NOT_FOUND);
    if (notFoundPage) {
      this.navigate(notFoundPage.path);
    }
  }
}
