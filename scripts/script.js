// Wait for the page to load
window.onload = function() {
    // Find the main section in HTML
    var main = document.querySelector('main');
    
    // Create a container for our grid
    var grid = document.createElement('div');
    grid.id = 'grid';
    
    // Create 240 input boxes (15 rows × 16 columns = 240)
    for (var i = 0; i < 240; i++) {
        // Create one input box
        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'box';
        input.id = 'box-' + i; // Give each box a unique ID
        input.maxLength = 1; // Only one letter per box
        
        // Add the input box to our grid
        grid.appendChild(input);
    }
    
    // Add the grid to the page
    main.appendChild(grid);
    
    // Load the crossword words
    loadWords();
};

// Load words from JSON file
function loadWords() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            // Fill in the crossword with the words
            fillCrossword(data.words);
        })
        .catch(error => {
            console.log('Error loading words:', error);
        });
}

// Fill the crossword grid with words
function fillCrossword(words) {
    words.forEach(function(wordData) {
        var word = wordData.word;
        var startBoxId = wordData.startBoxId;
        var direction = wordData.direction;
        
        // Place each letter of the word
        for (var i = 0; i < word.length; i++) {
            var letter = word[i];
            var boxId;
            
            if (direction === 'horizontal') {
                // For horizontal: just add i to the start box ID
                boxId = 'box-' + (startBoxId + i);
            } else {
                // For vertical: add (i * 16) to move down rows
                boxId = 'box-' + (startBoxId + (i * 16));
            }
            
            // Find the box and put the letter in it
            var box = document.getElementById(boxId);
            if (box) {
                box.value = letter;
                box.style.backgroundColor = '#e6f3ff'; // Light blue background for filled boxes
            }
        }
    });
}