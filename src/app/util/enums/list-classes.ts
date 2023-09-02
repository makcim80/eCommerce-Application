export const enum ListClasses {
  HEADER = 'bg-blue-color',
  HEADER_CONTAINER = 'flex justify-between items-center w-full p-3',
  HEADER_BUTTONS = 'flex justify-between items-center sm-s:w-96 lg-l:w-30rem 2xl:w-35rem',
  HEADER_BUTTONS_ICON = 'mr-5 cursor-pointer hover:scale-125',
  BUTTON_SIGN_UP = 'mr-5 text-white text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:border-b-2 hover:border-input-color hover:border-solid hover:text-input-color',
  BUTTON_SIGN_IN = 'mr-5 text-black text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:border-b-2 hover:border-input-color hover:border-solid hover:text-input-color',
  BUTTON_ACTIVE = 'border-b-2 border-solid border-input-color',
  BUTTONS_MAIN = 'bg-red-400 text-white block m-3 p-1 hover:text-white hover:decoration-white hover:underline',
  MAIN = 'flex-auto bg-main-background',
  FOOTER = 'bg-footer-color flex justify-center px-3',
  FOOTER_CONTENT = 'flex',
  FOOTER_LINKS = 'flex flex-col',
  FOOTER_LINKS_TEXT = 'text-xs text-white py-1.5',
  LOGIN_IMG = 'rounded-radius-sm w-24 h-24 absolute -top-8 left-img-calc',
  LOGIN_TITLE = 'text-white text-center text-2xl pb-7',
  FORM_LOGIN = 'form w-72 h-21rem rounded-xl bg-form-color absolute top-50% left-50% py-20 px-8',
  INPUT = 'w-full text-white border-0 outline-0 bg-transparent border-b border-white placeholder:text-sm placeholder:opacity-40 caret-white',
  INPUT_NAME = 'w-21w text-white border-0 outline-0 bg-transparent border-b border-white placeholder:text-sm placeholder:opacity-40 caret-white',
  INPUT_BIRTHDAY = 'w-20w text-white border-0 outline-0 bg-transparent border-b border-white placeholder:text-sm placeholder:opacity-40 caret-white',
  LABEL = 'text-input-color text-xs font-bold',
  SUBMIT_BUTTONS = 'hover:bg-blue-color text-white w-full border-2 outline-0 rounded-3xl hover:border-blue-color border-neon-color cursor-pointer mt-2',
  FORM_REGISTRATION = 'form-reg overflow-y-auto w-80 h-21rem rounded-xl bg-form-color absolute top-50% left-50% py-6 px-6',
  DIV = 'flex items-center',
  LABEL_CHECKBOX = 'text-slate-400 text-xx-s font-bold mr-2 w-24',
  DIV_CONTAINER = 'flex justify-between w-full items-center',
  LABEL_SELECT = 'text-input-color text-xx-s font-bold w-125px',
  INPUT_SELECT = 'w-full text-white border-0 outline-0 bg-transparent border-b border-white placeholder:text-sm placeholder:opacity-40 caret-white pt-0.29rem',
  INPUT_SELECT_OPTION = 'bg-gray-600',
  EYE_IMAGE = 'absolute right-9 top-69% w-5 h-5 cursor-pointer',
  ERROR_404_CONTAINER = 'flex flex-col gap-y-3 error rounded-xl bg-form-color absolute top-50% left-50% py-10 px-5',
  ERROR_404_HEADING = 'text-white text-center text-5xl flex flex-col',
  ERROR_404_DESCRIPTION = 'text-white text-sm text-center',
  ERROR_404_BUTTON = 'mt-5 text-white py-1 px-2 border-2 rounded-2xl border-blue-color hover:bg-blue-color transition-all duration-300 active:bg-footer-color',
  MESSAGE_HIDDEN = 'block text-form-color text-xs',
  MESSAGE_OPEN = 'block text-red-500 text-xs',
  LINK_TO_LOG_REG = 'text-xx-s text-slate-400 hover:text-slate-200 hover:decoration-slate-200 underline text-center mt-2',
  POINTER = 'cursor-pointer',
  MODAL_WINDOW_FADE = 'screen-fade',
  MODAL_WINDOW_CONTAINER = 'modalWindow flex flex-col gap-y-16px bg-modal-window-bg border-3 px-5 pt-5 pb-10',
  MODAL_WINDOW_CONTAINER_SUCCESSFUL = 'border-successful-color',
  MODAL_WINDOW_CONTAINER_ERROR = 'border-error-color',
  MODAL_WINDOW_HEADING = 'flex flex-row gap-x-18px justify-between items-center',
  MODAL_WINDOW_HEADING_TEXT = 'grow text-2xl',
  MODAL_WINDOW_CONTENT = 'modal-window-content',
  MODAL_WINDOW_CONTENT_TEXT = 'text-lg ml-14',
  MODAL_ICON_WRP = 'modal-window-icon-wrp',
  MODAL_ICON_SUCCESSFUL = 'w-36px h-36px',
  MODAL_ICON_ERROR = 'placeholder-7',
  MODAL_BUTTON_BASE = 'border-2 rounded-full w-36px h-36px hover:text-white transition-all duration-300',
  MODAL_BUTTON_SUCCESSFUL = 'border-successful-color hover:bg-successful-color',
  MODAL_BUTTON_ERROR = 'border-error-color hover:bg-error-color',
  BUTTON_LOGOUT = 'block text-black text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:border-b-2 hover:border-input-color hover:border-solid hover:text-input-color',
  HIDDEN = 'hidden',
  BUTTONS_CATALOG_ABOUT_US = 'mr-6 sm-sm:text-2xl sm-sm:mb-5 sm-s:mb-0 text-white opacity-90 text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:border-b-2 hover:border-input-color hover:border-solid hover:text-input-color',
  BUTTON_MY_PROFILE = 'mr-6 w-9 text-black text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:border-b-2 hover:border-input-color hover:border-solid hover:text-input-color',
  BURGER_MENU_ACTIVE = 'burger-menu-active',
  BURGER_MENU = 'burger-menu p-1 w-7 h-7 cursor-pointer relative z-30 hover:opacity-70 sm-sm:block sm-s:hidden',
  BURGER_LINE = 'burger-line block absolute left-0 h-0.5 w-full bg-white',
  BURGER_LINE_ONE = 'burger-line block absolute left-0 h-0.5 w-full translate-y-5 bg-white',
  BURGER_LINE_TWO = 'burger-line block absolute left-0 h-0.5 w-full burger-line-two bg-white',
  BURGER_LINE_THREE = 'burger-line block absolute left-0 h-0.5 w-full translate-y-2.5 bg-white',
  HEADER_NAV = 'header-nav h-4/6 fixed top-0 right-0 z-20 sm-s:flex sm-s:items-center sm-s:h-auto sm-s:relative sm-s:translate-x-0',
  NAV_LIST = 'flex-col flex p-24 bg-form-color h-full sm-s:flex-row sm-s:p-0 sm-s:bg-transparent sm-s:h-auto sm-s:w-auto',
  HEADER_NAV_ACTIVE = 'header-nav-active',
  CARD_IMAGE = 'max-w-xs rounded-t-2xl',
  TEXT_RED = 'text-red-600',
  TEXT_CROSS_OUT = 'line-through',
  CATALOG = 'flex p-2.5',
  SIDEBAR = 'min-w-max flex flex-col gap-y-2.5',
  SIDEBAR_PRICE_INPUT = 'w-24 mr-2.5 border-2 border-black rounded px-1',
  CARDS = 'flex flex-wrap justify-evenly gap-2.5',
  CARD = 'bg-gray-200 rounded-2xl hover:scale-125 hover:shadow-lg hover:shadow-zinc-900',
  PADDING_LEFT_1REM = 'pl-4',
  CARD_TITLE = 'text-2xl text-center',
  CARD_PRICE = 'text-center',
  BUTTON_APPLY_RESET = 'bg-red-400 text-white m-3 py-1 px-3 rounded-md hover:text-white hover:decoration-white hover:underline',
  PADDING_TOP_075REM = 'pt-3',
  BACKGROUND_TRANSPARENT = 'bg-transparent',
  WIDTH_9REM = 'w-36',
  LABEL_TYPE = 'text-zinc-600 text-xx-s font-bold mr-2 w-24',
}
