// This will let you send a string from your web interface back to the microbit
// It adds a "newline" character at the end of the string, so that the microbit
// program can tell the command is complete

const svgObjectScene = document.getElementById("Scene"); //Retrieving scene ID
const svgMoneyIcon = document.getElementById('moneySVG');
const svgPlusIcon = document.getElementById('plusSVG');
const svgHealthIcon = document.getElementById('healthSVG');
const svgSocialIcon = document.getElementById('socialSVG');






svgObjectScene.addEventListener('load', function() {

  const jobs = [
    {
      title: "Physician",
      multiplier: 3.0,
      education: "Medicine",
      likelihood: 0.2, // Highly competitive field
    },
    {
      title: "Anesthesiologist",
      multiplier: 3.5,
      education: "Medicine",
      likelihood: 0.1, // Even more competitive than physician
    },
    {
      title: "Surgeon",
      multiplier: 3.2,
      education: "Medicine",
      likelihood: 0.15, // Similar competitiveness to anesthesiologist
    },
    {
      title: "Petroleum Engineer",
      multiplier: 2.2,
      education: "Engineering",
      likelihood: 0.6, // Demand can fluctuate with oil prices
    },
    {
      title: "Marketing Manager",
      multiplier: 1.8,
      education: "Marketing, Business Administration",
      likelihood: 0.7, // Generally high demand
    },
    {
      title: "Financial Analyst",
      multiplier: 1.7,
      education: "Finance, Accounting",
      likelihood: 0.8, // Strong demand in most industries
    },
    {
      title: "Data Analyst",
      multiplier: 1.6,
      education: "Statistics, Mathematics",
      likelihood: 0.85, // Growing demand across various fields
    },
    {
      title: "Human Resources Manager",
      multiplier: 1.5,
      education: "Business Administration",
      likelihood: 0.75, // Essential role in most organizations
    },
    {
      title: "Sales Manager",
      multiplier: 1.4,
      education: "Business Administration, Marketing",
      likelihood: 0.7, // Depends on industry and product
    },
    {
      title: "Project Manager",
      multiplier: 1.4,
      education: "Management, Engineering",
      likelihood: 0.8, // Broad applicability across industries
    },
    {
      title: "Architect",
      multiplier: 1.8,
      education: "Architecture",
      likelihood: 0.5, // Competitive; licensure required
    },
    {
      title: "Civil Engineer",
      multiplier: 1.6,
      education: "Engineering",
      likelihood: 0.65, // Infrastructure needs drive demand
    },
    {
      title: "Physician Assistant",
      multiplier: 2.0,
      education: "Nursing",
      likelihood: 0.5
    }
];

  const degreeNameTimes = [
    {
      title: "Medicine",
      time: 8,
    },
    {
      title: "Engineering",
      time: 5,
    },
    {
      title: "Marketing",
      time: 4,
    },
    {
      title: "Business Administration",
      time: 4,
    },
    {
      title: "Statistics",
      time: 4,
    },
    {
      title: "Mathematics",
      time: 4,
    },
    {
      title: "Nursing",
      time: 3,
    },
    {
      title: "Architecture",
      time: 6,
    },
  ]


// Call the function to display a random job on page load


  const svgDoc = svgObjectScene.contentDocument; // Access the SVG document within the object
  const moneySVG = svgMoneyIcon.contentDocument;
  const plusSVG = svgPlusIcon.contentDocument;
  const fitnessSVG = svgHealthIcon.contentDocument;
  const socialSVG = svgSocialIcon.contentDocument;

  // Get elements using svgDoc.getElementById()
  const jobInfoElement = document.getElementById("getJob");
  const degreeList = document.getElementById("degreeList");
  const containerElement = document.getElementById('containerElement')
  const selectFitness = fitnessSVG.getElementById('fitness');
  const selectSocial = socialSVG.getElementById('social');
  const sun = svgDoc.getElementById('Sun');
  const moon = svgDoc.getElementById('Moon');
  const background = document.getElementById('body');
  const cloudLeft = svgDoc.getElementById('cloudLeft');
  const cloudRight = svgDoc.getElementById('cloudRight');
  const cloudCenter = svgDoc.getElementById('cloudCenter');
  const popUpElement = document.getElementById('popUp');
  const scoreElement = document.getElementById('score');

  let intervalId;
  let study = '';
  let studyYearsRemaining = null;
  let jobApplication = '';
  let jobRequiredEducation = '';
  let job = '';
  let studyDuration = 0;
  let currentDegreeIndex = 0;
  let money = 0;
  let inMenu = false;
  let payDay = true;
  let skipYear = false;
  let selectingOption = false;
  let gameOver = false;
  let education = '';
  let moneyTotal = 0;
  let multiplier = 1;
  let chance = 0;
  let roll = 0;
  let likelihood = 0;
  let A = 0;
  let B = 1;
  let score = 0;
  let fitness = 1;
  let social = 1;
  let globalSpeed = 1;
  let year = 1;
  const oneCycle = 60;
  const oneCycleJS = (oneCycle * 1000);



  function showDegreeList() {
    if (study === '') {
      const listItems = [];
      for (const degree of degreeNameTimes) {
        const completionTime = degree.time; // Access time property
        const listItem = `<li><b>${degree.title}</b>: ${completionTime} years</li>`;
        listItems.push(listItem);
      }
      jobInfoElement.innerHTML = '';
      degreeList.innerHTML = `<ul>${listItems.join("")}</ul><br>`;
      containerElement.style.display = "block"; // Show the pop-up
      inMenu = true;

      // Start interval to highlight one list item at a time
      intervalId = setInterval(() => {
        const listItems = degreeList.querySelectorAll('li');

        // Reset all backgrounds to default
        for (const item of listItems) {
          item.style.backgroundColor = '';
        }

        // Highlight the current item
        listItems[currentDegreeIndex].style.backgroundColor = 'green';

        // Update current index (wrap around if needed)
        currentDegreeIndex = (currentDegreeIndex + 1) % listItems.length;

      }, 500); // Change color every 1 second
    }
    else {
      // Handle case where study is not empty (optional)
    }
  }


  function exitApplyButtonSwitcher() {
    let optionSelection = document.getElementById('optionB'+B);
    let previousOptionSelected = document.getElementById('B');
    if (B !== 2) {
      B += 1;
    }
    else {
      B = 1;
      if (previousOptionSelected !== null) {
        previousOptionSelected.id = 'optionB1'
      }
    }

    if (B === 1) {
      optionSelection.id = 'B';
    }
    else {
      optionSelection.id = 'B';
      if (previousOptionSelected !== null) {
        previousOptionSelected.id = 'optionB2'
      }
    }
  }

  function getRandomJob(jobs) {
    // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
    const randomIndex = Math.floor(Math.random() * jobs.length);
    return jobs[randomIndex];
  }

  function displayRandomJob() {
    // Get a random job
    let salary = '';
    let opportunity = '';
    const randomJob = getRandomJob(jobs);
    chance = parseFloat(randomJob.multiplier)
    jobApplication = randomJob.title;
    jobRequiredEducation = randomJob.education;
    if (chance >= 3.0) {
      salary = '$$$';
    }
    else if (chance >= 2.0){
      salary = '$$';
    }
    else {
      salary = '$';
    }
    likelihood = parseFloat(randomJob.likelihood)
    if (education === randomJob.education) {
      if (likelihood >= 0.8) {
        opportunity = '?';
      }
      else if (likelihood >= 0.5){
        opportunity = '??';
      }
      else {
        opportunity = '???';
      }
    }
    else {
      opportunity = '-';
    }
    // Create the job information content
    const jobInfo = `
    <h2>${jobApplication}</h2>
    <p>Salary: ${salary}</p>
    <p>Education: ${randomJob.education}</p>
    <p>Likelihood: ${opportunity}</p>
    <br>
  `;

    // Get the job information element

    containerElement.style.display = 'flex';
    inMenu = true;

    // Set the element's inner HTML content
    degreeList.innerHTML = '';
    jobInfoElement.innerHTML = jobInfo;
  }

  function gameOverEvent() {
    const gameOverMessage = '<h1>GAME OVER</h1><p>Your score was: '+score+'</p>';
    popUpElement.innerHTML = '';
    popUpElement.classList.add('popUpClass');
    popUpElement.innerHTML = gameOverMessage;
    popUpElement.style.display = "block";
  }

  function changeMoodletColour() {
    if (fitness < 0.3) {
      selectFitness.style.stroke = '#FF0000';
    } else if (fitness < 0.6) {
      selectFitness.style.stroke = '#FFFF00';
    } else {
      selectFitness.style.stroke = '#037312';
    }
    if (social < 0.3) {
      selectSocial.style.fill = '#FF0000';
    } else if (social < 0.6) {
      selectSocial.style.fill = '#FFFF00';
    } else {
      selectSocial.style.fill = '#037312';
    }
  }

  function rollRequired(message) {
    if (message !== "rollRequired") {
      sendStringToMicrobit('rollRequired');
      popUpElement.innerHTML = '<h1>Roll the dice to test your luck</h1><p>Press A after your roll</p>';
      popUpElement.style.display = "block";
    }
    else {
      popUpElement.innerHTML = '';
      popUpElement.style.display = "none";
    }

  }

  function parseYearToSVG(year){
    const selectYearCount = svgDoc.getElementById('tspan1');
    selectYearCount.textContent = '';
    let textNodeYear = document.createTextNode('Year:' + year);
    selectYearCount.appendChild(textNodeYear);
  }

  function updateScore(){
    if (score < 0) return;
    score = Math.floor((moneyTotal * fitness) * social);
    scoreElement.innerText = 'Score: '+score;
  }

  const theSerialComponent = document.querySelector('custom-serial');
  if (theSerialComponent) {
    const selectPlus = plusSVG.getElementById('Plus')
    theSerialComponent.customHandler = function(message) {
      if (message === 'A'){
        if (!inMenu) {
          if (!gameOver){
            if (A !== 6) {
              A += 1;
            }
            else {
              A = 1;
              selectPlus.style.fill = 'none';
            }
            let optionSelection = document.getElementById('option'+A);
            let previousOptionSelected = document.getElementById('A');
            if (A === 1){
              optionSelection.id = 'A';
            }
            else if (A === 2){
              previousOptionSelected.id = 'option1'
              optionSelection.id = 'A';
            }
            else if (A === 3){
              previousOptionSelected.id = 'option2'
              optionSelection.id = 'A';
            }
            else if (A === 4){
              previousOptionSelected.id = 'option3'
              optionSelection.id = 'A';
            }
            else if (A === 5){
              previousOptionSelected.id = 'option4'
              optionSelection.id = 'A';
            }
            else if (A === 6) {
              previousOptionSelected.id = 'option5'
              selectPlus.style.fill = 'green';
            }
          }
          else {

          }
        }
        else {
          if (A === 1) {

          }
          else if (A === 2){
            exitApplyButtonSwitcher();
          }
          else if (A === 3){
          }

          else if (A === 4){
            exitApplyButtonSwitcher();
          }

          else if (A === 5){

          }
          else {
            console.log('A menu was selected but there is menu for: option'+A);
          }
        }
      }
      else if (message === 'B') {
        console.log('Button B pressed @ pos: '+A)
        if (A === 1 && selectingOption === false){

        }
        else if (A === 2 && selectingOption === false){
          showDegreeList();
          selectingOption = true;
        }
        else if (A === 3 && selectingOption === false){

        }
        else if (A === 4 && selectingOption === false){
          getRandomJob(jobs);
          displayRandomJob();
          selectingOption = true;
        }
        else if (A === 5 && selectingOption === false){
        }
        else {
          if (B === 1 && A === 2) {
            clearInterval(intervalId);
            containerElement.style.display = 'none';
            inMenu = false;
            selectingOption = false;
          }
          else if (B === 2 && A === 2) {
            clearInterval(intervalId);
            containerElement.style.display = 'none';
            rollRequired();
            applyForDegree(roll)
          }
          else if (B === 1 && A === 4){
            containerElement.style.display = 'none';
            inMenu = false;
            selectingOption = false;
          }
          else if (B === 2 && A ===4){
            containerElement.style.display = 'none';
            rollRequired()
            applyForJob(roll);
          }
        }
        if (A === 6) {
          rollRequired();
          updateYear();
          skipYear = true;
        }
      }
      else if (message === "rollRequired") {
        rollRequired(message)
      }
      else {
        console.log('Dice was rolled')
        sendStringToMicrobit('rolled')
        roll = parseInt(message)
        updateMoney(roll)
      }
    }
  }

  function updateYear() {
    if (year < 100 || !gameOver) {
      if (social > 0 && fitness > 0){
        if (!skipYear) {
          year += 1;
          social = social - 0.1;
          fitness = fitness - 0.05;
        }
        else {
          year += 1;
          social = social - 0.1;
          fitness = fitness - 0.05;
          skipYear = false;
        }
        if (studyYearsRemaining > 0) {
          studyYearsRemaining = studyDuration -= 1;

          social = social + 0.1;
          document.getElementById('option2').innerText = 'Education: '+study+' ('+studyYearsRemaining+')';
        }
        else if (study !== ''){
          console.log(studyYearsRemaining)
          education = study
          document.getElementById('option2').innerText = 'Education: '+study;
        }
      }
      else {
        gameOverEvent();
        gameOver = true;
      }
      payDay = true;
      parseYearToSVG(year)
      updateScore();
      changeMoodletColour();
    }
    else {
      gameOverEvent();
    }

  }

  setInterval(updateYear, 120000 * globalSpeed);

  function getRandom(min, max) {
    // Math.random() generates a random number between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();

    // Multiply the decimal by the range (max - min) to get a value within the range
    const range = max - min;
    const randomWithinRange = randomDecimal * range;

    // Add the minimum value to get the final random number within the desired range
    return randomWithinRange + min;
  }

  function animateClouds() {
    let ylc = getRandom(-20, 10);
    let yrc = getRandom(-20, 10);
    let ycc = getRandom(-20, 10);
      cloudLeft.animate([
        {transform: 'translateX(-40%) translateY(' + ylc + '%)'},
        {transform: 'translateX(90%) translateY(' + ylc + '%)'}
      ], {
        delay: 20000 * globalSpeed,
        duration: 40000 * globalSpeed,
        iterations: Infinity,
      })
      cloudCenter.animate([
        {transform: 'translateX(-40%) translateY(' + ycc + '%)'},
        {transform: 'translateX(90%) translateY(' + ycc + '%)'}
      ], {
        delay: 10000 * globalSpeed,
        duration: 40000 * globalSpeed,
        iterations: Infinity,
      })
      cloudRight.animate([
        {transform: 'translateX(-40%) translateY(' + yrc + '%)'},
        {transform: 'translateX(90%) translateY(' + yrc + '%)'}
      ], {
        duration: 40000 * globalSpeed,
        iterations: Infinity,
      })
  }

  setInterval(animateClouds,40000 * globalSpeed)

  function animateStars() {
    for (let i = 1; i <= 60; i++) {
      let star = svgDoc.getElementById('star' + i)
      star.style.animationDelay = "" + Math.floor(Math.random() * 6) * globalSpeed;
      let miliConvertDuration = ((Math.floor(Math.random() * 40) + 30) * 1000) * globalSpeed;
      let y = Math.floor(Math.random() * 20)
      let x = Math.floor(Math.random() * 40) + 10;
      star.animate([
            {transform: 'translateX(-' + x + '%) translateY(-' + y + '%)'},
            {transform: 'translateX(90%)' + ' translateY(-' + y + '%)'}
          ], {
            duration: miliConvertDuration,
            iterations: Infinity,
          }
      );
    }
  }

  animateStars()

  sun.style.display = 'inline';
  moon.style.display = 'none';

  function hideStars() {
    for (let s = 1; s <= 3; s++) {
      let Stars = svgDoc.getElementById('Stars' + s)
      Stars.style.display = 'none';
    }
  }

  hideStars(); //Hides stars for initial day cycle


  function dayCycle() {
    sun.style.display = 'inline';
    moon.style.display = 'none';

    background.animate([
          {backgroundColor: '#144d73'},
          {backgroundColor: '#3498db'},
          {backgroundColor: '#3498db'},
          {backgroundColor: '#103e5c'}
        ],
        {duration: oneCycleJS * globalSpeed})
    setTimeout(hideStars, (5000) * globalSpeed)
    for (let s = 1; s <= 3; s++) {
      let Stars = svgDoc.getElementById('Stars' + s)
      Stars.animate([
            {opacity: 1},
            {opacity: 0}
          ],
          {duration: (5000) * globalSpeed})
    }
  }

  function nightCycle() {
    sun.style.display = 'none';
    moon.style.display = 'inline';
    background.animate([
          {backgroundColor: '#103e5c'},
          {backgroundColor: '#1a2342'},
          {backgroundColor: '#1a2342'},
          {backgroundColor: '#144d73'}
        ],
        {duration: oneCycleJS * globalSpeed})
    for (let s = 1; s <= 3; s++) {
      let Stars = svgDoc.getElementById('Stars' + s)
      Stars.style.display = 'inline';
      Stars.animate([
            {opacity: 0},
            {opacity: 1,}
          ],
          {duration: (5000) * globalSpeed})
    }
  }

  function shiftSky() {
    if (sun.style.display === 'none') {
      dayCycle();
    } else {
      nightCycle();
    }
  }

  setInterval(shiftSky, oneCycleJS * globalSpeed);


  function adjustTimings() {
    background.style['animationDuration'] = (oneCycle * globalSpeed) + 's';
    sun.style['animationDuration'] = (oneCycle * globalSpeed) + 's';
    moon.style['animationDuration'] = (oneCycle * globalSpeed) + 's';
    cloudLeft.style['animationDuration'] = (40 * globalSpeed) + 's';
    cloudLeft.style['animationDelay'] = (20 * globalSpeed) + 's';
    cloudCenter.style['animationDuration'] = (40 * globalSpeed) + 's';
    cloudCenter.style['animationDelay'] = (10 * globalSpeed) + 's';
    cloudRight.style['animationDuration'] = (40 * globalSpeed) + 's';
  }

  function parseValueToSVG(value) {
    const selectMoneyValue = moneySVG.getElementById('tspan1')
    selectMoneyValue.textContent = '';
    let textNodeMoney = document.createTextNode('$' + value);
    selectMoneyValue.appendChild(textNodeMoney);
  }

  function updateMoney(roll) {
    money = (roll * 100)
    if (payDay === true) {
      moneyTotal += (money * multiplier);
      console.log(moneyTotal);
      parseValueToSVG(moneyTotal)
      updateScore();
      payDay = false;
    }
  }

  function applyForDegree(roll) {
    if (roll >= 3) {
      const currentDegree = degreeNameTimes[currentDegreeIndex-1];
      study = currentDegree.title;
      studyDuration = currentDegree.time;
      studyYearsRemaining = studyDuration;
      popUpElement.classList.add('popUpClass');
      popUpElement.innerHTML = '<h1>Accepted!</h1><p>Your application to study: '+study+'</p>'+'<p>was accepted congratulations.</p>'+'<p style="font-style: italic" ">Press A to return</p>';
      popUpElement.style.display = "block";
      setTimeout(function() {
        popUpElement.style.display = "none";
      }, 5000);
      skipYear = true;
      inMenu = false;
      selectingOption = false;
      document.getElementById('A').innerText = 'Education: '+study+' ('+studyDuration+')';
    }
    else {
      popUpElement.classList.add('popUpClass');
      popUpElement.innerHTML = '<h1>Rejection!</h1><p>Unfortunately your application was rejected</p><p>Better luck next year!</p>'+'<p style="font-style: italic" ">Press A to return</p>';
      popUpElement.style.display = "block";
      setTimeout(function() {
        popUpElement.style.display = "none";
      }, 5000);
      skipYear = true;
      inMenu = false;
      selectingOption = false;
      updateYear();
    }
  }

  function applyForJob(roll) {
    if ((likelihood * roll) >= 0.6 && education === jobRequiredEducation) {
      job = jobApplication;
      multiplier = chance;
      popUpElement.classList.add('popUpClass');
      popUpElement.innerHTML = '<h1>Booya!</h1><p>You got accepted, you are now working as a: </p>'+'<h2>'+job+'.</h2>'+'<p style="font-style: italic" ">Press A to return</p>';
      popUpElement.style.display = "block";
      setTimeout(function() {
        popUpElement.style.display = "none";
      }, 5000);
      skipYear = true;
      inMenu = false;
      selectingOption = false;
      document.getElementById('A').innerText = 'Employment: '+job;
    }
    else{
      popUpElement.classList.add('popUpClass');
      popUpElement.innerHTML = '<h1>Rejection!</h1><p>Unfortunately your application was rejected</p><p>Better try again.</p>'+'<p style="font-style: italic" ">Press A to return</p>';
      popUpElement.style.display = "block";
      setTimeout(function() {
        popUpElement.style.display = "none";
      }, 5000);
      skipYear = true;
      inMenu = false;
      selectingOption = false;
      updateYear();
    }
  }
  adjustTimings();
  //Scene animation and initialisation


  function sendStringToMicrobit(str) {
    const serialComponent = document.querySelector('custom-serial');
    if (serialComponent) {
      serialComponent.writeToSerial(`${str}\n`);
      console.log('Sent string '+str);
    }
  }
});

// put any javascript you need for your interface here








