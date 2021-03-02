 /*
coding the voice api - resources:
https://www.youtube.com/watch?v=kagZyM0wzJk&ab_channel=CodingJourney
https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

 */

const searchForm = document.querySelector("#search-form"); //search from element 
const searchFormInput = searchForm.querySelector("input"); //input the in search bar 
const info = document.querySelector(".info");

//checking if the window is suppoerted with and without prefix
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//checking if the speech recognition API is supported by the users browser
if(SpeechRecognition) {

	console.log ("Your browser supports speech recognition");

	searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
	const micBtn = searchForm.querySelector("button");
	const micIcon = micBtn.querySelector("i");
	//const micIcon = micBtn.firstElementChild;
//new speech recognition object that will handle the speech recognition process
	const recognition = new SpeechRecognition();

	//recognition.continous = true;
//when the speech recognition button is pressed, we will mute and unmute it
	micBtn.addEventListener("click", micBtnClick);
//first we need to know the current status of the button
funtion micBtnClick() {

	if (micIcon.classList.contains("fa-microphone")) { //start speech recog. if the class contains the microphone icon
		recognition.start();
	} 
	else { //stop speech recog.

		/*micIcon.classList.remove("fa-microphone");
		micIcon.classList.add("fa-microphone");*/
		recognition.stop();

}
}
recognition.addEventListener("start", startSpeechRecognition); 
function startSpeechRecognition() {
	micIcon.classList.remove("fa-microphone");
	micIcon.classList.add("fa-microphone-slash");
	searchFormInput.focus();
	console.log("speech recognition is active");
}
recognition.addEventListener("end", endSpeechRecognition);  
function endSpeechRecognition() {
	micIcon.classList.remove("fa-microphone-slash");
	micIcon.classList.add("fa-microphone");
	searchFormInput.focus();
	console.log("speech recognition is disconencted");
}

recognition.addEventListener("result", resultOfSpeechRecognition);
function resultOfSpeechRecognition(event) {

	const currentResultIndex = event.resultIndex;
	const transcript = event.results[currentResultIndex][0].transcript;
	//searchFormInput = transcript; 

	if(transcript.toLowerCase().trim()=== "stop recording"){
		recognition.stop();
	} else if(!searchFormInput.value){
		searchFormInput.value = transcript
	} else{
		if(transcript.toLowerCase().trim()=== "go") {
			searchForm.submit();
		}

		else if(transcript.toLowerCase().trim()=== "reset input") {
			searchFormInput.value = "";
		} else{
			searchFormInput.value = transcript;
		}
	}

	/*setTimeout(() => {
		//timeout to submit results immediately 
		
	}, 750);*/
	
}

info.textContent = 'Voice commands: "stop recording", "reset input", "go"';

} 

else{
	console.log("Your browser does not support speech recognition");
	info.textContent = "Your browser does not support speech recognition";
}