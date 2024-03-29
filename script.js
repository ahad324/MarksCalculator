if (localStorage.getItem("RoyalData")) {
  localStorage.removeItem("RoyalData");
}

let CGPAbtn = document.querySelector(".Swiper-btns .CGPA-btn");
let SGPAbtn = document.querySelector(".Swiper-btns .SGPA-btn");
let btnbg = document.querySelector(".Swiper-btns .btns-bg-swiper-element");
let CGPASec = document.querySelector(".CGPA-Section");
let SGPASec = document.querySelector(".SGPA-Section");
SGPAbtn.addEventListener("click", (e) => {
  btnbg.style.transform = "translateX(-50px)";

  e.target.style.transform = "scale(1)";
  CGPAbtn.style.transform = "scale(0.8)";
  SGPASec.style.transform = "translateX(50%) scale(1)";
  CGPASec.style.transform = "translateX(100%) scale(0.5)";
  CGPASec.style.opacity = 0;
  SGPASec.style.opacity = 1;
});

CGPAbtn.addEventListener("click", (e) => {
  btnbg.style.transform = "translateX(50px)";

  e.target.style.transform = "scale(1)";
  SGPAbtn.style.transform = "scale(0.8)";
  SGPASec.style.transform = "translateX(-100%) scale(0.5)";
  CGPASec.style.transform = "translateX(-50%) scale(1)";
  SGPASec.style.opacity = 0;
  CGPASec.style.opacity = 1;
});

let semesterscount = 1;

// Function to calculate CGPA
function calculateCGPA() {
  let obtainedCGPA = 0;
  let sumofAllSGPA = 0;

  // Loop through each semester input field
  for (let i = 1; i <= semesterscount; i++) {
    let inputsgpavalue = document.getElementById(`input-sem-sgpa-${i}`).value;
    sumofAllSGPA += Number(inputsgpavalue);
  }

  // Calculate CGPA
  obtainedCGPA = (sumofAllSGPA / semesterscount).toFixed(2);

  // Display CGPA
  let obtainedCGPAShow = document.getElementById("obtCGPA");
  obtainedCGPAShow.style.transform = "translateY(15px)";
  obtainedCGPAShow.style.opacity = "0";
  setTimeout(() => {
    obtainedCGPAShow.style.transform = "translateY(0px)";
    obtainedCGPAShow.style.opacity = "1";
    obtainedCGPAShow.innerHTML = obtainedCGPA;
  }, 500);
}

// Listen for changes in the input fields
document
  .getElementById("semesters-input")
  .addEventListener("input", calculateCGPA);

document.getElementById("add-sem-btn").addEventListener("click", () => {
  const semestersInput = document.getElementById("semesters-input");
  const label = document.createElement("label");
  label.setAttribute("for", `input-sem-sgpa-${semesterscount + 1}`);
  label.textContent = `Enter semester ${semesterscount + 1}'s SGPA`;

  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("id", `input-sem-sgpa-${semesterscount + 1}`);
  input.setAttribute("required", true);
  input.setAttribute("step", 0.01);

  semesterscount++;
  semestersInput.appendChild(label);
  semestersInput.appendChild(input);

  // Calculate CGPA when adding a new input field
  calculateCGPA();
});

// Side Bar Toogle
let arrow = document.getElementsByClassName("arrow")[0];
let featurecontainer = document.getElementsByClassName("features")[0];
arrow.addEventListener("click", function () {
  featurecontainer.classList.toggle("active");
  arrow.classList.toggle("active");
});

var instructionsModal = document.getElementById("instructionsModal");
var instructionsBtn = document.getElementById("instructions-btn");

var resultModal = document.getElementById("resultModal");
var resultcardBtn = document.getElementById("resultcard-btn");

var closeBtns = document.getElementsByClassName("close");

// Function to open the modal
function openModal(modal) {
  modal.style.display = "block";
}

// Function to close the modal
function closeModal(modal) {
  modal.style.display = "none";
}

