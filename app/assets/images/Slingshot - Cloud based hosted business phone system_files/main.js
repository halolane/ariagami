var order_status = '';
var did_num = '';
var verified = 0;
$(document).ready(function() {
$('#signupsubmit').submit(function() {
        //alert('in signup');
        signupdhs();
        return false;
});
//----------------------------------
$('#loginform').submit(function() {
// alert('mainlogin');
//  alert('in form2');
  mainlogin2check();

return false;
});
//----------------------------------
$('#login2form').submit(function() {
// alert('mainlogin');
// alert('in form2');
  mainlogin2check();

  return false;
});
//----------------------------------
$('#forgotform').submit(function() {
  forgotpw();
  return false;
  });
//----------------------------------
$('#inputEmail').change(function() {

var emailaddr = $('#inputEmail').val();
var epzip     = $('#ePostZip').val();
/*
if (epzip != '')
{
alert ('bot'+epzip);
}
*/
// alert ('emailaddr='+emailaddr);

var atPos = emailaddr.indexOf('@',0);
if (atPos == -1) {
   alert('email address must contain an @');
   return false;
}

if (atPos == 0) {
   alert('email address must not start with @');
   return false;
}
if (emailaddr.indexOf('@', atPos + 1) > - 1) {
   alert('email address must contain only one @');
   return false;
}
if (emailaddr.indexOf('.', atPos) == -1) {
   alert('email address must contain a period in the domain name');
   return false;
}
var suffix = emailaddr.substring(emailaddr.lastIndexOf('.')+1);
if (suffix.length < 2 ) {
   alert('invalid primary domain in email address');
   return false;
}
return true;
})

});

function ajax_populate(){
// alert('populate');
var div      = arguments[0];
var ctl      = arguments[1];
var vw       = arguments[2];
var dflt     = arguments[3];
var instance = arguments[4];
var global   = 0;
var tabId0 = '.' + div + ':eq('+instance+')';
$(tabId0).html('<option>Loading</option>');
//alert('div='+div+' ctl='+ctl+' vw='+vw+' dftl='+dflt+' instance='+instance);
var function_name = "ctl.php";
var datastring = 'function=' + function_name;
datastring = datastring + "&header=0&global="+global+"&ctl="+ctl+"&vw="+vw+"&default="+dflt+"&instance="+instance;
var j = arguments.length;
var varname = '';
for ( var i = 5; i < arguments.length; i=i+2 ){
 j = i-1;
 varname = arguments[i];
 varvalue = arguments[i+1];
 datastring = datastring + '&' + varname + '=' +varvalue;
 }
 // alert(div);
 // alert(function_name);
 // alert('ajax_populate='+datastring);
  $.ajax({
  type: "GET",
  url: function_name,
  cache: false,
  data: datastring,
  success: function(msg){
           if (msg != "")
                {
                //alert('pop='+msg);
                var n=msg.split("|");
                msg=n[1];

                var tabId = '.' + div + ':eq('+instance+')';         // wait message container
                var focusId = '#test';           // user input identifier
                //alert('pop tabId='+tabId+' focusId='+focusId);
                  $(tabId).html(msg).fadeIn('fast',function(){
                  $(focusId).focus();
                  });
                }
             }
        });
}

