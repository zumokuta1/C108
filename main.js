var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);

    var Content = event.results[0][0].transcript;
    console.log(Content);

    if (Content == "Toma mi selfie") {
        console.log("Tomando selfie...");
        speak();
    }

    document.getElementById("textbox").innerHTML = Content;
};

function speak() {
    var synth = window.speechSynthesis;

    speak_data = "Tomando tu selfie en 5 segundos...";

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
    Webcam.attach("#camera");

    setTimeout(function () {
        img_id = "selfie1";
        take_snapshot();
        speak_data = "Tomando la próxima selfie en 10 segundos";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }, 5000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}
var currentSelfie = 1;

function take_snapshot() {
    console.log("Taking selfie " + currentSelfie);

    Webcam.snap(function (data_uri) {
        var resultContainer = document.getElementById("selfie" + currentSelfie);

        // Verifica si el elemento existe antes de intentar acceder a su propiedad innerHTML
        if (resultContainer) {
            resultContainer.innerHTML = '<img src="' + data_uri + '"/>';
        } else {
            console.error("El elemento resultContainer es null");
        }

        // Incrementa el contador para la siguiente selfie
        currentSelfie++;

        // Si ya tomaste las tres selfies, reinicia el contador
        if (currentSelfie > 3) {
            currentSelfie = 1;
        }
    });
}

