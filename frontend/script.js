document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const chatbot = document.querySelector(".chatbot");
    const closeBtn = document.querySelector(".close-btn");
    const sendBtn = document.getElementById("sendBtn");
    const textarea = document.querySelector(".chat-input textarea");
    const chatbox = document.querySelector(".chatbox");
    const micBtn = document.getElementById("micBtn");
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  
    recognition.lang = "en-US"; // Set language to English
    recognition.interimResults = true; // Enable interim results
  
    let isRecording = false;
  
    chatbotToggler.addEventListener("click", function () {
      document.body.classList.toggle("show-chatbot");
  
      if (document.body.classList.contains("show-chatbot")) {
        const bloodTypeQuestion = document.createElement("li");
        bloodTypeQuestion.classList.add("chat", "incoming");
        bloodTypeQuestion.innerHTML = `
          <span class="material-symbols-outlined">smart_toy</span>
          <p class="animate_animated animate_fadeInUp">Your Blood Type Please 🧐</p>
        `;
        chatbox.appendChild(bloodTypeQuestion);
      } else {
        recognition.stop();
      }
    });
  
    closeBtn.addEventListener("click", function () {
      document.body.classList.remove("show-chatbot");
      if (isRecording) {
        recognition.stop();
        isRecording = false;
      }
    });
  
    sendBtn.addEventListener("click", function () {
      sendMessage(textarea.value.trim());
    });
  
    micBtn.addEventListener("click", function () {
      micBtn.classList.toggle("active");
  
      if (micBtn.classList.contains("active")) {
        micBtn.textContent = "pause"; 
        recognition.start();
        isRecording = true;
      } else {
        micBtn.textContent = "mic"; 
        recognition.stop();
        isRecording = false;
      }
    });
  
    recognition.onresult = function (event) {
      const userMessage = event.results[0][0].transcript.trim();
      if (event.results[0].isFinal) {
        sendMessage(userMessage);
      }
    };
  
    recognition.onerror = function (event) {
      console.error("Speech recognition error occurred:", event.error);
      isRecording = false;
    };
  
    function sendMessage(message) {
        if (message !== "") {
          const outgoingMessage = document.createElement("li");
          outgoingMessage.classList.add("chat", "outgoing");
          outgoingMessage.innerHTML = `<p style="color: #fff;">${message}</p>`;
          chatbox.appendChild(outgoingMessage);
      
          const loadingIcon = document.createElement("li");
          loadingIcon.classList.add("chat", "loading");
          loadingIcon.innerHTML = `<span class="loader"></span><span class="loader"></span>`;
          chatbox.appendChild(loadingIcon);
      
          navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
      
            fetch("http://localhost:5000/api/searchBloodType", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ selectedBloodType: message, latitude, longitude }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                const loadingIcon = document.querySelector(".loading");
                if (loadingIcon && chatbox.contains(loadingIcon)) {
                  chatbox.removeChild(loadingIcon);
                }
      
                if (data.closestPlace && data.closestPlace.latitude !== undefined && data.closestPlace.latitude !== null) {
                  const mapContainer = document.createElement("div");
                  mapContainer.classList.add("map-container");
                  mapContainer.innerHTML = `
                    <iframe
                      width="100%"
                      height="400px"
                      frameborder="10"
                      scrolling="yes"
                      marginheight="3"
                      marginwidth="10"
                      src="https://www.google.com/maps?q=${data.closestPlace.latitude},${data.closestPlace.longitude}&output=embed"
                    ></iframe>
                  `;
                  chatbox.appendChild(mapContainer);
      
                  const closestPlace = document.getElementById("closestPlace");
                  closestPlace.innerText = `Closest Place: ${data.closestHospital.name} (${data.closestHospital.distance} km)`;
      
                  closestPlace.addEventListener("click", function () {
                    mapContainer.classList.toggle("map-visible");
                  });
                } else {
                  console.error("Error: Data.closestPlace or its latitude property is undefined or empty.");
                }
      
                if (data.data) {
                  Object.values(data.data).forEach((donors) => {
                    donors.forEach((donor) => {
                      const donorMessage = document.createElement("li");
                      donorMessage.classList.add("chat", "incoming");
                      donorMessage.innerHTML = `
                        <span class="material-symbols-outlined">smart_toy</span><br/>
                        <p><a href="#" id="closestPlace" class="hospital-link" style="text-decoration: none; color:#fff ;"></a></br>Blood Amount: ${donor.bloodAmount} ml</p>
                      `;
                      chatbox.appendChild(donorMessage);
                    });
                  });
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                if (loadingIcon && chatbox.contains(loadingIcon)) {
                  chatbox.removeChild(loadingIcon);
                }
              });
          });
        }
      }
      
      
}
)
       



// function findNearestPlace() {
//     const bloodType = document.getElementById("bloodType").value;
    
//     if (!bloodType) {
//         alert("Please enter blood type.");
//         return;
//     }

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             const myLocation = {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude
//             };



//             // Send request to backend
//             fetch("http://localhost:5000/api/searchBloodType", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ latitude: myLocation.latitude, longitude: myLocation.longitude, selectedBloodType: bloodType })
//             })
//             .then(response => response.json())
//             .then(data => {
                
//                 document.getElementById("result").innerText = JSON.stringify(data, null, 2);
//             })
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//                 document.getElementById("result").innerText = "Error fetching data";
//             });
//         });
//     } else {
//         console.error("Geolocation is not supported by this browser.");
//         document.getElementById("result").innerText = "Geolocation is not supported by this browser.";