function ajaxs_populate(){
// alert('populate');
var div      = arguments[0];
var ctl      = arguments[1];
var vw       = arguments[2];
var dflt     = arguments[3];
var instance = arguments[4];
var global   = 0;
var tabId0 = '.' + div + ':eq('+instance+')';
$(tabId0).html('<option>Loading</option>');
//alert('div='+div+' ctl='+ctl+' vw='+vw+' dftl='+dflt+' instance='+instance);
var function_name = "ctl.php";
var datastring = 'function=' + function_name;
datastring = datastring + "&header=0&global="+global+"&ctl="+ctl+"&vw="+vw+"&default="+dflt+"&instance="+instance;
var j = arguments.length;
var varname = '';
for ( var i = 5; i < arguments.length; i=i+2 ){
 j = i-1;
 varname = arguments[i];
 varvalue = arguments[i+1];
 datastring = datastring + '&' + varname + '=' +varvalue;
 }
 // alert(div);
 // alert(function_name);
 // alert('ajax_populate='+datastring);
  $.ajax({
  type: "GET",
  url: function_name,
  cache: false,
  async: false,
  data: datastring,
  success: function(msg){
           if (msg != "")
                {
                //alert('pop='+msg);
                var n=msg.split("|");
                msg=n[1];

                var tabId = '.' + div + ':eq('+instance+')';         // wait message container
                var focusId = '#test';           // user input identifier
                //alert('pop tabId='+tabId+' focusId='+focusId);
                  $(tabId).html(msg).fadeIn('fast',function(){
                  $(focusId).focus();
                  });
                }
             }
        });
}


