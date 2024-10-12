//? Tou a pensar fazer esta tab sendo apenas a janela divido em dois tipo main window.
//? A da esquerda é um calendário sempre em display com um date picker, e mais uns botões de filtros
//? A da direita fica igual à janela de Registos mas sem o botão de eliminar
//? Talvez simplesmente chamar o recordList e mudar a função para receber o ID do parent e dar conditional render ao butão do lixo
function HistoryView() {
	return (
		<div className="history">
			<h1>Histórico</h1>
			{/* <RecordList records={records}/> */}
		</div>
	);
}

export default HistoryView;
