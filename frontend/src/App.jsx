import React from 'react';

function App() {
  return (
    <div style = {{
      display: 'grid',
      gridTemplateColumns: '250px 1fr 300px',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>

      <div style={{backgroundColor: '#2c3e50', color:'white', padding: '20px'}}>
        <h3>左サイドバー</h3>
        <p>(ここにボタンを並べる予定)</p>
      </div>
      
      <div style={{backgroundColor: '#f5f5f0', padding: '20px', textAlign: 'center'}}>
        <h3>中央エリア</h3>
        <p>(ここに石が積みあがる予定)</p>
      </div>

      <div style={{backgroundColor: '#ffffff', padding: '20px', borderLeft: '1px solid #ddd'}}>
        <h3>右サイドバー</h3>
        <p>(ここに詳細や芝生が出る予定)</p>
      </div>

    </div>
  );
}

export default App;