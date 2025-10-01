"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.unprocessableEntity = exports.rangeNotSatisfiable = exports.conflictError = exports.notFound = exports.forbiddenError = exports.authError = exports.requestError = void 0;
const errors_json_1 = __importDefault(require("../context/errors.json"));
const lang = "ru";
const { authDefault, rangeDefault, serverDefault, requestDefault, notFoundDefault, conflictDefault, forbiddenDefault, validationDefault, } = errors_json_1.default[lang];
const createError = (message, errorCode) => {
    if (!message || typeof message !== "string") {
        throw new Error("Message should be a string");
    }
    if (typeof errorCode !== "number" || errorCode < 400 || errorCode > 599) {
        throw new Error("Error code should be a number between 400 and 599");
    }
    return new Response(JSON.stringify({ message, code: errorCode }), {
        status: errorCode,
        headers: { "Content-Type": "application/json" },
    });
};
const requestError = (message = requestDefault) => createError(message, 400);
exports.requestError = requestError;
const authError = (message = authDefault) => createError(message, 401);
exports.authError = authError;
const forbiddenError = (message = forbiddenDefault) => createError(message, 403);
exports.forbiddenError = forbiddenError;
const notFound = (message = notFoundDefault) => createError(message, 404);
exports.notFound = notFound;
const conflictError = (message = conflictDefault) => createError(message, 409);
exports.conflictError = conflictError;
const rangeNotSatisfiable = (message = rangeDefault) => createError(message, 416);
exports.rangeNotSatisfiable = rangeNotSatisfiable;
const unprocessableEntity = (message = validationDefault) => createError(message, 422);
exports.unprocessableEntity = unprocessableEntity;
const serverError = (message = serverDefault) => createError(message, 500);
exports.serverError = serverError;
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
