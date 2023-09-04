export const enum ListTextContent {
  PLACEHOLDER = 'Placeholder',
  COPYRIGHT = '© Copyright 2023',
  SIGN_UP = 'Sign up',
  SIGN_IN = 'Sign in',
  EMAIL = 'EMAIL*',
  PASSWORD = 'PASSWORD*',
  LOGIN = 'LOGIN',
  ADDRESS = 'STREET',
  BIRTHDAY = 'DATE OF BIRTH*',
  LAST_NAME = 'LAST NAME',
  FIRST_NAME = 'FIRST NAME',
  COUNTRY = 'COUNTRY*',
  CITY = 'CITY',
  POST = 'POSTCODE',
  SHIPPING_ADDRESS = 'Shipping address as default',
  BILLING_ADDRESS = 'Billing address as default',
  BOTH_ADDRESS = 'Also used as billing address',
  ERROR_404_HEADING = 'ERROR 404',
  ERROR_404_DESCRIPTION = 'The requested URL was not found on this server.',
  ERROR_404_BUTTON = 'Go to main page',
  GO_TO_LOGIN_BUTTON = 'Go to the Login page',
  GO_TO_REGISTRATION_BUTTON = `Don't have an account? Sign up`,
  INVALID_EMAIL = 'Invalid email',
  INVALID_PASSWORD = 'Invalid password',
  INVALID_STREET = 'Invalid street',
  INVALID_AGE = 'less than 13 years',
  INVALID_CITY = 'Invalid city',
  INVALID_NAME = 'Invalid name',
  INVALID_POSTCODE = 'Invalid postcode',
  INVALID_LASTNAME = 'Invalid last name',
  MODAL_LOGIN_HEADING_SUCCESSFUL = 'Authenticated',
  MODAL_LOGIN_DESCRIPTION_SUCCESSFUL = 'Login successful!',
  MODAL_LOGIN_HEADING_ERROR = 'Invalid credentials',
  MODAL_LOGIN_DESCRIPTION_ERROR = 'Incorrect email or password!',
  MODAL_REGISTRATION_HEADING_SUCCESSFUL = 'Registration successful',
  MODAL_REGISTRATION_DESCRIPTION_SUCCESSFUL = 'User successfully created!',
  MODAL_REGISTRATION_HEADING_ERROR = 'Invalid user data',
  MODAL_REGISTRATION_DESCRIPTION_ERROR = 'Error while filling fields!',
  LOGOUT = 'Logout',
  MY_PROFILE = 'Profile',
  CATALOG = 'Catalog',
  ABOUT_US = 'About us',
  PRICE = 'Price',
  SEX = 'Sex',
  APPLY = 'Apply',
  RESET = 'Reset',
  AGE = 'Age',
  COLOR = 'Color',
  TYPE = 'Type',
  SHORT_HAIRED = 'Shorthaired',
  LONG_HAIRED = 'Longhaired',
  SIAMESE_ORIENTAL_SHORT_HAIR = 'Siamese Oriental Shorthair',
  SEMI_LONG_HAIR = 'Semi-Longhair',
  ARROW_DOWN = '▼',
  ARROW_UP = '▲',
  SORTING = 'Sorting:',
  SEARCH = 'Search:',
  CATEGORY = 'Category:',
  SUBCATEGORY = 'Subcategory:',
  FIRST_NAME_PROFILE = 'First name',
  LAST_NAME_PROFILE = 'Last name',
  EMAIL_PROFILE = 'Email',
  PASSWORD_PROFILE = 'Password',
  STREET_PROFILE = 'Street',
  BIRTHDAY_PROFILE = 'Date of birth',
  COUNTRY_PROFILE = 'Country*',
  CITY_PROFILE = 'City',
  POST_PROFILE = 'Postalcode',
  GREEN = 'green',
  RED = 'red',
  INHERIT = 'inherit',
  EDIT = '✎ Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel',
  MESSAGE_NAME = 'Must contain at least one character and no special characters or numbers',
  MESSAGE_EMAIL = `Must contain a domain name, an @ symbol,be properly formatted and mustn't contain whitespace`,
  MESSAGE_PASSWORD = 'Must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  MESSAGE_STREET = 'Must contain at least one character',
  MESSAGE_COUNTRY = 'Must be a valid country from a predefined list or autocomplete field',
  CHANGE_PASSWORD = 'Change password',
  CURRENT_PASSWORD = 'CURRENT PASSWORD',
  NEW_PASSWORD = 'NEW PASSWORD',
  CONFIRM_PASSWORD = 'CONFIRM PASSWORD',
  CLOSE_BUTTON_ERROR = '❌',
  CLOSE_BUTTON = '❎',
  ADD_ADDRESS_BUTTON = 'ADD ADDRESS ➕',
  TEXT_FIRST_NAME = 'Name is successfully updated',
  TEXT_LAST_NAME = 'Last name is successfully updated',
  TEXT_BIRTHDAY = 'Date of birth is successfully updated',
  TEXT_EMAIL = 'Email is successfully updated',
  TEXT_PASSWORD = 'Password is successfully updated',
  TEXT_PASSWORD_ERROR = 'The entered passwords do not match',
  TEXT_PASSWORD_ERROR_2 = 'The given current password does not match',
  TEXT_PASSWORD_ERROR_3 = 'The field "Country" is required',
  TEXT_POSTCODE = 'Must follow the format for the country',
  DEFAULT = 'default',
  SHIPPING = 'Shipping',
  BILLING = 'Billing',
  SHIPPING_DEFAULT = 'Shipping(default)',
  BILLING_DEFAULT = 'Billing(default)',
}
