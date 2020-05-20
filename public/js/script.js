//console.log('Test');

//User log in variables
const username = document.querySelector('#username');
const signUpSubmit = document.querySelector('#signUpSubmit');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

const btnAddFriend = document.querySelector('#btnAddFriend');
const friendsEmail = document.querySelector('#friendsEmail');

const addGroupToDB = document.querySelector('#addGroupToDB');

//vars for choosing work or OTHER on each day
const chooseWorkMon = document.querySelector('#chooseWorkMon');
const chooseOtherMon = document.querySelector('#chooseOtherMon');
const chooseWorkTue = document.querySelector('#chooseWorkTue');
const chooseOtherTue = document.querySelector('#chooseOtherTue');
const chooseWorkWed = document.querySelector('#chooseWorkWed');
const chooseOtherWed = document.querySelector('#chooseOtherWed');
const chooseWorkThu = document.querySelector('#chooseWorkThu');
const chooseOtherThu = document.querySelector('#chooseOtherThu');
const chooseWorkFri = document.querySelector('#chooseWorkFri');
const chooseOtherFri = document.querySelector('#chooseOtherFri');
const chooseWorkSat = document.querySelector('#chooseWorkSat');
const chooseOtherSat = document.querySelector('#chooseOtherSat');
const chooseWorkSun = document.querySelector('#chooseWorkSun');
const chooseOtherSun = document.querySelector('#chooseOtherSun');
//variables for start & time
const startTimeMon = document.querySelector('#startTimeMon')
const startTimeTue = document.querySelector('#startTimeTue');
const startTimeWed = document.querySelector('#startTimeWed');
const startTimeThu = document.querySelector('#startTimeThu');
const startTimeFri = document.querySelector('#startTimeFri');
const startTimeSat = document.querySelector('#startTimeSat');
const startTimeSun = document.querySelector('#startTimeSun');
const endTimeMon = document.querySelector('#endTimeMon');
const endTimeTue = document.querySelector('#endTimeTue');
const endTimeWed = document.querySelector('#endTimeWed');
const endTimeThu = document.querySelector('#endTimeThu');
const endTimeFri = document.querySelector('#endTimeFri');
const endTimeSat = document.querySelector('#endTimeSat');
const endTimeSun = document.querySelector('#endTimeSun');
//date consts
const inputDateMon = document.querySelector('#inputDateMon');
const inputDateTue = document.querySelector('#inputDateTue');
const inputDateWed = document.querySelector('#inputDateWed');
const inputDateThu = document.querySelector('#inputDateThu');
const inputDateFri = document.querySelector('#inputDateFri');
const inputDateSat = document.querySelector('#inputDateSat');
const inputDateSun = document.querySelector('#inputDateSun');
//add buttons
const addMonday = document.querySelector('#addMonday');
const addTuesday = document.querySelector('#addTuesday');
const addWednesday= document.querySelector('#addWednesday');
const addThursday = document.querySelector('#addThursday');
const addFriday = document.querySelector('#addFriday');
const addSaturday = document.querySelector('#addSaturday');
const addSunday = document.querySelector('#addSunday');
const saveWeek = document.querySelector('#saveWeek'); //save week button

if(typeof (signUpSubmit) != 'undefined' && signUpSubmit != null ){
    signUpSubmit.addEventListener('click', (e) => {
    if (username.value === ""|| personalisedName.value ==="")  {
        e.preventDefault();
        window.alert('Oops! You need an email address and/or a username!');
    }
    if (password.value != confirmPassword.value) {
        e.preventDefault();
        window.alert('Oops! Password needs to be the same as confirm password!');
    }
});
}



const messageContainer = document.querySelector('.messageContainer');
const queryString = window.location.search;

if(queryString == '?incorrectLogin'){
    messageContainer.innerHTML = `<div class ="card-panel red">Oh dear! Wrong email and/or password!</div`
}
if(queryString == '?contactSaved'){
    messageContainer.innerHTML =`<div class ="card-panel red">Contact Saved</div`
}
/*function searchForFriend() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchForContact");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}*/
if(typeof (btnAddFriend) != 'undefined' && btnAddFriend != null ){
    btnAddFriend.addEventListener('click', (e) => {
    if (email.value === "")  {
        e.preventDefault();
        window.alert('Oops! You need to add a valid email!');
    }
    });
    }