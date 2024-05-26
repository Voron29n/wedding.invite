export const API = {
  HEALTH: '/health',
  ADMIN_ACCESS: {
    GUESTS: '/api/data/guests',
    ADMINS: '/api/data/admins',
    INVITE_GROUPS: '/api/data/inviteGroups'
  },
  GUEST_ACCESS: {
    INVITE_INFO: '/api/data/inviteInfo'
  },
  AUTH: '/api/data/auth'
};

export const AUTH = {
  AUTHORIZATION_HEADER: 'authorization',
  BEARER: 'Bearer',
  AUTH_ID_HEADER: 'x-user-id',
  AUTH_ROLE_HEADER: 'x-user-role'
};

export const ERROR_MESSAGES = {
  NOT_AUTHORIZED: 'User is not authorized',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_INVITE_ID: 'Invalid invite Id',
  EMAIL_NOT_VALID: 'Email is not valid',
  USER_NOT_EXISTED: 'User is not existed',
  MUST_AUTHORIZED_USER: 'You must be authorized user',
  INVALID_TOKEN: 'Invalid token',
  ACCESS_DENIED: 'Access denied',
  CART_IS_EMPTY: 'Cart is empty',
  CART_WAS_NOT_FOUND: 'Cart was not found',
  CART_CAN_NOT_SAVE: 'Cart was not saved',
  CART_ITEM_CAN_NOT_SAVE: 'Cart item was not saved',
  USER_CAN_NOT_SAVE: 'User was not saved',
  ORDER_CAN_NOT_SAVE: 'Order was not saved',
  CART_CAN_NOT_REMOVED: 'Cart was not removed',
  NO_PRODUCT_WITH_SUCH_ID: 'No product with such id',
  PRODUCT_NOT_VALID: 'Products are not valid',
  PRODUCTS_NOT_EXIST: 'Products are not exist',
  DB_FAILED: 'Temporary problems with Data base',
  guest: {
    GUEST_ALREADY_EXIST: 'Guest with the same data exists',
    GUEST_NOT_EXISTED: "Guest with provided Id doesn't exist",
    GUEST_SAVING_ERROR: 'Guest was not saved'
  },
  admin: {
    ADMIN_ALREADY_EXIST: 'Admin with the same data exists',
    ADMIN_NOT_EXISTED: "Admin with provided Id doesn't exist"
  },
  inviteGroup: {
    INVITE_GROUP_ALREADY_EXIST: 'Invite group with the same data exists',
    INVITE_GROUP_NOT_EXISTED: "Invite group with provided Id doesn't exist",
    INVITE_GROUP_SAVING_ERROR: 'Invite group was not saved'
  }
};

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 32
};
