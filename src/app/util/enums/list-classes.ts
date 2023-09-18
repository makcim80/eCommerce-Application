export const enum ListClasses {
  PLACEHOLDER = 'placeholder',
  HEADER = 'bg-blue-color w-full',
  HEADER_CONTAINER = 'container flex justify-between items-center w-full p-3',
  HEADER_BUTTONS = 'flex justify-between items-center sm-s:w-96 lg-l:w-30rem 2xl:w-35rem',
  HEADER_BUTTONS_ICON = 'mr-5 cursor-pointer hover:scale-125',
  BUTTON_SIGN_UP = 'mr-5 text-white text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:underline hover:decoration-input-color hover:text-input-color hover:decoration-2',
  BUTTON_SIGN_IN = 'mr-5 text-black text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:underline hover:decoration-input-color hover:text-input-color hover:decoration-2',
  BUTTON_ACTIVE = 'underline decoration-input-color decoration-2',
  BUTTONS_MAIN = 'bg-red-400 text-white block m-3 p-1 hover:text-white hover:decoration-white hover:underline',
  MAIN = 'container flex-auto',
  FOOTER = 'w-full bg-footer-color flex justify-center px-3',
  FOOTER_CONTENT = 'flex container p-2 justify-center',
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
  DIV = 'flex items-center z-20',
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
  MODAL_WINDOW_CONTAINER = 'modalWindow flex flex-col gap-y-16px bg-modal-window-bg border-3px px-5 pt-5 pb-10',
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
  CAT_DETAILS_CONTAINER = 'cat-details-container flex flex-col items-center px-3 pb-3 pt-24',
  CAT_DETAILS_CONTENT = 'cat-details-content flex border-2 border-footer-color rounded-2xl w-900px max-w-full bg-profile-bg p-2.5 max-md:flex-wrap max-md:justify-center',
  CAT_DETAILS_CONTENT_RIGHT = 'cat-details-content-right flex flex-col p-10',
  CAT_DETAILS_NAME = 'cat-name text-xl font-bold',
  CAT_DETAILS_DESCRIPTION = 'cat-description mt-4 text-lg',
  CAT_DETAILS_PRICE_DEFAULT = 'cat-price-default text-lg mt-2',
  CAT_DETAILS_PRICE_DEFAULT_OUTDATED = 'cat-price-default--outdated line-through',
  CAT_DETAILS_PRICE_DISCOUNT = 'cat-price-discount text-xl font-bold text-red-600 mt-4',
  CAT_DETAILS_SLIDER_ROOT = 'cats-slider-root',
  CAT_DETAILS_SLIDER_ROOT_MODAL_MODE = 'cats-slider-root--modal-mode screen-fade',
  CAT_DETAILS_SLIDER_CONTAINER = 'cats-slider-container w-500px h-500px max-md:max-w-[90vw] max-md:max-h-[90vw]',
  CAT_DETAILS_SLIDER_CONTAINER_MODAL_MODE = 'cats-slider-container--modal-mode border-2 border-footer-color',
  CAT_DETAILS_SLIDER_PLACEHOLDER = 'cats-slider-tmp flex w-500px h-500px overflow-x-scroll gap-x-4',
  CAT_DETAILS_SLIDER_IMG_PLACEHOLDER = 'cat-img-tmp w-500px h-500px object-contain h-full bg-profile-bg',
  CAT_DETAILS_SLIDER_SWIPER = 'swiper swiper-root select-none',
  CAT_DETAILS_SLIDER_SWIPER_WRP = 'cat-details-swiper-wrapper swiper-wrapper',
  CAT_DETAILS_SLIDER_SWIPER_SLIDE = 'cat-details-swiper-slide swiper-slide',
  CAT_DETAILS_SLIDER_SWIPER_IMG = 'cat-img w-full h-full object-contain bg-profile-bg',
  CAT_DETAILS_SLIDER_SWIPER_BTN_PREV = 'swiper-button-prev blue-color',
  CAT_DETAILS_SLIDER_SWIPER_BTN_NEXT = 'swiper-button-next blue-color',
  CAT_DETAILS_SLIDER_SWIPER_BTN_CLOSE = 'swiper-button-close border-2 border-blue-color rounded-full text-xl text-blue-color hover:text-input-color hover:border-input-color active:scale-75 transition-all duration-300 w-42px h-42px',
  CAT_DETAILS_SLIDER_SWIPER_PAGINATION = 'cat-details-swiper-pagination swiper-pagination',
  BUTTON_LOGOUT = 'mr-5 block text-black text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:underline hover:decoration-input-color hover:text-input-color hover:decoration-2 2xl:ml-5',
  HIDDEN = 'hidden',
  BUTTONS_CATALOG_ABOUT_US = 'mr-6 sm-sm:text-2xl sm-sm:mb-5 sm-s:mb-0 text-white opacity-90 text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:underline hover:decoration-input-color hover:decoration-2 hover:text-input-color',
  BUTTON_MY_PROFILE = 'mr-6 w-9 text-black text-xs sm-s:text-sm lg-l:text-lg 2xl:text-2xl hover:underline hover:decoration-input-color hover:text-input-color hover:decoration-2',
  BURGER_MENU_ACTIVE = 'burger-menu-active',
  BURGER_MENU = 'burger-menu p-1 w-7 h-7 cursor-pointer relative z-30 hover:opacity-70 sm-sm:block sm-s:hidden',
  BURGER_LINE = 'burger-line block absolute left-0 h-0.5 w-full bg-white',
  BURGER_LINE_ONE = 'burger-line block absolute left-0 h-0.5 w-full translate-y-5 bg-white',
  BURGER_LINE_TWO = 'burger-line block absolute left-0 h-0.5 w-full burger-line-two bg-white',
  BURGER_LINE_THREE = 'burger-line block absolute left-0 h-0.5 w-full translate-y-2.5 bg-white',
  HEADER_NAV = 'header-nav h-4/6 fixed top-0 right-0 z-30 sm-s:flex sm-s:items-center sm-s:h-auto sm-s:relative sm-s:translate-x-0',
  NAV_LIST = 'flex-col flex p-24 bg-form-color h-full sm-s:flex-row sm-s:p-0 sm-s:bg-transparent sm-s:h-auto sm-s:w-auto',
  HEADER_NAV_ACTIVE = 'header-nav-active',
  TEXT_RED = 'text-red-600',
  TEXT_CROSS_OUT = 'line-through',
  CATALOG = 'catalog flex flex-wrap justify-center gap-x-6 gap-y-10 p-6 sm-s:flex-nowrap',
  SIDEBAR = 'min-w-max flex flex-col gap-y-2.5 z-20',
  SIDEBAR_PRICE_INPUT = 'w-24 mr-2.5 border-2 border-black rounded px-1',
  CARDS = 'catalog-cards flex flex-wrap justify-evenly gap-2.5 ml-2 mr-2 max-w-[1920px]',
  CARDS_SLIDER = 'catalog-swiper-slider swiper swiper-root select-none',
  CARDS_SLIDER_WRAPPER = 'catalog-swiper-slider-wrapper',
  CARDS_SLIDER_PAGINATION = 'catalog-swiper-slider-pagination swiper-pagination',
  CARD = 'catalog-card bg-profile-bg !flex flex-col rounded-2xl border-2 border-footer-color hover:scale-110 hover:shadow-2xl hover:shadow-zinc-900 transition [&:not(.active-block)]:active:scale-90 hover:z-30',
  CARD_IMAGE_WRP = 'catalog-card-img-wrp',
  CARD_IMAGE = 'catalog-card-img',
  CARD_IMAGE_PRELOADER = 'catalog-card-img-preloader',
  CARD_TITLE = 'catalog-card-title text-2xl text-center',
  CARD_DESCRIPTION = 'catalog-card-description',
  CARD_PRICE = 'catalog-card-price text-center',
  CARD_BTN_ADD_TO_BASKET_WRP = 'card-add-to-basket-wrp flex grow flex-row gap-x-2.5 justify-center items-end',
  CARD_BTN_ADD_TO_BASKET = 'card-add-to-basket text-white py-1 px-3 rounded-md hover:text-white hover:decoration-white hover:underline w-fit h-fit',
  PADDING_LEFT_1REM = 'pl-4',
  PADDING_RIGHT_1REM = 'pr-4',
  BUTTON_APPLY_RESET = 'bg-red-400 text-white m-3 py-1 px-3 rounded-md hover:text-white hover:decoration-white hover:underline',
  PADDING_TOP_075REM = 'pt-3',
  BACKGROUND_TRANSPARENT = 'bg-transparent',
  WIDTH_9REM = 'w-36',
  LABEL_TYPE = 'text-zinc-600 text-xx-s font-bold mr-2 w-24',
  BUTTON_CATEGORY = 'rounded-lg bg-red-400 py-1.5',
  PROFILE = 'rounded-2xl border-1px m-3 p-2 border-label-profile max-w-28rem bg-profile-bg sm-ss:max-w-2xl',
  DIV_FIELD = 'py-3 mx-2 field',
  FORM_GROUP = 'bg-white',
  DATA_FIELD = 'border-b border-label-profile',
  LABEL_PROFILE = 'text-label-profile text-xs',
  INPUT_PROFILE = 'mb-1 outline-0 border border-slate-300 rounded-md',
  INPUT_BIRTHDAY_PROFILE = 'outline-0 placeholder:text-sm placeholder:opacity-40 mb-1 border border-slate-300 rounded-md',
  BUTTON_EDIT = 'text-xs text-blue-500 hover:text-blue-300',
  BUTTON_SAVE = 'text-xs text-save-btn hover:text-input-color',
  MESSAGE_HIDDEN_PROFILE = 'hidden text-white text-xx-s',
  MESSAGE_OPEN_PROFILE = 'block text-red-500 text-xx-s',
  INPUTFIELDCREATOR = 'flex flex-col max-w-13rem',
  OVERLAY = 'overlay z-40 invisible opacity-0 flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-modal-password',
  OVERLAY_OPEN = 'open',
  POPAP_CONTAINER = 'flex relative',
  POPAP = 'popup bg-popup-color max-w-23rem flex flex-col p-3 rounded-lg',
  INPUT_CHANGE_PASSWORD = 'w-full outline-0',
  LABEL_CHANGE_PASSWORD = 'text-footer-color text-xs font-bold',
  MESSAGE_HIDDEN_POPUP = 'block text-popup-color text-xs',
  BUTTON_CANCEL = 'text-sm text-blue-500 hover:text-blue-300 mr-4',
  DIV_PASSWORD_BUTTONS = 'flex items-center justify-center',
  EYE_IMAGE_1 = 'absolute right-5 top-13% w-5 h-5 cursor-pointer',
  EYE_IMAGE_2 = 'absolute right-5 top-41% w-5 h-5 cursor-pointer',
  EYE_IMAGE_3 = 'absolute right-5 top-70% w-5 h-5 cursor-pointer',
  DIV_BUTTON_CLOSE = 'flex items-center justify-end',
  TEXT_MESSAGE = 'p-4',
  ADDRESSES = 'flex pt-4 flex-wrap',
  ADDRESSES_CONTAINER = 'flex flex-col border-2 px-5 pb-5 pt-2 rounded-lg mx-2',
  MESSAGE_H = 'block text-popup-color text-xx-s',
  CHECKBOX_BUTTON = 'flex flex-col justify-center items-center',
  LABEL_RADIO = 'text-footer-color text-xx-s font-bold',
  BUTTONS_ADDRESSES = 'flex justify-center items-center py-2',
  DELETE_BUTTON = 'pl-5',
  ADD_BUTTON = 'py-4',
  MESSAGE_HIDDEN_CARD = 'block text-profile-bg text-xx-s',
  INPUT_COUNTRY = 'flex justify-between w-full items-center py-2',
  GRID = 'grid',
  CHECKBOX_CONTAINER = 'flex flex-col justify-center gap-y-2',
  PAGE_BASKET_VIEW = 'px-3 py-5 flex flex-col gap-5 max-ms:flex-row justify-between',
  DIV_IMG_ORDER = 'w-36 h-32',
  IMG_ORDER_BASKET = 'w-full h-full object-cover',
  LIST_OF_ORDER = 'flex flex-col gap-y-3 w-full',
  PRODUCT_LINE = 'flex bg-profile-bg p-3 rounded-2xl justify-between w-full',
  ORDER_NAME_PRODUCT = 'text-xs 445px:text-sm lg-l:text-base',
  ORDER_CONTENT = 'flex flex-col justify-between items-center relative px-2 sm-s:px-0',
  ICON_PLUS = 'icon-plus w-4 h-4 text-black relative',
  ICON_MINUS = 'icon-minus w-4 h-4 text-black relative',
  INPUT_QUANTITY = 'shadow-inherit border-0 m-0 p-0 outline-0 bg-inherit text-center w-full max-w-full text-black',
  BUTTONS_CONTROL = 'arrow rounded-lg bg-white px-1 shadow-5xl flex justify-center items-center w-20',
  ORDER_PRICE = 'text-xx-s 445px:text-xs lg-l:text-sm',
  ORDER_PRICE_PRODUCT = 'text-0.65rem 445px:text-xs lg-l:text-sm',
  BASKET_DELETE = 'w-7 h-7 cursor-pointer absolute right-0 bottom-0 hover:opacity-70',
  TOTAL_CONTENT = 'flex justify-between',
  BASKET_SUMMARY = 'w-full grow flex-col gap-4',
  CLEAR_BASKET_DIV = 'flex justify-end',
  CLEAR_BASKET_IMG = 'bg-profile-bg text-red-500 text-xs mb-3 border p-1 border-red-500 border-dashed hover:opacity-50',
  BUTTON_ORDER = 'bg-red-400 text-white flex m-auto mt-5 py-1 px-3 rounded-md hover:text-white hover:decoration-white hover:underline',
  TOTAL_PRICE_INFO = 'p-2 mb-4 rounded-lg summary flex flex-col gap-y-2',
  PROMOCODE = 'text-center text-white promocode',
  PROMOCODE_INPUT = 'w-9/12 mr-2.5 outline-0 rounded px-1',
  PROMOCODE_ELEMENTS = 'flex justify-center items-center',
  PADDING = 'px-2',
  PADDING_MAIN_CONTENT = 'p-3',
  PARAGRAPH_MAIN_CONTENT = 'indent-7 text-justify p-3 font-mono-s sm-ss:text-lg lg-l:text-xl 1200px:text-2xl bg-profile-bg bg-opacity-80 rounded-2xl',
  PARAGRAPH_MAIN_CONTENT_IMG = 'mx-auto',
  DIV_CAT_IMAGE_AND_TEXT = '900px:flex items-center',
  MAIN_CONTENT_TITLE = 'py-6 text-sm flex justify-center font-serif-s font-bold sm-ss:text-xl lg-l:text-2xl 1200px:text-3xl',
  TOTAL_PRICE = 'text-0.7rem text-center sm-s:text-xs',
  DIV_EMPTY = 'w-full text-center max-w-xs absolute top-50% left-50% form flex flex-col gap-y-2 text-2xl text-gray-700',
  DIV_IMG_BASKET_EMPTY = 'flex justify-center',
  BUTTON_CATALOG_BASKET_EMPTY = 'text-sm bg-red-400 text-white m-3 py-1 px-3 rounded-md hover:text-white hover:decoration-white hover:underline hover:bg-red-500',
  IMG_BASKET_EMPTY = 'basket-empty',
  SWIPER_MAIN_PAGE = 'swiper w-full rounded-xl swiper-horizontal',
  SWIPER_SLIDE_IMG = 'w-full object-cover',
  PADDING_PROMOCODE_SLIDER = 'px-3 pb-6 flex justify-center m-auto max-w-5xl',
  BUTTONS_MAIN_VIEW = 'text-form-color text-xs mr-2 py-2 900px:text-sm 1200px:text-base 2xl:text-lg hover:underline',
  MARGIN_AUTO_IMG = 'm-auto max-w-full',
  MAIN_CONTENT = 'p-3 flex gap-x-1 flex-col justify-center 515px:flex-row 515px:gap-x-3 rounded-2xl',
  DIV_BLOCK = '515px:w-1/3 font-mono-s sm-ss:text-lg lg-l:text-xl 1200px:text-2xl',
  PARAGRAPH_MORE_MAIN_CONTENT = 'py-5 text-center bg-profile-bg bg-opacity-80 mt-3',
  SWIPER = 'swiper',
  SWIPER_SLIDE = 'swiper-slide',
  SWIPER_SLIDE_W_FIT = 'swiper-slide-fit-w',
  SWIPER_WRAPPER = 'swiper-wrapper',
  SWIPER_PAGINATION = 'swiper-pagination',
  SWIPER_PRELOADER = 'swiper-lazy-preloader swiper-lazy-preloader-black',
  FOLLOW_US_TITLE = 'flex mb-7px',
  FOLLOW_US_DIV = 'flex justify-between items-center gap-x-2 max-w-xs',
  DIV_FOOTER_LINKS = 'flex items-center',
  DIV_FOOTER_ICONS = 'flex items-center justify-between pr-14',
  COPYRIGHT_TEXT = 'text-black text-0.65rem opacity-80 mr-2 2xl:text-xx-s',
  FOOTER_ICONS = 'flex justify-between w-full items-center opacity-100 gap-x-2',
  FOOTER_ICON_HOVER = 'opacity-70 hover:opacity-100',
  FOOTER_BLOCK = 'flex flex-col items-center gap-y-1',
  BUTTONS_CATALOG_ABOUT_FOOTER = 'w-16 text-white opacity-70 text-xx-s lg-l:text-sm 2xl:text-sm hover:underline hover:opacity-100',
  DIV_BIOGRAPHY = 'flex flex-col items-center gap-y-3 gap-x-3 465px:flex-row 465px:items-stretch leading-normal text-white text-justify text-opacity-70',
  DIV_CARDS = 'flex-wrap flex justify-evenly gap-x-2 gap-y-4 1462px:flex-nowrap',
  LINK_TITLE_TO_GITHUB = 'text-base 900px:text-lg leading-normal text-white text-justify text-opacity-70',
  LINK_TO_GITHUB = 'text-base 900px:text-lg leading-normal text-white text-justify text-opacity-70 hover:underline hover:text-opacity-100',
  BIOGRAPHY_VIEW = 'text-sm 900px:text-base bg-black bg-opacity-70 flex flex-col gap-y-3 justify-between rounded-t-xl 1207px:rounded-b-xl 1207px:rounded-t-none p-3',
  BIOGRAPHY_VIEW_ROUNDED_TOP = 'text-sm 900px:text-base bg-black bg-opacity-70 flex flex-col gap-y-3 justify-between rounded-t-xl p-3',
  CONTRIBUTION_CONTENT = 'text-sm 900px:text-base bg-blue-color opacity-80 rounded-b-xl 1207px:rounded-t-xl 1207px:rounded-b-none p-3 h-full',
  CONTRIBUTION_CONTENT_ROUNDED_B = 'text-sm 900px:text-base bg-blue-color opacity-80 rounded-b-xl p-3',
  CARD_MEMBER_CONTAINER = 'flex flex-col-reverse 1207px:flex-col justify-between max-w-580px',
  CARD_MEMBER_CONTAINER_REVERSE = 'flex flex-col-reverse justify-between h-full max-w-580px',
  CONTRIBUTION_TOTAL = 'bg-bg-about opacity-70 mt-10 rounded-xl p-3 gap-x-3',
  TOTAL_ITEMS = 'flex items-center gap-y-5 flex-wrap 1207px:flex-nowrap gap-x-8',
  CONTRIBUTION_TEXT = 'text-justify indent-4 1207px:text-center',
  LOGO_RS = 'w-full flex items-center',
  CONTRIBUTION_LIST = 'list-disc ml-2 p-2',
  CONTRIBUTION_TEXT_P = 'indent-4',
  CONTRIBUTION_TITLE = 'text-center underline',
  BACKGROUND_RED = 'bg-red-400',
  BACKGROUND_GRAY = 'bg-gray-500',
}
