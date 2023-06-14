import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const Home = () => {
  return (
    <div
      className=""
      style={{
        backgroundImage: "url(back.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className={`h-[100vh] w-full flex flex-col items-center justify-around`}
      >
        <img src={logo} style={{ marginTop: "200px" }} alt="2" />
        <h1 className="h-[50px] pt-[6rem] pl-11">
          <p className="font-sfdisplay  text-[1.5rem] text-[#E3DEDE] pr-12">
            Encontre as melhores Artes
          </p>
        </h1>
        <div className="flex flex-col gap-5 text-whiteLogs">
          <Link to="/criarconta">
            <div className="z-20 cursor-pointer border-solid border-2 border-[#ADAFBB] rounded-lg p-3 bg-transparent flex justify-center items-center w-[10rem]">
              <button className="text-[#E3DEDE] font-sfdisplay-medium uppercase cl z-30">
                Criar Conta
              </button>
            </div>
          </Link>
          <Link to="/entrar">
            <div className="  z-30 cursor-pointer border-solid border-2 border-[#ADAFBB] rounded-lg p-3 bg-transparent flex justify-center items-center w-[10rem]  active:border-4">
              <button className="text-[#E3DEDE] font-sfdisplay uppercase z-40 ">
                Entrar
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