function signupdhs(){
var process=1;
var eAddress=$('#inputEmail').val();
//alert(eAddress);
// 2 - m_checkemailexists / checkemailexists
//alert('email='+eAddress);
var function_name = "ctl.php";
var datastring = 'function=' + function_name;
var ctl = 'm_checkemailexists';
var vw = 'checkemail';
var emailcheck = 'X';
datastring = datastring + '&ajax=1&global=0&ctl='+ctl+'&vw='+vw+'&account_email='+eAddress;
// alert(datastring);

 $.ajax({
  type: "GET",
  async: false,
  url: function_name,
  cache: false,
  data: datastring,
  success: function(msg){
        // alert('email msg='+msg);
        var n=msg.split("|");
        emailcheck = n[1];
        // alert ('emailcheck='+emailcheck);
        }
       });

if (emailcheck == "1")
   {
    alert("Email Address Exists, you have an account already. Please login.");
    process=0;
   }
else
   {
    // 3 Choose Plancode
    var plancode=$('#selectplan').val();
    if (plancode == "")
       {
         alert("Please select a Plan!");
         process=0;
       }
    else
       {
         //alert(plancode);
         //alert('select='+select);
         // 4 Get DID Choice
         var did = "";
         if ( select == "auto" )
            {
              did=$("#geophone").val();
            }
         else
            {
              did=$("#didselect").val();
            }
         //alert('did.val='+did);
         if (did == "" || did == "0" )
            {
              alert("Please select a Phone Number!");
              process=0;
            }
         var eCountry=$('#geoipcountry').val();
         //alert($('input#geoipcountry').val());
         //alert(did);
       }
   }

// 5 Signup

if ( process == "1" )
{
	// X plancode 'plancode'
	// X firstname 'fName'
	// X phonenumber 'pNumber'
	// X accountcity 'cCity'
	// X accountprovince 'cState'
	// X accountcountry 'eCountry'
	// X didnumber 'did'
	// X didcountry 'country'
	// X didstate 'state'
	// X didcity 'city'
	// X promocode 'promo'

  var emailaddr = $('#inputEmail').val();
  // DEFUNCT - var accountn = "";
  // DEFUNCT - var cName=$('#company_name').val();
  var fName=$('#inputName').val();
  // DEFUNCT - var lName=$('#last_name').val();
  var pNumber=did;
  // var cNumber=$('#phone_number').val();
  // alert ('pNumber cNumber '+pNumber+' '+cNumber);
  // var cAddress=$('#address_1').val();
  // var cAddress2=$('#address_2').val();
  var cCity=$('#geoipcity').val();
  var cState=$('#geoipprovstate').val();
  //  var ePostZip=$('#zip').val();
  var eCountry=$('#geoipcountry').val();
  //alert('ecountry '+eCountry);
  if ( select=='auto' )
  {
  var didcountry=$('#geoipcountry').val();
  // alert ('did / didcountry='+did+' / '+didcountry);
  var didstate   = $('#geoipprovstate').val();
  var didcity    = $('#geoipcity').val();
  }
  else if ( select == 'manual' )
  {
  var didcountry = $('#countryselect').val();
  var didstate   = $('#stateselect').val();
  var didcity    = $('#areaselect').val();
  }
  var promocode  = $('#PromoCode').val();
  var function_name = "ctl.php";
  var datastring = 'function=' + function_name;

  //  9 - a_signup / signup_output

  var ctl = 'a_setup1';
  var vw = 'signup_output';
  datastring = datastring + '&hd=0&global=0&ctl='+ctl+'&vw='+vw;
  datastring = datastring + '&plancode='+plancode+'&fName='+fName+'&pNumber='+pNumber+'&cCity='+cCity+'&cState='+cState+'&eCountry='+eCountry+'&did='+did;
  datastring = datastring + '&emailaddr='+emailaddr+'&country='+didcountry+'&state='+didstate+'&city='+didcity+'&promo='+promocode;
  var tocharge_accountnum="";
  console.log('a_setup1 datastring='+datastring);
  var tocharge_billnum="";
  var tocharge_billamt="";
  $.ajax({
    type: "GET",
    async: false,
    url: function_name,
    cache: false,
    data: datastring,
    success: function(msg){
        //alert(msg);
        // tocharge_accountnum=n[0];
	msg=cleantext(msg);
        //alert(msg);
        //alert('message 1='+msg);
        var n=msg.split("_");
        // alert(msg);
        tocharge_accountnum=n[1];
        // alert('tocharge_accountnum'+tocharge_accountnum);
        tocharge_billnum=n[2];
        // alert(tocharge_billnum);
        tocharge_billamt=n[3];
        }
   })

   var total_charge=tocharge_billamt;
   var tocharge_total=total_charge;
   console.log(total_charge);
	// alert(tocharge_total);

// 10 - paypal

   if (total_charge > 0)
   {
     // alert(total_charge);
     alert('Please wait while we send you to Paypal for payment');
     var tocharge_plan=plancode;
     var tocharge_item_number=tocharge_accountnum+'_1'+'_'+tocharge_billnum+'_1';
     if ( eCountry == "US")
        {
         $('#commanddiv').html('<form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="unika@prodataservices.net"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="item_name" value="Slingshot VoIP"><input type="hidden" name="item_number" value="SignUp"><input type="hidden" name="amount" value='+tocharge_total+'><input type="hidden" name="custom" value="'+tocharge_accountnum+'"><input type="hidden" name="return" value="http://www.slingshotvoip.com/index.php?hdr=5&global=0&ctl=m_setup2&account_n='+tocharge_accountnum+'&did='+did+'&vw=setup_2"><input type="hidden" name="cancel_return" value="http://www.slingshotvoip.com"><input type="image" src="images/make_payment_button.png" border="0" name="submit" alt="Make payments with PayPal!"></form>');
        }
     else if ( eCountry == "CA" )
	{
	$('#commanddiv').html('<form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="BMB246WM78CCQ"><input type="hidden" name="currency_code" value="CAD"><input type="hidden" name="item_name" value="Slingshot VoIP"><input type="hidden" name="item_number" value="SignUp"><input type="hidden" name="amount" value='+tocharge_total+'><input type="hidden" name="custom" value="'+tocharge_accountnum+'"><input type="hidden" name="return" value="http://www.slingshotvoip.com/index.php?hdr=5&global=0&ctl=m_setup2&account_n='+tocharge_accountnum+'&did='+did+'&vw=setup_2"><input type="hidden" name="cancel_return" value="http://www.slingshotvoip.com"><input type="image" src="images/make_payment_button.png" border="0" name="submit" alt="Make payments with PayPal!"></form>');
	}
     else
        {
	$('#commanddiv').html('<form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="unika@prodataservices.net"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="item_name" value="Slingshot VoIP"><input type="hidden" name="item_number" value="SignUp"><input type="hidden" name="amount" value='+tocharge_total+'><input type="hidden" name="custom" value="'+tocharge_accountnum+'"><input type="hidden" name="return" value="http://www.slingshotvoip.com/index.php?hdr=5&global=0&ctl=beta_paymentreturn&account_n='+tocharge_accountnum+'&did='+did+'&vw=setup_2"><input type="hidden" name="cancel_return" value="http://www.slingshotvoip.com"><input type="image" src="images/make_payment_button.png" border="0" name="submit" alt="Make payments with PayPal!"></form>');
        }
     // parent.
     document.forms['_xclick'].submit();
   }
   else
   {
    // no amount due, go to login: m_logininitial / logininitial
    // alert('before logininitial account_num='+tocharge_accountnum+' did_num='+did);
    // ajax_ctlvw('content','m_logininitial','logininitial','0','account_num',tocharge_accountnum,'did',did,'bill_amt',0);
    location.href="/index.php?hdr=5&ctl=beta_paymentreturn&vw=login_congrats";
   }


}

}      //end of function signupdhs()
//--------------------------------------------------------------
function signupnewSS(){

     //alert('signupnewSS select='+select);
     if ( select=='auto' )
        {
          var didcountry = $('#geoipcountry').val();
          var didstate   = $('#geoipprovstate').val();
          var didcity    = $('#geoipcity').val();
        }
     else
        {
          var didcountry = $('#countryselect').val();
          var didstate   = $('#stateselect').val();
          var didcity    = $('#areaselect').val();
        }

     var plancode  = $('#selectplan2').val().substring(0,6);
     var emailaddr = $('#emailAddress').val();
     var fName     = $('#inputName').val();
     var did       = $('#selectedPhone').val();
     var pNumber   = $('#selectedPhone').val().substring(0,11);
     var cCity     = $('#geoipcity').val();
     var cState    = $('#geoipprovstate').val();
     var eCountry  = $('#geoipcountry').val();


     var promocode     = $('#PromoCode').val();
     var function_name = "ctl.php";
     var datastring    = 'function=' + function_name;

  //  9 - a_signup / signup_output

  var ctl = 'a_setup1';
  var vw = 'signup_output';
  datastring = datastring + '&hd=0&global=0&ctl='+ctl+'&vw='+vw;
  datastring = datastring + '&plancode='+plancode+'&fName='+fName+'&pNumber='+pNumber+'&cCity='+cCity+'&cState='+cState+'&eCountry='+eCountry+'&did='+did;
  datastring = datastring + '&emailaddr='+emailaddr+'&country='+didcountry+'&state='+didstate+'&city='+didcity+'&promo='+promocode;
  //alert('a_setup1 datastring='+datastring);

  var tocharge_accountnum="";
  var tocharge_billnum="";
  var tocharge_billamt="";
  $.ajax({
    type: "GET",
    async: false,
    url: function_name,
    cache: false,
    data: datastring,
    success: function(msg){
        //alert(msg);
        // tocharge_accountnum=n[0];
	msg=cleantext(msg);
        //alert(msg);
        //alert('message 1='+msg);
        var n=msg.split("_");
        // alert(msg);
        tocharge_accountnum=n[1];
        // alert('tocharge_accountnum'+tocharge_accountnum);
        tocharge_billnum=n[2];
        // alert(tocharge_billnum);
        tocharge_billamt=n[3];
        }
   })

   var total_charge=tocharge_billamt;
   var tocharge_total=total_charge;
   console.log(total_charge);
	// alert(tocharge_total);

// 10 - paypal

   if (total_charge > 0)
   {
     // alert(total_charge);
     alert('Please wait while we send you to Paypal for payment');
     var tocharge_plan=plancode;
     var tocharge_item_number=tocharge_accountnum+'_1'+'_'+tocharge_billnum+'_1';
     if ( eCountry == "US")
        {
         $('#commanddiv').html('<form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="unika@prodataservices.net"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="item_name" value="Slingshot VoIP"><input type="hidden" name="item_number" value="SignUp"><input type="hidden" name="amount" value='+tocharge_total+'><input type="hidden" name="custom" value="'+tocharge_accountnum+'"><input type="hidden" name="return" value="http://www.slingshotvoip.com/index.php?hdr=5&global=0&ctl=m_setup2&account_n='+tocharge_accountnum+'&did='+did+'&vw=setup_2"><input type="hidden" name="cancel_return" value="http://www.slingshotvoip.com"><input type="image" src="images/make_payment_button.png" border="0" name="submit" alt="Make payments with PayPal!"></form>');
        }
     else if ( eCountry == "CA" )
	{
	$('#commanddiv').html('<form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="BMB246WM78CCQ"><input type="hidden" name="currency_code" value="CAD"><input type="hidden" name="item_name" value="Slingshot VoIP"><input type="hidden" name="item_number" value="SignUp"><input type="hidden" name="amount" value='+tocharge_total+'><input type="hidden" name="custom" value="'+tocharge_accountnum+'"><input type="hidden" name="return" value="http://www.slingshotvoip.com/index.php?hdr=5&global=0&ctl=m_setup2&account_n='+tocharge_accountnum+'&did='+did+'&vw=setup_2"><input type="hidden" name="cancel_return" value="http://www.slingshotvoip.com"><input type="image" src="images/make_payment_button.png" border="0" name="submit" alt="Make payments with PayPal!"></form>');
	}
     else
        {
	$('#commanddiv').html('<form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="unika@prodataservices.net"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="item_name" value="Slingshot VoIP"><input type="hidden" name="item_number" value="SignUp"><input type="hidden" name="amount" value='+tocharge_total+'><input type="hidden" name="custom" value="'+tocharge_accountnum+'"><input type="hidden" name="return" value="http://www.slingshotvoip.com/index.php?hdr=5&global=0&ctl=beta_paymentreturn&account_n='+tocharge_accountnum+'&did='+did+'&vw=setup_2"><input type="hidden" name="cancel_return" value="http://www.slingshotvoip.com"><input type="image" src="images/make_payment_button.png" border="0" name="submit" alt="Make payments with PayPal!"></form>');
        }
     // parent.
     document.forms['_xclick'].submit();
   }
   else
   {
    // no amount due, go to login: m_logininitial / logininitial
    // alert('before logininitial account_num='+tocharge_accountnum+' did_num='+did);
    // ajax_ctlvw('content','m_logininitial','logininitial','0','account_num',tocharge_accountnum,'did',did,'bill_amt',0);
    location.href="/index.php?hdr=5&vw=login_congrats";
   }


}      //end of function signupnewSS()
//--------------------------------------------------------------

