(async () => {
  console.log("Creating Business ");

  let res = await fetch("http://localhost:8080/api/business/create", {
    body: JSON.stringify({
      fein: "123456789",
      name: "Test Business",
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const business = await res.json();
  console.log("Business created: ", business);

  res = await fetch("http://localhost:8080/api/workflow/progress-business", {
    body: JSON.stringify({
      fein: "123456789",
      industry: "restaurant",
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  let nextStepInfo = await res.json();

  console.log(nextStepInfo.nextStepInfromation);

  res = await fetch("http://localhost:8080/api/workflow/progress-business", {
    body: JSON.stringify({
      fein: "123456789",
      contact: { name: "Abeer", phone: "+923238479429" },
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  nextStepInfo = await res.json();

  console.log(nextStepInfo.nextStepInfromation);

  res = await fetch("http://localhost:8080/api/workflow/progress-business", {
    body: JSON.stringify({
      fein: "123456789",
      status: "Won",
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  nextStepInfo = await res.json();

  console.log(nextStepInfo.nextStepInfromation);
})();
