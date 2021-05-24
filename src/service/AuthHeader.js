export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user) {
      return { 'x-access-token': user };
    } else {
      return {};
    }
}