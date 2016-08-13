/**
 * Check if route is active
 *
 * @param {string} route
 *
 * @returns {ValueProxy}
 */
export default function isRoute(route) {
    return this.getEnv().router.isRoute(route);
}