function cleantext(msg)
{
        noBreaksText=msg;
        re1 = /<1br \/><1br \/>/gi;
        re1a = /<1br \/><1br \/><1br \/>/gi;
        noBreaksText = noBreaksText.replace(re1a,"<1br /><2br />");
        noBreaksText = noBreaksText.replace(re1,"<2br />");
        re2 = /\<1br \/>/gi;
        noBreaksText = noBreaksText.replace(re2, " ");
        re3 = /\s+/g;
        noBreaksText = noBreaksText.replace(re3," ");
        re4 = /<2br \/>/gi;
        noBreaksText = noBreaksText.replace(re4,"\n\n");
        noBreaksText = noBreaksText.replace(/^\s+/,"");
        return noBreaksText;
}

function mainlogincheck()
{
// alert('in login');
var userpw=$('#password').val();
var userid=$('#username').val();
var function_name = "ctl.php";
var datastring = 'function=' + function_name;
var ctl = 'm_login';
var vw = 'verification2';
var accountnum = 0;
var billamt = 0;
var did = 0;
var country = "US";
// alert ('userid/pw'+userid+userpw);
datastring = datastring + '&header=0&global=0&ctl='+ctl+'&vw='+vw+'&userid='+userid+'&userpw='+userpw;
// alert(datastring);
 $.ajax({
  type: "GET",
  async: false,
  url: function_name,
  cache: false,
  data: datastring,
  success: function(msg){
        $('#commanddiv').html(msg);
        msg=cleantext(msg);
        //alert('alert1='+msg);
        var n=msg.split("|");
        verified=n[1];
        accountnum=n[2];
        billamt=n[3];
        did=n[4];
        country=n[5];
        }
       });
}

