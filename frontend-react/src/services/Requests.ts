// just one more abstraction bro :D

/**
 * Sends a request to the specified path with the given options.
 * @param {string} path - The URL path to send the request to.
 * @param {Object} [options={}] - The options to use for the request.
 * @returns {Promise<Response>} A promise that resolves to the response of the request.
 */
function request(path: string, options: any = {}): Promise<Response> {
    return fetch(path, options);
}

/**
 * Sends an authorized request to the specified path with the given options.
 * Adds an Authorization header with a Bearer token if available.
 * @param {string} path - The URL path to send the request to.
 * @param {Object} [options={}] - The options to use for the request.
 * @returns {Promise<Response>} A promise that resolves to the response of the request.
 */
function authorizedRequest(path: string, options: any = {}): Promise<Response> {
    const token = localStorage.getItem("token");
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return request(path, options);
}

export { request, authorizedRequest };