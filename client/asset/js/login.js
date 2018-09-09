let base_url = 'http://localhost:3000'


$("#login").click(function() {
    $(".message").css("transform", "translateX(0)");
    if ($(".message").hasClass("login")) {
      $(".message").removeClass("signup");
    }
    $(".message").addClass("login");
  });

$("#signup").click(function() {
    $(".message").css("transform", "translateX(100%)");
    if ($(".message").hasClass("login")) {
      $(".message").removeClass("login");
    }
    $(".message").addClass("signup");
  });


  function signup(params) {
      let name = $('#name').val()
      let email = $('#email').val()
      let password = $('#password').val()
      let city = $('#city').val()
      if (!name || !email || !password || !city) {
          swal("Ooops", "All form is required!", "error");
      } else {
          $.ajax({
              method: 'POST',
              url: base_url,
              data: {
                  name: name,
                  email: email,
                  password: password,
                  city: city
              }
          })
              .done(() => {
                  swal("register succes", "please login to acces web", "success");
              })

              .fail(() => {
                  swal("Ooops", `email is already in use`, "error");
              })

      }
  }

  function signin() {
      let email = $('#email1').val()
      let password = $('#password1').val()

      if(!email || !password){
          swal("Ooops", "All form is required!", "error");
      }else{
          $.ajax({
              method: 'POST',
              url: base_url +'/signin',
              data: {
                  email: email,
                  password: password
              }
          })
          .done(result => {
              swal("login succes");
              localStorage.setItem('token', result.token)
              window.location = 'index.html'
          })
          .fail(err => {
              swal("Ooops", `${err.responseJSON.msg}`, "error");
          })
      }
  }

  window.fbAsyncInit = function () {
    FB.init({
        appId: '432108987313376',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        $.ajax({
            method: 'POST',
            url: base_url +'/signin/facebook',
            data: {
              token : response.authResponse.accessToken
            }
        })
        .done((result) => {
          localStorage.setItem('token', result.token)
          window.location = 'index.html'
        })
        .fail((err) => {
          console.log(err);
          
        })
    });
}

  

  