import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxgJ5fFIfm7RJBkAUJaQI68bKsPyuFr2U",
  authDomain: "boscore-421d2.firebaseapp.com",
  projectId: "boscore-421d2",
  storageBucket: "boscore-421d2.appspot.com",
  messagingSenderId: "638402049169",
  appId: "1:638402049169:web:8cb96e7a0c83f11b2d7b30",
};

// init firebase app
initializeApp(firebaseConfig);

//  init services
const db = getFirestore();

const sports = ['Basketball', 'Football', 'Chess', 'Cricket', 'Volleyball', 'Table_Tennis']
let sportDiv = document.getElementById('matches')
let sportStore = []
let matches = ''

sports.forEach((ele) => {
  //  collection ref
  const colRef = collection(db, ele);

  //get collection data
  getDocs(colRef)
    .then((snapshot) => {
      let res = [];
      snapshot.docs.forEach((doc) => {
        res.push({ ...doc.data(), id: doc.id });
      });
      res.forEach((element) => {
        // console.log(element)
        //   let match = `<div class="match">
        //   <h2>${ele}</h2>
        //   <h3>${element.home_team} vs ${element.away_team}</h3>
        //   <p>${element.final_home_score} - ${element.final_away_score}</p>
        //   <p>${element.time}</p>
        // </div>`
        let match = `<div class="row" id="${ele}">
        <h2 style="text-align: center;">${ele}</h2>
        <div class="col d-flex flex-column justify-content-center align-items-center"><img style="width: 50%;"
                class="img-fluid" src="images/${ele}.jpg" alt=""></div>
        <div class="col d-flex flex-column justify-content-center align-items-center sport_info"
            style="text-align: center;">
            ${element.home_team} <br> vs <br> ${element.away_team}<br>Time: ${element.time}
        </div>
    </div>`
        matches += match
      })
      let temp = {
        'game': ele,
        'data': res
      }
      sportStore.push(temp)
    })
    .then(() => {
      sportDiv.innerHTML = matches
    })
    .catch((err) => {
      console.log(err.message);
    });
}
)

// console.log(sportStore);