// Event listener for instructions button
instructionsBtn.addEventListener("click", function () {
  openModal(instructionsModal);
});

// Event listener for result card button
resultcardBtn.addEventListener("click", function () {
  openModal(resultModal);
});

// Event listeners for close buttons
for (var i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener("click", function () {
    var modal = this.parentElement.parentElement;
    closeModal(modal);
  });
}

// Event listener to close modal if user clicks outside of it
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
});

// Result Card Calculations

var submitSubjectBtn = document.getElementById("submit-subject-btn");
var tableBody = document.querySelector("#resultModal table tbody");
var finalGradeValue = document.querySelector(".finalgrade-value");
var finalGPAValue = document.querySelector(".finalGPA-value");
var finalPercentageValue = document.querySelector(".finalpercentage-value");
var namebelowassesment = document.getElementById(
  "subject-name-below-assesment"
);
var marksbelowassesment = document.getElementById(
  "obtained-marks-below-assesment"
);

let alert = document.getElementsByClassName("alert")[0];
let alerttime = 4000;
let DataObj = []; // Object to store subject , total Obtained marks and grade
let subjectcount = 0; // Counter for subjects
var message = document.getElementsByClassName("message")[0];

let inputSubjectName = document.getElementById("input-subject-name");
let inputCreditHours = document.getElementById("input-subject-cr");

inputSubjectName.addEventListener("input", () => {
  let existingSubjectIndex = DataObj.findIndex(
    (subject) => subject.name === inputSubjectName.value.trim()
  );
  // console.log(existingSubjectIndex)
  if (existingSubjectIndex !== -1) {
    message.classList.add("error");
    message.innerHTML =
      "Subject already exists you can update marks for this subject";
    // console.log("GO on")

    inputCreditHours.value = DataObj[existingSubjectIndex].cr;
    inputCreditHours.disabled = true;
  } else {
    message.classList.remove("error");
    message.innerHTML = "";
    inputCreditHours.disabled = false;
  }
});

