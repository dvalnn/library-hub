import { useEffect, useState } from "react";
import notfound from "../../../assets/images/not-found.png";
import performAgentSearch from "../Records/performAgentSearch"
import SelectButton from "../Common/SelectButton.jsx";
import { RoomForms } from "./RequestsForms.jsx";

function ActivityDropDown({ agent, setActivity }) {
    const enumObject = (enumMember) => {
        return {
            label: ActivityEnum.getLabel(enumMember),
            value: enumMember,
        };
    };

    // Mapping activity options for the select box based on agentKind
    const getOptions = () => {
        switch (agent.agent_kind) {
            case AgentEnum.Student: // Students
                return [
                    enumObject(ActivityEnum.Computers),
                    enumObject(ActivityEnum.Recreation),
                    enumObject(ActivityEnum.GroupWork),
                    enumObject(ActivityEnum.IndividualWork),
                    enumObject(ActivityEnum.TestTaking),
                    enumObject(ActivityEnum.ExpulsionFromClass),
                ];
            case AgentEnum.Teacher: // Teachers
                return [
                    enumObject(ActivityEnum.Computers),
                    enumObject(ActivityEnum.Recreation),
                    enumObject(ActivityEnum.IndividualWork),
                ];
            case AgentEnum.Assistant: // Assistants
                return [
                    enumObject(ActivityEnum.Computers),
                    enumObject(ActivityEnum.Recreation),
                ];
            default:
                return [];
        }
    };

    const [selection, setSelection] = useState("0");

    const handleChange = (e) => {
        const value = e.target.value;
        setSelection(value);
        setActivity(Number.parseInt(value));
    };

    const options = getOptions();
    const selectID = selection === "0" ? "invalid" : "valid";
    return (
        <div className="dropDown">
            <select id={selectID} value={selection} onChange={handleChange}>
                <option value="0" disabled>
                    Selecione atividade
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function RoomForms ({}){
    return(
        <div className="dropDowns">
            {/*Here should be two select dropDowns, the first should have the options:
                Auditório
                Sala de Computadores
                Galeria
            The 
            */}
        </div>
    );
}



function AgentDetailsClone({ agent, isSelected, setActivity, detailsOption }) {
    let role = "";
    switch (agent.agent_kind) {
        case 1:
            role = `Aluno ${agent.class}`;
            break;
        case 2:
            role = "Professor";
            break;
        case 3:
            role = "Assistente";
            break;
        default:
            role = "Não Definido";
            break;
    }

    return (
        <div className="details">
            <h2>{role}</h2>
            {(isSelected && detailsOption === 1) && <ActivityDropDown agent={agent} setActivity={setActivity} />}
            {(isSelected && detailsOption === 2) && <RoomForms/>}
            {(isSelected && detailsOption === 3) && <ResourceForms/>}
        </div>
    );
}

//! Em principio esta função não tem de ser alterada
function SelectButton({ isSelected, handleClick }) {
	const plusButton = () => (
		<svg className="selectIcon" id="plus" viewBox="0 0 30 30">
			<title>Adicionar</title>
			<path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
		</svg>
	);

	const minusButton = () => (
		<svg className="selectIcon" id="minus" viewBox="0 0 30 30">
			<title>Remover</title>
			<path d="M6.25 16.25H23.75V13.75H6.25V16.25Z" />
		</svg>
	);

	const selectBtn = isSelected ? minusButton() : plusButton();
	const btnID = isSelected ? "minusBtn" : "plusBtn";

	return (
		<button
			type="button"
			className="registBtn"
			id={btnID}
			onClick={handleClick}
		>
			<style>{"transition: transform 0.3s ease;"}</style>
			{selectBtn}
		</button>
	);
}


function AgentClone({ agent, selectionFuncs, detailsOption }) {
    const [upsertFunc, removeFunc, checkFunc] = selectionFuncs;
    const [activity, setActivity] = useState(0);

    const isSelected = checkFunc(agent.ID);
    const clickFunc = isSelected ? removeFunc : upsertFunc;

    const handleClick = () => {
        clickFunc({ agent: agent, act: activity });
    };

    const actSelectFunc = (newAct) => {
        upsertFunc({ agent: agent, act: newAct });
    };

    const divID = isSelected ? "selected" : "notSelected";

    return (
        <div className="agentBox" id={divID}>
            <SelectButton isSelected={isSelected} handleClick={handleClick} />
            <div className="agentInfo">
                <h1 className="name">{agent.name}</h1>
                <AgentDetailsClone
                    agent={agent}
                    isSelected={isSelected}
                    setActivity={actSelectFunc}
                    detailsOption={detailsOption}
                />
            </div>
        </div>
    );
}

function AgentListClone({
    searchArgs,
    setShowSubmit,
    selectionFuncs,
    notifSetters,
    detailsOption
}) {
    const [elements, setElements] = useState([]);

    // Use useEffect to handle search logic and prevent updates during render
    useEffect(() => {
        const { name, filter, search, setSearch } = searchArgs;

        //?Notificações estão desativadas
        // const [success, warning, error] = notifSetters;

        // Only perform the search if the search flag is true
        if (!search) return;

        // Reset the search flag
        setSearch(false);

        // Perform the search and handle success or error
        performAgentSearch(name, filter)
            .then((res) => {
                setElements(res);

                //?Notificações estão desativadas
                // Show success message if there are results
                // if (res.length) {
                // 	success(`Encontrados ${res.length} resultados`);
                // }
            })
            //?Notificações estão desativadas
            // .catch((err) => {
            //     console.error(`error: ${err}`);
            //     error(err); // Show error message
            // });
    }, [searchArgs, notifSetters]);

    useEffect(() => {
        setShowSubmit(elements.length > 0); // Simplified logic
    }, [elements, setShowSubmit]);

    // Render no results if elements are empty
    if (!elements.length) {
        return (
            <div className="noResults">
                <img src={notfound} alt="Imagem nenhum item encontrado" />
                <h2>Sem resultados de pesquisa</h2>
            </div>
        );
    }

    // Render the results if there are any elements
    return (
        <div className="resultsContainer">
            {elements.map((agent, index) => (
                <AgentClone
                    agent={agent}
                    selectionFuncs={selectionFuncs}
                    key={agent.ID || index}
                    detailsOption = {detailsOption}
                />
            ))}
        </div>
    );
}

export default AgentListClone;