
  
/* VARIABLES */
const checkBtn = document.querySelector('.btn-check');
const birthdateIp = document.querySelector('#birthdate');
const loadingDiv = document.querySelector('.loading');
const messageDiv = document.querySelector('.message');
const outputSec = document.querySelector('.check-output');

const daysInMonthsLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

checkBtn.addEventListener('click', handleCheckButtonClick);

function handleCheckButtonClick(e) {
    const birthdate = birthdateIp.value;
    // showSection(true);
    if(birthdate==="" || birthdate=== null) {
        // showMessage(true,"Please select your birthdate","error");
        messageDiv.innerHTML="Please enter a date"
    }
    else {
        // showMessage(true, "Crunching Numbers", "success");
        // console.log(birthdate.split('-'));
        // showLoadingDiv(true);

        const isPalindrome = checkIfPalindrome(birthdate.split('-'));
        setTimeout(function(){
            displayOutput(isPalindrome, birthdate.split('-'));
        }, 3000);
    }
}

// function showSection(flag) {
//     if(flag) {
//         outputSec.classList.remove('display-none');
//         outputSec.classList.add('display-block');
//     }
//     else {
//         outputSec.classList.add('display-none');
//         outputSec.classList.remove('display-block');
//     }
// }

// function showMessage(flag, message, className) {
//     if(flag) {
//         messageDiv.className = `message display-block ${className}`;
//         messageDiv.innerHTML = message;
//     }
//     else {
//         messageDiv.className = "message display-none";
//     }
// }

// function showLoadingDiv(flag) {
//     if(flag) {
//         loadingDiv.classList.remove('display-none');
//         loadingDiv.classList.add('display-block');
//     }
//     else {
//         loadingDiv.classList.add('display-none');
//         loadingDiv.classList.remove('display-block');
//     }
// }

function checkIfPalindrome(birthdate) {
    // console.log(birthdate);

    const year = birthdate[0];
    const month = birthdate[1];
    const date = birthdate[2];

    const formatOne = month+date+year; //mm-dd-yyyy
    const formatTwo = month+date+year.substring(2);
    const formatThree = date+month+year;
    const formatFour = year+month+date;



    if(checkFormat(formatOne)) {
        // return `${month}-${date}-${year}`;
        return `${date}-${month}-${year}`;
    }
    if(checkFormat(formatTwo)) {
        // return `${date}-${month}-${year.substring(2)}`;
        return `${date}-${month}-${year}`;
    }
    if(checkFormat(formatThree)){
        return `${date}-${month}-${year}`;
    }
    if(checkFormat(formatFour)){
        // return `${year}-${month}-${date}`;
        return `${date}-${month}-${year}`;
    }
    
    return false;
}

function checkFormat(format) {
    // console.log(format);
    let i = 0, j = format.length-1;    
    while(i < j) {
        // console.log(format[i], format[j]);
        if(format[i] !== format[j]) return false;
        i++;
        j--;
    }

    return true;
}

function displayOutput(isPalindrome, birthdate) {
    // showLoadingDiv(false);

    // console.log(isPalindrome);
    // messageDiv.className = "message output display-block";

    if(!isPalindrome) {
        closestDateForward = findClosestForwardDate(birthdate);
        closestDateBackward = findClosestBackwardDate(birthdate);

        messageDiv.innerHTML = "Oops! Your birthday is not a palindrome";
        

        let nearestDate = "";
        let diff = "";
        
        if(closestDateBackward[0] !== "" && closestDateForward[0]!=="") {
            if(closestDateForward[1] < closestDateBackward[1]) {
                nearestDate = closestDateForward[0];
                diff = closestDateForward[1];
            }
            else {
                nearestDate = closestDateBackward[0];
                diff = closestDateBackward[1];
            }
        }
        else if(closestDateBackward[0] === "") {
            nearestDate = closestDateForward[0];
            diff = closestDateForward[1];
        }
        else {
            nearestDate = closestDateBackward[0];
            diff = closestDateBackward[1];
        }

        messageDiv.innerHTML=`<br/>The nearest palindrome date is: <span class="color-primary bold">${nearestDate}</span>. You missed the date by <span class="color-primary bold">${diff} ${diff > 1 ? "days" : "day"}</span>.`
    }
    else {
        messageDiv.innerHTML = "Yay! Your birthday is a palindrome";
    }
}


