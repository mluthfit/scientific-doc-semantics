document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.title');
  const filterMenu = document.querySelector('.checkbox');

  button.addEventListener('click', () => {
    filterMenu.classList.toggle('open');
  });
});
