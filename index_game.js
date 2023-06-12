
function main(){
    let difficult = prompt("Choose the difficult: \n 1 - Easy \n 2 - Normal \n 3 - Hard")
    
    if(difficult.replace(" ", "") === "1"){
        start_game(8, 8, 12, "easy");
    }
    if(difficult.replace(" ", "") === "2"){
        start_game(12, 12, 30, "normal");
    }
    if(difficult.replace(" ", "") === "3"){
        start_game(16, 16, 40, "hard");
    }
}
main()
function start_game(width, height, bombs_count, diffucult){

    let field;

    if(diffucult === "easy"){
        field = document.querySelector('.field_easy');
    }
    if(diffucult === "normal"){
        field = document.querySelector('.field_normal');
    }
    if(diffucult === "hard"){
        field = document.querySelector('.field_hard');
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

    function getCount(row, column){
        let count = 0;
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                if(isBomb(row + y, column + x)){
                    count++;
                }
            }
        }
        return count;
    }

    function open(row, column){
        
        if(!isValid) return;
        
        const index = row * width + column;
        const cell = cells[index];
        
        if(cell.disabled === true) return;

        cell.disabled = true;
        closed_count--;
        let score = document.getElementById("score").innerHTML = closed_count;
        score--;
        
        if(closed_count <= bombs_count){
            alert("You won, son of the blyadi")
            return
        }

        if(isBomb(row, column)){
            cell.innerHTML = 'X';
            alert("YEBAN DOLBAEB")
            return;
        }

        const count = cell.innerHTML = getCount(row, column)
        if(count !== 0){
            cell.innerHTML = count;
            return;
        }

        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                open(row + y, column + x)
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
