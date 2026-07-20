
document.querySelectorAll('.dummy-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const toast = document.getElementById('dummyToast');
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  });
});

const ticketForm = document.getElementById('ticketForm');
if (ticketForm) {
  ticketForm.addEventListener('submit', event => {
    event.preventDefault();
    const result = document.getElementById('ticketResult');
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

const contactForm=document.getElementById('contactForm');
if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();document.getElementById('contactResult').hidden=false;});}
