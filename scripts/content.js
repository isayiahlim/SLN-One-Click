function locateUpdateButton() {
  const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
  let targetBtn = null;

  for (let btn of buttons) {
    if (btn.value && btn.value.includes('Update Schedule')) {
      targetBtn = btn;
      break;
    }
    if (btn.textContent && btn.textContent.includes('Update Schedule')) {
      targetBtn = btn;
      break;
    }
  }

  if (targetBtn) {
    targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetBtn.style.border = '3px solid #4285f4';
    targetBtn.style.boxShadow = '0 0 15px #4285f4';
    targetBtn.style.transition = 'all 0.3s';
    targetBtn.focus();
    
    setTimeout(() => {
      targetBtn.style.border = '';
      targetBtn.style.boxShadow = '';
    }, 3000);
  } else {
    setTimeout(locateUpdateButton, 500);
  }
}

window.addEventListener('load', locateUpdateButton);
if (document.readyState === 'complete') {
  locateUpdateButton();
}
