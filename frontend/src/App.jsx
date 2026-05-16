import React, {useState} from 'react';

function App() {
  const [stones, setStones] = useState([]);

  const addStone = (languageName) => {
    const newStone = {
      id: Date.now(),
      name: languageName
    };
    setStones([...stones, newStone]);
  };

  return (
    <div style = {{
      display: 'grid',
      gridTemplateColumns: '250px 1fr 300px',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>

      <div style={{backgroundColor: '#2c3e50', color:'white', padding: '20px'}}>
        <h3>操作パネル</h3>
        <p>▼ 石を積む</p>

        <div style={{ display:'flex', flexDirection:'column', gap:'10px'}}>
          <button onClick={() => addStone("Java")} style={{ padding:'10px', cursor:'pointer'}}>
            + Javaの石を積む
          </button>
          <button onClick={() => addStone("React")} style={{ padding:'10px', cursor:'pointer'}}>
            + Reactの石を積む
          </button>
          <button onClick={() => addStone("Python")} style={{ padding:'10px', cursor:'pointer'}}>
            + Pythonの石を積む
          </button>
        </div>

      </div>
      
      <div style={{backgroundColor: '#f5f5f0', padding: '20px', textAlign: 'center', display:'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: '10px'}}>
        <h3>中央エリア</h3>
        <p>積み上げるエリア</p>

        {stones.length === 0 
        ? (<p>河原には何もありません。石を積みましょう。</p>)
        : (stones.map(stone => (
          <div key={stone.id}
            style={{
              width: '200px',
              padding: '10px',
              backgroundColor: '#bdc3c7',
              border: '2px solid #7f8c8d',
              borderRadius: '8px'
            }}
          >
            🪨 <strong>{stone.name}</strong>
          </div>
        )))}
      </div>


      <div style={{backgroundColor: '#ffffff', padding: '20px', borderLeft: '1px solid #ddd'}}>
        <h3>右サイドバー</h3>
        <p>(ここに詳細や芝生が出る予定)</p>
      </div>

    </div>
  );
}

export default App;