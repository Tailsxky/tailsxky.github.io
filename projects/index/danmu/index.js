window.onload = function() {

  var arr = []; // Save the add text in an array for future use 
  var showTable = document.getElementById('showTable'); //get the element of the danmu wall 
  var inputText = document.getElementById('inputText'); //get the input element
  var addText = document.getElementById('addText'); //get the add button element
  var clearText = document.getElementById('clearText'); //get the clear button element
  var showTableWidth = showTable.clientWidth; //get the width of the danmu wall element on cilent's browser

  //console.log(showTableWidth);

  /* the function is to add the text from the input element on the danmu wall */
  var addTextOnTable = function() {
    var theText = inputText.value; //get the text in the input element
    if (theText !== "" && theText !== null) {
      //arr.push(inputText);
      moveText(theText); // call the moveText function
      inputText.value = ''; //clear the text in the input element
    } else {
      console.log("err");
    }
  };

  /* this function is to place the content on the danmu wall and move it from right to 
  the left and disappear */
  var moveText = function(theText) {
    var spanText = document.createElement('span'); //create a span node in the HTML 
    //console.log(theText);
    spanText.innerText = theText; //add the text from the input element into the span node
    showTable.appendChild(spanText); //add the span element on the page within the parent danmu element


    spanText.style.color = getRandomColor(); //set the text color random
    spanText.style.fontSize = getRandomFontSize(); //set the text fontsize random
    spanText.style.left = showTableWidth + 'px'; //set the text appearing at the right side of the danmu wall
    spanText.style.top = getRandomTop(); //set the text at random height of the danmu wall

    // the original way to move the text, but not smoothly

    /*setInterval(function(){
      var textLeft = parseInt(spanText.style.left);
      textLeft -= 25;
      spanText.style.left = textLeft + 'px'; 
    }, 111);*/

    /* new way to move the text, used library 
     * github address: https://github.com/akira-cn/animator.js */

    var a1 = new Animator(10 * showTableWidth, function(p) {
      var tx = showTableWidth * p * 1.3;
      spanText.style.transform = 'translateX(' + -tx + 'px)'; //translate to the left
    });

    async function move() {
      while (1) {
        await a1.animate();
        if (tx > showTableWidth) {
          spanText.innerText = null;
        }
        break;
      }
    }
    move();
  };

  /* get random coolor function */
  var getRandomColor = function() {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
  };

  /* get random font size but not smaller than 12px */

  var getRandomFontSize = function() {
    var fontSize = Math.floor(Math.random() * 32);
    if (fontSize > 12) {
      return fontSize + 'px';
    }
  };

  /* get the random Top position, as the danmu element is 300px in height, so used 280 */
  var getRandomTop = function() {
    return (Math.floor(Math.random() * 280) + 'px');
  };


  /* clear the text nodes */
  var removeAllChild = function() {
    while (showTable.hasChildNodes()) {
      showTable.removeChild(showTable.firstChild);
    }
  };

  addText.addEventListener("click", addTextOnTable);
  clearText.addEventListener("click", removeAllChild);
};