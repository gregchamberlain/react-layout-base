import LayoutState from '../../model/LayoutState';
import * as ACTIONS from '../../actions';

const layoutState = (state = new LayoutState('div'), action) => {
  switch (action.type) {
    case ACTIONS.SET_LAYOUT_STATE:
      return action.layoutState;
    default:
      return state;
  }
}

export default layoutState;