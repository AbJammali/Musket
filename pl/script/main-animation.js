//////////////////////Text animation for main picture/////////////////////////////////////
function typeTextSequence(elementId, texts, speed, delayBetweenTexts) {
  const element = document.getElementById(elementId);
  let textIndex = 0;

  function typeSingleText(text, callback) {
    element.textContent = ""; // Clear previous text
    let index = 0;
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    element.appendChild(cursor);

    function addNextCharacter() {
      if (index < text.length) {
        element.textContent = text.slice(0, index + 1); // Slice for accurate typing
        index++;
        setTimeout(addNextCharacter, speed);
      } else {
        cursor.remove(); // Remove the cursor after typing is done
        if (callback) callback(); // Proceed to the next text
      }
    }

    addNextCharacter();
  }

  function typeNextText() {
    if (textIndex >= texts.length) {
      textIndex = 0; // Restart the sequence when we reach the end
    }
    typeSingleText(texts[textIndex], () => {
      textIndex++;
      setTimeout(typeNextText, delayBetweenTexts); // Wait before typing the next text
    });
  }

  typeNextText();
}

// Usage:
const textList = [
  "W imię Allaha, Najdobrotliwszego, Najmiłosierniejszego",
 "Nie ma bóstwa oprócz Ciebie. Chwała Tobie! Zaprawdę, byłem wśród niesprawiedliwych",
"O Allahu, obdarz nas dobrem na tym świecie i dobrem w życiu ostatecznym i zachowaj nas od męki ognia piekielnego"
];
const typingSpeed = 100; // Adjust speed of typing (milliseconds per character)
const delayBetweenTexts = 3000; // Delay between texts in milliseconds
typeTextSequence('centered-text', textList, typingSpeed, delayBetweenTexts);