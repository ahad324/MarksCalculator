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
var finalGradeSpan = document.querySelector(".finalgrade");
var namebelowassesment = document.getElementById(
  "subject-name-below-assesment"
);
var marksbelowassesment = document.getElementById(
  "obtained-marks-below-assesment"
);
// ==============================================================================
// var inputSubjectName = document.getElementById("input-subject-name");
// inputSubjectName.addEventListener("input", function(e) {
//     namebelowassesment.textContent = e.target.value;
// });
//================================================================

let DataObj = []; // Object to store subject and total marks
let subjectcount = 0; // Counter for subjects
var message = document.getElementsByClassName("message")[0];

let inputSubjectName = document.getElementById("input-subject-name");
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
  } else {
    message.classList.remove("error");
    message.innerHTML = "";
  }
});

// Event listener for the submit button
submitSubjectBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

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
    alert("Please fill out all fields with valid values.");
    return;
  }

  if (inputObtMarks > inputMaxMarks) {
    alert("Obtained marks cannot exceed maximum marks.");
    return;
  }

  if (inputWeightage > 100) {
    alert("Weightage cannot exceed 100.");
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

    existingSubject.marks = finalObtainedMarks.toFixed(2);
    let marksCell = document.querySelector(
      `#resultModal table tbody tr[subject-index="${existingSubjectIndex + 1
      }"] td[data-marks]`
    );
    let gradeCell = document.querySelector(
      `#resultModal table tbody tr[subject-index="${existingSubjectIndex + 1
      }"] td[data-grade]`
    );

    if (marksCell && gradeCell) {
      marksCell.setAttribute("data-marks", existingSubject.marks);
      marksCell.textContent = existingSubject.marks;
      marksbelowassesment.textContent = existingSubject.marks;
      // Update percentage
      let percentage = calculatePercentage(finalObtainedMarks);
      let ObtainedGradeinSubject = calculateGrade(percentage);
      gradeCell.textContent = ObtainedGradeinSubject;
      gradeCell.setAttribute("data-grade", ObtainedGradeinSubject); // Store grade as data attribute
      message.classList.add("success");
      message.innerHTML =
        "Marks Updated successfully for " + existingSubject.name;
      setTimeout(() => {
        message.classList.remove("success");
        message.innerHTML = "";
      }, 3000);
    }
  } else {
    // Add the subject and its total marks to DataObj
    subjectcount++;
    let totalObtMarksForASubject = calculateTotalObtainedMarks(
      inputObtMarks,
      inputMaxMarks,
      inputWeightage
    );
    DataObj.push({
      name: inputSubjectName,
      marks: totalObtMarksForASubject,
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

    let marksCell = newRow.insertCell();
    marksCell.textContent = totalObtMarksForASubject;
    marksCell.setAttribute("data-marks", totalObtMarksForASubject);
    marksCell.setAttribute("marks-index", subjectcount);

    newRow.insertCell().textContent = 100;

    let gradeCell = newRow.insertCell();
    let percentage = calculatePercentage(totalObtMarksForASubject);
    let ObtainedGradeinSub = calculateGrade(percentage);
    gradeCell.textContent = ObtainedGradeinSub;
    gradeCell.setAttribute("data-grade", ObtainedGradeinSub);
    gradeCell.setAttribute("grade-index", subjectcount);

    newRow.insertCell().innerHTML =
      '<button class="delete-btn">Delete</button>';
    newRow.setAttribute("subject-index", subjectcount);
  }

  document.getElementById("InputObtMarks").value = "";
  document.getElementById("InputMaxMarks").value = "";
  document.getElementById("InputWeightage").value = "";
  updateFinalGradeAndGPA();
});

// Function to calculate GPA based on percentage
function calculateGPA(percentage) {
  if (percentage >= 85) return "4.00";
  else if (percentage >= 80) return "3.75";
  else if (percentage >= 75) return "3.50";
  else if (percentage >= 71) return "3.25";
  else if (percentage >= 68) return "3.00";
  else if (percentage >= 64) return "2.75";
  else if (percentage >= 61) return "2.50";
  else if (percentage >= 58) return "2.25";
  else if (percentage >= 54) return "2.00";
  else if (percentage >= 50) return "1.75";
  else return "0.00";
}

function calculateTotalObtainedMarks(obtMarks, maxMarks, weightage) {
  return ((obtMarks / maxMarks) * weightage).toFixed(2);
}
function calculatePercentage(obtMarks) {
  return ((obtMarks / 100) * 100).toFixed(2);
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
// Update final grade and GPA function
function updateFinalGradeAndGPA() {
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

  // Calculate the final grade only if totalMaxMarks is not zero
  var percentage =
    totalMaxMarks !== 0 ? (totalObtMarks / totalMaxMarks) * 100 : 0;
  percentage = Math.round(percentage * 100) / 100;

  // Calculate grade
  var grade = calculateGrade(percentage);

  // Calculate GPA
  var gpa = calculateGPA(percentage);

  if (totalObtMarks == 0 && totalMaxMarks == 0) {
    finalGradeSpan.textContent = "Grade: ";
  } else {
    finalGradeSpan.innerHTML =
      "FinalGrade: " +
      grade +
      "<br>GPA: " +
      gpa +
      "<br> Obt_Percentage: " +
      percentage +
      "%";
  }
}

// Function to calculate grade based on percentage

// Event delegation for delete buttons
tableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    var row = event.target.closest("tr");
    var index = row.getAttribute("subject-index");

    DataObj.splice(index - 1, 1);

    row.parentNode.removeChild(row);

    if (subjectcount > 0) {
      subjectcount--;
    }
    updateFinalGradeAndGPA();
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
