// Import words from the words.js file
let currentIndex = null;
let previousWords = [];
let filteredWords = words; // Default to all words
let sourceFilter = ""; // Track the selected source

// Function to generate a random word
function generateRandomWord() {
  if (filteredWords.length === 0) {
    document.getElementById("word").innerHTML =
      "No words available for the selected source.";
    return;
  }

  currentIndex = Math.floor(Math.random() * filteredWords.length);
  displayWord(currentIndex);
}

// Function to display a word by index (based on the current filtered words)
function displayWord(index) {
  const randomWord = filteredWords[index];

  document.getElementById("word").innerHTML = randomWord.french;
  document.getElementById(
    "turkishMeaning"
  ).innerHTML = `Turkish: ${randomWord.turkish}`;
  document.getElementById(
    "sourceMeaning"
  ).innerHTML = `Source: ${randomWord.source}`;

  // Store previous words for undo functionality
  if (!previousWords.includes(index)) {
    previousWords.push(index);
  }

  document.getElementById("turkishMeaning").style.display = "none";
}

// Function to toggle the meaning (show/hide)
function toggleMeaning() {
  const turkishElement = document.getElementById("turkishMeaning");
  if (turkishElement.style.display === "none") {
    turkishElement.style.display = "block";
  } else {
    turkishElement.style.display = "none";
  }
}

// Undo button functionality to go back to the previous word
function undoWord() {
  if (previousWords.length > 1) {
    previousWords.pop(); // Remove current word from the stack
    const previousIndex = previousWords[previousWords.length - 1];
    displayWord(previousIndex); // Show the previous word
  }
}

// Show words in order
let orderIndex = 0;
function showWordInOrder() {
  if (filteredWords.length === 0) {
    document.getElementById("word").innerHTML =
      "No words available for the selected source.";
    return;
  }

  if (orderIndex < filteredWords.length) {
    displayWord(orderIndex);
    orderIndex++;
  } else {
    orderIndex = 0; // Reset order when list ends
  }
}

// Function to select a word by its source
function selectWordBySource() {
  const selectedSource = document.getElementById("sourceSelector").value;

  if (selectedSource === "") {
    // Reset to all words when no source is selected
    filteredWords = words;
  } else {
    // Filter words based on the selected source
    filteredWords = words.filter((word) => word.source === selectedSource);
  }

  // Reset previous words and indexes
  previousWords = [];
  orderIndex = 0;

  if (filteredWords.length > 0) {
    displayWord(0); // Display the first word from the filtered list
  } else {
    document.getElementById("word").innerHTML =
      "No words found for the selected source.";
    document.getElementById("turkishMeaning").innerHTML = "";
    document.getElementById("sourceMeaning").innerHTML = "";
  }
}
