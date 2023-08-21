export const enum ListClasses {
  HEADER = 'bg-blue-color',
  HEADER_CONTAINER = 'flex justify-between items-center w-full p-3',
  HEADER_BUTTONS = 'flex w-40 justify-between items-center sm-s:w-52 lg-l:w-56 2xl:w-80',
  HEADER_BUTTONS_ICON = 'cursor-pointer hover:scale-125',
  BUTTON_SIGN_UP = 'text-white text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:border-b-2 hover:border-input-color hover:border-solid hover:text-input-color',
  BUTTON_SIGN_IN = 'text-black text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:border-b-2 hover:border-input-color hover:border-solid hover:text-input-color',
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
}