// Event listener for the submit button
submitSubjectBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  inputCreditHours.disabled = true;
  // console.log(inputCreditHours.value);
  // Retrieve input values
  let inputSubjectName = document
    .getElementById("input-subject-name")
    .value.trim();
  let inputObtMarks = parseFloat(
    document.getElementById("InputObtMarks").value.trim()
  );
  let inputMaxMarks = parseFloat(
    document.getElementById("InputMaxMarks").value.trim()
  );
  let inputWeightage = parseFloat(
    document.getElementById("InputWeightage").value.trim()
  );

  // Validation checks
  if (
    !inputSubjectName ||
    isNaN(inputObtMarks) ||
    isNaN(inputMaxMarks) ||
    isNaN(inputWeightage)
  ) {
    alert.innerHTML = "Please fill out all fields with valid values.";
    alert.classList.add("active");
    setTimeout(() => {
      alert.classList.remove("active");
      alert.innerHTML = "";
    }, alerttime);
    // alert("Please fill out all fields with valid values.");
    return;
  }

  if (inputObtMarks > inputMaxMarks) {
    alert.innerHTML = "Obtained marks cannot exceed maximum marks";
    alert.classList.add("active");
    setTimeout(() => {
      alert.classList.remove("active");
      alert.innerHTML = "";
    }, alerttime);
    // alert("Obtained marks cannot exceed maximum marks.");
    return;
  }

  if (inputWeightage > 100) {
    alert.innerHTML = "Weightage cannot exceed 100.";
    alert.classList.add("active");
    setTimeout(() => {
      alert.classList.remove("active");
      alert.innerHTML = "";
    }, alerttime);
    // alert("Weightage cannot exceed 100.");
    return;
  }

  // =================================================================
  // if(localStorage.getItem(inputSubjectName)){
  //     console.log(localStorage.getItem(inputSubjectName))
  //     console.log("oks")

  //   }
  // =================================================================
  // Check if the subject already exists in DataObj

  let existingSubjectIndex = DataObj.findIndex(
    (subject) => subject.name === inputSubjectName
  );

  if (existingSubjectIndex !== -1 && existingSubjectIndex !== undefined) {
    // Update existing subject data
    let existingSubject = DataObj[existingSubjectIndex];

    namebelowassesment.textContent = DataObj[existingSubjectIndex].name;

    let totalObtMarksForASubject = calculateTotalObtainedMarks(
      inputObtMarks,
      inputMaxMarks,
      inputWeightage
    );
    let finalObtainedMarks =
      parseFloat(totalObtMarksForASubject) + parseFloat(existingSubject.marks);
    if (finalObtainedMarks > 100) {
      alert.innerHTML = "Total obtained marks in Result Card cannot exceed 100";
      alert.classList.add("active");
      setTimeout(() => {
        alert.classList.remove("active");
        alert.innerHTML = "";
      }, alerttime);
      // alert("Total obtained marks cannot exceed 100");
      return;
    }
    existingSubject.marks = finalObtainedMarks.toFixed(2);
    let marksCell = document.querySelector(
      `#resultModal table tbody tr[subject-index="${
        existingSubjectIndex + 1
      }"] td[data-marks]`
    );
    let SubjectGPACell = document.querySelector(
      `#resultModal table tbody tr[subject-index="${
        existingSubjectIndex + 1
      }"] td[data-gpa]`
    );

    if (marksCell && SubjectGPACell) {
      marksCell.setAttribute("data-marks", existingSubject.marks);
      marksCell.textContent = existingSubject.marks;
      marksbelowassesment.textContent = existingSubject.marks;
      // Update grade based on percentage
      let percentage = calculatePercentage(finalObtainedMarks);
      let SubjectGPA = calculateGPA(percentage);
      existingSubject.gpa = SubjectGPA;
      SubjectGPACell.textContent = SubjectGPA;
      SubjectGPACell.setAttribute("data-gpa", SubjectGPA);

      (existingSubject.gradePoint = SubjectGPA * existingSubject.cr),
        message.classList.add("success");
      message.innerHTML =
        "Marks Updated successfully for " + existingSubject.name;
      setTimeout(() => {
        message.classList.remove("success");
        message.innerHTML = "";
      }, 3000);

      updateDataObj();
    }
  } else {
    // Add the subject and its total marks to DataObj
    subjectcount++;
    let totalObtMarksForASubject = calculateTotalObtainedMarks(
      inputObtMarks,
      inputMaxMarks,
      inputWeightage
    );
    let percentage = calculatePercentage(totalObtMarksForASubject);
    let SubjectGPA = calculateGPA(percentage);
    DataObj.push({
      name: inputSubjectName,
      marks: totalObtMarksForASubject,
      gpa: SubjectGPA,
      cr: parseFloat(inputCreditHours.value),
      gradePoint: SubjectGPA * parseFloat(inputCreditHours.value),
    });
    // =================================================================
    // localStorage.setItem(inputSubjectName,totalObtMarksForASubject)
    // =================================================================
    namebelowassesment.textContent = inputSubjectName;
    marksbelowassesment.textContent = totalObtMarksForASubject;
    // Create a new row in the result card table
    let newRow = tableBody.insertRow();

    let subjectCell = newRow.insertCell();
    subjectCell.textContent = inputSubjectName;
    subjectCell.setAttribute("subject-index", subjectcount);
    subjectCell.classList.add("subject");

    let marksCell = newRow.insertCell();
    marksCell.textContent = totalObtMarksForASubject;
    marksCell.setAttribute("data-marks", totalObtMarksForASubject);
    marksCell.setAttribute("marks-index", subjectcount);

    newRow.insertCell().textContent = 100;

    let SubjectGPACell = newRow.insertCell();
    SubjectGPACell.textContent = SubjectGPA;
    SubjectGPACell.setAttribute("data-gpa", SubjectGPA);
    SubjectGPACell.setAttribute("grade-index", subjectcount);

    let CRCell = newRow.insertCell();
    CRCell.textContent = inputCreditHours.value;
    CRCell.setAttribute("data-cr", inputCreditHours.value);
    CRCell.setAttribute("cr-index", subjectcount);

    newRow.insertCell().innerHTML =
      '<button class="delete-btn"><i class="fa-solid fa-trash"></i></button>';
    newRow.setAttribute("subject-index", subjectcount);

    updateDataObj();
  }

  document.getElementById("InputObtMarks").value = "";
  document.getElementById("InputMaxMarks").value = "";
  document.getElementById("InputWeightage").value = "";
  updateFinalGradeAndSGPA();
});