function mainlogin2check()
{
// alert('in login');
var userpw=$('#password').val();
var userid=$('#username').val();
var function_name = "ctl.php";
var datastring = 'function=' + function_name;
var ctl = 'm_login';
var vw = 'verificationdhs';
var accountnum = 0;
var billamt = 0;
var did = 0;
var country = "US";
// alert ('userid/pw'+userid+userpw);
datastring = datastring + '&header=0&global=0&ctl='+ctl+'&vw='+vw+'&userid='+userid+'&userpw='+userpw;
//alert(datastring);
 $.ajax({
  type: "GET",
  async: false,
  url: function_name,
  cache: false,
  data: datastring,
  success: function(msg){
        $('#commanddiv').html(msg);
        msg=cleantext(msg);
        //alert('alert1='+msg);
        var n=msg.split("|");
        verified=n[1];
        accountnum=n[2];
        billamt=n[3];
        did=n[4];
        country=n[5];
        }
       });

  if (verified == 5)
     {
     //alert('login successful');
     $('#loginmsg').html('Login successful!  Please wait while we send you to Paypal for payment.');
     }

  if (verified == 0)
     {
     //alert('login failed');
     $('#loginmsg').html('Invalid login!  Please try again!');
     }
}
//--------------------------------------------------------------
function orderNew(){

  var didcountry = $('#countryselect').val();
  var didstate   = $('#stateselect').val();
  var didcity    = $('#areaselect').val();
  var did        = $('#did_num').val()+$('#did_source').val();
  var did_source = $('#did_source').val();
  //alert ('orderNew '+did+' '+did_source);
  var function_name = "ctl.php";
  var datastring    = 'function=' + function_name;
  var ctl           = 'a_didnum_new';
  var vw            = 'default';
  datastring        = datastring + '&ajax=1&global=0&ctl='+ctl+'&vw='+vw+'&did='+did+'&didcountry='+didcountry+'&didstate='+didstate+'&didcity='+didcity;

  //alert('orderNew datastring = '+datastring);

  $.ajax({
     type: "GET",
     async: false,
     url: function_name,
     cache: false,
     data: datastring,
     success: function(msg){
	  //alert('after orderNew '+msg);
          var n=msg.split("|");
	  order_status = n[1];
         }
      })

}

