var count;

function desactiveBoard() {
	$('input[name="boardName"]').val('');
	$('input[name="cor"]').prop('checked',false);
	$('input[name="imagem"]').prop('checked',false);
	$('#color-picker2').val('');
	$('input[name="fileBoard"]').val('');
	$('#corDIV').hide();
	$('#imagemDIV').hide();
	$('#color-picker2').css('background-color','white');
}

function notification() {
	//Estilo das Notifications
	toastr.options = {
		"closeButton": false,
		"debug": true,
		"newestOnTop": true,
		"progressBar": false,
		"positionClass": "toast-top-center",
		"preventDuplicates": true,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "2500",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	  }
}

//function - Verificação do email
function validacaoEmail(email) {
	var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return emailReg.test(email); //o test retorna true se encontrar o parametro pretentido
}

$('#accountForm').submit(function(e){
	e.preventDefault();
});

$(window).on('load', function(){
	$('#board').click();
});
$('#board').click();
$(document).ready(function(){
	$('.logout').click(function(){
		window.location = 'assets/logout';
	});

	$('#popUPbtn').click(function(){
		$('.popDiv').fadeToggle();
	});

	$('#board').click(function(){
		$('#darkmodecss').css('margin-left','0px');
		$('.fa-home').css('color','#0074E1');
		$('.fa-cog').css('color','white');
		$('.fa-user').css('color','white');
		$('.fa-user-friends').css('color','white');
		$('#boardDIV').show();
		$('#definitionDIV').hide();
		$('#accountDIV').hide();
		$('#friendDIV').hide();
		$('#imgEstilo').fadeIn();
		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			$('.ativarFormulario').click()
		}
		$('#board').css({
			'color': '#008ce3'
		});
		$('#account').removeAttr('style');
		$('#friend').removeAttr('style');
		$('#definition').removeAttr('style');
	});
	$('#definition').click(function(){	
		$('.fa-home').css('color','white');
		$('.fa-cog').css('color','#0074E1');
		$('.fa-user').css('color','white');
		$('.fa-user-friends').css('color','white');
		$('#boardDIV').hide();
		$('#definitionDIV').show();
		$('#accountDIV').hide();
		$('#friendDIV').hide();
		$('#imgEstilo').fadeIn();
		$('#darkmodecss').css('margin-left','0px');
		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			$('.ativarFormulario').click()
		}
		$('#definition').css({
			'color': '#008ce3'
		});
		$('#account').removeAttr('style');
		$('#friend').removeAttr('style');
		$('#board').removeAttr('style');
	});

	$('#friend').click(function(){	
		$('.fa-home').css('color','white');
		$('.fa-cog').css('color','white');
		$('.fa-user-friends').css('color','#0074E1');
		$('.fa-user').css('color','white');
		$('#boardDIV').hide();
		$('#definitionDIV').hide();
		$('#friendDIV').show();
		$('#accountDIV').hide();
		$('#imgEstilo').fadeIn();
		$('#darkmodecss').css('margin-left','0px');	
		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			$('.ativarFormulario').click()
		}
		$('#friend').css({
			'color': '#008ce3'
		});
		$('#account').removeAttr('style');
		$('#definition').removeAttr('style');
		$('#board').removeAttr('style');
	});

	$(document).on('click', '#account', function(){
		$('.fa-home').css('color','white');
		$('.fa-cog').css('color','white');
		$('.fa-user').css('color','#0074E1');
		$('.fa-user-friends').css('color','white');
		$('#boardDIV').hide();
		$('#definitionDIV').hide();
		$('#friendDIV').hide();
		$('#accountDIV').show();
		$('#darkmodecss').hide();
		$('#imgEstilo').fadeOut(function(){
			$('#darkmodecss').show();
			$('#darkmodecss').css('margin-left','20px');
		});
		$('#account').css({
			'color': '#008ce3'
		});
		$('#friend').removeAttr('style');
		$('#definition').removeAttr('style');
		$('#board').removeAttr('style');

		$.ajax({
			type:'post',
			url:'ajax/account',
			dataType: 'json',
			data: {update: 1},
			success: function(data){
				var session = {};
				$.each(data,function(i,value){
					session[i] = value;
				});
				$('input[name="utilizador"]').val(session[0][0]);
				$('input[name="email"]').val(session[0][1]);
				$('input[name="pnome"]').val(session[0][2]);
				$('input[name="lnome"]').val(session[0][3]);
			}
		});

		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			$('.ativarFormulario').click()
		}
	});

	$(document).on('click', '#guardarIMG', function(e){
		e.preventDefault();

		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			if($('#file').val() != ''){
				var fd = new FormData();
				var files = $('#file')[0].files[0];
				fd.append('file',files);

				$.ajax({
					type: 'POST',
					url: 'ajax/uploadimagem',
					dataType: 'JSON',
					data: fd,
					contentType: false,
					processData: false,
					success: function(resposta){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento			
						if(resposta[0] == 1){
							toastr["error"](resposta[1], "Error");
						}else {
							$('#imgEstiloConta').attr('src',resposta);
							$('#imgEstilo').attr('src',resposta);
							toastr["success"]("Imagem alterada com sucesso", "Sucesso");
						}	
						$('#file').val('');
						$('#guardarIMG').val('Alterar imagem');
					}, error: function(data) { 
						console.log(data)
						toastr["error"]("Erro", "Error");
					}
				});
			} else {
				$('#file').click();
				$('#guardarIMG').val('Aplique a imagem selecionada');
				toastr["success"]("Aplique a imagem", "Sucesso");
			}
		}   
	});

	$(document).on('click', '#imgEstiloConta', function(){
		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			$('#file').click();
		}
	});
	$(document).on('click', '#imgEstilo', function(){
		$('#account').click();
	});

	$(document).on('click', '#alterarPASS', function(){
		var passwordpop = $('.popDiv input[name="passwordPOP"]').val();
		var passwordpopconfirm = $('.popDiv input[name="passwordPOPconfirm"]').val();
		
		$.ajax({ //chama o ajax
			url: 'ajax/alterarpassword', //link para redirecionamento dá página
			method: 'POST', //o método
			data: { //os dados que passar pelo POST
				editarPassword: 1, //estado do login
				passwordpopPHP: passwordpop,
				passwordpopconfirmPHP: passwordpopconfirm
			},
			success: function(data){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento			
				if(data == 'Alteração bem sucedida!'){
					$('.popDiv').fadeOut();
					notification();
					toastr["success"](data, "Sucesso");
				} else {
					$('.popDiv').css('height', "215px");
					$('#spanPOPinfo').css('display','block').html('<p style="color: #FF7274">'+data+'</p>');
					$('.popDiv input[name="passwordPOP"]').focus();
					setTimeout(function(){ 
						$('#spanPOPinfo').hide();
						$('.popDiv').css('height', "195px");
					}, 3000);
					notification();
					toastr["error"](data, "Erro");		
				}			
			},
				dataType: 'text' //tipo de dados no transporte
		});
	});

	$(document).on('click', '.closePOP', function(){
		$('.popDiv').fadeOut();
	});

	/*$(document).on('click', '.middleADD', function(){
		$('#modalFriendAdd').modal({
			show: 'true'
		}); 
	});*/

	$(document).on('click', '.closePOP', function(){
		$('.modalPOPBoard').css('display','none');
	});

	$(document).on('click', 'input[name="cor"]', function(){
		if ($('input[name="cor"]').prop('checked') == true) {
			$('#color-picker2').show();
			$('#color-picker2').css('background-color','white');
			$('#fileBoard').val('');
			$('.modalConteudoBoard').css('height','318px');   
			$('input[name="imagem"]').prop('checked',false);	
			$('#imagemDIV').hide();
	       	$('#corDIV').show();       	   	
	       	$('.hr').css('margin-bottom','12px');
	       	if(count == 1 || count == 2){
	       		$('#submeterboardedit').show();
	       		$('#submeterboardedit').css('margin-top','-6px');
	       	} else {
	       		$('#submeterboardadd').show();
				$('#submeterboardadd').css('margin-top','-6px');
	       	}
	    } else {
	    	$('#submeterboardadd').css('margin-top','0px');
	    	$('#submeterboardadd').hide();
	    	$('#submeterboardedit').css('margin-top','0px');
	    	$('#submeterboardedit').hide();
	    	$('.modalConteudoBoard').css('height','235px');
	        $('#corDIV').hide();
	    }
	});
	
	$("#color-picker2").hexColorPicker({
  		"container":"dialog",
	});
	  
	$("#color-picker3").hexColorPicker({
		"container":"dialog",
	});

	$(document).on('click', '#submeterboardadd', function(){
		//por fazer verificações
		var boardnome = $('input[name="boardName"]').val();
		var boardcolor = $('#color-picker2').val();

		var friendAssociateBoard = []
		var count = 0;
		$('.checkBoardAdd').each(function(){
			if($(this).attr('data-ativo') == 1){
				friendAssociateBoard.push($(this).data('index'))
			}
			++count
		});

		console.log(friendAssociateBoard)

		$.ajax({ //chama o ajax
			url: 'ajax/addboard', //link para redirecionamento dá página
			method: 'POST', //o método
			//data: fd,
			data: {
				update: 1,
				boardnome: boardnome,
				boardcolor: boardcolor,
				friendAssociateBoard: friendAssociateBoard
			},
			success: function(data){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento			
					console.log(data)
					$('#middleADD').remove();
					$('.addBoardRow').append(''+
						'<div class="card cardBoard mr-2 mt-2 ml-2" style="background-color:'+data[0]+'">'+
							'<div class="card-body card-for-board-body" data-id="'+data[1]+'">'+
								'<div class="clickBoardRedirect" style="height: 90%;cursor:pointer">'+
									'<div class="card-title selectDesactive" id="nomeBoard">'+data[2]+'</div>'+
								'</div>'+
								'<div id="takeValue" class="divBoardOption selectDesactive" style="cursor:pointer">'+
									'<i class="far fa-edit editBoard mr-1" data-toggle="modal" data-target="#modalEditBoard"></i>'+
									'<i class="far fa-trash-alt removeBoard"></i>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div id="middleADD" class="col-2 middleADD mr-1 mt-2 ml-1" data-toggle="modal" data-target="#addBoardModal">'+
							'<i class="fa fa-plus-circle addboard fa-5x"></i>'+
						'</div>');
					$('#closeboardadd').click()
					
					//limpeza board
					$('input[name="boardName"]').val('')
					$('#color-picker2').val('').css('background-color','#fff')
					$('.checkBoardAdd').each(function(){
						if($(this).data('ativo') == 1){
							$(this).click();
						}
						++count
					});
			    	//
			    	notification();
					toastr["success"]('Board adicionada!', "Sucesso");	
			},
				dataType: 'json' //tipo de dados no transporte
		});
	});

	$(document).on('click', '.removeBoard', function(){
		var myId = $(this).parent().parent().data('id');

		if(confirm('Deseja apagar a Board?')) {
			$.ajax({
				type:"Post",
				url:"ajax/deleteboardsettings",
				data:{
					delboardset: 1,
					Id:myId,
				},
				success: function(){
					$('[data-id='+myId+']').parent().remove();
					notification();
					toastr["success"]('Board apagada com sucesso!', "Sucesso");
				}
			});
    	}
	});

    $(document).on('click', '.editBoard', function(){
		var myId = $(this).parent().parent().data('id');

    	//limpeza de campos
		$('input[name="boardNameEdit"]').val('')
		$('#color-picker3').val('').css('background-color','#fff')
		$('.gestorMembrosRow').html('')
		//
		
		$('.bodyCleanEditBoard').css('background-color', '')
   
      $.ajax({
         type:"POST",
         url:"ajax/editboardsettings",
         dataType:'json',
         data:{
         	 editboardset: 1,
             Id:myId,
         },
         success: function(data){
			 console.log(data)
			var editBoard = {};
         	$.each(data,function(i,value){
				editBoard[i] = value;
			});
			console.log(editBoard)

			for (i = 0; i < editBoard[3].length; i++) {
				for (x = 0; x < editBoard[2].length; x++) {
					var found = editBoard[2][x].includes(editBoard[3][i][0]);
					if(found){
						break;
					}
				}
				if(found){
					$('.gestorMembrosRow').append('<div class="col-1" style="margin-right:6px"><img src="'+editBoard[3][i][2]+'" class="checkBoardAddEdit" style="height: 40px;width: 40px;border-radius:50%;opacity: 0.5;object-fit: cover;" data-index="'+editBoard[3][i][3]+'" data-ativo="1" title="Utilizador: '+editBoard[3][i][0]+' | Email: '+editBoard[3][i][1]+'" alt="Pedimos desculpa pelo o erro"><span><i class="fas fa-check" style="display:block"></i></span></div>')
				} else {
					$('.gestorMembrosRow').append('<div class="col-1" style="margin-right:6px"><img src="'+editBoard[3][i][2]+'" class="checkBoardAddEdit" style="height: 40px;width: 40px;border-radius:50%;object-fit: cover;" data-index="'+editBoard[3][i][3]+'" data-ativo="0" title="Utilizador: '+editBoard[3][i][0]+' | Email: '+editBoard[3][i][1]+'" alt="Pedimos desculpa pelo o erro"><span><i class="fas fa-check" style="display:none"></i></span></div>')
				}
			}

			$('#modalEditBoardNameFriend > a').text(editBoard[0])
			$('input[name="boardNameEdit"]').val(editBoard[0])
			$('#color-picker3').val(editBoard[1]).css('background-color', editBoard[1])
			$('input[name="idBoardEditFriend"]').attr('data-id', myId)

         	var editBoard = {};
         }
      });
	});

	$(document).on('keyup', '.boardNameEdit', function() {
		$('#modalEditBoardNameFriend > a').text($(this).val())
	});
	
	$(document).on('click', '#submetereditBoard', function(){
		var nomeBoard = $('input[name="boardNameEdit"]').val()
		var colorBoard = $('#color-picker3').val()
		var idBoard = $('input[name="idBoardEditFriend"]').attr('data-id')

		var friendAssociateBoard = []
		$('.checkBoardAddEdit').each(function(){
			friendAssociateBoard.push([$(this).data('index'), parseInt($(this).attr('data-ativo'))])
			++count
		});

		$.ajax({
			type:"POST",
			url:"ajax/editboard",
			dataType:'text',
			data:{
				update: 1,
				nomeBoard: nomeBoard,
				colorBoard: colorBoard,
				friendAssociateBoard: friendAssociateBoard,
				idBoard: parseInt(idBoard)
			}, success: function () {
				$('[data-id="'+idBoard+'"] > div:eq(0) div').text(nomeBoard)
				$('[data-id="'+idBoard+'"]:has(div)').css('background-color', colorBoard+' !important').parent().css({'border': '1px solid rgba('+colorBoard+',.125)','background-color': colorBoard+' !important'})
				$('#submetereditBoardclose').click();
			}
		})
	});

	$('.fa-adjust').click(function(){
		$.ajax({ //chama o ajax
			url: 'ajax/darkmodecheck', //link para redirecionamento dá página
			method: 'POST', //o método
			dataType: 'text',
			data: { //os dados que passar pelo POST
				darkmodeAccount: 1 //estado do login
			},
			success: function(){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento			
				$(".body-class").toggleClass("darkmode");
				if($(".changeDarkmode").hasClass('navbar-light') == true){
					$(".changeDarkmode").removeClass('navbar-light').removeClass('bg-light').addClass('navbar-dark bg-dark')
					$('#darkmodeID').css('background-color', '#343A40 !important')
					darkmodecheck = 1
					notification();
					toastr["info"]('Modo escuro ativado', "Informação");
				} else {
					$(".changeDarkmode").removeClass('navbar-dark').removeClass('bg-dark').addClass('navbar-light bg-light')
					$('#darkmodeID').css('background-color', '')
					darkmodecheck = 0
					notification();
					toastr["info"]('Modo escuro desativado', "Informação");
				}
			}
		});	  
	});

	$('.fa-adjust').mouseover(function() {
        $(this).stop(true, true).animate({opacity: 0.5}, 500);
      });
    $('.fa-adjust').mouseout(function() {
        $(this).stop(true, true).animate({opacity: 1}, 500);
      });

	$(document).on('click', '.clickBoardRedirect', function(){
		var myId = $(this).parent().data('id');
		
    	$.ajax({ //chama o ajax
			url: 'boardsettings', //link para redirecionamento dá página
			method: 'POST', //o método
			dataType: 'text',
			data: { //os dados que passar pelo POST
				clickBoard: 1, //estado do login
				idBoardClick: myId
			},
			success: function(data){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento			
				console.log(data)
				window.location = data;
			},error: function(data) { 
				console.log(data)
			}
		});
    });
    $('#switchesHelpMod').click(function(){
    	if($(this).prop('checked')){
    		$('#darkmodeID').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar neste botão irá ativar o modo darkmode, exprimente vai gostar').fadeOut("slow").fadeIn("slow");
    		$('.fa-home').fadeOut("slow").fadeIn("slow").attr('title','Página das Boards').fadeOut("slow").fadeIn("slow");
    		$('.fa-cog').fadeOut("slow").fadeIn("slow").attr('title','Definições da página').fadeOut("slow").fadeIn("slow");
    		$('.fa-user').fadeOut("slow").fadeIn("slow").attr('title','As suas informações').fadeOut("slow").fadeIn("slow");
    		$('.fa-sign-out-alt').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar neste botão irá ser terminada a sua sessão').fadeOut("slow").fadeIn("slow");
    		$('#imgEstilo').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar, irá ser redirecionado para uma página com os seus dados').fadeOut("slow").fadeIn("slow");
    		$('.clickBoardRedirect').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar irá ser redirecionado para a página dessa board especifíca').fadeOut("slow").fadeIn("slow");
    		$('.editBoard').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar poderá editar a sua board').fadeOut("slow").fadeIn("slow");
    		$('.removeBoard').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar a board será removida, não se preocupe, precisa de confirmar a eliminação da mesma').fadeOut("slow").fadeIn("slow");
    		$('.middleADD').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar poderá adicionar as boards pretentidas').fadeOut("slow").fadeIn("slow");
			$('#board').fadeOut("slow").fadeIn("slow").attr('title','Nesta categoria poderá encontrar as boards, que poderá organizar os seus projetos na criação de boards').fadeOut("slow").fadeIn("slow");
			$('#account').fadeOut("slow").fadeIn("slow").attr('title','Na categoria conta, pode gerir os seus dados da sua conta').fadeOut("slow").fadeIn("slow");
			$('#friend').fadeOut("slow").fadeIn("slow").attr('title','Na categoria de amigos, pode gerir os seus amigos, como adicionar/remover e por último pedir amizades').fadeOut("slow").fadeIn("slow");
			$('#definition').fadeOut("slow").fadeIn("slow").attr('title','Na categoria das definições pode ajustar as definições da sua conta ao seu gosto').fadeOut("slow").fadeIn("slow");
			$('.ativarFormulario').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar será ativado os campos em baixo, para puderem ser editados').fadeOut("slow").fadeIn("slow");
			$('[data-target="#formchangepasswordmodal"]').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar poderá alterar a password, seguinte os precessos pedidos').fadeOut("slow").fadeIn("slow");
			$('.adicionarAmigoModal').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar poderá adicionar novos amigos').fadeOut("slow").fadeIn("slow");
			$('.removerAmizade').fadeOut("slow").fadeIn("slow").attr('title','Ao clicar poderá remover a sua amizade').fadeOut("slow").fadeIn("slow");
			$('input[name="email"], input[name="utilizador"], input[name="pnome"], input[name="lnome"]').fadeOut("slow").fadeIn("slow").attr('title','Para os dados serem guardados tire o focus do campo').fadeOut("slow").fadeIn("slow");

			$.ajax({ //chama o ajax
				url: 'ajax/modoajuda', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					modoAjudaPHP: 1,
					ajuda: 1
				}
			});

			$('#boardsName').text('Boards - Modo ajuda ativado');
			$('#definicoesName').text('Definições - Modo ajuda ativado');
			$('#contaName').text('Conta - Modo ajuda ativado');

			notification();
			toastr["info"]('Modo ajuda ativado!', "Informação");
    	} else {
    		$('#darkmodeID').removeAttr('title');
    		$('.fa-home').removeAttr('title');
    		$('.fa-cog').removeAttr('title');
    		$('.fa-user').removeAttr('title');
    		$('.fa-sign-out-alt').removeAttr('title');
    		$('#imgEstilo').removeAttr('title');
    		$('.clickBoardRedirect').removeAttr('title');
    		$('.editBoard').removeAttr('title');
    		$('.removeBoard').removeAttr('title');
			$('.middleADD').removeAttr('title');
			$('#board').removeAttr('title');
			$('#account').removeAttr('title');
			$('#friend').removeAttr('title');
			$('#definition').removeAttr('title');
			$('.ativarFormulario').removeAttr('title');
			$('[data-target="#formchangepasswordmodal"]').removeAttr('title');
			$('.adicionarAmigoModal').removeAttr('title');
			$('.removerAmizade').removeAttr('title');
			$('input[name="email"], input[name="utilizador"], input[name="pnome"], input[name="lnome"]').removeAttr('title');

    		$.ajax({ //chama o ajax
				url: 'ajax/modoajuda', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					modoAjudaPHP: 1,
					ajuda: 0
				}
			});

			$('#boardsName').text('Boards');
			$('#definicoesName').text('Definições');
			$('#contaName').text('Conta');

    		notification();
			toastr["info"]('Modo ajuda desativado!', "Informação");
    	}
	});
	
	$(document).on('click', '.adicionarAmigoModal', function() {  
		$('input[name="search"]').val('')
		$('#mensagemfriend').html('')
	})

	var darkmodecheck = 0
    if($('input[name="modoajuda"]').val() == 1){
    	$('#switchesHelpMod').click();
	}
	

	$(document).on('click', '.aceitarPedidoDeAmizade', function() { 
		var id = $(this).parent().attr('data-index')
		var lengthVal = $('.aceitarPedidoDeAmizade').length
		
		if(parseInt(lengthVal) == 1){
			$(this).parent().parent().parent().parent().remove()
		} else {
			$(this).parent().parent().remove()
		}

		var imgUrl = $(this).parent().find('img').attr('src')
		var arrayTitle = $(this).parent().find('img').attr('title').split(' ')
		var username = arrayTitle[4]
		var email = arrayTitle[1]
		var index = $(this).parent().attr('data-index')
		

		$.ajax({ //chama o ajax
			url: 'ajax/aceitarpedidodeamizade', //link para redirecionamento dá página
			method: 'POST', //o método
			dataType: 'text',
			data: { //os dados que passar pelo POST
				update: 1,
				id: id
			}, success: function(data){
				$('.cardShowFriendRow').append(''+
				'<div class="col-sm mt-2">'+
					'<div class="card cardfriend body-class '+data+'">'+
						'<img class="card-img-top pedidoamizadeRemoveFromSearch" src="'+imgUrl+'" alt="Pedimos desculpa pelo o erro" style="max-width: 12pc;max-height: 12pc;">'+
						'<div class="card-body">'+
							'<h5 class="card-title">'+username+'</h5>'+
							'<p class="card-text">Email: '+email+''+
						'</p></div>'+
						'<a href="#" class="btn btn-danger removerAmizade" data-index="'+index+'" style="margin: 6px;">Remover amizade</a>'+
					'</div>'+
				'</div>')
			}
		});
	})

	$(document).on('click', '.cancelarPedidoDeAmizade', function() { 
		var id = $(this).parent().attr('data-index')
		var lengthVal = $('.aceitarPedidoDeAmizade').length
		
		if(parseInt(lengthVal) == 1){
			$(this).parent().parent().parent().parent().remove()
		} else {
			$(this).parent().parent().remove()
		}

		$.ajax({ //chama o ajax
			url: 'ajax/cancelarpedidodeamizade', //link para redirecionamento dá página
			method: 'POST', //o método
			dataType: 'text',
			data: { //os dados que passar pelo POST
				update: 1,
				id: id
			}
		});
	})
	
	$('#result').on('click', 'li', function() {
		var click_text = $(this).text().split('|');
		var index = $(this).data('index');
		$('#search').val($.trim(click_text[0]));
		$('#search').attr('data-index', index)
		$("#result").html('');
	});

	$('#addNewAmigo').click(function(){
		if($('input[name="search"]').val() == '') {
			$('#mensagemfriend').html('<p class="mt-2" style="color: #FF7274;margin:0">Campo vazio</p>')
			$('input[name="search"]').focus()
		} else if(!validacaoEmail($('input[name="search"]').val())){
			$('#mensagemfriend').html('<p class="mt-2" style="color: #FF7274;margin:0">Email formato incorrecto</p>')
			$('input[name="search"]').focus()
		} else {
			$.ajax({ //chama o ajax
				url: 'ajax/enviarpedidodeamaizade', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					update: 1,
					emailamigo: $('input[name="search"]').val()
				}, success: function(data) {
					if(data == 2){
						$('#mensagemfriend').html('<p class="mt-2" style="color: #FF7274;margin:0;">Já se encontra amigo deste utilizador</p>')
						$('input[name="search"]').val('').focus()
					} else if(data == 4) {
						$('#mensagemfriend').html('<p class="mt-2" style="color: #FF7274;margin:0">Email inválido - '+$('input[name="search"]').val()+'</p>')
						$('input[name="search"]').val('').focus()
					} else {
						$('.btnClose').click()
						$('#mensagemfriend').html('')
						$('input[name="search"]').val('')
						toastr["success"]("Pedido de amizade enviado!", "Sucesso");
					}
				}
			});
		}
	});

	$(document).on('click', '.removerAmizade', function () { 
		var index = $(this).data('index')
		$(this).parent().parent().remove()

		if(confirm('Tem acerteza que deseja remover a amizade?')){
			$.ajax({ //chama o ajax
				url: 'ajax/removeramizade', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					update: 1,
					index: index
				}
			});
		}
	 });

	 $(document).on('click', '.checkBoardAdd, .checkBoardAddEdit', function() {
		 if($(this).css('opacity') == 1){
			 $(this).css({'opacity':'50%'})
			 $(this).parent().find('i').css('display','block')
			 $(this).attr('data-ativo', '1')
		 } else {
			$(this).css({'opacity':'100%'})
			$(this).parent().find('i').css('display','none')
			$(this).attr('data-ativo', '0')
		 }
	 });

	 $(document).on('click', '.fa-check', function() {
		$(this).css('display','none')
		$(this).parent().parent().find('img').css('opacity', '100%')
		$(this).parent().parent().find('img').attr('data-ativo', '0')
	});

	var ativarFormulario = 1
	var confirmPasswordModal = 0
	$(document).on('click', '.ativarFormulario', function(event){
		$('input[name="passowordcurrentmodal"]').val('').focus()

		if(confirmPasswordModal === 1){
			if(ativarFormulario === 0){
				$('input[name="utilizador"]').removeAttr('disabled')
				$('input[name="email"]').removeAttr('disabled')
				$('input[name="pnome"]').removeAttr('disabled')
				$('input[name="lnome"]').removeAttr('disabled')
				$('input[name="file"]').removeAttr('disabled')
				$('#guardarIMG').removeAttr('disabled')

				$(this).text('Guardar alterações');
				$('.ativarFormulario').attr('data-target', '')

				ativarFormulario = 1
				confirmPasswordModal = 1

				toastr["success"]("Palavra-passe correcta | Campos bloqueados", "Sucesso");
				$('.btnClose').click()
			} else {
				$('input[name="utilizador"]').attr('disabled', 'disabled')
				$('input[name="email"]').attr('disabled', 'disabled')
				$('input[name="pnome"]').attr('disabled', 'disabled')
				$('input[name="lnome"]').attr('disabled', 'disabled')
				$('input[name="file"]').attr('disabled', 'disabled')
				$('#guardarIMG').attr('disabled', 'disabled')

				$(this).text('Ativar formulário');
				$('.ativarFormulario').attr('data-target', '#formAccountPassowrd')

				toastr["success"]("Campos bloqueados", "Sucesso");
				ativarFormulario = 0
				confirmPasswordModal = 0
			}
		} else {
			$('input[name="utilizador"]').attr('disabled', 'disabled')
			$('input[name="email"]').attr('disabled', 'disabled')
			$('input[name="pnome"]').attr('disabled', 'disabled')
			$('input[name="lnome"]').attr('disabled', 'disabled')
			$('input[name="file"]').attr('disabled', 'disabled')
			$('#guardarIMG').attr('disabled', 'disabled')

			$(this).text('Ativar formulário');
			$('.ativarFormulario').attr('data-target', '#formAccountPassowrd')

			//toastr["success"]("Campos bloqueados", "Sucesso");
			ativarFormulario = 0
			confirmPasswordModal = 0
		}

		console.log(ativarFormulario)
		console.log(confirmPasswordModal)
	})

	$(document).on('keypress', 'input[name="passowordcurrentmodal"]', function(event) { 
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			$('#confirmPasswordModal').click()
		}
	})

	$(document).on('click', '#confirmPasswordModal', function() { 
		var passowrd = $('input[name="passowordcurrentmodal"]').val()
		console.log(passowrd)
		$.ajax({ //chama o ajax
			url: 'ajax/boardsettingsconfirmarpassword', //link para redirecionamento dá página
			method: 'POST', //o método
			data: { //os dados que passar pelo POST
				update: 1, //estado do login
				passowrd: passowrd
			},
			success: function(data){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento			
				if(data == 1){
					$('input[name="utilizador"]').removeAttr('disabled')
					$('input[name="email"]').removeAttr('disabled')
					$('input[name="pnome"]').removeAttr('disabled')
					$('input[name="lnome"]').removeAttr('disabled')
					$('input[name="file"]').removeAttr('disabled')
					$('#guardarIMG').removeAttr('disabled')

					$('.ativarFormulario').text('Guardar alterações');
					$('.ativarFormulario').attr('data-target', '')
					ativarFormulario = 1
					confirmPasswordModal = 1

					toastr["success"]("Palavra-passe correta | Campos desbloqueados", "Sucesso");
					$('.btnClose').click()
				} else {
					$('input[name="utilizador"]').attr('disabled', 'disabled')
					$('input[name="email"]').attr('disabled', 'disabled')
					$('input[name="pnome"]').attr('disabled', 'disabled')
					$('input[name="lnome"]').attr('disabled', 'disabled')
					$('input[name="file"]').attr('disabled', 'disabled')
					$('#guardarIMG').attr('disabled', 'disabled')

					$('.ativarFormulario').text('Ativar formulário');
					$('.ativarFormulario').attr('data-target', '#formAccountPassowrd')
					ativarFormulario = 0
					confirmPasswordModal = 0

					toastr["error"]("Palavra-passe incorrecta | Campos bloqueados", "Error");
				}
			}, error: function(data){  
				console.log(data)
			},
			dataType: 'TEXT' //tipo de dados no transporte
		});
	})

	$(document).on('focusout', 'input[name="utilizador"]', function() {
		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			if($(this).val() != ''){
				$.ajax({ //chama o ajax
					url: 'ajax/alterarutilizador', //link para redirecionamento dá página
					method: 'POST', //o método
					dataType: 'text',
					data: { //os dados que passar pelo POST
						update: 1,
						utilizador: $(this).val(),
					}, success: function(data) {
						toastr["success"]("Nome de utilizador alterado com sucesso!", "Sucesso");
					}
				});
			}
		}	
	})

	$(document).on('focusout', 'input[name="email"]', function() {
		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			if($(this).val() != ''){
				$.ajax({ //chama o ajax
					url: 'ajax/alteraremail', //link para redirecionamento dá página
					method: 'POST', //o método
					dataType: 'text',
					data: { //os dados que passar pelo POST
						update: 1,
						email: $(this).val(),
					}, success: function(data) {
						if(data == 'DONE'){
							toastr["success"]("Email alterado com sucesso", "Sucesso");
						} else {
							toastr["error"]("Email já em uso", "Error");
							$('input[name="email"]').focus().val('')
						}
					}
				});
			}
		}	
	})

	$(document).on('focusout', 'input[name="pnome"]', function() {
		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			if($(this).val() != ''){
				$.ajax({ //chama o ajax
					url: 'ajax/alterarnome', //link para redirecionamento dá página
					method: 'POST', //o método
					dataType: 'text',
					data: { //os dados que passar pelo POST
						update: 1,
						nome: $(this).val(),
					}, success: function(data) {
						toastr["success"]("Nome alterado com sucesso", "Sucesso");
					}
				});
			}
		}	
	})

	$(document).on('focusout', 'input[name="lnome"]', function() {
		if(ativarFormulario == 1 && confirmPasswordModal == 1){
			if($(this).val() != ''){
				$.ajax({ //chama o ajax
					url: 'ajax/alterarlnome', //link para redirecionamento dá página
					method: 'POST', //o método
					dataType: 'text',
					data: { //os dados que passar pelo POST
						update: 1,
						lname: $(this).val(),
					}, success: function(data) {
						toastr["success"]("Último nome alterado com sucesso", "Sucesso");
					}
				});
			}
		}	
	})

	$(document).on('click', '#alterarPassword', function() { 
		var um = $('input[name="passowordcurrentmodalshow"]').val()
		var dois = $('input[name="passowordnewmodal"]').val()
		var tres = $('input[name="passowordnewconfirmmodal"]').val()

		if(um == '' || dois == '' || tres == ''){
			toastr["error"]("Campos vazios", "Erro");
		} else if(dois == tres){
			$.ajax({ //chama o ajax
				url: 'ajax/alterarpasswordmodal', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					update: 1,
					dois: dois,
					tres: tres
				}, success: function(data) {
					if(data == 'DONE'){
						toastr["success"]("Palavra-passe alterada com sucesso", "Sucesso");
					} else {
						toastr["error"]("Campos errados", "Error");
					}
					$('input[name="passowordcurrentmodalshow"]').val('')
		 			$('input[name="passowordnewmodal"]').val('')
					$('input[name="passowordnewconfirmmodal"]').val('')
					$('.btnClose').click()
				}
			});
		} else {
			toastr["error"]("Campos errados", "Erro");
			$('input[name="passowordnewmodal"]').val('')
			$('input[name="passowordnewconfirmmodal"]').val('')
		}
	})

	$(document).on('focusout', 'input[name="passowordcurrentmodalshow"]', function() {
		if($(this).val() != ''){
			$.ajax({ //chama o ajax
				url: 'ajax/alterarcheckpassword', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					update: 1,
					passwordconfirm: $(this).val()
				}, success: function(data) {
					if(data == 'DONE'){
						toastr["success"]("Palavra-passe correta", "Sucesso");
						$('input[name="passowordnewmodal"]').focus()
					} else {
						$('input[name="passowordcurrentmodalshow"]').val('').focus()
						toastr["error"]("Palavra-passe incorrecta", "Error");
					}
				}
			});
		}
	})
});