// Function to calculate GPA based on percentage
function calculateGPA(percentage) {
  if (percentage >= 85) return "4.00";
  else if (percentage >= 80) return "3.66";
  else if (percentage >= 75) return "3.33";
  else if (percentage >= 71) return "3.00";
  else if (percentage >= 68) return "2.66";
  else if (percentage >= 64) return "2.33";
  else if (percentage >= 61) return "2.00";
  else if (percentage >= 58) return "1.66";
  else if (percentage >= 54) return "1.30";
  else if (percentage >= 50) return "1.00";
  else return "0.00";
}

function calculateTotalObtainedMarks(obtMarks, maxMarks, weightage) {
  return ((obtMarks / maxMarks) * weightage).toFixed(2);
}
function calculatePercentage(obtMarks) {
  return ((obtMarks / 100) * 100).toFixed(2);
}
function sgpaToPercentage(sgpa) {
  return (sgpa / 4.0) * 100;
}

function calculateGrade(percentage) {
  if (percentage >= 85) return "A";
  else if (percentage >= 80) return "A-";
  else if (percentage >= 75) return "B+";
  else if (percentage >= 71) return "B";
  else if (percentage >= 68) return "B-";
  else if (percentage >= 64) return "C+";
  else if (percentage >= 61) return "C";
  else if (percentage >= 58) return "C-";
  else if (percentage >= 54) return "D+";
  else if (percentage >= 50) return "D";
  else return "F";
}
// Update final grade and SGPA function
function updateFinalGradeAndSGPA() {
  var totalObtMarks = 0;
  var totalMaxMarks = 0;

  // Loop through each row in the table
  var rows = tableBody.querySelectorAll("tr");
  rows.forEach(function (row) {
    var obtMarks = parseInt(row.cells[1].textContent);
    var maxMarks = parseInt(row.cells[2].textContent);

    // Validate obtained and maximum marks
    if (!isNaN(obtMarks) && !isNaN(maxMarks) && maxMarks !== 0) {
      totalObtMarks += obtMarks;
      totalMaxMarks += maxMarks;
    }
  });

  // Calculate SGPA
  var Sgpa = CalculateFinalSGpa();
  var percentage = sgpaToPercentage(Sgpa);
  var grade = calculateGrade(percentage);
  console.log(totalObtMarks, percentage);
  if (totalObtMarks === 0 && (percentage === 0 || isNaN(percentage))) {
    console.log("I'm in ");
    finalGradeValue.innerHTML = "__";
    finalGPAValue.innerHTML = "__";
    finalPercentageValue.innerHTML = "__";
  } else {
    finalGradeValue.innerHTML = grade;
    finalGPAValue.innerHTML = Sgpa;
    finalPercentageValue.innerHTML = percentage.toFixed(2) + "%";
  }
}
function CalculateFinalSGpa() {
  var totalCR = 0;
  var totalGradePoints = 0;
  DataObj.forEach(function (subject, index) {
    totalCR += parseFloat(subject.cr);
    totalGradePoints += subject.gradePoint;
    // console.log("TOTAL CR: " + totalCR + " \nTOTALgradePoints: " + totalGradePoints)
  });
  return (totalGradePoints / totalCR).toFixed(2);
}
// Event delegation for delete buttons
tableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    var row = event.target.closest("tr");
    var index = parseInt(row.getAttribute("subject-index"));

    // Remove the subject from DataObj
    DataObj.splice(index - 1, 1);

    // Remove the row from the table
    row.parentNode.removeChild(row);

    // Update subject indexes for remaining rows
    var rows = tableBody.querySelectorAll("tr");
    rows.forEach(function (row, newIndex) {
      var newIndexValue = newIndex + 1;
      row.setAttribute("subject-index", newIndexValue);
      row
        .querySelector(".delete-btn")
        .setAttribute("subject-index", newIndexValue);
      row
        .querySelector("td[data-marks]")
        .setAttribute("subject-index", newIndexValue);
      row
        .querySelector("td[data-gpa]")
        .setAttribute("subject-index", newIndexValue);
      row
        .querySelector("td[data-cr]")
        .setAttribute("subject-index", newIndexValue);
    });

    // Update subject count
    subjectcount = rows.length;

    // Update localStorage and final grade/GPA
    updateDataObj();
    updateFinalGradeAndSGPA();
  }
});

