import dictionary from '../context/errors.json';

const lang = 'ru';

const {
    authDefault,
    rangeDefault,
    serverDefault,
    requestDefault,
    notFoundDefault,
    conflictDefault,
    forbiddenDefault,
    validationDefault,
} = dictionary[lang];

export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class RequestError extends AppError {
    constructor(message: string = requestDefault) {
        super(message, 400);
    }
}

export class AuthError extends AppError {
    constructor(message: string = authDefault) {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = forbiddenDefault) {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = notFoundDefault) {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = conflictDefault) {
        super(message, 409);
    }
}

export class RangeNotSatisfiableError extends AppError {
    constructor(message: string = rangeDefault) {
        super(message, 416);
    }
}

export class UnprocessableEntityError extends AppError {
    constructor(message: string = validationDefault) {
        super(message, 422);
    }
}

export class ServerError extends AppError {
    constructor(message: string = serverDefault) {
        super(message, 500);
    }
}

/**
 * Returns a 400 Bad Request response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Произошла ошибка при обработке запроса".
 * @returns {Response} A Response object with a 400 status code and the
 *   message in the body.
 */

/**
 * Returns a 401 Unauthorized response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Ошибка авторизации".
 * @returns {Response} A Response object with a 401 status code and the
 *   message in the body.
 */

/**
 * Returns a 403 Forbidden response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Не достаточно прав для выполнения данного действия".
 * @returns {Response} A Response object with a 403 status code and the
 *   message in the body.
 */

/**
 * Returns a 404 Not Found response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Страница не найдена".
 * @returns {Response} A Response object with a 404 status code and the
 *   message in the body.
 */

/**
 * Returns a 409 Conflict response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Кофликт запроса. Попробуйте ещё раз".
 * @returns {Response} A Response object with a 409 status code and the
 *   message in the body.
 */

/**
 * Returns a 416 Range Not Satisfiable response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Значение вне диапазона допустимых значений".
 * @returns {Response} A Response object with a 416 status code and the
 *   message in the body.
 * */

/**
 * Returns a 422 Unprocessable Entity response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Невалидные данные".
 * @returns {Response} A Response object with a 422 status code and the
 *   message in the body.
 */

/**
 * Returns a 500 Internal Server Error response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Произошла ошибка на сервере".
 * @returns {Response} A Response object with a 500 status code and the
 *   message in the body.
 */
