
/* Actions can alter the state of the store.
 * They can
 * 1) be asynchronous, and
 * 2) call mutations (unlike mutations themselves), and
 * 3) call getters (unlike mutations), and
 * 4) call other actions
 *
 * As a guideline, you should create a mutation if you can. If not, you can create an action instead.
 * Actions can also be a sort of wrappers that call multiple mutations.
 *
 * They can be used by calling
 *      this.$store.dispatch('actionName', payload)
 *
 * Payload should contain one or multiple parameter values. For example:
 *      payload = {
 *          index: i,
 *          newList: latLng
 *      }
 */
export const actions = {

};

export default actions;