import {
  TokenCacheOptions,
  TokenStore,
  TokenCache,
  PasswordAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  ClientBuilder,
  Client,
} from '@commercetools/sdk-client-v2';
import { ClientResponse, Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import View from '../../view';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import EmailView from './login-email-view';
import PasswordView from './login-password-view';
import LoginSubmitView from './login-submit-view';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListPaths } from '../../../util/enums/list-paths';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';
import Router from '../../../router/router';
import { Pages } from '../../../util/enums/pages';
import { Api } from '../../../util/enums/api';
import ModalWindow, { ModalWindowParams } from '../modal-window/modal-window';

export default class LoginView extends View {
  public emailView: EmailView | null;

  public passwordView: PasswordView | null;

  public loginSubmitView: LoginSubmitView | null;

  public tOptions: TokenCacheOptions | undefined;

  public apiRootPass: ByProjectKeyRequestBuilder;

  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FORM_LOGIN,
    };
    super(params);

    this.emailView = new EmailView();
    this.passwordView = new PasswordView();
    this.loginSubmitView = new LoginSubmitView();
    this.configureView(router);
    this.apiRootPass = createApiBuilderFromCtpClient(this.clientPass()).withProjectKey({ projectKey: Api.PROJECT_KEY });
    this.submit(router);
  }

  public configureView(router: Router): void {
    const loginImage = document.createElement(ListTags.IMG);
    loginImage.setAttribute(ListAttributes.SRC, ListPaths.LOGIN);
    loginImage.setAttribute(ListAttributes.ALT, ListOfValues.LOGIN);
    loginImage.classList.add(...ListClasses.LOGIN_IMG.split(' '));

    const loginTitle = document.createElement(ListTags.H3);
    loginTitle.textContent = ListTextContent.LOGIN;
    loginTitle.classList.add(...ListClasses.LOGIN_TITLE.split(' '));

    const linkToSignUp = document.createElement(ListTags.CONTAINER);
    const link = document.createElement(ListTags.LINK);
    link.classList.add(...ListClasses.POINTER.split(' '));
    link.textContent = ListTextContent.GO_TO_REGISTRATION_BUTTON;
    link.addEventListener('click', () => router.navigate(Pages.REGISTRATION));
    linkToSignUp.classList.add(...ListClasses.LINK_TO_LOG_REG.split(' '));
    linkToSignUp.append(link);

    this.view
      .getElement()
      ?.append(
        loginImage,
        loginTitle,
        this.emailView?.getElement() || '',
        this.passwordView?.getElement() || '',
        this.loginSubmitView?.getElement() || '',
        linkToSignUp,
      );
  }

  public clientPass(): Client {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: Api.HOST_AUTH,
      projectKey: Api.PROJECT_KEY,
      credentials: {
        clientId: Api.CLIENT_ID_LOG,
        clientSecret: Api.CLIENT_SECRET_LOG,
        user: {
          username: this.emailView?.getCorrectInput() || '',
          password: this.passwordView?.getCorrectInput() || '',
        },
      },
      scopes: [Api.SCOPES_LOG],
      tokenCache: this.tokenCache(),
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: Api.HOST_API,
      fetch,
    };

    const clientPass = new ClientBuilder()
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return clientPass;
  }

  private tokenCache(): TokenCache {
    let tOptions: TokenCacheOptions | undefined = {
      clientId: Api.CLIENT_ID_LOG,
      projectKey: Api.PROJECT_KEY,
      host: Api.HOST_API,
    };

    this.tOptions = tOptions;

    let tokenStoreT: TokenStore;

    const tokenCache: TokenCache = {
      get: () => tokenStoreT,
      set: (tokenStore, tokenCacheOptions?: TokenCacheOptions) => {
        tokenStoreT = tokenStore;
        tOptions = tokenCacheOptions;
      },
    };

    return tokenCache;
  }

  public async getCustomer(): Promise<ClientResponse<Customer>> {
    const customer = await this.apiRootPass.me().get().execute();
    return customer;
  }

  public submit(router: Router): void {
    this.loginSubmitView?.getElement()?.addEventListener('click', () => {
      this.apiRootPass = createApiBuilderFromCtpClient(this.clientPass()).withProjectKey({
        projectKey: Api.PROJECT_KEY,
      });
      this.getCustomer()
        .then(() => {
          router.navigate(Pages.MAIN);
          const modalWindowParameters: ModalWindowParams = {
            type: 'login',
            status: 'success',
          };
          document.body.append(new ModalWindow(modalWindowParameters).getHTMLElement() || '');
        })
        .catch(() => {
          const modalWindowParameters: ModalWindowParams = {
            type: 'login',
            status: 'error',
          };
          document.body.append(new ModalWindow(modalWindowParameters).getHTMLElement() || '');
        });
    });
  }
}
