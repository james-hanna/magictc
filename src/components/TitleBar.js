import React from "react";
import cards from "../icons/cards.png";

export default function TitleBar(props) {
  return (
    <div className="flex">
      <img
        class="hover:scale-125 my-5 ml-10"
        src={cards}
        alt="hamburger-icon"
        onClick={() => props.setOpenNav(!props.openNav)}
      />
      <h1 class="m-auto">Big Money Magic Simulator</h1>
    </div>
  );
}
