function start_game(width, height, bombs_cunt){
    const field = document.querySelector('.field')
    const cells_count = width * height
    field.innerHTML =   '<button></button>'.repeat(cells_count)
}

function main(){
    start_game(8, 8, 15)
}
main()