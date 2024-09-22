/** @format */
import { useState, useEffect } from "react";
import { useSearchInfo } from "./searchP"
import "./window.css";

//TODO: Meter os botões a realmente fazer alguma coisa
//TODO: Ajustar a resultWindow da direita, ela não tem a dropdown list, ela tem o selecionado na dropdown

export function MainWindow() {
  const { searchedInfo, setSearchedInfo, performSearch, results } = useSearchInfo()

  useEffect(() => {
    console.log("Results updated:", results); // Log to ensure results are changing
  }, [results]); // Only runs when `results` changes

  return (
    <div id="mainWindow">
      <div className="resultWindow">
        <h1 className="title">Resultados da Pesquisa</h1>
        <ResultsContainer agentList={results} btnType={1} />
      </div>
      <div className="resultWindow">
        <h1 className="title">Registos</h1>
        <ResultsContainer agentList={results} btnType={2} />
      </div>
    </div>
  );
}

function ResultsContainer({ agentList, btnType }) {
  useEffect(() => {
    console.log("AgentList updated:", agentList);
  }, [agentList]);

  if (!agentList || agentList.length === 0) {
    return <ul className="resultsContainer"><li>Sem resultados de pesquisa</li></ul>;
  }

  return (
    <ul className="resultsContainer">
      {agentList.map((agent, index) => (
        <AgentInfoDisplay agent={agent} btnType={btnType} key={agent.id || index} />
      ))}
    </ul>
  );
}

function Button({ btn }) {
  switch (btn) {
    case 1:
      return (
        <button type="button" className="registBtn" id="plusButton">
          <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <g mask="url(#mask0_21_345)">
              <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
            </g>
          </svg>
        </button>
      );
    case 2:
      return (
        <button id="bin-button">
          <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
            <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" stroke-width="3"></line>
          </svg>
          <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_8_19" fill="white">
              <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
            </mask>
            <path
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
              fill="white" mask="url(#path-1-inside-1_8_19)"></path>
            <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
            <path d="M21 6V29" stroke="white" stroke-width="4"></path>
          </svg>
        </button>
      );
  }
}
