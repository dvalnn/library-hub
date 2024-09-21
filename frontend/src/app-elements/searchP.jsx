import { useState } from 'react';
import './searchP.css'

//* RadioSelector's Hook
function useSelectedUserType() {
    const [selectedUserType, setSelectedUserType] = useState(null);
    return { selectedUserType, setSelectedUserType };
}

//*SearchBar's Hook
function useSearchInfo() {
    const [searchedInfo, setSearchedInfo] = useState('');
    return { searchedInfo, setSearchedInfo };
}

//* Father Div
function SearchSection() {
    return (
        <form id="searchForm">
            <SearchBar/>
        </form>
    )
}

//*Child Div SearchBar
function SearchBar() {
    const {searchedInfo, setSearchedInfo} = useSearchInfo();
    return (
        <div id="searchBar">
            <RadioSelector/>
            <input
                type="text"
                className='input'
                placeholder="Pesquisar por nome"
                value={searchedInfo}
                onChange={(evntObjct) => setSearchedInfo(evntObjct.target.value)}
            />
            <button type="button" className="LupaBtn">
                <i className="fa-solid fa-magnifying-glass Lupa"></i>
            </button>
        </div>
    )
}

//*Child Div RadioSelector
function RadioSelector() {
    const {selectedUserType, setSelectedUserType} = useSelectedUserType();
    return (
        <div id="user-selector">
            <label className="radio">
                <input
                    type="radio"
                    value = "1"
                    checked={selectedUserType === "student"}
                    onChange={() => setSelectedUserType("student")}
                />
                <span className="name">Aluno</span>
            </label>
            <label className="radio">
                <input
                    type="radio"
                    value = "2"
                    checked={selectedUserType === "professor"}
                    onChange={() => setSelectedUserType("professor")}
                />
                <span className="name">Professor</span>
            </label>
            <label className="radio">
                <input
                    type="radio"
                    value = "3"
                    checked={selectedUserType === "assistent"}
                    onChange={() => setSelectedUserType("assistent")}
                />
                <span className="name">Assistente</span>
            </label>
            <label className="radio">
                <input
                    type="radio"
                    value = "4"
                    checked={selectedUserType === "everyone"}
                    onChange={() => setSelectedUserType("everyone")}
                />
                <span className="name">Todos</span>
            </label>
        </div>
    )
}

export {SearchSection, useSelectedUserType, useSearchInfo};