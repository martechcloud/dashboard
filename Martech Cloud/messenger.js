function sendTest() {
    document.getElementById('sendButton').style.backgroundColor = 'lightgrey';
    document.getElementById('sendButton').style.border = 'lightgrey';
    // Get the input values
    var templateName = document.getElementById("nameWithTitle").value;
    var phoneNumber = document.getElementById("emailWithTitle").value;
    var password = document.getElementById("dobWithTitle").value;

    // Validation for empty input fields
    if (templateName.trim() === '' || phoneNumber.trim() === '' || password.trim() === '') {
        document.getElementById('almessage').innerHTML = "Some fields are missing!"
        var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('sendButton').style.backgroundColor = '';
                document.getElementById('sendButton').style.border = '';
            }, 3000);
        return;
    }

    // Validation for phone number pattern
    var phonePattern = /^[0-9]{12}$/;
    if (!phonePattern.test(phoneNumber)) {
        document.getElementById('almessage').innerHTML = "Phone Number is not valid!"
        var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('sendButton').style.backgroundColor = '';
                document.getElementById('sendButton').style.border = '';
            }, 3000);
        return;
    }

    var formData = new FormData();
    formData.append('templateName', templateName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);

    fetch('https://script.google.com/macros/s/AKfycbxZxQkqWJUceCAhDWKpBmpq-ex--76FVm8ihslC5Qhfdsl04krFAeZF0vyH5tnsJduSfw/exec', {
        method: "POST",
        body: formData,
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.redirectUrl) {
            document.getElementById('emailWithTitle').value = '';
            document.getElementById('dobWithTitle').value = '';
            var box = document.getElementById("box");
            box.style.display = "inline-block";
            setTimeout(function () {
                box.style.display = "none";
            }, 3000);
            $('#modalCenter').modal('hide');
            document.getElementById('sendButton').style.backgroundColor = '';
            document.getElementById('sendButton').style.border = '';
        } else {
            document.getElementById('almessage').innerHTML = "Incorrect Password!"
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
            }, 3000);
            document.getElementById('sendButton').style.backgroundColor = '';
            document.getElementById('sendButton').style.border = '';
        }
    })
    .catch(function (error) {
        console.error("Error:", error);
        loadingSpinner.style.display = "none";
      });
    };

