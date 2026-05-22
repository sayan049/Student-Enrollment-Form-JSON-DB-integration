const connToken = "90935193|-31949243699190668|90958750"; 
const dbName = "SCHOOL-DB";
const relName = "STUDENT-TABLE";
const jpdbBaseURL = "http://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";

let rec_no = null;

$(document).ready(function () {
    resetForm();
});

function disableSecondaryFields() {
    $("#fullName").prop("disabled", true);
    $("#studentClass").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#enrollmentDate").prop("disabled", true);
    $("#address").prop("disabled", true);
}

function enableSecondaryFields() {
    $("#fullName").prop("disabled", false);
    $("#studentClass").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#enrollmentDate").prop("disabled", false);
    $("#address").prop("disabled", false);
}

function resetForm() {
    $("#studentForm")[0].reset();
    rec_no = null;

    $("#rollNo").prop("disabled", false);
    disableSecondaryFields();

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
    
    $("#rollNo").focus();
}

function validateAndGetFormData() {
    let rollNo = $("#rollNo").val().trim();
    let fullName = $("#fullName").val().trim();
    let studentClass = $("#studentClass").val().trim();
    let birthDate = $("#birthDate").val().trim();
    let enrollmentDate = $("#enrollmentDate").val().trim();
    let address = $("#address").val().trim();

    if (rollNo === "") { alert("Roll Number is required"); $("#rollNo").focus(); return ""; }
    if (fullName === "") { alert("Full Name is required"); $("#fullName").focus(); return ""; }
    if (studentClass === "") { alert("Class is required"); $("#studentClass").focus(); return ""; }
    if (birthDate === "") { alert("Birth Date is required"); $("#birthDate").focus(); return ""; }
    if (enrollmentDate === "") { alert("Enrollment Date is required"); $("#enrollmentDate").focus(); return ""; }
    if (address === "") { alert("Address is required"); $("#address").focus(); return ""; }

    let jsonObj = {
        "Roll-No": rollNo,
        "Full-Name": fullName,
        "Class": studentClass,
        "Birth-Date": birthDate,
        "Enrollment-Date": enrollmentDate,
        "Address": address
    };
    return JSON.stringify(jsonObj);
}

function getStudent() {
    let rollNo = $("#rollNo").val().trim();
    if (rollNo === "") return;

    let jsonObj = { "Roll-No": rollNo };
    let getRequest = createGETRequest(connToken, dbName, relName, JSON.stringify(jsonObj));
    
    jQuery.ajaxSetup({async: false});
    let resultObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    // Check for Network/Server failure
    if (!resultObj || typeof resultObj.status === 'undefined') {
        alert("Network Error: Could not connect to the database.");
        return;
    }

    // Handle unauthorized/invalid token
    if (resultObj.status === 401) {
        alert("Authentication Error: Invalid Connection Token.");
        return;
    }

    if (resultObj.status === 400) {
        enableSecondaryFields();
        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#updateBtn").prop("disabled", true);
        $("#fullName").focus();

    } else if (resultObj.status === 200) {
        let data = JSON.parse(resultObj.data).record;
        rec_no = JSON.parse(resultObj.data).rec_no;

        $("#fullName").val(data["Full-Name"]);
        $("#studentClass").val(data["Class"]);
        $("#birthDate").val(data["Birth-Date"]);
        $("#enrollmentDate").val(data["Enrollment-Date"]);
        $("#address").val(data["Address"]);

        $("#rollNo").prop("disabled", true);
        enableSecondaryFields();

        $("#saveBtn").prop("disabled", true);
        $("#updateBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#fullName").focus();
    }
}

function saveStudent() {
    let jsonStr = validateAndGetFormData();
    if (jsonStr === "") return;

    // Disable button immediately to prevent Double-Click spam
    $("#saveBtn").prop("disabled", true);

    let putRequest = createPUTRequest(connToken, jsonStr, dbName, relName);
    
    jQuery.ajaxSetup({async: false});
    let resultObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    if (resultObj && resultObj.status === 200) {
        alert("Data saved successfully!");
        resetForm();
    } else {
        alert("Error saving data.");
        // Re-enable button if save failed so user can try again
        $("#saveBtn").prop("disabled", false);
    }
}

function updateStudent() {
    let jsonStr = validateAndGetFormData();
    if (jsonStr === "") return;
    if (rec_no === null) return;

    // Disable button immediately to prevent Double-Click spam
    $("#updateBtn").prop("disabled", true);

    let updateRequest = createUPDATERecordRequest(connToken, jsonStr, dbName, relName, rec_no);
    
    jQuery.ajaxSetup({async: false});
    let resultObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    if (resultObj && resultObj.status === 200) {
        alert("Data updated successfully!");
        resetForm();
    } else {
        alert("Error updating data.");
        // Re-enable button if update failed
        $("#updateBtn").prop("disabled", false);
    }
}
