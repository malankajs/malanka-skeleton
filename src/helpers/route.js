/**
 * Build URL by route params
 *
 * @param {string} name
 * @param {{}} hash
 */
export default function route(name, {hash}) {
    return this.getEnv().router.reverse(name, hash);
}