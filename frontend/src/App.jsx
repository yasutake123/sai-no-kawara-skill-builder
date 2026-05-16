import React, {useState} from 'react';

function App() {
  const [stones, setStones] = useState([]);
  const [selectedStone, setSelectedStone] = useState(null);

  const addStone = (languageName) => {
    const newStone = {
      id: Date.now(),
      name: languageName,
      hp : 100,
      reviewCount : 0
    };
    setStones([...stones, newStone]);
  };

  const callOni = () => {
    setStones(prevStones => prevStones
      .map(stone => {
        const damage = Math.floor(20 / (stone.reviewCount + 1));
        return {...stone, hp: stone.hp - damage};
      })
      .filter(stone => stone.hp > 0)
    );
  };

  const repairStone = (e, id) => {
    e.stopPropagation();

    setStones(stones.map(stone => 
      stone.id === id 
        ? { ...stone, hp: 100, reviewCount: stone.reviewCount + 1 }
        : stone
    ));

    if (selectedStone && selectedStone.id === id) {
      setSelectedStone({...selectedStone, hp: 100, reviewCount: selectedStone.reviewCount + 1});
    }
  }

  return (
    <div style = {{
      display: 'grid',
      gridTemplateColumns: '250px 1fr 300px',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>

      {/*左サイドバー：操作パネル*/}
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

        <h4>▼ デバッグ操作</h4>
        <button onClick={callOni}
          style={{padding: '12px',backgroundColor:'#e74c3c', color: 'white', cursor: 'pointer'}}
        >
          👹 鬼を呼ぶ（時間を進める）
        </button>

      </div>
      
      {/* 中央エリア：賽の河原 */}
      <div style={{backgroundColor: '#f5f5f0', padding: '20px', textAlign: 'center', display:'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: '10px'}}>
        <h3>中央エリア</h3>

        {stones.length === 0 
        ? (<p>河原には何もありません。石を積みましょう。</p>)
        : (stones.map(stone => (
          <div key={stone.id}
            onClick={() => setSelectedStone(stone)}
            style={{
              width: '200px',
              padding: '10px',
              backgroundColor: '#bdc3c7',
              border: '2px solid #7f8c8d',
              borderRadius: '8px',
              cursor: 'pointer',
              opacity: stone.hp / 100
            }}
          >
            🪨 <strong>{stone.name}</strong>
            <div style={{fontSize: '12px', color: '#555', marginTop: '4px'}}>
              耐久値:{stone.hp}% | 🛡️ Lv.{stone.reviewCount}
            </div>

            <button onClick={(e) => repairStone(e, stone.id)}
              style={{ marginTop: '6px', padding:'2px 8px', border:'none', cursor:'pointer'}}>
              復習する
            </button>
          </div>
        )))}
      </div>

      {/* 右サイドバー：詳細情報 */}
      <div style={{backgroundColor: '#ffffff', padding: '20px', borderLeft: '1px solid #ddd'}}>
        <h3>右サイドバー</h3>
        
        {selectedStone === null
          ? (<p>河原の石をクリックすると、ここに詳細が表示されます</p>)
          : (<div>
              <h4>💎 選択中の石の情報</h4>
              <p><strong>言語名：</strong> {selectedStone.name}</p>
              <p>ID: {selectedStone.id}</p>
              <p><strong>現在の耐久値：{selectedStone.hp}%</strong></p>
              <p><strong>復習回数：{selectedStone.reviewCount}回</strong></p>
              <p>💡 (フェーズ2でここに忘却曲線と芝生が出ます)</p>
            </div>
        )}
      </div>

    </div>
  );
}

export default App;