// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      animateWithin(e.target);
      io.unobserve(e.target);
    }
  });
},{ threshold:0.2 });
revealEls.forEach(el=>io.observe(el));

function animateWithin(root){
  // rings
  root.querySelectorAll('.ring-fill').forEach(r=>{
    const pct = parseFloat(r.dataset.pct);
    const c = 2*Math.PI*38;
    r.style.strokeDasharray = c;
    r.style.strokeDashoffset = c*(1-pct);
  });
  // counters
  root.querySelectorAll('.counter').forEach(c=>{
    const target = parseFloat(c.dataset.target);
    let cur = 0;
    const step = target/40;
    const tick = ()=>{
      cur += step;
      if(cur >= target){ c.textContent = target.toFixed(1); return; }
      c.textContent = cur.toFixed(1);
      requestAnimationFrame(tick);
    };
    tick();
  });
  // sparklines
  root.querySelectorAll('.spark path').forEach(p=>{ p.style.strokeDashoffset = 0; });
  // flight path fill
  if(root.id === 'flightpath'){
    document.getElementById('fpFill').style.width = '100%';
    root.querySelectorAll('.fp-step').forEach((s,i)=>{
      setTimeout(()=>s.classList.add('in'), i*220);
    });
  }
}

// hero parallax (desktop, fine pointer only)
const heroPanel = document.getElementById('heroPanel');
if(window.matchMedia('(pointer:fine)').matches && window.matchMedia('(min-width:981px)').matches){
  window.addEventListener('mousemove', (e)=>{
    const nx = (e.clientX/window.innerWidth - 0.5);
    const ny = (e.clientY/window.innerHeight - 0.5);
    heroPanel.style.transform = `translate(${nx*12}px, ${ny*10}px)`;
  }, {passive:true});
}

function sendLead(form, kind){
  const toast = form.nextElementSibling;
  toast.classList.add('show');
  form.querySelector('input').value = '';
  return false;
}