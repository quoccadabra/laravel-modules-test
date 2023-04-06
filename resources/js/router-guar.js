import Cookies from "js-cookie";

const hashRoute = (to) => {
    if (Object.keys(to.query).length) {
        return {
            path: to.path,
            query: {},
            hash: to.hash
        }
    }
};

const decodeRoute = (to) => {
    if (to.hash) {
        return {
            path: to.path,
            query: to.query,
            hash: ''
        }
    }
}
const authMiddleware = (to, from, next) => {
    console.log('Router guard');
    if (Cookies.get('token')) {
        return next()
    }
    return from();
}
export default {
    hashRoute: hashRoute,
    decodeRoute: decodeRoute,
    authMiddleware
}