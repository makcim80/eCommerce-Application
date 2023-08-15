export default class HistoryRouterHandler {
  protected params: { nameEvent: string; locationField: string };

  protected callback: (requestParams: { path: string; resource: string }) => void;

  protected handler: (url: Event | string) => void;

  protected null!: null;

  constructor(callback: (requestParams: { path: string; resource: string }) => void) {
    this.params = {
      nameEvent: 'popstate',
      locationField: 'pathname',
    };
    this.callback = callback;
    this.handler = this.navigate.bind(this);

    window.addEventListener(this.params.nameEvent, this.handler);
  }

  public navigate(url: Event | string | null): void {
    if (typeof url === 'string') {
      this.setHistory(url);
    }
    const urlString: string = window.location.pathname.slice(1);

    const result = {
      path: '',
      resource: '',
    };
    const path = urlString.split('/');
    [result.path = '', result.resource = ''] = path;

    this.callback(result);
  }

  public disable(): void {
    window.removeEventListener(this.params.nameEvent, this.handler);
  }

  protected setHistory(url: string): void {
    window.history.pushState(this.null, '', `/${url}`);
  }
}
