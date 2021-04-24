$(document).ready(function () {
    /*APPLICATION LOCAL HOST STORAGE*/
    /*var storedFloor_html = window.localStorage.getItem('floorHTML');

    if(storedFloor_html != null){
        $(".noRooms-head").hide();
        $("#floorDrawingArea").html(storedFloor_html);
    }
    else if(storedFloor_html != ""){
        $(".noRooms-head").show();
    }
    function updateLocalStorage() {
        var floorHTML = $("#floorDrawingArea").html();
        if(floorHTML != "" && floorHTML != null){
            window.localStorage.removeItem('floorHTML', floorHTML);
            window.localStorage.setItem('floorHTML', floorHTML);
        }
    };*/

    function informRoomStatus() {
        $.ajax({
            url: '/getRoomStatus',
            data: $('form').serialize(),
            type: 'POST',
            success: function (response) {
                //alert(response);
                var obj = jQuery.parseJSON(response);
                if (obj.status === "OK") {
                    alert("Operation was successful");
                }
                if (obj.status === "BAD") {
                    alert("Operation was unsuccessful");
                }

            },
            error: function (error) {
                alert(error);
            }
        });
    }

    function informBulbStatus() {
        $.ajax({
            url: '/getBulbStatus',
            data: $('form').serialize(),
            type: 'POST',
            success: function (response) {
                //alert(response);
                var obj = jQuery.parseJSON(response);
                if (obj.status === "OK") {
                    alert("Operation was successful");
                }
                if (obj.status === "BAD") {
                    alert("Operation was unsuccessful");
                }

            },
            error: function (error) {
                alert(error);
            }
        });
    }

    function informBulbOnOff() {
        $.ajax({
            url: '/getBulbCondition',
            data: $('form').serialize(),
            type: 'POST',
            success: function (response) {
                //alert(response);
                var obj = jQuery.parseJSON(response);
                if (obj.status === "OK") {
                    alert("Operation was successful");
                }
                if (obj.status === "BAD") {
                    alert("Operation was unsuccessful");
                }

            },
            error: function (error) {
                alert(error);
            }
        });
    }

    function processTemperature(){
     $.ajax({
            url: '/getTempRoom',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                //alert(response);
                var obj = jQuery.parseJSON( response );

                if($("#getRoomId_py").val("roomId_1") && $("#getRoomPre_py").val("Added")){
                    $('#temp_room1').html(obj.temperature_room_1+"&deg;C");
                }
                if($("#getRoomId_py").val("roomId_2") && $("#getRoomPre_py").val("Added")){
                    $('#temp_room2').html(obj.temperature_room_2+"&deg;C");
                }
                if($("#getRoomId_py").val("roomId_3") && $("#getRoomPre_py").val("Added")){
                    $('#temp_room3').html(obj.temperature_room_3+"&deg;C");
                }

                if(obj.status ==="OK"){
                    $("#start").hide();
                    $("#stop").hide();
                }
                if(obj.status === "BAD")
                {
                    //set the
                    $("#start").show();
                    $("#stop").show();


                    $("#stop").bind('click',function() {
                        $.getJSON('/stop_alarm');
      //stop the alarm
                    });
                    $("#start").bind('click',function() {
                        $.getJSON('/reset_alarm');
      //stop the alarm
                    });

                }

            },
            error: function(error) {
                alert(error);
            }
        });

 }

    var timer = null,
        interval = 5000,
        value = 0;

    function startProgram(){
        if (timer !== null) return;
            timer = setInterval(processTemperature, interval);
    }
    function stopProgram(){
        clearInterval(timer);
        timer = null;
    }


    /*add and remove bulb to room 1*/
    $("#addBulb_room1").click(function () {
        $("#addBulb_room1").hide();
        $("#bulbON_1").show();
        $("#removeBulb_room1").show();
        var bulb1_nowOnInput = $("#room1_Bulb_sendStatus").attr('value','ON');

        $("#getBulbId_py").val("roomId_1");
        $("#getBulbState_py").val("BulbAdded");

        informBulbStatus();
        updateLocalStorage();
    });
    $("#removeBulb_room1").click(function () {
        $("#removeBulb_room1").hide();
        $("#bulbON_1").hide();
        $("#addBulb_room1").show();
        $("#switchOn_Bulb1").attr("disabled", false);
        $("#switchOff_Bulb1").attr("disabled", true);
        $("#img_Bulb1_ON").show();
        $("#img_Bulb1_OFF").hide();

        $("#switchOn_Mode1").attr("disabled", true);
        $("#switchOff_Mode1").attr("disabled", false);
        $("#bulb_statusSpan1").css('pointer-events', 'all');
        $("#par_bulb_statusSpan1").css('cursor', 'pointer');
        $("#par_bulb_statusSpan1").css('opacity', '1');
        $("#bulb_ModeText1").html('(MANUAL)');

        var bulb1_nowOffInput = $("#room1_Bulb_sendStatus").attr('value','OFF');

        $("#getBulbId_py").val("roomId_1");
        $("#getBulbState_py").val("BulbRemoved");

        informBulbStatus();
        updateLocalStorage()
    });
    $("#switchOn_Bulb1").click(function () {
        $("#img_Bulb1_ON").hide();
        $("#img_Bulb1_OFF").show();
        $("#switchOn_Bulb1").attr("disabled", true);
        $("#switchOff_Bulb1").attr("disabled", false);

        $("#getBulbSwId_py").val("roomId_1");
        $("#getBulbSwitch_py").val("BulbOn");

        informBulbOnOff();
        updateLocalStorage()
    });
    $("#switchOff_Bulb1").click(function () {
        $("#img_Bulb1_ON").show();
        $("#img_Bulb1_OFF").hide();
        $("#switchOn_Bulb1").attr("disabled", false);
        $("#switchOff_Bulb1").attr("disabled", true);

        $("#getBulbSwId_py").val("roomId_1");
        $("#getBulbSwitch_py").val("BulbOff");

        informBulbOnOff();
        updateLocalStorage()
    });
    $("#switchOn_Mode1").click(function () {
        $("#switchOn_Mode1").attr("disabled", true);
        $("#switchOff_Mode1").attr("disabled", false);
        $("#bulb_statusSpan1").css('pointer-events', 'all');
        $("#par_bulb_statusSpan1").css('cursor', 'pointer');
        $("#par_bulb_statusSpan1").css('opacity', '1');
        $("#bulb_ModeText1").html('(MANUAL)');

    });
    $("#switchOff_Mode1").click(function () {
        $("#switchOff_Mode1").attr("disabled", true);
        $("#switchOn_Mode1").attr("disabled", false);
        $("#bulb_statusSpan1").css('pointer-events', 'none');
        $("#par_bulb_statusSpan1").css('cursor', 'not-allowed');
        $("#par_bulb_statusSpan1").css('opacity', '0.5');
        $("#bulb_ModeText1").html('(AUTOMATIC)');
    });


    /*add and remove bulb to room 2*/
    $("#addBulb_room2").click(function () {
        $("#addBulb_room2").hide();
        $("#bulbON_2").show();
        $("#removeBulb_room2").show();
        var bulb2_nowOnInput = $("#room2_Bulb_sendStatus").attr('value','ON');

        $("#getBulbId_py").val("roomId_2");
        $("#getBulbState_py").val("BulbAdded");

        informBulbStatus();
        updateLocalStorage();
    });
    $("#removeBulb_room2").click(function () {
        $("#removeBulb_room2").hide();
        $("#bulbON_2").hide();
        $("#addBulb_room2").show();
        $("#switchOn_Bulb2").attr("disabled", false);
        $("#switchOff_Bulb2").attr("disabled", true);
        $("#img_Bulb2_ON").show();
        $("#img_Bulb2_OFF").hide();

        $("#switchOn_Mode2").attr("disabled", true);
        $("#switchOff_Mode2").attr("disabled", false);
        $("#bulb_statusSpan2").css('pointer-events', 'all');
        $("#par_bulb_statusSpan2").css('cursor', 'pointer');
        $("#par_bulb_statusSpan2").css('opacity', '1');
        $("#bulb_ModeText2").html('(MANUAL)');

        var bulb2_nowOffInput = $("#room2_Bulb_sendStatus").attr('value','OFF');

        $("#getBulbId_py").val("roomId_2");
        $("#getBulbState_py").val("BulbRemoved");

        informBulbStatus();
        updateLocalStorage();
    });
    $("#switchOn_Bulb2").click(function () {
        $("#img_Bulb2_ON").hide();
        $("#img_Bulb2_OFF").show();
        $("#switchOn_Bulb2").attr("disabled", true);
        $("#switchOff_Bulb2").attr("disabled", false);

        $("#getBulbSwId_py").val("roomId_2");
        $("#getBulbSwitch_py").val("BulbOn");

        informBulbOnOff();
        updateLocalStorage()
    });
    $("#switchOff_Bulb2").click(function () {
        $("#img_Bulb2_ON").show();
        $("#img_Bulb2_OFF").hide();
        $("#switchOn_Bulb2").attr("disabled", false);
        $("#switchOff_Bulb2").attr("disabled", true);

        $("#getBulbSwId_py").val("roomId_2");
        $("#getBulbSwitch_py").val("BulbOff");

        informBulbOnOff();
        updateLocalStorage()
    });
    $("#switchOn_Mode2").click(function () {
        $("#switchOn_Mode2").attr("disabled", true);
        $("#switchOff_Mode2").attr("disabled", false);
        $("#bulb_statusSpan2").css('pointer-events', 'all');
        $("#par_bulb_statusSpan2").css('cursor', 'pointer');
        $("#par_bulb_statusSpan2").css('opacity', '1');
        $("#bulb_ModeText2").html('(MANUAL)');

    });
    $("#switchOff_Mode2").click(function () {
        $("#switchOff_Mode2").attr("disabled", true);
        $("#switchOn_Mode2").attr("disabled", false);
        $("#bulb_statusSpan2").css('pointer-events', 'none');
        $("#par_bulb_statusSpan2").css('cursor', 'not-allowed');
        $("#par_bulb_statusSpan2").css('opacity', '0.5');
        $("#bulb_ModeText2").html('(AUTOMATIC)');
    });


    /*add and remove bulb to room 3*/
    $("#addBulb_room3").click(function () {
        $("#addBulb_room3").hide();
        $("#bulbON_3").show();
        $("#removeBulb_room3").show();
        var bulb3_nowOnInput = $("#room3_Bulb_sendStatus").attr('value','ON');

        $("#getBulbId_py").val("roomId_3");
        $("#getBulbState_py").val("BulbAdded");

        informBulbStatus();
        updateLocalStorage();
    });
    $("#removeBulb_room3").click(function () {
        $("#removeBulb_room3").hide();
        $("#bulbON_3").hide();
        $("#addBulb_room3").show();
        $("#switchOn_Bulb3").attr("disabled", false);
        $("#switchOff_Bulb3").attr("disabled", true);
        $("#img_Bulb3_ON").show();
        $("#img_Bulb3_OFF").hide();

        $("#switchOn_Mode3").attr("disabled", true);
        $("#switchOff_Mode3").attr("disabled", false);
        $("#bulb_statusSpan3").css('pointer-events', 'all');
        $("#par_bulb_statusSpan3").css('cursor', 'pointer');
        $("#par_bulb_statusSpan3").css('opacity', '1');
        $("#bulb_ModeText3").html('(MANUAL)');

        var bulb3_nowOffInput = $("#room3_Bulb_sendStatus").attr('value','OFF');

        $("#getBulbId_py").val("roomId_3");
        $("#getBulbState_py").val("BulbRemoved");

        informBulbStatus();
        updateLocalStorage();
    });
    $("#switchOn_Bulb3").click(function () {
        $("#img_Bulb3_ON").hide();
        $("#img_Bulb3_OFF").show();
        $("#switchOn_Bulb3").attr("disabled", true);
        $("#switchOff_Bulb3").attr("disabled", false);

        $("#getBulbSwId_py").val("roomId_3");
        $("#getBulbSwitch_py").val("BulbOn");

        informBulbOnOff();
        updateLocalStorage()
    });
    $("#switchOff_Bulb3").click(function () {
        $("#img_Bulb3_ON").show();
        $("#img_Bulb3_OFF").hide();
        $("#switchOn_Bulb3").attr("disabled", false);
        $("#switchOff_Bulb3").attr("disabled", true);

        $("#getBulbSwId_py").val("roomId_3");
        $("#getBulbSwitch_py").val("BulbOff");

        informBulbOnOff();
        updateLocalStorage()
    });
    $("#switchOn_Mode3").click(function () {
        $("#switchOn_Mode3").attr("disabled", true);
        $("#switchOff_Mode3").attr("disabled", false);
        $("#bulb_statusSpan3").css('pointer-events', 'all');
        $("#par_bulb_statusSpan3").css('cursor', 'pointer');
        $("#par_bulb_statusSpan3").css('opacity', '1');
        $("#bulb_ModeText3").html('(MANUAL)');

    });
    $("#switchOff_Mode3").click(function () {
        $("#switchOff_Mode3").attr("disabled", true);
        $("#switchOn_Mode3").attr("disabled", false);
        $("#bulb_statusSpan3").css('pointer-events', 'none');
        $("#par_bulb_statusSpan3").css('cursor', 'not-allowed');
        $("#par_bulb_statusSpan3").css('opacity', '0.5');
        $("#bulb_ModeText3").html('(AUTOMATIC)');
    });


    /*add room*/
    $("#addRoom_fromNav").click(function () {
        var room1enabled = $("#roomId_1").is(":hidden");
        var room1disabled = $("#roomId_1").is(":visible");
        var room2enabled = $("#roomId_2").is(":hidden");
        var room2disabled = $("#roomId_2").is(":visible");
        var room3enabled = $("#roomId_3").is(":hidden");
        var room3disabled = $("#roomId_3").is(":visible");
        if (room1enabled) {
            $("#roomId_1").show();
            $("#noRoom-delID").hide();
            $(".noRooms-head").hide();

            $("#getRoomId_py").val("roomId_1");
            $("#getRoomPre_py").val("Added");

            informRoomStatus();
            processTemperature();
            startProgram();

            updateLocalStorage();
        }
        if (room1disabled && room2enabled) {
            $("#roomId_2").show();

            $("#getRoomId_py").val("roomId_2");
            $("#getRoomPre_py").val("Added");

            informRoomStatus();
            processTemperature();
            startProgram();

            updateLocalStorage();
        }
        if (room1disabled && room2disabled && room3enabled) {
            $("#roomId_3").show();

            $("#getRoomId_py").val("roomId_3");
            $("#getRoomPre_py").val("Added");

            informRoomStatus();
            processTemperature();
            startProgram();

            updateLocalStorage();
        }
    });

    /*remove room*/
    $("#removeRoom_fromNav").click(function ()   {
        var room1enabled = $("#roomId_1").is(":hidden");
        var room1disabled = $("#roomId_1").is(":visible");
        var room2enabled = $("#roomId_2").is(":hidden");
        var room2disabled = $("#roomId_2").is(":visible");
        var room3enabled = $("#roomId_3").is(":hidden");
        var room3disabled = $("#roomId_3").is(":visible");
        if (confirm('Are you Sure you want to Delete the Room! If You Click Yes your previous settings would be changed.')){
            if (room1disabled && room2disabled && room3disabled) {
                $("#roomId_3").hide();
                $("#noRoom-delID").hide();

                /*extras*/
                $("#removeBulb_room3").hide();
                $("#bulbON_3").hide();
                $("#addBulb_room3").show();

                $("#img_Bulb3_ON").show();
                $("#img_Bulb3_OFF").hide();
                $("#switchOn_Bulb3").attr("disabled", false);
                $("#switchOff_Bulb3").attr("disabled", true);

                $("#switchOn_Mode3").attr("disabled", true);
                $("#switchOff_Mode3").attr("disabled", false);
                $("#bulb_statusSpan3").css('pointer-events', 'all');
                $("#par_bulb_statusSpan3").css('cursor', 'pointer');
                $("#par_bulb_statusSpan3").css('opacity', '1');
                $("#bulb_ModeText3").html('(MANUAL)');

                $("#getRoomId_py").val("roomId_3");
                $("#getRoomPre_py").val("Removed");

                $("#getBulbId_py").val("roomId_3");
                $("#getBulbState_py").val("BulbRemoved");

                $("#getBulbSwId_py").val("roomId_3");
                $("#getBulbSwitch_py").val("BulbOff");

                informRoomStatus();
                stopProgram();

                updateLocalStorage();
            }
            else if (room1disabled && room2disabled && room3enabled) {
                $("#roomId_2").hide();
                $("#noRoom-delID").hide();

                /*extras*/
                $("#removeBulb_room2").hide();
                $("#bulbON_2").hide();
                $("#addBulb_room2").show();

                $("#img_Bulb2_ON").show();
                $("#img_Bulb2_OFF").hide();
                $("#switchOn_Bulb2").attr("disabled", false);
                $("#switchOff_Bulb2").attr("disabled", true);

                $("#switchOn_Mode2").attr("disabled", true);
                $("#switchOff_Mode2").attr("disabled", false);
                $("#bulb_statusSpan2").css('pointer-events', 'all');
                $("#par_bulb_statusSpan2").css('cursor', 'pointer');
                $("#par_bulb_statusSpan2").css('opacity', '1');
                $("#bulb_ModeText2").html('(MANUAL)');

                $("#getRoomId_py").val("roomId_2");
                $("#getRoomPre_py").val("Removed");
                $("#getRoomPre_py").val("Removed");

                $("#getBulbId_py").val("roomId_2");
                $("#getBulbState_py").val("BulbRemoved");

                $("#getBulbSwId_py").val("roomId_2");
                $("#getBulbSwitch_py").val("BulbOff");

                informRoomStatus();
                stopProgram();

                updateLocalStorage();
            }
            else if (room1disabled && room2enabled && room3enabled) {
                $("#roomId_1").hide();
                $("#noRoom-delID").hide();
                $(".noRooms-head").show();

                /*extras*/
                $("#removeBulb_room1").hide();
                $("#bulbON_1").hide();
                $("#addBulb_room1").show();

                $("#img_Bulb1_ON").show();
                $("#img_Bulb1_OFF").hide();
                $("#switchOn_Bulb1").attr("disabled", false);
                $("#switchOff_Bulb1").attr("disabled", true);

                $("#switchOn_Mode1").attr("disabled", true);
                $("#switchOff_Mode1").attr("disabled", false);
                $("#bulb_statusSpan1").css('pointer-events', 'all');
                $("#par_bulb_statusSpan1").css('cursor', 'pointer');
                $("#par_bulb_statusSpan1").css('opacity', '1');
                $("#bulb_ModeText1").html('(MANUAL)');

                $("#getRoomId_py").val("roomId_1");
                $("#getRoomPre_py").val("Removed");
                $("#getRoomPre_py").val("Removed");

                $("#getBulbId_py").val("roomId_1");
                $("#getBulbState_py").val("BulbRemoved");

                $("#getBulbSwId_py").val("roomId_1");
                $("#getBulbSwitch_py").val("BulbOff");

                informRoomStatus();
                stopProgram();

                updateLocalStorage()
            }
            else if (room1enabled && room2enabled && room3enabled){
                var domElement2 = $('<p class="noRoom-del">There is no Room to delete</p>');
                $("#noRoom-delID").show();
                $("#noRoom-delID").append(domElement2);
                updateLocalStorage()
            }
        }
        else {

        }

    });

    /*refresh floor*/
    $("#refreshFloor_fromNav").click(function () {
        if (confirm('Are you Sure you want to refresh Floor! If You Click Yes your previous settings would be changed.')) {
            /*$("#floorDrawingArea div").hide();*/
            $(".noRooms-head").show();

            /*room1*/
            $("#roomId_1").hide();
            $("#removeBulb_room1").hide();
            $("#bulbON_1").hide();
            $("#addBulb_room1").show();

            $("#img_Bulb1_ON").show();
            $("#img_Bulb1_OFF").hide();
            $("#switchOn_Bulb1").attr("disabled", false);
            $("#switchOff_Bulb1").attr("disabled", true);

            $("#switchOn_Mode1").attr("disabled", true);
            $("#switchOff_Mode1").attr("disabled", false);
            $("#bulb_statusSpan1").css('pointer-events', 'all');
            $("#par_bulb_statusSpan1").css('cursor', 'pointer');
            $("#par_bulb_statusSpan1").css('opacity', '1');
            $("#bulb_ModeText1").html('(MANUAL)');

            /*room2*/
            $("#roomId_2").hide();
            $("#removeBulb_room2").hide();
            $("#bulbON_2").hide();
            $("#addBulb_room2").show();

            $("#img_Bulb2_ON").show();
            $("#img_Bulb2_OFF").hide();
            $("#switchOn_Bulb2").attr("disabled", false);
            $("#switchOff_Bulb2").attr("disabled", true);

            $("#switchOn_Mode2").attr("disabled", true);
            $("#switchOff_Mode2").attr("disabled", false);
            $("#bulb_statusSpan2").css('pointer-events', 'all');
            $("#par_bulb_statusSpan2").css('cursor', 'pointer');
            $("#par_bulb_statusSpan2").css('opacity', '1');
            $("#bulb_ModeText2").html('(MANUAL)');

            /*room3*/
            $("#roomId_3").hide();

            $("#removeBulb_room3").hide();
            $("#bulbON_3").hide();
            $("#addBulb_room3").show();

            $("#img_Bulb3_ON").show();
            $("#img_Bulb3_OFF").hide();
            $("#switchOn_Bulb3").attr("disabled", false);
            $("#switchOff_Bulb3").attr("disabled", true);

            $("#switchOn_Mode3").attr("disabled", true);
            $("#switchOff_Mode3").attr("disabled", false);
            $("#bulb_statusSpan3").css('pointer-events', 'all');
            $("#par_bulb_statusSpan3").css('cursor', 'pointer');
            $("#par_bulb_statusSpan3").css('opacity', '1');
            $("#bulb_ModeText3").html('(MANUAL)');

            $("#getRoomId_py").val("roomId_123");
            $("#getRoomPre_py").val("Removed");

            $("#getBulbId_py").val("");
            $("#getBulbState_py").val("");

            $("#getBulbSwId_py").val("");
            $("#getBulbSwitch_py").val("");

            informRoomStatus();
            stopProgram();

            updateLocalStorage();
        }
        else {
            // Do nothing!
            updateLocalStorage();
        }
    });

    /*modal settings*/
    /*ldr 1*/
    var slider_ldr1 = document.getElementById("myRange_ldr1");
    var output_ldr1 = document.getElementById("valueSlider_ldr1");
    output_ldr1.innerHTML = slider_ldr1.value; // Display the default slider value

    slider_ldr1.oninput = function() {
        output_ldr1.innerHTML = this.value;
    }

    /*ldr 2*/
    var slider_ldr2 = document.getElementById("myRange_ldr2");
    var output_ldr2 = document.getElementById("valueSlider_ldr2");
    output_ldr2.innerHTML = slider_ldr2.value; // Display the default slider value

    slider_ldr2.oninput = function() {
        output_ldr2.innerHTML = this.value;
    }

    /*ldr 3*/
    var slider_ldr3 = document.getElementById("myRange_ldr3");
    var output_ldr3 = document.getElementById("valueSlider_ldr3");
    output_ldr3.innerHTML = slider_ldr3.value; // Display the default slider value

    slider_ldr3.oninput = function() {
        output_ldr3.innerHTML = this.value;
    }

});