function updateTable() {
  // Clear existing table rows
  tableBody.innerHTML = "";

  // Loop through DataObj and add rows to the table
  DataObj.forEach(function (subject, index) {
    let newRow = tableBody.insertRow();

    let subjectCell = newRow.insertCell();
    subjectCell.textContent = subject.name;
    subjectCell.setAttribute("subject-index", index + 1);
    subjectCell.classList.add("subject");

    let marksCell = newRow.insertCell();
    marksCell.textContent = subject.marks;
    marksCell.setAttribute("data-marks", subject.marks);
    marksCell.setAttribute("marks-index", index + 1);

    newRow.insertCell().textContent = 100;

    let SubjectGPACell = newRow.insertCell();
    let percentage = calculatePercentage(subject.marks);
    let SubjectGPA = calculateGPA(percentage);
    SubjectGPACell.textContent = SubjectGPA;
    SubjectGPACell.setAttribute("data-gpa", SubjectGPA);
    SubjectGPACell.setAttribute("grade-index", index + 1);
    // console.log(subject)

    let CRCell = newRow.insertCell();
    CRCell.textContent = subject.cr;
    CRCell.setAttribute("data-cr", subject.cr);
    CRCell.setAttribute("cr-index", index + 1);

    newRow.insertCell().innerHTML =
      '<button class="delete-btn"><i class="fa-solid fa-trash"></i></button>';
    newRow.setAttribute("subject-index", index + 1);
  });
}

function updateDataObj() {
  localStorage.setItem("GPACalculator", JSON.stringify(DataObj));
}
window.addEventListener("load", function () {
  if (localStorage.getItem("GPACalculator")) {
    DataObj = JSON.parse(localStorage.getItem("GPACalculator"));
    // Update the table with loaded data
    updateTable();
    updateFinalGradeAndSGPA();
  }
});

// Download Result Card
document
  .getElementById("download-pdf-btn")
  .addEventListener("click", function () {
    var resultcontent = document.querySelector(
      "#resultModal .result-modal-content .download-result-content"
    );
    html2pdf().from(resultcontent).set({ filename: "result_card.pdf" }).save();
    setTimeout(function () {
      // clearing console
      console.clear();
    }, 2000);
  });

// Pre-Loader function
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".loader-container").classList.add("hidden");
});
// Offline Message function
window.addEventListener("load", function () {
  var offlineMessage = document.getElementById("offlineMessage");

  function updateOnlineStatus() {
    console.log(navigator.onLine);
    if (navigator.onLine) {
      offlineMessage.style.display = "none";
    } else {
      offlineMessage.style.display = "flex";
    }
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();
});
document
  .getElementsByClassName("menu-icon")[0]
  .addEventListener("click", (e) => {
    e.target.classList.toggle("fa-xmark");
    document
      .getElementsByClassName("Menu-at-top")[0]
      .classList.toggle("menu-open");
  });
