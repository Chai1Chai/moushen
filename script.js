const tabs = document.querySelectorAll(".tab");
const indicator = document.querySelector(".indicator");
const contents = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {

    // 1 — переключаем активную вкладку
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // 2 — двигаем белый прямоугольник
    indicator.style.transform = `translateX(${index * 97}%)`;

    // 3 — плавная смена контента
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

  // helper: ставим активную вкладку по типу (home/account)
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

    // обновляем иконки (если у img есть data-color/data-gray)
    tabs.forEach(btn => {
      const img = btn.querySelector('img.icon');
      if (!img) return;
      const type = btn.dataset.type;
      if (btn === targetBtn) {
        // цветная
        if (img.dataset.color) img.src = img.dataset.color;
        img.style.opacity = '1';
      } else {
        // серые
        if (img.dataset.gray) img.src = img.dataset.gray;
        img.style.opacity = '.8';
      }
    });

    // позиционируем индикатор под центром targetBtn
    positionIndicatorUnder(targetBtn);
  }

  // position indicator under a button by calculating center
  function positionIndicatorUnder(btn) {
    if (!indicator || !btn) return;
    const barRect = tabbar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const centerX = (btnRect.left + btnRect.right) / 2 - barRect.left;
    const leftPos = Math.round(centerX - indicator.offsetWidth / 2);
    indicator.style.left = leftPos + 'px';
  }

  // initial active = home (find button with data-type="home")
  const initial = tabbar.querySelector('.tabbtn[data-type="home"]') || tabs[0];
  // give indicator correct width and initial left before animation
  indicator.style.left = '0px';
  // slight delay to ensure layout computed
  setTimeout(()=> setActiveTab(initial), 10);

  // add click handlers
  tabs.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      const type = btn.dataset.type;
      if (type === 'mic') {
        // toggle listen state for mic
        if (micWrapper.classList.contains('listening')) {
          // turn off listening
          micWrapper.classList.remove('listening');
          // swap mic icon to blue
          if (micIcon && micIcon.dataset.blue) micIcon.src = micIcon.dataset.blue;
        } else {
          // turn on listening
          micWrapper.classList.add('listening');
          if (micIcon && micIcon.dataset.purple) micIcon.src = micIcon.dataset.purple;
        }
        // do not change active tab for mic press (design choice), 
        // if you want mic to be the active tab replace next line with setActiveTab(btn)
        // return;
      } else {
        // normal tab (home/account) -> set active
        setActiveTab(btn);
      }
    });

    // also reposition indicator on window resize (keep centered)
    window.addEventListener('resize', ()=> {
      const activeBtn = tabbar.querySelector('.tabbtn[aria-pressed="true"]') || initial;
      positionIndicatorUnder(activeBtn);
    });
  });

  // reposition indicator when fonts/images loaded etc.
  window.addEventListener('load', ()=> {
    const activeBtn = tabbar.querySelector('.tabbtn[aria-pressed="true"]') || initial;
    positionIndicatorUnder(activeBtn);
  });
});


