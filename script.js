// script.js - membership modal behavior + simple interactions
document.addEventListener('DOMContentLoaded', function(){
  var modal = document.getElementById('memberModal');
  var backdrop = document.getElementById('modalBackdrop');
  var closeBtn = document.getElementById('modalClose');
  var dontShowChk = document.getElementById('dontShowAgain');
  var signupForm = document.getElementById('signupForm');

  function showModal(){
    // respect localStorage choice
    if (localStorage.getItem('pirouetteDontShow') === '1') return;
    modal.classList.remove('hidden');
    backdrop.classList.remove('hidden');
  }
  function hideModal(){
    modal.classList.add('hidden');
    backdrop.classList.add('hidden');
  }

  // show after a short delay so it feels like a popup
  setTimeout(showModal, 900);

  closeBtn.addEventListener('click', hideModal);
  backdrop.addEventListener('click', hideModal);

  dontShowChk.addEventListener('change', function(e){
    if (e.target.checked) localStorage.setItem('pirouetteDontShow','1');
    else localStorage.removeItem('pirouetteDontShow');
  });

  signupForm.addEventListener('submit', function(e){
    e.preventDefault();
    // show a quick thanks message then close; in a real site you'd POST to your backend
    var email = document.getElementById('email').value || '';
    alert('Thanks — ' + email + ' — we will be in touch!');
    hideModal();
    if (dontShowChk.checked) localStorage.setItem('pirouetteDontShow','1');
  });
});
