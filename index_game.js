main()
function main(){

    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('myModal');
    const easyBtn = document.getElementById('easyBtn');
    const regularBtn = document.getElementById('regularBtn');
    const hardBtn = document.getElementById('hardBtn');

    closeModalBtn.addEventListener('click', function() {
        start_game(12, 12, 1, 'normal')
        modal.style.display = 'none';
      });
    
      easyBtn.addEventListener('click', function() {
        console.log('Выбрана сложность Easy');
        start_game(8, 8, 13, 'easy')
        modal.style.display = 'none';
      });
    
      regularBtn.addEventListener('click', function() {
        console.log('Выбрана сложность Regular');
        start_game(16, 16, 40, 'normal')
        modal.style.display = 'none';
      });
    
      hardBtn.addEventListener('click', function() {
        console.log('Выбрана сложность Hard');
        start_game(30, 16, 99, 'hard')
        start_game(16, 16, 15, 'hard')
        modal.style.display = 'none';
      });

    function openModal() {
      modal.style.display = 'block';
    }

    window.addEventListener('load', openModal);
    
}

function start_game(width, height, bombs_count, diffucult){

    let field;

    if(diffucult === "easy"){
        field = document.querySelector('#field_easy');
    }
    if(diffucult === "normal"){
        field = document.querySelector('#field_normal');
    }
    if(diffucult === "hard"){
        field = document.querySelector('#field_hard');
    }
    
    const cells_count = width * height;
    field.innerHTML = '<button></button>'.repeat(cells_count);
    const cells = [...field.children];
    let closed_count = cells_count


    const bombs = [...Array(cells_count).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombs_count)
    
    field.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON'){
            return;
        }

        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index/width)
        open(row, column)

    });

    //получение количества рядом стоящих мин
    function getCount(row, column) {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            const newRow = row + y;
            const newColumn = column + x;
            if (newRow >= 0 && newRow < height && newColumn >= 0 && newColumn < width) {
              if (isBomb(newRow, newColumn)) {
                count++;
              }
            }
          }
        }
        return count;
      }      
      function showScore() {
        const scoreElement = document.getElementById("score");
        scoreElement.style.display = "block";
      }
      function open(row, column) {



        if (!isValid(row, column)) return;
    
        const index = row * width + column;
        const cell = cells[index];
        
        if (cell.disabled === true) return;
    
        cell.disabled = true;
        closed_count--;
    
        let coeff = Math.pow(width * height / closed_count, 2);
        console.log(coeff, closed_count);
        var score = (Math.round(coeff * 1000) * (1 + bombs_count / 100)).toFixed(2);
        document.getElementById('score').innerHTML = score;
    
        cell.style.backgroundColor = 'lightgray';
        cell.style.color = 'black';
        showScore();
    
        if (closed_count <= bombs_count) {
            alert('You won!');
            return;
        }
    
        if (isBomb(row, column)) {  
            cell.innerHTML = '💣';
            alert('You hit a bomb!');
            location.reload();
            return;
        }
    
        const count = getCount(row, column);
        if (count === 0) {
            cell.innerHTML = '';
            // алгоритм открытия пустых клеток
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    open(row + y, column + x);
                }
            }
        } else {
            cell.innerHTML = count;
        }
    }
    

function open(row, column) {

    if (!isValid) return;
  
    const index = row * width + column;
    const cell = cells[index];
  
    if (cell.disabled === true) return;
  
    cell.disabled = true;
    closed_count--;

  // вычисление коефициента и количества набранных очков
    let coeff = Math.pow(width * height / closed_count, 2);
    console.log(coeff, closed_count);
    var score = (Math.round(coeff * 1000) * (1 + bombs_count / 100)).toFixed(2);
    document.getElementById('score').innerHTML = score;
  
    cell.style.backgroundColor = 'lightgray';
    cell.style.color = 'black';
    // Условие победы
    if (closed_count <= bombs_count) {
      alert('You won!');
      return;
    }

  // Условие проигрыша
    if (isBomb(row, column)) {
      cell.innerHTML = 'X';
      alert('You hit a bomb!');
      location.reload();
      return;
    }
  
    const count = getCount(row, column);
    if (count === 0) {
      cell.innerHTML = '';
    }
    if (count !== 0) {
      cell.innerHTML = count;
      return;
    }
  
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        open(row + y, column + x);
      }
    }
  }
    

    function isBomb(row, column){

        if(!isValid) return false;

        const index = row * width + column;

        return bombs.includes(index);
    }

    function isValid(row, column){
        return row >= 0 && row < height && column >= 0 && column < width;
    }
}
