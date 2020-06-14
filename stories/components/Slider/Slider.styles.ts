import styled from 'styled-components';

export const SliderContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  input[type="range"] {
    width: 100%;
    margin: 5px 0;
    background-color: transparent;
    -webkit-appearance: none;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    background: #000000;
    border: 0;
    border-radius: 10px;
    width: 100%;
    height: 5px;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-thumb {
    margin-top: -5px;
    width: 15px;
    height: 15px;
    background: #ffffff;
    border: 0.2px solid rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #050505;
  }
  input[type="range"]::-moz-range-track {
    background: #000000;
    border: 0;
    width: 100%;
    height: 5px;
    cursor: pointer;
  }
  input[type="range"]::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #ffffff;
    border: 0.2px solid rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 6px 0;
    color: transparent;
    width: 100%;
    height: 5px;
    cursor: pointer;
  }
  input[type="range"]::-ms-fill-lower {
    background: #000000;
    border: 0;
  }
  input[type="range"]::-ms-fill-upper {
    background: #000000;
    border: 0;
  }
  input[type="range"]::-ms-thumb {
    width: 15px;
    height: 15px;
    background: #ffffff;
    border: 0.2px solid rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: #000000;
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: #050505;
  }
  /*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
  how to remove the virtical space around the range input in IE*/
  @supports (-ms-ime-align: auto) {
    /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
    input[type="range"] {
      margin: 0;
      /*Edge starts the margin from the thumb, not the track as other browsers do*/
    }
  }
`;
