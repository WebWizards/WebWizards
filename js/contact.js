$(function(){
    $("#submit").click(function() {
        var name=document.forms["contactForm"]["entry.0.single"].value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        var email=document.forms["contactForm"]["entry.1.single"].value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

        var error="";
        if (name==null || name.length == 0) {
            error += "Missing name !\n";
        }
        if (email==null || email.length == 0) {
            error += "Missing email !\n";
        }else if(!isValidMail(email)){
            error += "Email is not valid !\n";
        }

        if(error.length == 0 && validCaptcha()){
            $.post("https://docs.google.com/spreadsheet/formResponse?formkey=dEpWMC1DWENIWTVvdklyQ3VvTlc5eVE6MQ&amp;embedded=true&amp;ifq",
                $("#contactForm").serialize()
                );
            alert ("Message Sent!");
            document.forms["contactForm"].reset();
        } else if (error.length > 0) {
            alert(error);
            return false;
        }
        return false;
    });

    function validCaptcha(){
        var ww=prompt("Please enter 'webwizards dot gr' to verify that you are not a bot","");
        if (ww==null || ww!="webwizards.gr") {
            alert("Wrong captcha. Please try again");
            return false;
        }
        return true;
    }

    function isValidMail(email){
        var splitted = email.match("^(.+)@(.+)$");
        if (splitted == null) return false;
        if (splitted[1] != null)
        {
            var regexp_user = /^\"?[\w-_\.]*\"?$/;
            if (splitted[1].match(regexp_user) == null) return false;
        }
        if (splitted[2] != null)
        {
            var regexp_domain = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
            if (splitted[2].match(regexp_domain) == null)
            {
                var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
                if (splitted[2].match(regexp_ip) == null) return false;
            } // if
            return true;
        }
        return false;
    }
});
