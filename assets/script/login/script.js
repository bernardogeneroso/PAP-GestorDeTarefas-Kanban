//Login - Script

var count = 1;
var count_ajuda = 0; 

//function - Verificação do email
function validacaoEmail(email) {
	var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return emailReg.test(email); //o test retorna true se encontrar o parametro pretentido
}

function loginOlho(){
	if ( $('.fa-eye').css('display') != 'none') {
		$('.fa-eye').hide();
		var count = 1;
	} else {
		$('.fa-eye-slash').hide();
		var count = 2;
	}
	setTimeout(function(){ 
		$('#span-info-login').empty();
		if(count == 2){
			$('.fa-eye-slash').show();
		} else if(count == 1) {
			$('.fa-eye').show();
		}
	}, 3000);
}

function registoOlho(){
	if ( $('.fa-eye').css('display') != 'none') {
		$('.fa-eye').hide();
		var count = 1;
	} else {
		$('.fa-eye-slash').hide();
		var count = 2;
	}
	setTimeout(function(){ 
		$('#span-info-registar').empty();
		if(count == 2){
			$('.fa-eye-slash').show();
		} else if(count == 1) {
			$('.fa-eye').show();
		}
	}, 3000);
}

function notificationTopRight() {
	//Estilo das Notifications
	toastr.options = {
	  "closeButton": false,
	  "debug": true,
	  "newestOnTop": true,
	  "progressBar": false,
	  "positionClass": "toast-top-right",
	  "preventDuplicates": true,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "5000",
	  "timeOut": "5000",
	  "extendedTimeOut": "5000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
}

$(window).on('load',function(){
	$('.fa-eye').hide();
	$('.fa-eye-slash').show();
});

//Animação
$('.clickAlteraForm').click(function(){
	$('form').animate({height: "toggle", opacity: "toggle"}, "slow"); //na funcção selecionada ele faz animação apresentada no código
}); //função de animação

$(document).ready(function(){
	$('.fa-eye-slash').click(function(){
		$('.fa-eye').show();
		$('.fa-eye-slash').hide();
		$('.changetype').attr('type', 'text');
	});
	$('.fa-eye').click(function(){
		$('.fa-eye').hide();
		$('.fa-eye-slash').show();
		$('.changetype').attr('type', 'password');
	});


	$('input[name="email"]').focus();
	$('#login-alteracao').click(function(){
		$('input[name="utilizador_registo"]').focus();
	});
	/*$('#registar-alteracao').click(function(){
		$('input[name="email"]').focus();
	});*/
	//Botão de Login efeitos
	$('input[name="password"]').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        $('#login').click();  
	    }
	});
	$('input[name="password_confirm"]').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        $('#registar').click();  
	    }
	});
	//Login - BTN - Ajax
	$('#login').on('click', function(){
		var email = $('input[name="email"]').val(); //recolher valor
		var password = $('input[name="password"]').val(); //recolher valor
		var darkmodechange = $('input[name="darkmode"]').val();
		var text_length = $('input[name="password"]').val().length;

		if(email == '' || password == ''){ //se os dois campos tiverem vazios apresenta este código
			$('input[name="email"]').focus();
			$('#span-info-login').css('display','block').html('<p style="color: #FF7274">Campos vazios</p>'); //utilizo uma função de css para mostrar o span //mostra mensagem de erro
			loginOlho();
		} else if(!validacaoEmail(email)){
			$('input[name="email"]').focus();
			$('#span-info-login').css('display','block').html('<p style="color: #FF7274">O formato do email está incorrecto</p>'); //utilizo uma função de css para mostrar o span //mostra mensagem de erro
			loginOlho();
		} else if(text_length < 6){
			$('input[name="password"]').focus();
			$('#span-info-login').css('display','block').html('<p style="color: #FF7274">A password precisa de ter no minímo 6 caracteres</p>'); //utilizo uma função de css para mostrar o span //mostra mensagem de erro
			loginOlho();
		} else {
			$.ajax({ //chama o ajax
				url: 'login', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'JSON',
				data: { //os dados que passar pelo POST
					login: 1, //estado do login
					emailPHP: email,
					passwordPHP: password,
					darkmodePHP: darkmodechange
				},
				success: function(resposta){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento			
					if(resposta[0] == 2){ //vejo se a resposta atríbuida foi 'Login bem sucedido', se sim faz o código
						window.location = 'index'; //redireciono  para a página do index.php
					} else if(resposta[0] == 0) {
						notificationTopRight()
						toastr["error"]("Login incorrecto", "Error");
						$('#span-info-login').css('display','block').html(resposta[1]); //apresento a resposta
						loginOlho();
					}
				}
			});
		}
	});
	//Registar - BTN - Ajax
	$('#registar').on('click', function(){
		var utilizador = $('input[name="utilizador_registo"]').val(); //recolher valor
		var email = $('input[name="email_registo"]').val(); //recolher valor
		var password = $('input[name="password_registo"]').val(); //recolher valor
		var password_confirm = $('input[name="passwordconfirm_registo"]').val(); //recolher valor
		var text_length_password = $('input[name="password_registo"]').val().length;

		if(password != password_confirm){
			$('input[name="password_registo"]').focus();
			$('#span-info-registar').css('display','block').html('<p style="color: #FF7274">As palavra passes são diferentes</p>'); //apresento a resposta
			registoOlho();
		}else if(utilizador == '' || email == '' || password == '' || password_confirm == ''){ //se os dois campos tiverem vazios apresenta este código
			$('input[name="utilizador_registo"]').focus();
			$('#span-info-registar').css('display','block').html('<p style="color: #FF7274">Verifique os campos</p>'); //utilizo uma função de css para mostrar o span
			 //mostra mensagem de erro
			registoOlho();
		} else if(!validacaoEmail(email)){
			$('input[name="email_registo"]').focus();
			$('#span-info-registar').css('display','block').html('<p style="color: #FF7274">O formato do email está incorrecto</p>'); //utilizo uma função de css para mostrar o span //mostra mensagem de erro
			registoOlho();
		} else if(text_length_password <= 5){
			$('input[name="utilizador_registo"]').focus();
			$('#span-info-registar').css('display','block').html('<p style="color: #FF7274">A palavra-passe precisa de ter mais que 6 caracteres</p>'); //utilizo uma função de css para mostrar o span //mostra mensagem de erro
			registoOlho();
		} 
		else { //se não entra neste código
			toastr["info"]("A verificar os dados", "Informação");
			$('#span-info-registar').css('display','block').html('<p style="color: #17a2b8">A verificar os dados</p>');
			$.ajax({ //chama o ajax
			url: 'login', //link para redirecionamento dá página
			method: 'POST', //o método
			data: { //os dados que passar pelo POST
				loginRegisto: 1, //estado do login
				utilizadorRegistoPHP: utilizador,
				emailRegistoPHP: email,
				passwordRegistoPHP: password
			},
			success: function(resposta){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento
				if(resposta[0] != 0){
					notificationTopRight()
					toastr["info"]("Confirme o seu email", "Informação");
					$('#span-info-registar').css('display','block').html(resposta[1]); //apresento a resposta
					registoOlho();
					setTimeout(function(){ 
						$('#registar-alteracao').click();
						$('input[name="utilizador_registo"]').val('')
						$('input[name="email_registo"]').val('')
						$('input[name="password_registo"]').val('')
						$('input[name="passwordconfirm_registo"]').val('')
					}, 5000);
				} else{
					notificationTopRight()
					toastr["error"]("Email já em uso", "Error");
					$('#span-info-registar').css('display','block').html(resposta[1]); //apresento a resposta
					registoOlho();
					$('input[name="email_registo"]').val('').focus()
					$('input[name="password_registo"]').val('')
					$('input[name="passwordconfirm_registo"]').val('')	
				}
			},
				dataType: 'JSON' //tipo de dados no transporte
			});
		}
	});
	$('#darkmodeID').click(function(){
		$(".body-class").toggleClass("darkmode");
		if(count == 1){
			$('input[name="darkmode"]').val('1');
			$('.fa-question').css({'background-color': '#323639'});
			count = 0;
		} else {
			$('input[name="darkmode"]').val('0');
			$('.fa-question').css({'background-color': '#F2F2F2'});
			count = 1;
		}
	});

	$('.fa-adjust').mouseover(function() {
        $(this).stop(true, true).animate({opacity: 0.5}, 500);
      });
    $('.fa-adjust').mouseout(function() {
        $(this).stop(true, true).animate({opacity: 1}, 500);
      });

    $('.fa-question').mouseover(function() {
    	$(this).css({'background-color': '#0074E1', 'color': 'white'});  	
    });
    $('.fa-question').mouseout(function() {
    	if(count == 0){
    		$(this).css({'background-color': '#323639', 'color': '#0074E1'});
    	} else {
    		$(this).css({'background-color': '#F2F2F2', 'color': '#0074E1'});
    	}   
    });
    $('.fa-question').click(function(){
    	if(count_ajuda == 0){
			//
			$('.fa-envelope').fadeOut("slow").fadeIn("slow").attr('title','Nesta caixa de texto coloque o seu email').fadeOut("slow").fadeIn("slow");
			$('.fa-lock').fadeOut("slow").fadeIn("slow").attr('title','Nesta caixa de texto coloque a sua password, no lado direito da caixa o olho irá ajudá-lo').fadeOut("slow").fadeIn("slow");
			$('.fa-eye-slash').fadeOut("slow").fadeIn("slow").attr('title','O olho facilita a inserção da password, tenha cuidado com as pessoas a sua volta poderam ver o que esta escrevendo').fadeOut("slow").fadeIn("slow");
			$('#login').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar poderá fazer Login na Work4thenoob').fadeOut("slow").fadeIn("slow");
			$('.fa-adjust').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar neste botão irá ativar o modo darkmode, exprimente vai gostar').fadeOut("slow").fadeIn("slow");
			$('.fa-user').fadeOut("slow").fadeIn("slow").attr('title','Nesta caixa de texto coloque o nome de utilizador').fadeOut("slow").fadeIn("slow");
			$('#registar').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar irá ser registado na Work4thenoob').fadeOut("slow").fadeIn("slow");
			//

			$.ajax({ //chama o ajax
				url: 'ajax/modoajuda', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					modoAjudaPHP: 1,
					ajuda: 1
				}
			})

			notificationTopRight();
			toastr["info"]('Modo ajuda ativado!', "Informação");
			count_ajuda = 1;
    	} else {
    		//
    		$('.fa-envelope').removeAttr('title');
    		$('.fa-lock').removeAttr('title');
    		$('.fa-eye-slash').removeAttr('title');
    		$('#login').removeAttr('title');
    		$('.fa-adjust').removeAttr('title');
    		$('.fa-user').removeAttr('title');
    		$('#registar').removeAttr('title');
    		//

    		$.ajax({ //chama o ajax
				url: 'ajax/modoajuda', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					modoAjudaPHP: 1,
					ajuda: 0
				}
			})

    		notificationTopRight();
			toastr["info"]('Modo ajuda desativado!', "Informação");
			count_ajuda = 0;
    	}	
	});
	
	$('#alterarsenha').click(function() { //por fazer
		$.ajax({ //chama o ajax
			url: 'alterarpassowrdinlogin', //link para redirecionamento dá página
			method: 'POST', //o método
			data: { //os dados que passar pelo POST
				update: 1
			},
			success: function(resposta){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento
				if(resposta[0] != 0){
					$('#span-info-registar').css('display','block').html(resposta[1]); //apresento a resposta
					registoOlho();
				} else{
					$('#span-info-registar').css('display','block').html(resposta[1]); //apresento a resposta
					registoOlho();		
				}
			},
				dataType: 'JSON' //tipo de dados no transporte
		});
	})
	
	$(document).on('click', '#continuarAlterarSenha', function(){
		if(!validacaoEmail($('input[name="emailAlterarpass"]').val())){
			$('#mensagemAlterarSenha').html('<p style="color: #FF7274">Formato do email incorrecto</p>')
		} else {
			$('#mensagemAlterarSenha').html('<p style="color: green">Foi enviado para o seu email o próximo passo</p>')
			$.ajax({ //chama o ajax
				url: 'ajax/sendemailparaalterarsenha', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'JSON',
				data: { //os dados que passar pelo POST
					update: 1,
					email: $('input[name="emailAlterarpass"]').val()
				}
			});
		}
	})

	$('input[name="password_registo"], input[name="passwordconfirm_registo"], input[name="password"]').bind("cut copy paste",function(e) {
		e.preventDefault();
	});
});