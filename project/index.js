$(document).ready(function () {

    var jsonData;
    var stepNumber = 1;
    var priorityNumber = 1;
    var selectedOptionId = -1;

    $.getJSON("data.json", function (data) {
        jsonData = JSON.parse(JSON.stringify(data));
        renderRadioButtons(jsonData.ServiceRequests);
        initRadioListeners();
    });


    function renderRadioButtons(data) {
        $('.radio-buttons-container').empty();
        data.forEach(function (request) {
            $(".radio-buttons-container").append("<div class='radio-button' id='" + request.id + "'><input type='radio' class='radio-button-style' id='radio" + request.id + "'  name='request-radio'>" +
                "<span class='radio-button-label' >" + request.name + "</span></div>")
        });
    }


    function initRadioListeners() {
        $('.radio-button').on('click', function (e) {
            if (selectedOptionId === -1) {
                selectedOptionId = parseInt(e.target.id);
                $('#radio' + e.target.id).prop('checked', true);
                if ($('.service-request-container p').css('display') === 'block' || 'inline-block') {
                    $('.service-request-container p').hide();
                    $('.selected-radio-container').css('display', 'flex');
                }
                $('.selected-radio-container').append("<div class='selected-radio-button' id='selected" + selectedOptionId + "'>" +
                    "<span>" + e.target.innerText + "</span >" +
                    "<i class='fa fa-times' aria-hidden='true' id='" + selectedOptionId + "' ></i>" +
                    "</div > ");
                $('.fa-times').on('click', function (e) {
                    $('#selected' + e.target.id).remove();
                    $('#radio' + e.target.id).prop('checked', false);
                   // $('.service-request-container p').css('display','flex');
                    //$('#para').replaceWith("<p id='para'>Please Select Your Service Requests</p>");
                     renderRadioButtons(jsonData.ServiceRequests);
                     initRadioListeners();
                }); 
              //  $('#para').replaceWith("<p id='para'>Please Select Your Issues</p>");
                // $('#para').hide();
                // $('.radio-buttons-container').hide();
                // next_issues(); 
                
            } 
        })
    }
    
    $('.submit-button-container button').on('click', function IssuesDemo() {
        switch (stepNumber) {
            case 1:
                const data = jsonData.Issues.find(function (issues) { if (issues.id === selectedOptionId) { return issues; } })
                if (data) {
                    stepNumber++;
                    selectedOptionId = -1;
                      $('#para').replaceWith("<p id='para'>Please Select Your Issues</p>");
                    renderRadioButtons(data.issues);
                    initRadioListeners();
                   
                     
                }
                else {
                    alert('This option is not available');
                }
                break;
            case 2:
             break;
        }
         
    });
   // $(this).find("button[type='submit']").prop('disabled',true);
   
  


});