//--------------------------------------------------------------
function orderDID(){
  var did_num    = $('#did_num').val();
  var did_source = $('#did_source').val();
  console.log('order_DID did_num='+did_num+' '+did_source);
  var function_name = "ctl.php";
  var datastring = 'function=' + function_name;
  var ctl = 'order_did';
  var vw  = 'default';
  datastring = datastring + '&ajax=1&global=0&ctl='+ctl+'&vw='+vw;
  datastring = datastring
             + '&did_num='+did_num;

  //alert('orderDID datastring = '+datastring);

  $.ajax({
     type: "GET",
     async: false,
     url: function_name,
     cache: false,
     data: datastring,
     success: function(msg){
	  console.log('after order_did '+msg);
          var n=msg.split("|");
	  order_status = n[1];
         }
      })

}

//--------------------------------------
function ajaxs_ctlvw(){
//alert('ajax_ctlvw');
var returnvar="";
var div = arguments[0];
var ctl = arguments[1];
var vw = arguments[2];
var global = arguments[3];
var function_name = "ctl.php";
var datastring = 'function=' + function_name;
datastring = datastring + "&header=0&global="+global+"&ctl="+ctl+"&vw="+vw;
var j = arguments.length;
var varname = '';

for ( var i = 2; i < arguments.length; i=i+2 ){
 j = i-1;
 varname = arguments[i];
 varvalue = arguments[i+1];
 datastring = datastring + '&' + varname + '=' +varvalue;
 }
// alert('ajax_ctlvw '+ctl+' '+vw);
// alert(function_name);
// alert(datastring);
  $.ajax({
  type: "GET",
  url: function_name,
  cache: false,
  async: false,
  data: datastring,
  success: function(msg){
           returnvar=msg;
           if (msg != "")
                {
           // show error message
                var tabId = '#' + div;         // wait message container
                var focusId = '#debug';           // user input identifier

                $(tabId).html(msg).fadeIn('fast',function(){
                  // $(focusId).focus();
                  });
                }
             }
        });
// alert(returnvar);
return returnvar;
}

