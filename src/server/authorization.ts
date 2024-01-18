
const expectedUsername = process.env.USERNAME || "dev";
const expectedPassword = process.env.PASSWORD || "dev";

const expectedHeader = btoa(expectedUsername + ":" + expectedPassword);

export function checkAuthorization(authorization: string | undefined) {
    if (!authorization) {
        return false;
    }
    if (!authorization.startsWith("Basic")) {
        return false;
    }
    return authorization.substring(6) === expectedHeader;
}