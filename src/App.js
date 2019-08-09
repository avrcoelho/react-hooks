import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
// useEffect: sobrepoem o metodos de cilcos de vidas que tinham anteriormente
// useMemo é chamado toda vezq ue o return é chamado. É indicado quando se vai
// utilizar um calculo muito complexo

function App() {
  // define o valor inicial para o state
  // primeira posição retorna o estado em si, que foi dado o nome de tech
  // segunda posição é uma função para atualizar as infirmações do estado
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    // copia todas as informações que tem no tech, pois o estado é imutavel
    setTechs([...techs, newTech]);
    setNewTech('');
  }

  // o useCallback é utilizado para não ter que ficar remontando na memoria a função
  // toda vez que o component é renderizado, Mas não vai ser utilizado em tsMethodSignature,
  // somente em função que utilizam os estados o propriedades do component
  // const handleAdd = useCallback(() => {
  //   // copia todas as informações que tem no tech, pois o estado é imutavel
  //   setTechs([...techs, newTech]);
  //   setNewTech('');
  // }, [newTech, techs]);

  // para ele ser executado só uma vez, basta deixar o array sem variavel
  // Faz o papel do componentDidMount
  useEffect(() => {
    const storageTechs = localStorage.getItem('techs');

    if (storageTechs) {
      setTechs(JSON.parse(storageTechs));
    }

    // faz o papel do componentWillUnMount
    // executa quando o component deixa de existir
    return () => {};
  }, []);

  // primeiro parametro é a função que vai ser executada
  // segundo parametro é quando ela vai ser executada
  // fica monitorando as alterações na variavel techs. Se houver alteração é chamado a funação
  // ele executa na primeira instancia e nas alterações
  // Faz o papel do componentDidUpdate
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  // passa uma função que vai retornar o valor que queremos
  // e as dependencias de acordo com qual valor vai ArgumentOutOfRangeError,
  //  o valor sera recalculado
  // isso evita de chamar o techs.length caso o valor de techs nãi mudar
  const techsSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <strong>{`Você tem ${techsSize} tecnologias`}</strong>
      <ul>
        {techs.map(tech => <li key={tech}>{tech}</li>)}
      </ul>
      <input type="text" value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