function findClosestForwardDate(birthdate) {
    let yearForward = Number.parseInt(birthdate[0]);
    let monthForward = Number.parseInt(birthdate[1]);
    let dateForward = Number.parseInt(birthdate[2]);

    
    let nearestPalindromeDate = "";
    let diff = 0;

    let found = false;
    while(!found) {
        dateForward++;

        if(isLeapYear(yearForward)) {
            if(dateForward > daysInMonthsLeap[monthForward-1]) {
                dateForward = 1;
                monthForward++;
            }
        }
        else {
            if(dateForward > daysInMonths[monthForward-1]){
                dateForward = 1;
                monthForward++;
            }
        }

        if(monthForward > 12) {
            monthForward = 1;
            yearForward = yearForward + 1;
        }

        if(yearForward > 9999) break;

        let dateString = dateForward.toString();
        let yearString = yearForward.toString();
        let monthString = monthForward.toString();

        if(dateString.length === 1) dateString = "0"+dateString;
        if(monthString.length === 1) monthString = "0"+ monthString;

        if(yearString.length < 4) {
            if(yearString.length===0) {
                yearString = "0000";
            }
            else if(yearString.length === 1) {
                yearString = "000" + yearString;
            }
            else if(yearString.length === 2 ) {
                yearString = "00" + yearString;
            }
            else if(yearString.length === 3){
                yearString = "0" + yearString;
            }
        }
        birthday = [yearString, monthString, dateString];

        diff++;

        nearestPalindromeDate = checkIfPalindrome(birthday);
        if(nearestPalindromeDate!== false) {
            found = true;
            break;
        }
    }    
    return [nearestPalindromeDate, diff];
}

function findClosestBackwardDate(birthdate){
    let yearBackward = Number.parseInt(birthdate[0]);
    let monthBackward = Number.parseInt(birthdate[1]);
    let dateBackward = Number.parseInt(birthdate[2]);

    let nearestPalindromeDate = "";
    let diff = 0;

    let found = false;
    while(!found) {

        if(yearBackward >= 1) {
            dateBackward--;
            if(dateBackward < 1){
                monthBackward = monthBackward - 1;

                if(monthBackward < 1) {
                    monthBackward = 12;
                    yearBackward = yearBackward - 1;
                    if(yearBackward < 1) {
                        break;
                    }
                }
                if(isLeapYear(yearBackward)) {
                        dateBackward = daysInMonthsLeap[monthBackward-1];
                }
                else {
                        dateBackward  = daysInMonths[monthBackward-1];
                    }
            }
        }
        else {
            break;
        }
    
        let dateString = dateBackward.toString();
        let yearString = yearBackward.toString();
        let monthString = monthBackward.toString();

        if(yearString.length < 4) {
            if(yearString.length === 1) {
                yearString = "000" + yearString;
            }
            else if(yearString.length === 2 ) {
                yearString = "00" + yearString;
            }
            else if(yearString.length === 3){
                yearString = "0" + yearString;
            }
        }

        if(dateString.length === 1) dateString = "0"+dateString;
        if(monthString.length === 1) monthString = "0"+ monthString;

        birthday = [yearString, monthString, dateString];
        diff++;

        nearestPalindromeDate = checkIfPalindrome(birthday);
        if(nearestPalindromeDate!== false) {
            found = true;
            console.log("Nearest Backward", nearestPalindromeDate);
            break;
        }
    }    
    return [nearestPalindromeDate, diff];
}

function isLeapYear(year) {
    return year%400 === 0 || (year%100 !== 0 && year%4 === 0);
}