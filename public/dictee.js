 // data.js

let char_list = characters
let french_list = french

// webpage items

let page = 
{
    french: document.getElementById("french_text"),
    pinyin: document.getElementById("pinyin_text"),
    character: document.getElementById("character_text")
};

// shuffle utility

let shuffleArray = (array) =>
{
    for (var i = array.length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// get_nexts

let len = char_list.length
var range = [...Array(len).keys()];
var offset_in_range = 0
var offset = 0

shuffleArray(range)

let get_next_offset = () =>
{
    offset = range[offset_in_range]
    offset_in_range++
}

let get_next_french = () => {return french_list[offset]}

let get_next_pin = () => {return pinyin(char_list[offset])}

let get_next_char = () => {return char_list[offset]}

// logic

var mode = 0

let next = () =>
{
    if (mode === 0) {
        get_next_offset()
        page.french.innerHTML = get_next_french()
        page.pinyin.innerHTML = "..."
        page.character.innerHTML = "..."
    } else if (mode === 1) {
        page.pinyin.innerHTML = get_next_pin()
    } else {
        page.character.innerHTML = get_next_char()
        mode = -1 //gets back to 0 below
    }
    mode++
}

// webpage buttons

document.getElementById("GO").onclick = next
