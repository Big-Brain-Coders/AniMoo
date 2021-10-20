import PropTypes from 'prop-types';
import { Slide } from 'pure-react-carousel';
import React from 'react';
import { Card } from 'semantic-ui-react';

const CustomCardSlide = ({ index, ...cardProps }) => (
  <Slide index={index}>
    <div style={{ padding: 50, width: 'max-width' }}>
      <Card fluid {...cardProps} />
    </div>
  </Slide>
);

CustomCardSlide.propTypes = {
  index: PropTypes.number.isRequired,
};

export default CustomCardSlide;
