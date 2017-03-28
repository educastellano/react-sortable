import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/sortable');
  // require as many stories as you need.
}

configure(loadStories, module);