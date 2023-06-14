import React, { useEffect, useState } from "react";
import { Carteira } from "../assets/Carteira";
import { Btn } from "./Extra/Btn";
import { useHistory } from "react-router-dom";
import { NavBar } from "./Extra/NavBar";
import metodos from "../assets/metodos.png";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export const CarteiraRota = () => {
  const [state, setState] = useState(0);
  const [nextState, setNextState] = useState(0);
  const history = useHistory();

  async function getUser() {
    const res = await fetch(`/api/users/profile`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });

    if (res.status === 200) {
      const body = await res.json();
      setState(body.carteira);
    } else {
      history.push("/");
    }
  }

  useEffect(() => {
    getUser();
    atualizarCarteira();
  }, []);

  const handleDinheiro = (e) => {
    setNextState(Number(e.target.value));
  };

  async function atualizarCarteira() {
    const res = await fetch("/api/users/deposit", {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deposit: nextState }),
    });
    if (res.status === 200) {
      const body = await res.json();
      setState(body.carteira);
    } else {
    }
  }

  const handleSubmit = () => {
    setNextState(0);
    atualizarCarteira();
  };

  const modal = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirma",
      message: "Tens a certeza que queres depositar dinheiro à carteira?",
      buttons: [
        {
          label: "Sim",
          onClick: () => handleSubmit(),
        },
        {
          label: "Não",
          onClick: () => history.push("/carteiraroute"),
        },
      ],
    });
  };

  return (
    <div>
      <form
        onSubmit={modal}
        className={`relative h-screen overflow-hidden bg-corPrincipal flex flex-col items-center justify-start`}
      >
        <div className="flex gap-5 text-[3rem] items-end h-[30%]">
          <h1 className="text-[#ffff]">CARTEIRA</h1>
          <div className="pb-3 relative">
            <Carteira fill="transparent" />
          </div>
        </div>

        <div className="flex gap-3 items-end text-white h-[10%]">
          <h1 className="text-[2rem]">Salto Atual:</h1>
          <div className="flex justify-center items-center text-[2rem] rounded-lg  h-12 min-w-20">
            <p className="">{state},00€</p>
          </div>
        </div>
        <input
          className="mt-10  rounded-md text-black pl-2"
          type="text"
          value={nextState}
          onChange={(e) => handleDinheiro(e)}
        />
        <div className="flex flex-col items-end h-[20%] justify-end">
          <img src={metodos} className="w-28" />

          <Btn name={`DEPOSITAR: ${nextState} €`} />
        </div>
      </form>
      <div className="w-full absolute bottom-0">
        <NavBar />
      </div>
    </div>
  );
};
