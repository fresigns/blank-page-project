/* div left - id counter div */
    
    function updateCounters(){

        const textarea = document.getElementById('textarea');

        const counterDiv = document.getElementById('counter-div');
                                                    /* value = contenuto digitato dall'utente*/
        const wordsCount = countWords(textarea.value)

        const charactersCount = countCharacters(textarea.value)

        counterDiv.textContent = `Hai scritto ${wordsCount} parole e ${charactersCount} caratteri`;
    
    }

    function countWords(text){
        const trimmedText = text.trim();

        if (trimmedText === '') {
            return 0
        }
                                                    /* \s spazio */
        const wordsArray = trimmedText.split(/\s+/);
        return wordsArray.length;
    }
    
    function countCharacters(text){

        const textWithoutSpaces = text.replace(/\s+/g, '');
        return textWithoutSpaces.length;
    }


    const textarea = document.getElementById('textarea');
    textarea.addEventListener('input', updateCounters);



updateCounters();




/* div class center */


/* div class right */
/* SWITCH THEME*/
function switchThemes(){
    console.log('switch themes');
    
    const textarea = document.getElementById('textarea');
    
    if (document.body.className === 'light' && textarea.className === 'light'){
        textarea.className = 'dark'
        document.body.className = 'dark'
    } else {
        document.body.className = 'light';
        textarea.className = 'light';
    }  
}

/* DOWNLOAD */
function downloadTxt(){
    const textToSave = textarea.value;

    const blob = new Blob([textToSave], {type: 'text/plain'});

    const url = URL.createObjectURL(blob);

    const downladLink = document.createElement('a');
    downladLink.href = url;
    downladLink.download = 'testo.txt';

    document.body.appendChild(downladLink);
    downladLink.click();
    document.body.removeChild(downladLink);
}

const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', downloadTxt);


/* FULLSCREEN */
const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', toggleFullScreen);

function toggleFullScreen(){

    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function enterFullscreen(){

    const element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        // Mozilla Firefox            
    } else if (element.webkitRequestFullscreen) {
        //
    } else if (element.msRequestFullscreen){
        element.msRequestFullscreen();
    }
}

function exitFullscreen(){
    
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen){

    } else if (document.webkitExitFullscreen) {

    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } 
}

/* TOGGLE */

const toggleButton = document.getElementById('markdown-btn');
toggleButton.addEventListener('click', toggleConversion)

let isMarkdown = true;
let originalText = '';

/* markdownit si riferisce alla libreria che ho importato */ 
const md = window.markdownit()

function toggleConversion(){
    if (isMarkdown) {
        originalText = textarea.value;
        
        const htmlText = md.render(originalText);
        const preview = document.getElementById('preview');
        
        preview.innerHTML = htmlText;
        
        textarea.style.display = 'none';
        preview.style.display = 'block';
    } else {
        const preview = document.getElementById('preview');

        preview.style.display = 'none';
        textarea.style.display = 'block';

        textarea.value = originalText;
    }
    isMarkdown = !isMarkdown;
}

/* SAVE */

function saveLocally(){
    textarea.addEventListener('input', function (event){
        const text = event.target.value;
        localStorage.setItem(localStorageKey, text);
    });
}

function loadLocally(){
    window.addEventListener('load', function (){
        const savedText = this.localStorage.getItem(localStorageKey)

        if (savedText) {
            textarea.value = savedText
        }
    });
}

/* STORAGE KEY */
const localStorageKey = 'testo: ';

/*richiama funzioni*/
saveLocally();
loadLocally();