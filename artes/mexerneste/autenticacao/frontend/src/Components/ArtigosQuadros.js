import React, { useEffect, useState } from "react";
import { NavBar } from "./Extra/NavBar";
import { useHistory } from "react-router-dom";

export const ArtigosQuadros = () => {
  const [quadros, setQuadros] = useState();
  const [ticket, setTickets] = useState();
  const history = useHistory();

  async function getEventsQuadros() {
    const res = await fetch(`/api/artigos/quadros`);
    const data = await res.json();
    setQuadros(data);
  }

  useEffect(() => {
    getEventsQuadros();
    getTickets();
  }, []);

  const handleMoveFavClick = (id) => {
    const path = `/events/event/${id}`;
    history.push(path, id);
  };

  async function getTickets() {
    const res = await fetch("/api/tickets", {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setTickets(data.map((ele) => ele.eventId));
  }

  return (
    <div
      className={`h-[100vh] overflow-hidden bg-corPrincipal flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col gap-3 overflow-y-auto mb-3">
        {quadros && quadros.length > 0 ? (
          quadros?.map((ele, i) => {
            return (
              <div key={i} className="flex flex-col">
                <div className="relative ">
                  <img
                    onClick={() => handleMoveFavClick(ele["_id"])}
                    src={ele.image}
                    className="flex w-[18rem] min-h-[11rem] max-h-[11rem] rounded-lg border-[3px] border-[#4D5E6B] justify-center items-center"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-[2rem] text-gray-500 font-sfdisplay-semibold ">
            Sem Artigos...
          </h1>
        )}
      </div>
      <div className="w-full absolute bottom-0">
        <NavBar />
      </div>
    </div>
  );
};
