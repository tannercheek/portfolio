// Update year automatically.
    document.getElementById('year').textContent = new Date().getFullYear();

    // tooltip - links with [data-tooltip]
    (function(){
      const tip = document.createElement('div');
      tip.id = 'tt';
      tip.className = 'tooltip';
      tip.setAttribute('role','status');
      tip.setAttribute('aria-hidden','true');
      document.body.appendChild(tip);

      function showTip(text){
        tip.textContent = text;
        tip.classList.add('show');
        tip.removeAttribute('aria-hidden');
      }
      function hideTip(){
        tip.classList.remove('show');
        tip.setAttribute('aria-hidden','true');
      }
      function moveTip(e){
        const pad = 16; // distance from cursor
        const margin = 8; // gap to viewport edges
        // Measure tooltip
        const w = tip.offsetWidth;
        const h = tip.offsetHeight;
        // Desired position: right & slightly below cursor
        let x = e.clientX + pad;
        let y = e.clientY + pad;
        // Clamp to viewport so it doesn't overflow
        x = Math.min(window.innerWidth - w - margin, x);
        y = Math.min(window.innerHeight - h - margin, y);
        tip.style.left = x + 'px';
        tip.style.top = y + 'px';
      }

      document.querySelectorAll('a[data-tooltip]').forEach(a => {
        const text = a.getAttribute('data-tooltip');
        a.addEventListener('mouseenter', (e) => { showTip(text); moveTip(e); });
        a.addEventListener('mousemove', moveTip);
        a.addEventListener('mouseleave', hideTip);
        a.addEventListener('focus', () => showTip(text));
        a.addEventListener('blur', hideTip);
      });
    })();

    // Copy email button
    (function(){
      const btn = document.querySelector('.copy-btn');
      if (!btn) return;

      const email = btn.dataset.email;
      if (!email) return;

      let resetTimer;

      async function copyEmail() {
        clearTimeout(resetTimer);
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(email);
          } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = email;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }
          btn.classList.add('copied');
        } catch (err) {
          btn.classList.remove('copied');
        }
        resetTimer = setTimeout(() => btn.classList.remove('copied'), 1400);
      }

      btn.addEventListener('click', copyEmail);
    })();
