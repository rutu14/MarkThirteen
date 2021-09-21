const checkBtn = document.querySelector('.btn-check');
const birthinp = document.querySelector('#birthdate');
const messageDiv = document.querySelector('.message');
const nearestmsg = document.querySelector('.message1');

const daysInMonthsLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


checkBtn.addEventListener('click', function clickEventHandler(){
    const birthdate = birthinp.value.split ('-');  
    if ( birthdate === "" || birthdate === null ) {        
        messageDiv.innerHTML = "Please select/enter a date";
    }
    else {
        console.log(birthdate);
        const palindrome = palindromePresent( birthdate );
        printstatement ( palindrome, birthdate );
    }
});



function palindromePresent( birthdate ) {
    
    const year = birthdate[0];
    const month = birthdate[1];
    const date = birthdate[2];

    const formatOne = month+date+year;
    const formatTwo = year+month+date;
    const formatThree = date+month+year;
    const formatFour = month+date+year.substring(2); 
    const formatFive = year.substring(2)+month+date; 
    const formatSix = date+month+year.substring(2); 



    if(checkFormat(formatOne)) {
        return `${date}-${month}-${year}`;
    }
    if(formatchecker(formatTwo)) {
        return `${date} / ${month} / ${year}`;
    }
    if(formatchecker(formatThree)){
        return `${date} / ${month} / ${year}`;
    }
    if(formatchecker(formatFour)){
        return `${date} / ${month} / ${year}`;
    }
    if(formatchecker(formatFive)){
        return `${date} / ${month} / ${year}`;
    }
    if(formatchecker(formatSix)){
        return `${date} / ${month} / ${year}`;
    }
    return false;
};


function formatchecker(format) {
    let i = 0, j = format.length-1;    
    for (; i<j ; i++){
      if(format[i] !== format[j]){ 
          return false;
        }
        j--;
    }
    return true;
}


function printstatement( palindrome, birthdate ) {
     if( !palindrome ) {
        neardateclosest = neardate(birthdate);
        prevdateclosest = prevdate(birthdate);
        messageDiv.innerHTML = "Oops! Your birthday is not a palindrome";        
        

        if( prevdateclosest[0] !== "" && neardateclosest[0] !== "" ) {
            if(neardateclosest[1] < prevdateclosest[1]) {
                nearestDate = neardateclosest[0];
                difference = neardateclosest[1];
            }
            else {
                nearestDate = prevdateclosest[0];
                difference = prevdateclosest[1];
            }
        }
        else if(prevdateclosest[0] === "") {
            nearestDate = neardateclosest[0];
            difference = neardateclosest[1];
        }
        else {
            nearestDate = prevdateclosest[0];
            difference = prevdateclosest[1];
        }
        nearestmsg.innerHTML=`<br/>The nearest palindrome date is: ${nearestDate}. You missed the date by ${difference} ${difference > 1 ? "days" : "day"}.`
    }
    else {
        messageDiv.innerHTML = "Yay! Your birthday is a palindrome";
    }
}
 


    function neardate(birthdate) {
    let yearForward = Number.parseInt(birthdate[0]);
    let monthForward = Number.parseInt(birthdate[1]);
    let dateForward = Number.parseInt(birthdate[2]);
    let nearestPalindromeDate = "";

    let difference = 0;
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

        difference++;

        nearestPalindromeDate = palindromePresent(birthday);
        if(nearestPalindromeDate!== false) {
            found = true;
            console.log("Nearest Forward", nearestPalindromeDate);
            break;
        }
    }    
    return [nearestPalindromeDate, difference];
}


function prevdate(birthdate){
    let yearBackward = Number.parseInt(birthdate[0]);
    let monthBackward = Number.parseInt(birthdate[1]);
    let dateBackward = Number.parseInt(birthdate[2]);

    let nearestPalindromeDate = "";
    let difference = 0;
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
        difference++;

        nearestPalindromeDate = palindromePresent(birthday);
        if(nearestPalindromeDate!== false) {
            found = true;
            console.log("Nearest Backward", nearestPalindromeDate);
            break;
        }
    }    
    
    return [nearestPalindromeDate, difference];
}


function isLeapYear(year) {

    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
};
