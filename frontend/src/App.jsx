import React, {useState, useEffect} from 'react';

function App() {
  const [stones, setStones] = useState(() => {
    const saveStones = localStorage.getItem('sai_no_kawara_stones');
    return saveStones? JSON.parse(saveStones) : [];
  });
  const [selectedStone, setSelectedStone] = useState(null);

  React.useEffect(() => {
    localStorage.setItem('sai_no_kawara_stones',JSON.stringify(stones));
  }, [stones]);

  const addStone = (languageName) => {
    const newStone = {
      id: Date.now(),
      name: languageName,
      hp: 100,
      reviewCount: 0,
      reviewedDates:[]
    };
    setStones([...stones, newStone]);
  };

  const callOni = () => {
    const nextStones = stones
      .map(stone => {
        const damage = Math.floor(20 / (stone.reviewCount + 1));
        return {...stone, hp: stone.hp - damage};
      })
      .filter(stone => stone.hp > 0);
    setStones(nextStones);

    if (!selectedStone) return;
    if (nextStones.some(stone => stone.id === selectedStone.id)) {
      const damage = Math.floor(20 / (selectedStone.reviewCount + 1));
      setSelectedStone({...selectedStone, hp: selectedStone.hp - damage})
    } else {
      setSelectedStone(null);
    }
  };

  const repairStone = (e, id) => {
    e.stopPropagation();

    const today = new Date().toISOString().split(`T`)[0];
    setStones(stones.map(stone => 
      stone.id === id 
        ? {
            ...stone,
            hp: 100,
            reviewCount: stone.reviewCount + 1,
            reviewedDates: [...stone.reviewedDates, today]
          }
        : stone
    ));

    if (selectedStone && selectedStone.id === id) {
      setSelectedStone({
        ...selectedStone,
        hp: 100,
        reviewCount: selectedStone.reviewCount + 1,
        reviewedDates: [...(selectedStone.reviewedDates || [], today)]
      });
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

              {/* 芝生 */}
              <div style={{ marginTop: '20px', borderTop:'1px solid #eee', paddingTop:'15px'}}>
                <h5>🌿 復習の記録</h5>
                <div style={{display: 'flex', gap: '4px', marginTop: '10px'}}>
                  {
                    [6,5,4,3,2,1,0].map(dayOffset => {
                      const d =new Date();
                      const targetDate = new Date(d.getTime() - dayOffset * 24 * 60 * 60 * 1000);
                      // d.setDate(d.getDate - dayOffset);
                      // const dateStr = d.toISOString().split('T')[0];
                      const year = targetDate.getFullYear();
                      const month = String(targetDate.getMonth() + 1).padStart(2,'0');
                      const day = String(targetDate.getDate()).padStart(2,'0');
                      const dateStr = `${year}-${month}-${day}`;

                      const isReviewed = selectedStone.reviewedDates && selectedStone.reviewedDates.includes(dateStr);

                      return (
                        <div
                          key={dateStr}
                          title={dateStr}
                          style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: isReviewed ?'#2ecc71' :'#ededf0',
                            borderRadius: '3px',
                            border: '1px solid rgba(27,31,35,0.06)',
                            transition: 'background-color 0.3s'
                          }}
                        />
                      );
                    })
                  }
                </div>
              </div>
            </div>
        )}
      </div>

    </div>
  );
}

export default App;