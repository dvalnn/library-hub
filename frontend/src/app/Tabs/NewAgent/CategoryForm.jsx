function CategoryForm({ category, setCategory, classInput, setClassInput }) {
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (e.target.value !== "Aluno") setClassInput(""); // Clear class if not "Aluno"
    };

    return (
        <div className="subForms">
            <div className="jobSelect">
                <label htmlFor="category">Profissão:</label>
                <div className="dropDown">
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="0" disabled>
                            Selecione uma Profissão
                        </option>
                        <option value="Aluno">Aluno</option>
                        <option value="Professor">Professor</option>
                        <option value="Assistente">Assistente</option>
                    </select>
                </div>
            </div>
            {category === "Aluno" && (
                <div className="newClass">
                    <label htmlFor="classInput">Turma:</label>
                    <input
                        type="text"
                        value={classInput}
                        onChange={(e) => setClassInput(e.target.value)}
                        placeholder=" Insira a Turma"
                        required
                    />
                </div>
            )}
        </div>
    );
}

export default CategoryForm;
