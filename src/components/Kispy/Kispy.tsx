import React, { useEffect, useState } from 'react';
//mp3
import kispymeow from './audio/kispymeow.mp3';
//img
import kispyPng1 from './img/kispyPng1.png';
import kispyPng2 from './img/kispyPng2.png';
import kispyPng3 from './img/kispyPng3.png';
import kispyPng4 from './img/kispyPng4.png';
import kispyPng5 from './img/kispyPng5.png';
import kispyPng6 from './img/kispyPng6.png';
import kispyPng7 from './img/kispyPng7.png';
import kispyPng8 from './img/kispyPng8.png';

const imgArray = [
  kispyPng1,
  kispyPng2,
  kispyPng3,
  kispyPng4,
  kispyPng5,
  kispyPng6,
  kispyPng7,
  kispyPng8,
];

export interface Props {
  optional?: boolean;
  required: string;
}
export const Kispy: React.FC<Props> = ({ optional = true, required }) => {
  const kispyMeow = new Audio(kispymeow);

  const [img, setImg] = useState(imgArray[0]);
  const [frame, setFrame] = useState(0);
  const spinHead = () => {
    console.log('frame', frame);
    const interval = 50;
    let promise = Promise.resolve();
    imgArray.forEach((el, i) => {
      promise = promise.then(() => {
        const imgIndex = i;

        setImg(imgArray[imgIndex]);
        return new Promise((resolve) => {
          setTimeout(resolve, interval);
        });
      });
    });
  };

  useEffect(() => {
    spinHead();
  }, []);
  return (
    <>
      <div>
        <button
          onClick={() => {
            kispyMeow.play();
            spinHead();
          }}
        >
          kispyMeow
        </button>
        <img src={img} />
      </div>
    </>
  );
};
