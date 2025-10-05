import React, { useState } from "react";
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
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import {
  setCalibrate,
  getInitialCalibrate,
  getFactorFromPercent,
} from "services/calibrate-service";
import BackButton from "components/BackButton";
import { checkMobile } from "utils/utils";

const Settings = () => {
  const { initialFactor, xDir: xAxis, yDir: yAxis } = getInitialCalibrate();

  const isMobile = checkMobile();

  const [sliderValue, setSliderValue] = useState(initialFactor);
  const [xDir, setxDir] = useState(xAxis > 0 ? false : true);
  const [yDir, setyDir] = useState(yAxis > 0 ? false : true);

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
    console.log("debug factor", factor);
    setCalibrate({ factor });
    setSliderValue(value);
  };

  return (
    <>
      <BackButton />
      <Flex
        w="100%"
        h="100%"
        p={`${isMobile ? "50px 100px" : "50px 40%"}`}
        direction="column"
        align="center"
        justify="center"
      >
        <UnorderedList>
          <ListItem>
            If the object moves opposite as expected in the horizonal or
            vertical directions, switch the toggles
          </ListItem>
          <ListItem>Adjust the speed by moving the slider</ListItem>
        </UnorderedList>
        <Flex
          w={`${isMobile ? "100%" : "40%"}`}
          direction={"column"}
          align="center"
          justify="center"
        >
          <FormControl
            m={50}
            display="flex"
            alignItems="center"
            justifyContent="space-around"
          >
            <FormLabel w={200} htmlFor="x-dir" mb="0">
              horizontal
            </FormLabel>
            <Switch size="lg" id="x-dir" isChecked={xDir} onChange={handleX} />
          </FormControl>
          <FormControl
            m={50}
            display="flex"
            alignItems="center"
            justifyContent="space-around"
          >
            <FormLabel w={200} htmlFor="y-dir" mb="0">
              vertical
            </FormLabel>
            <Switch size="lg" id="y-dir" isChecked={yDir} onChange={handleY} />
          </FormControl>
        </Flex>
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
