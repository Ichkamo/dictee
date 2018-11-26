// import characters from data

let char_weeks = [characters0, characters1, characters2, characters3, characters4, characters5, characters6, characters7]
let french_weeks = [french0, french1, french2, french3, french4, french5, french6, french7]

// globals

var char_list;        // character list for selected weeks
var french_list;      // associated french lists
var len;              // length of array
var range;            // offsets for every member in array (shuffled)
var offset_in_range;  // iterator for range
var offset;           // actual offset in array == range[offset_in_range]
var mode;             // what to disp next: french pinyin or character

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

// build html checkboxes

let build_week_checkboxes = () =>
{
    let checkboxes = document.getElementById("checkboxes")
    
    var weekboxes = ""
    var i = 0
    while (i < char_weeks.length)
    {
        weekboxes +=
        '<div class="p-2"><div class="form-check">' + 
        '    <input class="form-check-input" type="checkbox" id="week' + i + '"' +
        (i == char_weeks.length - 1 ? "checked" : "") + '>' +
        '    <label class="form-check-label">' +
        '        week ' + i +
        '    </label>' +
        '</div></div>'
        i++
    }
    
    checkboxes.innerHTML = weekboxes
}

// html items

let page = 
{
    french: document.getElementById("french_text"),
    pinyin: document.getElementById("pinyin_text"),
    character: document.getElementById("character_text"),
    counter: document.getElementById("counter")
};

// characters itteration management

let get_next_offset = () =>
{
    offset = range[offset_in_range]
    offset_in_range++
    page.counter.innerHTML = "" + offset_in_range + "/" + len
}

let start_dictee = () =>
{
    char_list = []
    french_list = []
    //check checkboxes status
    var i = 0
    var week_box = document.getElementById("week" + i)
    while (week_box)
    {
        if (week_box.checked === true)
        {
            char_list = char_list.concat(char_weeks[i])
            french_list = french_list.concat(french_weeks[i])
        }
        i++
        week_box = document.getElementById("week" + i)
    }
    //reset all variables
    len = char_list.length
    range = [...Array(len).keys()];
    offset_in_range = 0
    offset = 0
    mode = 0
    shuffleArray(range)
    page.counter.innerHTML = "0/" + len
    page.french.innerHTML = "Click GO to Start"
    page.pinyin.innerHTML = "..."
    page.character.innerHTML = "..."
}

// GO button

let next = () =>
{
    if (offset_in_range < len)
    {
        if (mode === 0) {
            get_next_offset()
            page.french.innerHTML = french_list[offset]
            page.pinyin.innerHTML = "..."
            page.character.innerHTML = "..."
        } else if (mode === 1) {
            page.pinyin.innerHTML = pinyin(char_list[offset])
        } else {
            page.character.innerHTML = char_list[offset]
            mode = -1 //gets back to 0 below
        }
        mode++
    } else {
        page.french.innerHTML = "Reached the end!"
        page.pinyin.innerHTML = "..."
        page.character.innerHTML = "..."
    }
}

// html buttons

document.getElementById("GO").onclick = next
document.getElementById("Restart").onclick = start_dictee

build_week_checkboxes()
start_dictee()
