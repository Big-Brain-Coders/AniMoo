import { CarouselProvider, Image, Slide, Slider } from 'pure-react-carousel';
import React from 'react';
import { Divider } from 'semantic-ui-react';

import CustomDotGroup from '../components/CustomDotGroup';

const ImageCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={5}
    naturalSlideHeight={2}
    totalSlides={3}
  >
    <Slider>
      <Slide tag="a" index={0}>
        <Image src="/images/bannerTitle.png" />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src="/images/banner.png" />
      </Slide>
      <Slide tag="a" index={2}>
        <Image src="https://lorempixel.com/800/800/cats/2" />
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={3} />
  </CarouselProvider>
);

export default ImageCarousel;