function ajax_ctlvw(){
//alert('ajax_ctlvw');
var div = arguments[0];
var ctl = arguments[1];
var vw = arguments[2];
var global = arguments[3];
var function_name = "ctl.php";
var datastring = 'function=' + function_name;
datastring = datastring + "&header=0&global="+global+"&ctl="+ctl+"&vw="+vw;
var j = arguments.length;
var varname = '';

for ( var i = 2; i < arguments.length; i=i+2 ){
 j = i-1;
 varname = arguments[i];
 varvalue = arguments[i+1];
 datastring = datastring + '&' + varname + '=' +varvalue;
 }
// alert('ajax_ctlvw '+ctl+' '+vw);
// alert(function_name);
// alert(datastring);
  $.ajax({
  type: "GET",
  url: function_name,
  cache: false,
  data: datastring,
  success: function(msg){
           if (msg != "")
                {
             //   alert(msg);
           // show error message
                var tabId = '#' + div;         // wait message container
                var focusId = '#debug';           // user input identifier

                $(tabId).html(msg).fadeIn('fast',function(){
                  // $(focusId).focus();
                  });
                return msg;
                }
             }
        });
}

function push_analytics(){
// alert('analytics');
var ctl = arguments[0];
var vw = arguments[1];
var evt = arguments[2];
var variable = arguments[3];
var value = arguments[4];
var function_name = "analytics.php";
var datastring = 'function=' + function_name;
datastring = datastring + "&evt="+evt+"&ctl="+ctl+"&vw="+vw+"&variable="+variable+"&value="+value;
var j = arguments.length;
var varname = '';

for ( var i = 2; i < arguments.length; i=i+2 ){
 j = i-1;
 varname = arguments[i];
 varvalue = arguments[i+1];
 datastring = datastring + '&' + varname + '=' +varvalue;
 }
// alert('ajax_ctlvw '+ctl+' '+vw);
// alert(function_name);
// alert(datastring);
  $.ajax({
  type: "GET",
  url: function_name,
  cache: false,
  data: datastring,
  success: function(msg){
	//	alert('done');
           if (msg != "")
                {
           //     alert(msg);
           // show error message
           //      var tabId = '#' + div;         // wait message container
           //     var focusId = '#debug';           // user input identifier

           //     $(tabId).html(msg).fadeIn('fast',function(){
                  // $(focusId).focus();
          //        });
                return msg;
                }
             }
        });
}
//----------------------
function forgotpw()
{
//alert('in forgotpw');
var email=$('#email').val();
var username=$('#username').val();
if (email == "" && username == "")
   {
    $('#forgotmsg').html('Please enter username or email address!');
    return false;
   }

var function_name = "ctl.php";
var datastring = 'function=' + function_name;
var ctl = 'm_forgot';
var vw = 'forgotpw';
var verified = 0;
var accountnum = 0;
var billamt = 0;
var did = 0;
// alert ('userid/pw'+userid+userpw);
datastring = datastring + '&header=0&global=0&ctl='+ctl+'&vw='+vw+'&username='+username+'&email='+email;
// alert(datastring);
 $.ajax({
  type: "GET",
  async: false,
  url: function_name,
  cache: false,
  data: datastring,
  success: function(msg){
        msg=cleantext(msg);
        //alert('alert1='+msg);
        var n=msg.split("|");
        verified=n[1];
        }
       });
verified=verified;

if (verified > 0)
  {
    $('#forgotmsg').html('Please check your email for your username and password!');
    }
  else
  {
    //alert('Invalid username and/or email address');
    $('#forgotmsg').html('Invalid username and/or email address!');
    }
}
