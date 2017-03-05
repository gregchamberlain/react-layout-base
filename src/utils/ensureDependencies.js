// @flow
import LayoutState from '../model/LayoutState';

/**
 * Ensures the component dependencies for the layoutState have been met
 * @param {LayoutState} layoutState 
 * @param {Object} components 
 */
const ensureDependencies = (layoutState: LayoutState, components: Object): void => {
  const dependencies = layoutState.getDependencies();
  const unmet = [];
  dependencies.forEach(dependency => {
    const isCustomComponent = dependency[0] !== dependency[0].toLowerCase();
    if (isCustomComponent && !components[dependencies]) {
      unmet.push(dependency)
    }
  });
  if (unmet.length) {
    console.error(`Unmet Component Dependencies: ${unmet.join(', ')} ${unmet.length > 1 ? 'are' : 'is'} needed, and not provided.`)
  }
};

export default ensureDependencies;