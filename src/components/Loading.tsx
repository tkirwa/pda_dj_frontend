import React from 'react';
// import { Segment } from 'semantic-ui-react';
// import { Loader } from 'semantic-ui-react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading: React.FC = () => {
  return (
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>
  );
};

export default Loading;
