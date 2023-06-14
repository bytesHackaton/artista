import React, { useEffect, useState } from "react";
import { Btn } from "./Extra/Btn";
import { NavBar } from "./Extra/NavBar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Link, useHistory, useParams } from "react-router-dom";
import { Calendario } from "../assets/Calendario";
import { Localizacao } from "../assets/Localizacao";
import { Euro } from "../assets/Euro";

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

  return (
    <div
      className={`h-screen relative overflow-x-hidden bg-corPrincipal flex flex-col items-center gap-3 text-escritaNormal`}
    >
      {state && (
        <div>
          <div className="relative pt-10 text-white">
            <img
              className="rounded-[9%] p-3 min-w-[25rem] max-w-[25rem] h-[15rem]"
              src={state.image}
            />
          </div>
          <div className=" w-full ml-3 h-[15%] overflow-y-auto">
            <p>{state.description}</p>
          </div>
          <div className=" w-full flex flex-col p-3 gap-3">
            <div className="flex gap-3 w-full h-[2rem] items-center">
              <p>
                <Euro />
              </p>
              <p>{state.price}</p>
            </div>
          </div>
          {user && !user.parceiro && (
            <div className="h-[35vh] flex items-end justify-center">
              <div className="flex justify-center items-end">
                <Btn
                  type="button"
                  name={`PAGAR: ${state.price * numero} €`}
                  onClick={buyTicket}
                />
              </div>
            </div>
          )}

          {loggedIn ? (
            <div className="w-full absolute bottom-0">
              <NavBar />
            </div>
          ) : (
            <Link to="/escolha">
              <div className="flex justify-center p-3">
                <h1 className="text-black w-[11rem] font-sfdisplay-semibold  border-b-2 border-black">
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
