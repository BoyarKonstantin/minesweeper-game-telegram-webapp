const modal = () =>{
    document.addEventListener('DOMContentLoaded', function() {
        const openModalBtn = document.getElementById('openModalBtn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modal = document.getElementById('myModal');
        const easyBtn = document.getElementById('easyBtn');
        const regularBtn = document.getElementById('regularBtn');
        const hardBtn = document.getElementById('hardBtn');
      
        function openModal() {
          modal.style.display = 'block';
        }
      
        openModalBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', function() {
          modal.style.display = 'none';
        });
      
        easyBtn.addEventListener('click', function() {
          console.log('Выбрана сложность Easy');
          start_game(8, 8, 10, 'easy')
          modal.style.display = 'none';
        });
      
        regularBtn.addEventListener('click', function() {
          console.log('Выбрана сложность Regular');
          modal.style.display = 'none';
        });
      
        hardBtn.addEventListener('click', function() {
          console.log('Выбрана сложность Hard');
          modal.style.display = 'none';
        });
      
        openModal(); // Вызов функции openModal для открытия окна при загрузке страницы
      });
}
