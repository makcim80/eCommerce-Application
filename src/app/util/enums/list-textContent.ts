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
  TEXT_ADDRESS = 'ADDRESS is successfully updated',
  TEXT_PASSWORD_ERROR = 'The entered passwords do not match',
  TEXT_PASSWORD_ERROR_2 = 'The given current password does not match',
  TEXT_PASSWORD_ERROR_3 = 'The field "Country" is required',
  TEXT_POSTCODE = 'Must follow the format for the country',
  DEFAULT = 'default',
  SHIPPING = 'Shipping',
  BILLING = 'Billing',
  SHIPPING_DEFAULT = 'Shipping(default)',
  BILLING_DEFAULT = 'Billing(default)',
  TOTAL = 'TOTAL',
  ORIGINAL_PRICE = 'Original price',
  ORDER = 'Order',
  DISCOUNT = 'Discount',
  CLEAR_BASKET = 'Clear basket',
  PROMO_CODE = 'PROMO CODE',
  BASKET_EMPTY = 'Your cart is empty... Find the products you need in the catalog',
  SWIPER_ERR = 'swiperSliderHTMLElement is null!',
  MAIN_CONTENT_TITLE = 'A LITTLE ABOUT US',
  MAIN_CONTENT = `  Our shop is a marketplace for the sale of kittens. We make the process of adoption and relocation as fast and easy as possible. 
  Our furry friends are unique. They are kept healthy by being fed natural vitamin-filled meals. We are delighted to choose and bring your
  new kittens to you and help them  get accustomed to a new family. We are also glad to advise our customers on all matters. The main aim of our
  company is to take care of our furry friends by matching them with a perfectly loving home. We pride ourselves in finding the best cats for our
  clients in the most hassle free way possible. Let us help you find your most desired companion!`,
  MAIN_CONTENT_TITLE_INFORMATION = 'HOW TO BUY A KITTEN?',
  KITTEN1 = 'We choose responsible cat breeders from across the country as per your location.',
  KITTEN2 = 'Our cat professionals assist you in choosing the perfect kitty.',
  KITTEN3 = 'Your furry family member arrives at your door step with our delivery executive.',
  DARYA_BIOG = 'DARYA - a beginner front-end developer, 23 years old. She have an incomplete higher education in chemical technology. She left pre-graduate internship when she realized chemistry was not for her and wanted to connect her life with programming.',
  MAKSIM_BIOG = 'MAKSIM - a beginner front-end developer, 42 years old. His way in the field of information technology began in September 2022. He is married, have two children, got higher education. Graduated from Belarusian National Technical University as mechanical engineer',
  YULIYA_BIOG = 'YULIYA - a beginner front-end developer, 32 years old. She got a higher education in the Belarusian National Technical University and became a manager-economist. Her way in Information Technology field started in December 2022 and she is interested in it',
  LINK_TO_GITHUB = 'Link to Github: ',
  DARYA_GIT = 'https://github.com/IgnisVulpe',
  MAKSIM_GIT = 'https://github.com/makcim80',
  YULIYA_GIT = 'https://github.com/yuliya241',
  CONTRIBUTION_TITLE = 'Сontribution to the project',
  DARYA_P = 'Darya is a member of the team. She was responsible for the following tasks:',
  MAKSIM_P = 'Maksim is a leader of the team. He was responsible for the following tasks:',
  YULIYA_P = 'Yuliya is a member of the team. She was responsible for the following tasks:',
  TOTAL_1 = `Everyone played a significant role in creating a project. Having clear functions and responsibilities, 
  we knew exactly what we were doing and work more efficiently. To complete the project successfully, our team
  organized meetups every day, where we discussed the current progress of each member of the team, listen
  carefully different points of view , distributed new tasks and resolved emerging issues. The key role, of
  course, played a team leader who provide the team with direction and support. Thanks to our well-coordinated
  work, we have successfully completed our online store!`,
  TOTAL_2 = `We express our gratitude to RS School for this educational program, for the responsive mentors 
  and trainers and the acquired skills.Everyone can study at RS School, regardless of age, professional
  employment, or place of residence. So we recommended you to join the training visiting the official website
  of RS School`,
  DARYA_CONTRIBUTION_CONTENT = `
  <li>create a README file</li>
  <li>repository setup</li>
  <li>development environment configuration</li>
  <li>commerceTools project and API client setup</li>
  <li>routing setup</li>
  <li>implement a 404 (Not Found) page for invalid route requests</li>
  <li>login page: modal window successful or unsuccessful authorization</li>
  <li>registration page: modal window successful or unsuccessful registration</li>
  <li>add products and configure their parameters in Commercetools</li>
  <li>catalog page: Interactive</li>
  <li>implement an image slider for product images</li>
  <li>detailed product: enlarged Image modal with slider</li>
  <li>detailed product: create page and product Information</li>
  <li>lazy loading</li>
  <li>catalog page: pagination</li>
  <li>catalog page: performance optimization</li>
  <li>include an "Add to Cart" button on each product card</li>
  `,
  MAKSIM_CONTRIBUTION_CONTENT = `
  <li>repository setup</li>
  <li>setting up a task board on Github</li>
  <li>development scripts</li>
  <li>routing setup</li>
  <li>development environment configuration</li>
  <li>main page: centralized navigation</li>
  <li>registration page: modal window successful or unsuccessful registration</li>
  <li>login page: navigation to registration page</li>
  <li>login page: integration with Auth Serv</li>
  <li>login page: redirection</li>
  <li>login page: handle authentication token</li>
  <li>registration page: management AutoLogin redirection</li>
  <li>registration page: navigation to login page</li>
  <li>registration page: Integration with Auth Serv</li>
  <li>catalog page: navigation</li>
  <li>catalog page: interactivity</li>
  <li>catalog page: filtering and sorting</li>
  <li>catalog page: list of products</li>
  <li>catalog page: implement loading indicator</li>
  <li>cart: functionality</li>
  `,
  YULIYA_CONTRIBUTION_CONTENT = `
  <li>task board setup</li>
  <li>install and setup Tailwindcss</li>
  <li>implement the main page, the login form and the registration form layouts</li>
  <li>commerceTools project and API client setup</li>
  <li>login page: input validation</li>
  <li>login page: navigation to registration page</li>
  <li>login page: integration with commercetools</li>
  <li>registration page: input validation</li>
  <li>registration page: navigation to login page</li>
  <li>registration page: integration with commercetools</li>
  <li>routing: navigation to User Profile page</li>
  <li>user profile page: display information</li>
  <li>user profile page: edit information</li>
  <li>user Profile link or button in the header</li>
  <li>implement Cart page layout</li>
  <li>implement Main page layout</li>
  <li>routing: navigation to About us page</li>
  <li>about Us page: introduction</li>
  <li>write jest tests</li>
  `,
}
