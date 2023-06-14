import React, { useEffect, useState } from "react";
import { Btn } from "./Extra/Btn";
import { NavBar } from "./Extra/NavBar";
import { Link, useHistory, useParams } from "react-router-dom";
import { Euro } from "../assets/Euro";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export const EventoEspecifico = () => {
  const [state, setState] = useState([]);
  const [numero, setNumero] = useState(1);
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [user, setUser] = useState();
  const history = useHistory();

  const { id } = useParams();

  async function getUser() {
    const res = await fetch(`/api/users/profile`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    if (res.status === 200) {
      const body = await res.json();
      setUser(body);
    } else {
    }
  }

  async function getEvent() {
    const res = await fetch(`/api/events/event/${id}`);
    const ev = await res.json();
    setState(ev);
  }

  useEffect(() => {
    getEvent();
    getUser();
  }, []);

  async function buyTicket() {
    const res = await fetch(`/api/tickets/${id}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: { numero } }),
    });

    if (res.status === 201) {
    } else {
      history.push("/escolha");
    }
  }

  const modal = () => {
    confirmAlert({
      title: "Confirma",
      message: "Tens a certeza que queres comprar o artigo?",
      buttons: [
        {
          label: "Sim",
          onClick: () => buyTicket(),
        },
        {
          label: "Não",
          onClick: () => history.push(`/events/event/${id}`),
        },
      ],
    });
  };

  return (
    <div
      className={`h-screen relative overflow-x-hidden bg-corPrincipal flex flex-col items-center gap-3 text-white`}
    >
      {state && (
        <div className="w-full">
          <div className="text-white flex justify-center items-end h-[20rem]">
            <img
              className="rounded-[9%] p-3 min-w-[15rem] max-w-[15rem] h-[15rem]"
              src={state.image}
            />
          </div>
          <div className="ml-3 text-[1.2rem] overflow-y-auto mt-5">
            <p>{state.description}</p>
          </div>
          <div className=" w-full flex flex-col p-3 gap-3">
            <div className="flex gap-1 w-full h-[2rem] items-center text-[1.2rem]">
              <p>
                <Euro />
              </p>
              <p>{state.price}</p>
            </div>
          </div>
          {user && !user.parceiro && (
            <div className="h-[18vh] flex items-end justify-center">
              <div className="flex justify-center items-end">
                <Btn
                  type="button"
                  name={`PAGAR: ${state.price * numero} €`}
                  onClick={modal}
                />
              </div>
            </div>
          )}
          {loggedIn ? (
            <div className="w-full absolute bottom-0 left-0">
              <NavBar />
            </div>
          ) : (
            <Link to="/escolha">
              <div className="flex justify-center items-end p-3 h-[18rem]">
                <h1 className="text-white w-[8.5rem] font-sfdisplay-semibold  border-b-2 border-white">
                  Torna-te um Re-Art
                </h1>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
