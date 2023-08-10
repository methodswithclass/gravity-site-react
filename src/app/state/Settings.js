import React, { useState } from 'react';
import {
  Switch,
  FormControl,
  FormLabel,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import {
  setCalibrate,
  getInitialCalibrate,
  getFactorFromPercent,
} from 'accelerometer/utils/calibrate';
import { useNavigate } from 'app/services/state.service';
import Button from 'app/components/Button';
import { checkMobile } from 'app/utils/utils';

const Settings = () => {
  const { initialFactor, xDir: xAxis, yDir: yAxis } = getInitialCalibrate();

  const isMobile = checkMobile();

  const navigate = useNavigate();

  const [sliderValue, setSliderValue] = useState(initialFactor);
  const [xDir, setxDir] = useState(xAxis > 0 ? false : true);
  const [yDir, setyDir] = useState(yAxis > 0 ? false : true);

  const handleHome = () => {
    navigate('home');
  };

  const handleX = (e) => {
    const value = e.target.checked;
    setxDir(value);
    setCalibrate({ xDir: value ? -1 : 1 });
  };

  const handleY = (e) => {
    const value = e.target.checked;
    setyDir(value);
    setCalibrate({ yDir: value ? -1 : 1 });
  };

  const handleFactor = (value) => {
    const factor = getFactorFromPercent(value);
    console.log('debug factor', factor);
    setCalibrate({ factor });
    setSliderValue(value);
  };

  return (
    <>
      <Button title="Home" onClick={handleHome} classNames={`blue-back`} />
      <Flex
        w="100%"
        h="100%"
        p={`${isMobile ? '50px 100px' : '50px 40%'}`}
        direction="column"
        align="center"
        justify="center"
      >
        <FormControl
          m={50}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FormLabel htmlFor="x-dir" mb="0">
            x-dir
          </FormLabel>
          <Switch size="lg" id="x-dir" isChecked={xDir} onChange={handleX} />
        </FormControl>
        <FormControl
          m={50}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FormLabel htmlFor="y-dir" mb="0">
            y-dir
          </FormLabel>
          <Switch size="lg" id="y-dir" isChecked={yDir} onChange={handleY} />
        </FormControl>

        <FormControl
          m={50}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FormLabel htmlFor="y-dir" mb="0">
            speed
          </FormLabel>
          <Slider defaultValue={initialFactor} onChange={handleFactor}>
            <SliderMark
              value={sliderValue}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            >
              {sliderValue}%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
      </Flex>
    </>
  );
};

export default Settings;
