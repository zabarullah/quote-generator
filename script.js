const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []  // The try catch was added first then we added the apiQuotes outside of the function also.

// loading function to show we are loading whillst hiding the quote container
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() { // we will use math.floor (to make whole number) and math.random to help pick one quote from the list of array the api generates.
// Pick a random quote from the apiQuotes array
loading();
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//check if Author field is blank or null then replace it with 'Unknown'
    if (!quote.author) {
       authorText.textContent = 'Unknown';
    } else {
       authorText.textContent = quote.author;
    }

// check the Quote length to determine styling for the long text quotes, so that based on length of quote it will add or remove the classList 'long-quote for the quoteText. This way if text is larger than 50 characters it will use the style class of long-quote which is designed to make the text smaller.
    if (quote.text.length > 50) {
       quoteText.classList.add('long-quote'); // adds the css class to the quoteText
    } else {
        quoteText.classList.remove('long-quote'); // removes the css class to the quoteText
    }

//authorText.textContent = quote.author;    this line of code has been inserted in the if statement so that if author is null then it can change text content to Unknown and otherwise it will simply use the else statement
    quoteText.textContent = quote.text; 
//set quote, Hide loader
    complete();    
}

/* to generate a quote from a local source, we simply need to create a localQuote.js file with an array of quotes(similar to the ones in the apiUrl below). link the file to the html and then in the newquote() function you simply change the quote source as follows:
function newQuote() {
    const quote = localQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
}

Note you will not need the async getQuotes function or its global variables or the call function getQuotes(). 
*/

// Get quotes from API
async function getQuotes() {  
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
      //  Catch Error Here. Usually You would add an alert feature here. But we will not in this case, since we are just generating a quote.
    }
}

//Tweet a Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; // we used back ticks instead of the standard '' for the url because the `` back ticks allows us to add extra parameters as above.
    window.open(twitterUrl, '_blank');  // will open twitter url in a new tab
}

//Event Listeners 
newQuoteBtn.addEventListener('click', newQuote); // note we dont need to call the function with the brackets () as the event listener does this for you.
twitterBtn.addEventListener('click', tweetQuote); 

//On Load
getQuotes();
loader();