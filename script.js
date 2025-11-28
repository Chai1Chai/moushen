const tabs = document.querySelectorAll(".tab");
const indicator = document.querySelector(".indicator");
const contents = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    indicator.style.transform = `translateX(${index * 97}%)`;
    const target = tab.dataset.target;
    contents.forEach(c => c.classList.remove("active"));
    document.querySelector(`.${target}`).classList.add("active");
  });
});

  document.querySelectorAll('.toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('on');

        const card = toggle.closest('.card');
        const imgGray = card.querySelector('.img-gray');
        const imgColor = card.querySelector('.img-color');
        const label = card.querySelector('.toggle-label');
        


        if (toggle.classList.contains('on')) {
          label.textContent = 'ON';
          label.style.color = '#3C3C43';
          imgGray.style.opacity = "0";
          imgColor.style.opacity = "1";
          
        } else {
          label.textContent = 'OFF';
          label.style.color = '#909197';
          imgGray.style.opacity = "1";
          imgColor.style.opacity = "0";
          
        }
    });
  });

document.addEventListener('DOMContentLoaded', ()=> {
  const tabbar = document.querySelector('.tabbar');
  if (!tabbar) return;

  const tabs = Array.from(tabbar.querySelectorAll('.tabbtn'));
  const indicator = tabbar.querySelector('.tab-indicator');
  const micWrapper = tabbar.querySelector('.mic-wrapper');
  const micIcon = tabbar.querySelector('.icon-mic');

  function setActiveTab(targetBtn) {
    tabs.forEach(btn => {
      const type = btn.dataset.type;
      if (btn === targetBtn) {
        btn.classList.remove('inactive');
        btn.setAttribute('aria-pressed','true');
      } else {
        btn.classList.add('inactive');
        btn.setAttribute('aria-pressed','false');
      }
    });

    tabs.forEach(btn => {
      const img = btn.querySelector('img.icon');
      if (!img) return;
      const type = btn.dataset.type;
      if (btn === targetBtn) {
        
        if (img.dataset.color) img.src = img.dataset.color;
        img.style.opacity = '1';
      } else {

        if (img.dataset.gray) img.src = img.dataset.gray;
        img.style.opacity = '.8';
      }
    });

    positionIndicatorUnder(targetBtn);
  }

  function positionIndicatorUnder(btn) {
    if (!indicator || !btn) return;
    const barRect = tabbar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const centerX = (btnRect.left + btnRect.right) / 2 - barRect.left;
    const leftPos = Math.round(centerX - indicator.offsetWidth / 2);
    indicator.style.left = leftPos + 'px';
  }

  const initial = tabbar.querySelector('.tabbtn[data-type="home"]') || tabs[0];
  indicator.style.left = '0px';
  setTimeout(()=> setActiveTab(initial), 10);

  tabs.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      const type = btn.dataset.type;
      if (type === 'mic') {
        if (micWrapper.classList.contains('listening')) {
          micWrapper.classList.remove('listening');
          if (micIcon && micIcon.dataset.blue) micIcon.src = micIcon.dataset.blue;
        } else {
          micWrapper.classList.add('listening');
          if (micIcon && micIcon.dataset.purple) micIcon.src = micIcon.dataset.purple;
        }
      } else {
        setActiveTab(btn);
      }
    });
    window.addEventListener('resize', ()=> {
      const activeBtn = tabbar.querySelector('.tabbtn[aria-pressed="true"]') || initial;
      positionIndicatorUnder(activeBtn);
    });
  });

  window.addEventListener('load', ()=> {
    const activeBtn = tabbar.querySelector('.tabbtn[aria-pressed="true"]') || initial;
    positionIndicatorUnder(activeBtn);
  });
});


