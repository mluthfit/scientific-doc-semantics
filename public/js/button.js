document.addEventListener('DOMContentLoaded', () => {
  const toggleFilters = () => {
    const button = document.querySelector('.title');
    const filterMenu = document.querySelector('.filter');

    button.addEventListener('click', () => {
      filterMenu.classList.toggle('open');
    });
  };

  toggleFilters();
});
