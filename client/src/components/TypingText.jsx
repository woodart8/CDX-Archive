import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TypingText = ({text, speed, fontSize, color}) => {
  TypingText.defaultProps = {
    fontSize: '8.8vw', //기본값
    color: 'black'//기본값
  }
  const [Text, setText] = useState("");
  const [Count, setCount] = useState(0);

  useEffect(() => {
    let typingText = text ? text : "";//기본값
    let typingSpeed = speed ? speed : 100;//기본값
    const interval = setInterval(() => {
        setText((Text)=>{
          let updated = Text;
          updated = Text + typingText[Count];
          return updated;
        });
        setCount(Count + 1); 
    }, typingSpeed);
    Count === typingText.length && clearInterval(interval);
    return () => clearInterval(interval);
})
  return (
    <Txt>
        <div className="content top-color">
            <span>{ Text.slice(0,7) }</span>
        </div>  
        <div className="content bottom-color">
            <span>{ Text.slice(8) }</span>
        </div>
    </Txt>
  )
};

const Txt = styled.div`
    position: absolute;
    top: 30%;
    left: 0%;

    .content {
        text-align: left;
        font-size: 6vw;
        font-weight: 800;
        font-family: sans-serif;
    }

    span {
        text-shadow: -4px 0 #fff, 0 4px #fff, 4px 0 #fff, 0 -4px #fff;
    }

    .top-color{
      color: #c3c5f1;
    }

    .bottom-color{
      color: #f1c2be;
    }

    @media screen and (max-width: 1360px) {
        left: 6%;
        .content {
            font-size: 8.7vw;
        }
    }

    @media screen and (max-width: 767px) {
        left: 14%;
    }
`;

export default TypingText;