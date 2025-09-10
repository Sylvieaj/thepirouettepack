document.addEventListener('DOMContentLoaded',function(){
  // signup popup
  var openBtn = document.getElementById('openSignup');
  var modal = document.getElementById('signupModal');
  var backdrop = document.getElementById('modalBackdrop');
  var closeBtn = document.getElementById('closeSignup');
  if(openBtn){
    openBtn.addEventListener('click',function(){ modal.style.display='block'; backdrop.style.display='block'; });
  }
  if(closeBtn){ closeBtn.addEventListener('click',function(){ modal.style.display='none'; backdrop.style.display='none'; }); }
  // form submission: show thank you message and store name
  var form = document.getElementById('signupForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var name = document.getElementById('signupName').value;
      var email = document.getElementById('signupEmail').value;
      localStorage.setItem('pirouetteUser',name);
      document.getElementById('welcomeName').textContent = name;
      document.getElementById('welcomeBanner').style.display='block';
      // open mailto
      window.location.href = 'mailto:sylvie.aj1@icloud.com?subject=New Member Signup&body=' + encodeURIComponent('Name: '+name+'\nEmail: '+email);
      // show modal thank you state
      document.getElementById('signupForm').style.display='none';
      document.getElementById('signupThanks').style.display='block';
    });
  }
  // load saved name
  var saved = localStorage.getItem('pirouetteUser');
  if(saved){ document.getElementById('welcomeName').textContent = saved; document.getElementById('welcomeBanner').style.display='block'; }
});
