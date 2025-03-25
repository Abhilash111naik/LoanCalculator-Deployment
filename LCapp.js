document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("Results").style.display = "none";
  document.getElementById("loading").style.display = "block";
  setTimeout(Calculate, 2000);
  e.preventDefault();
});

function Calculate(event) {
  
  const amount = document.getElementById("loan-amount").value;
  const percent = document.getElementById("loan-percent").value;
  const year = document.getElementById("loan-year").value;
  const montlyPayment = document.getElementById("Montly Payment");
  const totalPayment = document.getElementById("Total Payment");
  const totalInterest = document.getElementById("Total Interest");

  const principal = parseFloat(amount);
  const calculatedInterest = parseFloat(percent) / 100 / 12;
  const CalculatedPayment = parseFloat(year) * 12;
  const x = Math.pow(1 + calculatedInterest, CalculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    montlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * CalculatedPayment).toFixed(2);
    totalInterest.value = (monthly * CalculatedPayment - principal).toFixed(2);

    document.getElementById("Results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    //alert("enter valid details");
    ShowAlert("Enter the Valid Details");
  }
  //event.preventDefault();
}

function ShowAlert(error) {
  const divb = document.createElement("div");
  divb.className = "alert alert-danger";
  divb.appendChild(document.createTextNode(error));
  const card = document.querySelector(".card");
  const headding = document.querySelector(".hedding");
  card.insertBefore(divb, headding);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

document.getElementById("loan-form").addEventListener("keydown", EnterLine);
function EnterLine(e) {
  if (e.key == "Enter") {
    e.preventDefault();
    if (e.target.id == "loan-amount") {
      document.getElementById("loan-percent").focus();
    } else if (e.target.id == "loan-percent") {
      document.getElementById("loan-year").focus();
    } else if (e.target.id == "loan-year") {
      document.getElementById("loan-form").dispatchEvent(new Event("submit"));
    }
  }
}
