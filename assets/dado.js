document.addEventListener('DOMContentLoaded', () => {
  const size = 180;
  const cube = document.getElementById('cube');

  // create 6 faces
  const faces = [];
  for (let i = 1; i <= 6; i++) {
    const f = document.createElement('div');
    f.className = 'face';
    f.dataset.face = i;
    const pips = document.createElement('div');
    pips.className = 'pips';
    f.appendChild(pips);
    createPips(pips, i);
    cube.appendChild(f);
    faces.push(f);
  }

  // position faces in 3D
  const d = size/2;
  faces[0].style.transform = `translateZ(${d}px)`;             // 1 front
  faces[1].style.transform = `rotateX(180deg) translateZ(${d}px)`; // 2 back
  faces[2].style.transform = `rotateY(90deg) translateZ(${d}px)`;  // 3 right
  faces[3].style.transform = `rotateY(-90deg) translateZ(${d}px)`; // 4 left
  faces[4].style.transform = `rotateX(90deg) translateZ(${d}px)`;  // 5 top
  faces[5].style.transform = `rotateX(-90deg) translateZ(${d}px)`; // 6 bottom

  const mapping = {
    1: {x:0,y:0},
    2: {x:0,y:180},
    3: {x:0,y:-90},
    4: {x:0,y:90},
    5: {x:90,y:0},
    6: {x:-90,y:0}
  };

  function rollTo(face){
    const rnd = Math.floor(Math.random()*3)+2; // 2..4 turns
    const baseX = mapping[face].x + rnd*360;
    const baseY = mapping[face].y + rnd*360;
    cube.style.transition = 'transform 1.4s cubic-bezier(.2,.9,.2,1)';
    cube.style.transform = `rotateX(${baseX}deg) rotateY(${baseY}deg)`;
  }

  function randomRoll(){
    const face = Math.floor(Math.random()*6)+1;
    rollTo(face);
    return face;
  }

  // create pip layout per face
  function createPips(container, n){
    // 3x3 grid; positions filled according to standard die layout
    const layout = {
      1:[4],
      2:[0,8],
      3:[0,4,8],
      4:[0,2,6,8],
      5:[0,2,4,6,8],
      6:[0,2,3,5,6,8]
    };
    for (let i=0;i<9;i++){
      const cell = document.createElement('div');
      if (layout[n].includes(i)){
        const pip = document.createElement('div'); pip.className='pip'; cell.appendChild(pip);
      }
      container.appendChild(cell);
    }
  }

  // interactions
  const rollBtn = document.getElementById('rollBtn');
  const resetBtn = document.getElementById('resetBtn');

  if (rollBtn) rollBtn.addEventListener('click', () => { randomRoll(); });
  cube.addEventListener('click', () => { randomRoll(); });
  cube.addEventListener('keydown', (e)=>{ if(e.code==='Space'){ e.preventDefault(); randomRoll(); } });
  if (resetBtn) resetBtn.addEventListener('click', ()=>{ cube.style.transition='transform .6s ease'; cube.style.transform='rotateX(-20deg) rotateY(20deg)'; });
});
