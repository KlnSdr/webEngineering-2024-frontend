// just one more abstraction bro :D
function request(path: string, options: any = {}): Promise<Response> {
    return fetch(path, options);
}

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