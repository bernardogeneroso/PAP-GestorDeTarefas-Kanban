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
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
}

function notificationCenter() {
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

function menuBoardEdit() {
	$('.modaleditboard_menu').html('').load('includes/board/modaleditboard_menu.php', function (response, status, xhr) {
		if (status == "error") {
			var msg = "Desculpe mas aconteceu um erro, tente mais tarde.";
			$("#error").html(msg + xhr.status + " " + xhr.statusText);
		}
	});
}

$(document).ready(function () {
	$(document).on('click', '#list', function () {
		$('#listatarefaDIV').show();
		$('#boardDIV').hide();
		$('#definitionDIV').hide().html('')
		$('#list').css({
			'color': '#008ce3'
		});
		$('#board').removeAttr('style');
		$('#definition').removeAttr('style');
		$('.modaleditboard_menu').html('')
		$('#listatarefaDIV').html('').load('includes/board/listatarefas.php', function (response, status, xhr) {
			if (status == "error") {
				var msg = "Desculpe mas aconteceu um erro, tente mais tarde.";
				$("#error").html(msg + xhr.status + " " + xhr.statusText);
			}
		});
		$('div#list').click()
	});
	$(document).on('click', '#board', function () {
		$('#listatarefaDIV').hide().html('');
		$('#boardDIV').show();
		$('#definitionDIV').hide().html('')
		$('#board').css({
			'color': '#008ce3'
		});
		$('#list').removeAttr('style');
		$('#definition').removeAttr('style');

		$('div#board').click()
		if (timerON != 1) { window.location.reload(false) }
	})
	menuBoardEdit()
	//$('#board').click();
	$(document).on('click', '#definition', function () {
		$('#listatarefaDIV').hide().html('');
		$('#boardDIV').hide();
		$('#definitionDIV').show();
		$('#definition').css({
			'color': '#008ce3'
		});
		$('#board').removeAttr('style');
		$('#list').removeAttr('style');
		$('.modaleditboard_menu').html('')
		$('#definitionDIV').html('').load('includes/board/definition.php', function (response, status, xhr) {
			if (status == "error") {
				var msg = "Desculpe mas aconteceu um erro, tente mais tarde.";
				$("#error").html(msg + xhr.status + " " + xhr.statusText);
			}
		});
		$('div#definitionDIV').click()
	});

	//voltarpagina
	$(document).on('click', '#voltarpagina', function () {
		$.ajax({
			type: "POST",
			url: "ajax/voltaratrasboard",
			dataType: 'text',
			data: {
				update: 1
			},
			success: function (data) {
				window.location = data
			}
		})
	})
	//

	$("[data-toggle=popover]").popover({
		html: true,
		content: function () {
			var content = $(this).attr("data-popover-content");
			return $(content).children(".popover-body").html();
		},
		title: function () {
			var title = $(this).attr("data-popover-content");
			return $(title).children(".popover-heading").html();
		}
	});
	$('.color-red').click(function () {
		$('.btn-colorselector').css('background-color', '#eb5a46').attr('title', 'Emergente');
		$('#closeCor').click();
	});

	$('.color-orange').click(function () {
		$('.btn-colorselector').css('background-color', '#ff9f1a').attr('title', 'Urgente');
		$('#closeCor').click();
	});

	$('.color-amarelo').click(function () {
		$('.btn-colorselector').css('background-color', '#f2d600').attr('title', 'Pouco urgente');
		$('#closeCor').click();
	});

	$('.color-verde').click(function () {
		$('.btn-colorselector').css('background-color', '#519839').attr('title', 'Normal');
		$('#closeCor').click();
	});

	$(document).on('click', '#clickAddTarefa', function () {
		$('input[name="tarefa_title"]').val('');
		$('textarea[name="tarefa_description"]').val('');
		$('input[name="task_vencimento"]').val('');
		$('input[name="tarefa_time_estimate"]').val('00:00');
		$('.btn-colorselector').css('background-color', 'rgb(221, 221, 221)').removeAttr('title');
		$('#atribuirBoard').html('').parent().css('display', 'block')

		$.ajax({
			type: "POST",
			url: "ajax/buscareditabelashow",
			dataType: 'JSON',
			data: {
				update: 1
			},
			success: function (data) {
				var addresulttarefasboard = {};
				$.each(data, function (i, value) {
					addresulttarefasboard[i] = value;
				});

				if (addresulttarefasboard[0] != 0) {
					if (addresulttarefasboard) {
						$.each(addresulttarefasboard, function (key, value) {
							$('#atribuirBoard')
								.append($('<option>', { value: value[0] })
									.text(value[1] + ' | ' + value[2]));
						});
					} else {
						$('#atribuirBoard').parent().css('display', 'none')
					}
				} else {
					toastr["error"]('Não tem permissão para adicionar sub-tarefa', "Error");
				}
			}
		});
	});

	$(document).on('click', '.modalEdittarefa', function (e) {
		$('input[name="tarefa_title_edit"]').val('');
		$('#task_description_edit').val('');
		$('#datepickerEDIT').val('');
		$('input[name="tarefa_time_estimate_edit"]').val('00:00');
		$('.btn-colorselector').css('background-color', 'rgb(221, 221, 221)');
		$('#atribuirBoardEdit').html('').parent().css('display', 'block')

		var index = $(this).closest("tr").data('index');

		$.ajax({
			type: "POST",
			url: "ajax/buscareditabelalista",
			dataType: 'JSON',
			data: {
				update: 1,
				index: index
			},
			success: function (data) {
				var tarefaEditValue = {};
				$.each(data, function (i, value) {
					tarefaEditValue[i] = value;
				});

				if (data != 0) {
					$('input[name="tarefa_title_edit"]').val(tarefaEditValue[0][0][0]);
					$('#task_description_edit').val(tarefaEditValue[0][0][1]);
					$('#datepickerEDIT').val(tarefaEditValue[0][0][2]);
					$('input[name="tarefa_time_estimate_edit"]').val(tarefaEditValue[0][0][3]);
					$('.btn-colorselector').css('background-color', tarefaEditValue[0][0][4]);

					$('input[name="indexTarefa"]').attr('data-index', index)

					if (tarefaEditValue[1]) {
						$.each(tarefaEditValue[1], function (key, value) {
							if (tarefaEditValue[0][0][6] != value[2]) {
								$('#atribuirBoardEdit')
									.append($('<option>', { value: value[2] })
										.text(value[0] + ' | ' + value[1]));
							} else {
								$('#atribuirBoardEdit')
									.append($('<option>', { value: value[2], 'selected': 'selected' })
										.text(value[0] + ' | ' + value[1]));
							}
						});
					} else {
						$('#atribuirBoardEdit').parent().css('display', 'none')
					}
				} else {
					toastr["error"]('Não tem permissão para editar sub-tarefa', "Error");
				}
			},
			error: function () {
				notificationCenter();
				toastr["error"]('Aconteceu um erro ao abrir o editar!', "Error");
			}
		});
	});

	$(document).on('click', '#addTarefaModal', function () {
		var nameTar = $('input[name="tarefa_title"]').val();
		var descricao = $('textarea[name="tarefa_description"]').val();
		var data = $('input[name="task_vencimento"]').val();
		var tempoEstimado = $('input[name="tarefa_time_estimate"]').val();
		var cor = $('#colorselector').css('background-color');
		var boardid = $('#atribuirBoard').val()

		if (nameTar == '') {
			notificationCenter();
			toastr["error"]('O campo \'Nome\' encontra-se vazio!', "Error");
			$('input[name="tarefa_title"]').focus().css('color', 'red !important');
		} else {
			if($('.addtarefa tr:first td').text() == 'Sem dados'){
				$('.addtarefa tr:first').remove()
			}
			
			$.ajax({
				url: 'ajax/addtarefa',
				method: 'POST',
				dataType: 'json',
				data: {
					update: 1,
					nameTar: nameTar,
					descricao: descricao,
					data: data,
					tempoEstimado: tempoEstimado,
					cor: cor,
					boardid: boardid
				}, success: function (response) {
					var tarefaValue = {};
					$.each(response, function (i, value) {
						tarefaValue[i] = value;
					});

					var index = $('.perfilContaTopMenu').data('index')
					var imageurl = $('.perfilContaTopMenu').data('imageurl')
					var titleTudo = $('.perfilContaTopMenu').attr('title')
					var titlearray = titleTudo.split(" ")
					var username = titlearray[1]
					var email = titlearray[4]
					var colorClass = ''

					if (tarefaValue[2] == '#eb5a46') {
						colorClass = 'color1class';
					} else if (tarefaValue[2] == '#ff9f1a') {
						colorClass = 'color2class';
					} else if (tarefaValue[2] == '#f2d600') {
						colorClass = 'color3class';
					} else if (tarefaValue[2] == '#519839') {
						colorClass = 'color4class';
					}

					var darkmode = ''
					if (descricao == '') { descricao = 'Sem descrição' }
					if (data == '') { data = 'Sem dados' }
					if ($('input[name="darkmode"]').val() == 1) { darkmode = 'darkmode' } else { darkmode = '' }

					$('.addtarefa').append('' +
						'<tr data-index="' + tarefaValue[0] + '" data-position="' + tarefaValue[1] + '" class="tableCharge ' + colorClass + '">' +
						'<td><a id="nomeEdit">' + nameTar + '</a></td>' +
						'<td><img id="imgEstiloConta" src="' + imageurl + '" title="Utilizador: ' + username + ' | Email: ' + email + '" data-index="' + index + '" alt="Pedimos desculpa pelo o erro"></td>' +
						'<td style="text-align: center;" id="dataVencimentoEdit">' + data + '</td>' +
						'<td><i class="fas fa-circle" id="corEdit" style="color: ' + tarefaValue[2] + ';width: 100%;text-align: center;"></i></td>' +
						'<td class="justify-content-center align-items-center">' +
						'<div class="row">' +
						'<a data-toggle="popover" id="descricaoEdit" data-trigger="hover" data-content="' + descricao + '">' +
						'<i class="far fa-eye fa-lg mr-1 opacityFA body-class ' + darkmode + '"></i>' +
						'</a>' +
						'<i class="far fa-edit fa-lg mr-1 opacityFA modalEdittarefa body-class ' + darkmode + '" data-toggle="modal" data-target="#modalEdittarefa"></i>' +
						'<i class="far fa-trash-alt fa-lg opacityFA removeTarefa body-class ' + darkmode + '"></i>' +
						'</div>' +
						'</td>' +
						'</tr>');
					$('[data-toggle="popover"]').popover();

					$('.btnClose').click();
				}, error: function () {
					notificationCenter();
					toastr["error"]('Aconteceu um erro ao adicionar a sub-tarefa', "Error");
				}
			});
		}
	});

	$(document).on('click', '.removeTarefa', function () {
		var index = $(this).closest("tr").data('index')
		var varthis = $(this);

		if (confirm('Deseja apagar a sub-tarefa')) {
			varthis.closest("tr").remove();
			var positions = [];

			$('.addtarefa').children().each(function (index) {
				positions.push([$(this).attr('data-index'), $(this).attr('data-position')]);
				$(this).attr('data-position', index + 1)
			});

			$.ajax({
				type: "POST",
				url: "ajax/deletetabelalista",
				dataType: "text",
				data: {
					deltabelaset: 1,
					index: index,
					positions: positions
				},
				success: function (data) {
					if (data == 0) {
						toastr["error"]('Não tem permissão para apagar a sub-tarefa', "Error - Permissão");
					}
				},
				error: function () {
					notificationCenter();
					toastr["error"]('Aconteceu um erro ao apagar a sub-tarefa', "Error");
				}
			});
		}
	});

	$(document).on('click', '#editTarefaModal', function () {
		var nomeTarefa = $('input[name="tarefa_title_edit"]').val();
		var descricao = $('#task_description_edit').val();
		var dataVencimento = $('#datepickerEDIT').val();
		var tempoEstimado = $('input[name="tarefa_time_estimate_edit"]').val()
		var cor = $('.colorselectorEDIT').css('background-color');
		var idboardatribuida = $('#atribuirBoardEdit').val()

		var index = $('input[name="indexTarefa"]').data('index')

		//Travis J   https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
		var rgb2hex = str => "#" + str.split(',').map(s => (s.replace(/\D/g, '') | 0).toString(16)).map(s => s.length < 2 ? "0" + s : s).join('');
		var cor = rgb2hex(cor)

		var varthis = $(this);

		if (nomeTarefa == '') {
			notificationCenter();
			toastr["error"]('O campo \'Nome\' encontra-se vazio!', "Error");
			$('input[name="tarefa_title"]').focus().css('color', 'red !important');
		} else {
			$.ajax({
				type: "POST",
				url: "ajax/editabelalista",
				dataType: 'text',
				data: {
					update: 1,
					index: index,
					nomeTarefa: nomeTarefa,
					descricao: descricao,
					dataVencimento: dataVencimento,
					tempoEstimado: tempoEstimado,
					cor: cor,
					boardatribuida: idboardatribuida
				},
				success: function (data) {
					if (data == 1) {
						$('tr[data-index="' + index + '"]').find('#nomeEdit').text(nomeTarefa);
						$('tr[data-index="' + index + '"]').find('#descricaoEdit').attr('data-content', (descricao == '') ? descricao = 'Sem descrição' : descricao);
						$('tr[data-index="' + index + '"]').find('#dataVencimentoEdit').text((dataVencimento == '') ? dataVencimento = 'Sem dados' : dataVencimento);

						if (cor == '#eb5a46') {
							$('tr[data-index="' + index + '"]').removeClass().addClass('tableCharge color1class ui-sortable-handle odd');
						} else if (cor == '#ff9f1a') {
							$('tr[data-index="' + index + '"]').removeClass().addClass('tableCharge color2class ui-sortable-handle odd');
						} else if (cor == '#f2d600') {
							$('tr[data-index="' + index + '"]').removeClass().addClass('tableCharge color3class ui-sortable-handle odd');
						} else if (cor == '#519839') {
							$('tr[data-index="' + index + '"]').removeClass().addClass('tableCharge color4class ui-sortable-handle odd');
						}

						$('tr[data-index="' + index + '"]').find('#corEdit').css('color', cor);

						notificationCenter();
						toastr["success"]('Tarefa editada com sucesso!', "Sucesso");

						$('.btnClose').click();
					} else {
						toastr["error"]('Não pode editar a tarefa', "Error - Permissão");
					}
				},
				error: function () {
					notificationCenter();
					toastr["error"]('Aconteceu um erro ao editar a sub-tarefa', "Error");
				}
			});
		}
	});

	
	var modoajuda = 0
	if ($('input[name="modoajuda"]').val() == 1) {
		modoajuda = 1
		$('#list').fadeOut("slow").fadeIn("slow").attr('title','Nesta categoria irá poder ver todas as sub-tarefas, independendo da tarefa').fadeOut("slow").fadeIn("slow");
		$('#board').fadeOut("slow").fadeIn("slow").attr('title', 'Nesta categoria irá poder gerir as tarefa').fadeOut("slow").fadeIn("slow");
		$('#definition').fadeOut("slow").fadeIn("slow").attr('title', 'Nesta categoria irá poder ver as definições do seu projeto/board').fadeOut("slow").fadeIn("slow");
		
		$('.btnEditBoard').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode ver um menu com opções da coluna').fadeOut("slow").fadeIn("slow");			
		$('.inputEditNameBoard').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode alterar o nome da coluna').fadeOut("slow").fadeIn("slow");
		$('.colunaStyle').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode alterar adicionar uma coluna').fadeOut("slow").fadeIn("slow");
		$('.style_boards').fadeOut("slow").fadeIn("slow").attr('title', 'Neste espaço pode clicar no scroll para criar uma tarefa ou no menu').fadeOut("slow").fadeIn("slow");
		$('.boardTakeName, .modalEditBoard').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode clicar e irá ser aberto um menu de opções para editar a tarefa').fadeOut("slow").fadeIn("slow");
		$('.apagarBoard').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode clicar e irá apagar a tarefa, não se preocupe irá perguntar se têm acerteza').fadeOut("slow").fadeIn("slow");
		$('.playTimeBoard').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode clicar e irá contabilizar o seu tempo').fadeOut("slow").fadeIn("slow");
		$('.ui-state-default').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação se colocar o rato em cima da tarefa e mover a mesma, consegue gerir a posição da tarefa').fadeOut("slow").fadeIn("slow");
	}

	$(document).on('click', '#modoajuda', function () {
		if (modoajuda == 0) {
			$('#list').fadeOut("slow").fadeIn("slow").attr('title','Nesta categoria irá poder ver todas as sub-tarefas, independendo da tarefa').fadeOut("slow").fadeIn("slow");
		$('#board').fadeOut("slow").fadeIn("slow").attr('title', 'Nesta categoria irá poder gerir as tarefa').fadeOut("slow").fadeIn("slow");
		$('#definition').fadeOut("slow").fadeIn("slow").attr('title', 'Nesta categoria irá poder ver as definições do seu projeto/board').fadeOut("slow").fadeIn("slow");
			$('#darkmodeID').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode ativar o modo escuro').fadeOut("slow").fadeIn("slow");
			$('.estiloColor').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode escolher cor para o background das tarefas').fadeOut("slow").fadeIn("slow");
			$('.criarPermissao').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode criar várias permissões a sua medida').fadeOut("slow").fadeIn("slow");
			$('.atribuirPermissao').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode atribuir a permissão aos membros').fadeOut("slow").fadeIn("slow");
			$('.checkmark').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode editar a permissão com esta regra').fadeOut("slow").fadeIn("slow");
			$('.edittrabalhador').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode ativar a gestão de salário do membro escolhido').fadeOut("slow").fadeIn("slow");
			$('.edittrabalhadorClean').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode desativar a gestão de salário do membro, e limpar os seus dados').fadeOut("slow").fadeIn("slow");
			$('input[name="iniciogestaosalarios"]').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação tem que mostrar ao programa o dia que irá começar a gestão dos salários').fadeOut("slow").fadeIn("slow");
			$('input[name="fimgestaosalarios"]').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação tem que mostrar ao programa o dia que irá finalizar a gestão dos salários').fadeOut("slow").fadeIn("slow");
			$('input[name="feriadosgestaosalarios"]').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação tem que nos apresentar os feriados que existem até ao primeiro dia escolhido até ao dia final escolhido').fadeOut("slow").fadeIn("slow");
			$('.reiniciarSalarios').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação reiniciará toda a gestão de salários').fadeOut("slow").fadeIn("slow");
			$('.removerInBoardUser').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode apagar o membro associado ao board/projeto').fadeOut("slow").fadeIn("slow");

			$.ajax({ //chama o ajax
				url: 'ajax/modoajuda', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					modoAjudaPHP: 1,
					ajuda: 1
				}
			});
			modoajuda = 1
			$('input[name="modoajuda"]').val('1')
			notificationTopRight();
			toastr["info"]('Modo ajuda ativado!', "Informação");
		} else {
			$('#list').removeAttr('title');
			$('#board').removeAttr('title');
			$('#definition').removeAttr('title');

			$('#darkmodeID').removeAttr('title');
			$('.estiloColor').removeAttr('title');
			$('.criarPermissao').removeAttr('title');
			$('.atribuirPermissao').removeAttr('title');
			$('.checkmark').removeAttr('title');
			$('.edittrabalhador').removeAttr('title');
			$('.edittrabalhadorClean').removeAttr('title');
			$('input[name="iniciogestaosalarios"]').removeAttr('title');
			$('input[name="fimgestaosalarios"]').removeAttr('title');
			$('input[name="feriadosgestaosalarios"]').removeAttr('title');
			$('.reiniciarSalarios').removeAttr('title');
			$('.removerInBoardUser').removeAttr('title');

			$.ajax({ //chama o ajax
				url: 'ajax/modoajuda', //link para redirecionamento dá página
				method: 'POST', //o método
				dataType: 'text',
				data: { //os dados que passar pelo POST
					modoAjudaPHP: 1,
					ajuda: 0
				}
			});
			modoajuda = 0
			$('input[name="modoajuda"]').val('0')
			notificationTopRight();
			toastr["info"]('Modo ajuda desativado!', "Informação");
		}
	});

	


	/*Board */

	$('.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default').css('background', '');


	$(document).on('click', '#darkmodeID', function () {
		$.ajax({ //chama o ajax
			url: 'ajax/darkmodecheck', //link para redirecionamento dá página
			method: 'POST', //o método
			dataType: 'text',
			data: { //os dados que passar pelo POST
				darkmodeAccount: 1 //estado do login
			},
			success: function () { //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento			
				$(".body-class").toggleClass("darkmode");
				if ($(".changeDarkmode").hasClass('navbar-light') == true) {
					$(".changeDarkmode").removeClass('navbar-light').removeClass('bg-light').addClass('navbar-dark bg-dark')
					$('#table-call_previous').css('color', 'black !important')
					$('.lists').css('opacity', '0.9')
					$('input[name="darkmode"]').val('1')
				} else {
					$(".changeDarkmode").removeClass('navbar-dark').removeClass('bg-dark').addClass('navbar-light bg-light')
					$('#table-call_previous').css('color', 'white !important')
					$('.lists').css('opacity', '1')
					$('input[name="darkmode"]').val('0')
				}
				notificationCenter()
				toastr["info"]('Alteração do modo Darkmode', "Informação");
			}
		});
	})

	$('[data-toggle="popoverPerfil"]').popover({
		html: true,
		content: function () {
			return $('#popover-content').html();
		}
	});
	//////////////////////////////////////////////////////////////////////////////////////////


	//modalEditBoard
	$(document).on('click', '.modalEditBoard', function (event) {
		var geral = $(this).parent().parent().parent().parent()
		var index = geral.attr('data-index')
		var colunaID = geral.parent().data('categoria')
		var colunaBoard = geral.parent().parent().find('.editBoardClick').data('board-categoria')

		//limpar campos
		/*$('.checkBoardAddEditTarefas').each(function () {
			if ($(this).attr('data-ativo') == 1) {
				$(this).attr('data-ativo', '0')
				$(this).css('opacity', '1')
				$(this).parent().find('i').css('display', 'none')
			}
		});*/
		$('textarea[name="task_descricao"]').val('')
		$('.comentarios').html('')
		$(".ficheirosOFgalaria:eq(0)").html('');
		$(".ficheirosOFgalaria:eq(1)").html('');
		$('[data-cor-tarefa="1"], [data-cor-tarefa="2"], [data-cor-tarefa="3"], [data-cor-tarefa="4"]').css({
			'width': '30px',
			'height': '30px',
			'opacity': '1'
		})
		$('.prioridadeColor').parent().parent().find('a').text('Sem prioridade')
		prioridadeColor = 0
		corAtual = ''
		$('#tab1click').click()
		$('.dataCriacaoEditBoard').text('')
		$('.tableTimeEditBoard').html('')
		$('.tempoDespendidoEditBoard').text('')
		$('.filesDesignEstrutura').css('display', 'none')

		$('.periodosDeTrabalhoEditBoard:eq(0)').switchClass('col-md-4', 'col-md-6')
		$('.periodosDeTrabalhoEditBoard:eq(2)').switchClass('col-md-4', 'col-md-6')
		$('.periodosDeTrabalhoEditBoard:eq(1)').css('display', 'none').find('h4 span').text('')

		$('#dataEncerramentoEditTarefa').css('display', 'block')
		$('#dataEncerramentoEditTarefa').text('Terminar tarefa')

		//pagamentos
		$('input[name="edit_prazo_entraga"]').val('0€')
		$('input[name="edit_fatura"]').val('')
		$('input[name="edit_falta_pagar"]').val('0€').css('border-color', '')

		$('input[name="edit_valor_pago"]').val('0€')
		$('input[name="edit_precototal"]').val('0€')
		$('input[name="edit_despessas"]').val('0€')
		$('input[name="edit_lucro"]').val('0€').css('border-color', '')


		$('input[name="edit_pagamento_data"]').attr('disabled', 'disabled')
		$('select[name="edit_pagamento_metodo"]').attr('disabled', 'disabled')
		$('select[name="edit_pagamento_tipo"]').attr('disabled', 'disabled')
		$('input[name="edit_pagamento_valor"]').attr('disabled', 'disabled')
		$('textarea[name="edit_pagamento_observacao"]').attr('disabled', 'disabled')

		$('.limpar_pagamento').click()
		$('.pagamento_tabela').html('')
		$('.atribuicaoEditBoard > a').html('')

		$('.addPerfilInBoardShow').html('')

		$.ajax({
			url: 'ajax/boardstakedata',
			method: 'POST',
			dataType: 'json',
			data: {
				update: 1,
				id: index,
				colunaID: colunaID
			}, success: function (data) {
				$('input[name="editBoardID"]').attr('data-id-board', index)
				$('input[name="editBoardColunaID"]').attr('data-id-coluna', colunaID)
				$('input[name="editBoardColuna"]').attr('data-board-coluna', colunaBoard)
				//$('.row:eq(3)').click()
				var boardeditdata = {};
				$.each(data, function (i, value) {
					boardeditdata[i] = value;
				});

				if (boardeditdata[0] != 0) {
					$('#modalEditBoard').find('#addBoardName').val(boardeditdata[0])
					$('input[name="nameBoardEdit"]').val(boardeditdata[0])
					$('.colunaEditBoard > a').html('<b style="font-size: 11px;">' + boardeditdata[2] + '</b>')
					$('.addPerfilInBoardShow').html(boardeditdata[13])
					$('.atribuicaoEditBoard > a').html('<b style="font-size: 11px;">' + boardeditdata[12] + '</b>')

					//prioridade
					if (boardeditdata[1] != null) {
						if (boardeditdata[1] == '#519839') {
							$('[data-cor-tarefa="1"]').css({
								'width': '40px',
								'height': '40px',
								'opacity': '0.8'
							})
							prioridadeColor = 1
							corAtual = $('[data-cor-tarefa="1"]').css('background-color')
							$('.prioridadeColor').parent().parent().find('a').text('Normal')
						} else if (boardeditdata[1] == '#f2d600' || boardeditdata[1] == '#F2D600') {
							$('[data-cor-tarefa="2"]').css({
								'width': '40px',
								'height': '40px',
								'opacity': '0.8'
							})
							prioridadeColor = 1
							corAtual = $('[data-cor-tarefa="2"]').css('background-color')
							$('.prioridadeColor').parent().parent().find('a').text('Pouco urgente')
						} else if (boardeditdata[1] == '#ff9f1a' || boardeditdata[1] == '#FF9F1A') {
							$('[data-cor-tarefa="3"]').css({
								'width': '40px',
								'height': '40px',
								'opacity': '0.8'
							})
							prioridadeColor = 1
							corAtual = $('[data-cor-tarefa="3"]').css('background-color')
							$('.prioridadeColor').parent().parent().find('a').text('Urgente')
						} else if (boardeditdata[1] == '#eb5a46' || boardeditdata[1] == '#EB5A46') {
							$('[data-cor-tarefa="4"]').css({
								'width': '40px',
								'height': '40px',
								'opacity': '0.8'
							})
							prioridadeColor = 1
							corAtual = $('[data-cor-tarefa="4"]').css('background-color')
							$('.prioridadeColor').parent().parent().find('a').text('Emergente')
						}
					}

					if ($('input[name="darkmode"]').val() == 1) {
						var darkmodeshowcomment = 'darkmode'
						var borderdarkmode = '-webkit-box-shadow: 0px 0px 1px 1px rgba(255,255,255,1);-moz-box-shadow: 0px 0px 1px 1px rgba(255,255,255,1);box-shadow: 0px 0px 1px 1px rgba(255,255,255,1);'
					}

					//sub-tarefas
					if (boardeditdata[3] != '') {
						for (i = 0; i < boardeditdata[3].length; i++) {
							var arrayCriacao = boardeditdata[3][i][1].split(" ")
							$('.comentarios').append('' +
								'<div class="card mb-2 body-class ' + darkmodeshowcomment + '" data-id-comentario="' + boardeditdata[3][i][2] + '" style="' + borderdarkmode + '">' +
								'<div class="card-body d-flex p-2 mt-2" style="padding-bottom: 0px !important;margin-bottom: 0px !important;">' +
								'<div class="ml-3">' +
								'<img id="imgEstiloConta" src="' + boardeditdata[3][i][5] + '" title="Utilizador: ' + boardeditdata[3][i][3] + ' | Email: ' + boardeditdata[3][i][4] + '" alt="Pedimos desculpa pelo o erro" class="mr-2">' +
								'</div>' +
								'<div class="col">' +
								'<input type="text" class="form-control border-0 comentarioAlterarInBoard body-class ' + darkmodeshowcomment + '" value="' + boardeditdata[3][i][0] + '">' +
								'</div>' +
								'<div class="mr-3 mt-2">' +
								'<i class="fas fa-trash text-secondary apagarTarefaInBoard"></i>' +
								'</div>' +
								'</div>' +
								'<div class="" style="/* margin: 32px 0px 0px 19%; */width:;justify-content: center;align-items: center;display: flex;"><small>Data de criação: ' + arrayCriacao[0] +' | ' + arrayCriacao[1] + '</small></div>' +
								'</div>')
						}
					}

					var typePermitImage = ['jpg', 'jpeg', 'png', 'gif'];

					if (boardeditdata[4].length != 0) {
						for (i = 0; i < boardeditdata[4].length; i++) {
							//console.log($.inArray(boardeditdata[4][i][2], typePermitImage))
							if ($.inArray(boardeditdata[4][i][2], typePermitImage) != -1) {
								$(".ficheirosOFgalaria:eq(0)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><img style="width: 8pc; height: 8pc;border-top-right-radius: 6px;border-top-left-radius: 6px;" class="modalIMG" src="' + boardeditdata[4][i][1] + '" /><a class="text-center" style="white-space: normal;word-break: break-all;">' + boardeditdata[4][i][3] + '</a><a href="' + boardeditdata[4][i][1] + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + boardeditdata[4][i][0] + '" style="display:none">Apagar</button></div></div>');
							} else if (boardeditdata[4][i][2] == 'docx') {
								$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-word text-secondary" data-download-file="' + boardeditdata[4][i][1] + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + boardeditdata[4][i][3] + '</a><a href="' + boardeditdata[4][i][1] + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + boardeditdata[4][i][0] + '" style="display:none">Apagar</button></div></div>');
							} else if (boardeditdata[4][i][2] == 'pdf') {
								$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-pdf text-secondary" data-toggle="modal" data-target="#pdfmodal" data-download-file="' + boardeditdata[4][i][1] + '" data-index-pdf="' + boardeditdata[4][i][0] + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + boardeditdata[4][i][3] + '</a></div></div>');
							} else if (boardeditdata[4][i][2] == 'pptx') {
								$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-powerpoint text-secondary" data-download-file="' + boardeditdata[4][i][1] + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + boardeditdata[4][i][3] + '</a><a href="' + boardeditdata[4][i][1] + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + boardeditdata[4][i][0] + '" style="display:none">Apagar</button></div></div>');
							} else if (boardeditdata[4][i][2] == 'xlsx') {
								$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-excel text-secondary" data-download-file="' + boardeditdata[4][i][1] + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + boardeditdata[4][i][3] + '</a><a href="' + boardeditdata[4][i][1] + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + boardeditdata[4][i][0] + '" style="display:none">Apagar</button></div></div>');
							} else if (boardeditdata[4][i][2] == 'zip' || boardeditdata[4][i][2] == 'rar' || boardeditdata[4][i][2] == '7z') {
								$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-archive text-secondary" data-download-file="' + boardeditdata[4][i][1] + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + boardeditdata[4][i][3] + '</a><a href="' + boardeditdata[4][i][1] + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + boardeditdata[4][i][0] + '" style="display:none">Apagar</button></div></div>');
							} else {
								$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc;height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file text-secondary" data-download-file="' + boardeditdata[4][i][1] + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + boardeditdata[4][i][3] + '</a><a href="' + boardeditdata[4][i][1] + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + boardeditdata[4][i][0] + '" style="display:none">Apagar</button></div></div>');
							}
						}
						$('.filesDesignEstrutura').css('display', 'block')
					}


					$('.dataCriacaoEditBoard').text(boardeditdata[5])


					if (boardeditdata[6].length == 0) {
						$('.tempoDespendidoEditBoard').text('Sem dados')
						$('.tableTimeEditBoardCSS').css('display', 'none')
					} else {
						for (i = 0; i < boardeditdata[6].length; i++) {
							$('.tableTimeEditBoard').append('' +
								'<tr>' +
								'<td><img src="' + boardeditdata[6][i][0] + '" id="imgEstiloConta" style="margin:0" title="Utilizador: ' + boardeditdata[6][i][4] + ' | Email: ' + boardeditdata[6][i][5] + '" alt="Pedimos desculpa pelo o erro"></td>' +
								'<td>' + boardeditdata[6][i][1] + '</td>' +
								'<td>' + boardeditdata[6][i][2] + '</td>' +
								'<td>' + boardeditdata[6][i][3] + '</td>' +
								'</tr>')
						}

						$('.tableTimeEditBoardCSS').css('display', 'inline-table')
						var tempoAnterior = ''
						var horafinal = ''
						var count = 0;
						$('.tableTimeEditBoard tr').each(function (index) {
							if (index != 0) {
								var tempoAtual = $('.tableTimeEditBoard tr:eq(' + index + ') td:eq(3)').text()
								horafinal = addTimes(tempoAnterior, tempoAtual)
								tempoAnterior = horafinal
							} else if (index == 0) {
								tempoAnterior = $('.tableTimeEditBoard tr:eq(0) td:eq(3)').text()
							}
							++count
						});

						if (count == 1) {
							$('.tempoDespendidoEditBoard').text(tempoAnterior)

							var editBoardID = $('input[name="editBoardID"]').attr('data-id-board')

							$.ajax({
								url: 'ajax/updatetempodespendido',
								method: 'POST',
								dataType: 'text',
								data: {
									update: 1,
									tempoDespendindo: tempoAnterior,
									editBoardID: editBoardID
								}
							})
						} else {
							$('.tempoDespendidoEditBoard').text(horafinal)

							var editBoardID = $('input[name="editBoardID"]').attr('data-id-board')

							$.ajax({
								url: 'ajax/updatetempodespendido',
								method: 'POST',
								dataType: 'text',
								data: {
									update: 1,
									tempoDespendindo: horafinal,
									editBoardID: editBoardID
								}
							})
						}
					}

					if (boardeditdata[7] != '') {
						$('.periodosDeTrabalhoEditBoard:eq(0)').switchClass('col-md-6', 'col-md-4')
						$('.periodosDeTrabalhoEditBoard:eq(2)').switchClass('col-md-6', 'col-md-4')
						$('.periodosDeTrabalhoEditBoard:eq(1)').css('display', 'block').find('h4 span').text(boardeditdata[7])
						$('#dataEncerramentoEditTarefa').text('Retomar tarefa')
					}

					//pagamentos
					$('input[name="edit_prazo_entraga"]').val(boardeditdata[8][0][0])
					$('input[name="edit_fatura"]').val((boardeditdata[8][0][1]==0)?'':boardeditdata[8][0][1])
					if(boardeditdata[8][0][6] < 0) {
						$('input[name="edit_falta_pagar"]').css('border-color', 'red')
					} else {
						$('input[name="edit_falta_pagar"]').css('border-color', '')
					}
					$('input[name="edit_falta_pagar"]').val(boardeditdata[8][0][6] + '€')
					$('input[name="edit_valor_pago"]').val(boardeditdata[8][0][2] + '€')
					if (boardeditdata[8][0][3] != '0') {
						$('input[name="edit_pagamento_data"]').removeAttr('disabled')
						$('select[name="edit_pagamento_metodo"]').removeAttr('disabled')
						$('select[name="edit_pagamento_tipo"]').removeAttr('disabled')
						$('input[name="edit_pagamento_valor"]').removeAttr('disabled')
						$('textarea[name="edit_pagamento_observacao"]').removeAttr('disabled')
					}
					$('input[name="edit_precototal"]').val(boardeditdata[8][0][3] + '€')
					$('input[name="edit_despessas"]').val(boardeditdata[8][0][4] + '€')
					if(boardeditdata[8][0][5] < 0) {
						$('input[name="edit_lucro"]').css('border-color', 'red')
					} else {
						$('input[name="edit_lucro"]').css('border-color', '')
					}
					$('input[name="edit_lucro"]').val(boardeditdata[8][0][5] + '€')

					if (boardeditdata[9].length == 0) {
						$('.pagamento_tabela_inicio').css('display', 'none')
					} else {
						$('.pagamento_tabela_inicio').css('display', 'block')
						for (i = 0; i < boardeditdata[9].length; i++) {
							var deltePerm = '<td nowrap style="white-space: normal;word-break: break-all;">Sem permissão</td>';
							if(boardeditdata[9][i][10]==1){deltePerm='<td><i class="fas fa-trash removerPagamento text-secondary fa-lg d-flex justify-content-center align-items-center"></i></td></tr>'} 

							if(boardeditdata[9][i][8]=="") {boardeditdata[9][i][8]="Sem observações"}


							$('.pagamento_tabela').append('' +
								'<tr data-index="' + boardeditdata[9][i][9] + '">' +
								'<td><img id="imgEstiloConta" src="' + boardeditdata[9][i][0] + '" class="perfilContaTopMenu"" data-index="' + boardeditdata[9][i][3] + '" title="Utilizador: ' + boardeditdata[9][i][1] + ' | Email: ' + boardeditdata[9][i][2] + '" alt="Pedimos desculpa pelo o erro"></td>' +
								'<td style="width:8pc;">' + boardeditdata[9][i][4] + '</td>' +
								'<td>' + boardeditdata[9][i][5] + '</td>' +
								'<td style="word-break: normal">' + boardeditdata[9][i][6] + '</td>' +
								'<td>' + boardeditdata[9][i][7] + '€</td>' + '<td nowrap style="white-space: normal;word-break: break-all;"> '+ boardeditdata[9][i][8] + '</td>'+ deltePerm
								)
								console.log(deltePerm)
						}
						
					}

					$('textarea[name="task_descricao"]').val(boardeditdata[10])

					$('.checkBoardAddEditTarefas').each(function (i, index) {
						for (x = 0; x < boardeditdata[11].length; x++) {
							if ($(this).attr('data-index') == boardeditdata[11][x][0]) {
								$(this).attr('data-ativo', '1')
								$(this).css('opacity', '0.5')
								$(this).parent().find('i').css('display', 'block')
								break;
							}
						}
					});
				} else {
					hidemodalEditBoard()
					toastr["error"]('Não tem permissão para ver a tarefa', "Error - Permissão");
				}
			}, error: function (data) {
				console.log(data)
			}
		});
	})

	function hidemodalEditBoard() {
		$("#modalEditBoard").removeClass("in");
		$(".modal-backdrop").remove();
		$("#modalEditBoard").hide();
	}

	function saveNewPositionsBoards(positions, lengthMax, categoriaPrincipal) {
		$.ajax({
			url: 'ajax/boardsupdateposition',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				positions: positions,
				lengthMax: lengthMax,
				categoriaPrincipal: categoriaPrincipal
			},
			success: function (response) {
				if (response == 0) {
					toastr["error"]('Não tem permissão para alterar a posição da tarefa', "Error - Permissão");
				}
			}
		});
	}

	var colunaIDStartSortable = ''
	$('div.droptrue').sortable({
		connectWith: "div",
		autoScroll: true,
		vertical: true,
		invertSwap: false,
		pullPlaceholder: true,
		revert: 'invalid',
		scroll: true,
		scrollSensitivity: 80,
		scrollSpeed: 70,
		cancel: ".ui-state-disabled",
		start: function (e, ui) {
			colunaIDStartSortable = ui.item.parent().parent().find('.editBoardClick').data('board-categoria')
			$(this).parent().css({
				'border': '2px dashed #1C6EA4',
				'border-radius': '27px 0px 40px 0px gray'
			})

			ui.item.css({
				'transform': 'rotate(4deg)',
				'opacity': '0.65'
			});
		},
		stop: function (event, ui) {
			$('.style_boards').css({
				'border': '',
				'border-radius': '#fafafa'
			})

			ui.item.css({
				'transform': 'rotate(0deg)',
				'opacity': '1'
			});
			//email info
			var coluna = ui.item.parent().parent().find('.inputEditNameBoard').val()
			var nomeBoard = ui.item.find('.boardTakeName').text()
			var idtarefa = ui.item.attr('data-index')
			var colunaID = ui.item.parent().parent().find('.editBoardClick').data('board-categoria')

			if (colunaIDStartSortable != colunaID) {
				$.ajax({
					url: 'ajax/sendemailnewposition',
					method: 'POST',
					dataType: 'JSON',
					data: {
						update: 1,
						coluna: coluna,
						nomeBoard: nomeBoard,
						idtarefa: idtarefa
					},
					success: function (response) {
						if(response == 0){
							toastr["error"]('Não tem permissão para ver a tarefa', "Error - Permissão");							
						}
					}
				});
			}
		},
		update: function (event, ui) {
			var sortableID = $(this).attr("id");
			var lengthMax = $('#' + sortableID + ' > div').length
			var categoriaPrincipal = $(this).data('categoria');

			var positions = []
			var count = 1;
			countTotal = count
			$(this).children().each(function (index) {
				var id = $(this).data('index');
				$(this).attr('data-position', count)
				positions.push([id, count]);
				if ($(this).attr('data-categoria') != categoriaPrincipal) $(this).attr('data-categoria', categoriaPrincipal)
				++count
			});

			saveNewPositionsBoards(positions, lengthMax, categoriaPrincipal);
		}
	}).disableSelection();

	$.ajax({
		type: "POST",
		url: "ajax/lists-color",
		dataType: 'text',
		data: {
			update: 1
		},
		success: function (data) {
			$('.lists').css('background-color', data)
			$('.list').css('background-color', data)
			$('.style_boards').css('background-color', data)
			$('.addBoardColuna').css('background-color', data)
		}
	});

	$(document).on("click", ".AddBoardColuna", function () {
		var categoria = $(this).parent().parent().data('board-categoria');
		var escolha = $('.addBoardColuna:eq(' + (categoria - 1) + ')');
		escolha.css('display', 'flex')
		escolha.children().first().focus();
	});

	var scrollAdd = 0
	$(document).on("mousedown", ".style_boards", function (e1) {
		$(document).on("mouseup", ".style_boards", function (e2) {
			if (e1.which == 2 && e1.target == e2.target) {
				if (scrollAdd == 0) {
					$(this).find('.addBoardColuna').css('display', 'flex');
					$(this).find('.addBoardColuna').find('input[type=text]').focus();
					scrollAdd = 1;
				} else {
					scrollAdd = 0;
					$(this).find('.addBoardColuna').css('display', 'none');
				}
			}
		});
	});

	$(document).on("click", ".apagarColuna", function () {
		var categoria = $(this).parent().parent().data('board-categoria');
		var id = $(this).parent().parent().data('index');
		var colunaNome = $(this).parent().parent().find('input').val();
		var $this = $(this)

		if (confirm('Apagar a coluna \"' + colunaNome + '\"')) {
			$.ajax({
				url: 'ajax/boardsremovecoluna',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					categoria: categoria,
					id: id
				}, success: function (data) {
					if (data == 0) {
						toastr["error"]('Não tem permissão para apagar a coluna', "Error - Permissão");
					} else {
						$this.parent().parent().parent().parent().remove()
						$('.editBoardClick').each(function (index) {
							$(this).attr('data-board-categoria', (index+1))
						});
					}
				}, error: function () {
					notificationCenter();
					toastr["error"]('Aconteceu um erro ao apagar coluna!', "Error");
				}
			});
		}
	});

	$(document).on("click", ".inputEditNameBoard", function () {
		$(this).css('background-color', 'white')
	});
	$(document).on("focusout", ".inputEditNameBoard", function () {
		var categoria = $(this).parent().data('board-categoria');
		var id = $(this).parent().data('index');
		$(this).css({ 'background-color': '#ebecf0' });
		var valueSave = $(this).val();
		$.trim(valueSave)

		if (valueSave != '') {
			$.ajax({
				url: 'ajax/boardsupdatename',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					categoria: categoria,
					valueSave: valueSave,
					id: id
				}, success: function (data) {
					if (data == 0) {
						toastr["error"]('Não tem permissão para alterar a coluna', "Error - Permissão");
					}
				}, error: function () {
					notificationCenter();
					toastr["error"]('Aconteceu um erro ao alterar o nome da coluna!', "Error");
				}
			});
		} else {
			escolha.val('')
			escolha.focus();
			notificationTopRight();
			toastr["warning"]('Campo vazio');
		}
	});

	$(document).on("click", ".alterarNomeColuna", function () {
		var categoria = $(this).parent().parent().data('board-categoria');
		$('.editBoardClick:eq(' + (categoria - 1) + ')').children().first().css({ 'background-color': 'white' }).focus()
	});

	var scrollAddColuna = 0

	$(document).on("click", ".colunaStyle", function () {
		if (scrollAddColuna == 0) {
			$(this).css('opacity', '100%');
			$(this).find('.addNewColunaOpen').css('display', 'flex');
			$(this).find('.form-control').focus();
			$(this).children().children().first().attr('class', 'fas fa-minus opacityFA');
			$('#colunaName').text('Fechar');
			scrollAddColuna = 1;
		} else {
			$(this).find('.addNewColunaOpen').css('display', 'none');
			$(this).css('opacity', '80%');
			$(this).children().children().first().attr('class', 'fas fa-plus opacityFA');
			$('#colunaName').text('Adicionar coluna');
			scrollAddColuna = 0;
		}
	});

	$(document).on("click", ".addColuna", function () {
		var colunaName = $(this).parent().parent().find('input[type="text"]').val();
		$(this).parent().parent().parent().remove();
		var length = $('.style_boards').length;
		//var categoria = $('.style_boards:eq('+(length-2)+')').find('.editBoardClick').data('board-categoria')

		$.ajax({
			url: 'ajax/colunadddboard',
			method: 'POST',
			dataType: 'JSON',
			data: {
				update: 1,
				colunaName: colunaName
			}, success: function (data) {
				if (data != 0) {
					$('.style_boards:eq(' + (length - 1) + ')').append('' +
						'<div class="editBoardClick" data-board-categoria="' + length + '" data-index="' + data[0] + '">' +
						'<input class="inputEditNameBoard" value="' + colunaName + '" maxlength="20" style="background-color: #ebecf0;width: 70%;margin-left: 6px;border: 0px solid #ebecf0;'+data[1]+'">' +
						'<button class="btnEditBoard" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></button>' +
						'<div class="dropdown-menu" style="margin-top: -2px;">' +
						'<a class="dropdown-item AddBoardColuna" href="#"><i class="fas fa-plus spaceMenuFA"></i>Adicionar tarefa</a>' +
						'<div class="dropdown-divider"></div>' +
						'<a class="dropdown-item alterarNomeColuna" href="#"><i class="fas fa-edit spaceMenuFA"></i>Alterar o nome da coluna</a>' +
						'<a class="dropdown-item apagarColuna" href="#"><i class="fas fa-trash spaceMenuFA"></i>Apagar</a>' +
						'</div>' +
						'</div>' +
						'<div id="sortable' + length + '" class="droptrue ui-sortable" data-categoria="' + data[0] + '">' +
						'</div>' +
						'<div class="input-group addBoardColuna" data-categoria="' + length + '" style="display: none;z-index: 100;background-color: '+data[2]+'">' +
						'<input type="text" name="enterAddBoardInColuna" maxlength="25" class="form-control">' +
						'<span class="input-group-btn">' +
						'<button class="btn btn-success addBoardInColuna" style="margin-left:6px" type="button">Adicionar</button>' +
						'</span>' +
						'</div>').find('#sortable' + length).sortable({
							connectWith: "div",
							autoScroll: true,
							vertical: true,
							invertSwap: false,
							pullPlaceholder: true,
							revert: 'invalid',
							scroll: true,
							scrollSensitivity: 80,
							scrollSpeed: 70,
							cancel: ".ui-state-disabled",
							start: function (e, ui) {
								colunaIDStartSortable = ui.item.parent().parent().find('.editBoardClick').data('board-categoria')
								$(this).parent().css({
									'border': '2px dashed #1C6EA4',
									'border-radius': '27px 0px 40px 0px gray'
								})

								ui.item.css({
									'transform': 'rotate(4deg)',
									'opacity': '0.65'
								});
							},
							stop: function (e, ui) {
								$('.style_boards').css({
									'border': '',
									'border-radius': '#fafafa'
								})

								ui.item.css({
									'transform': 'rotate(0deg)',
									'opacity': '1'
								});
								//email info
								var coluna = ui.item.parent().parent().find('.inputEditNameBoard').val()
								var nomeBoard = ui.item.find('.boardTakeName').text()
								var idtarefa = ui.item.attr('data-index')
								var colunaID = ui.item.parent().parent().find('.editBoardClick').data('board-categoria')

								if (colunaIDStartSortable != colunaID) {
									$.ajax({
										url: 'ajax/sendemailnewposition',
										method: 'POST',
										dataType: 'JSON',
										data: {
											update: 1,
											coluna: coluna,
											nomeBoard: nomeBoard,
											idtarefa: idtarefa
										},
										success: function (response) {
											if(response == 0){
												toastr["error"]('Não tem permissão para ver a tarefa', "Error - Permissão");							
											}
										}
									});
								}
							},
							update: function (event, ui) {
								var sortableID = $(this).attr("id");
								var lengthMax = $('#' + sortableID + ' > div').length
								var categoriaPrincipal = $(this).data('categoria');

								var positions = []
								var count = 1;
								countTotal = count
								$(this).children().each(function (index) {
									var id = $(this).data('index');
									$(this).attr('data-position', count)
									positions.push([id, count]);
									if ($(this).attr('data-categoria') != categoriaPrincipal) $(this).attr('data-categoria', categoriaPrincipal)
									++count
								});

								saveNewPositionsBoards(positions, lengthMax, categoriaPrincipal);
							}
						}).disableSelection();
					$('.inputEditNameBoard').click(function () {
						$(this).css('background-color', 'white')
					});
					$('.list:eq(' + (length - 1) + ')').after('' +
						'<div class="list" style="background-color: '+data[2]+'">' +
						'<div class="style_boards" style="padding: 6px;background-color: '+data[2]+'">' +
						'<div class="colunaStyle">' +
						'<span class="placeholder"><i class="fas fa-plus opacityFA"></i><span style="margin-left:3px;color:black" id="colunaName">Adicionar coluna</span></span>' +
						'<div class="input-group addNewColunaOpen" style="display: none;margin: 0;">' +
						'<input type="text" name="addNewColunaOpenEnter" class="form-control">' +
						'<span class="input-group-btn">' +
						'<button class="btn btn-success addColuna" style="margin-left:6px" type="button">Adicionar</button>' +
						'</span>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>')
				} else {
					toastr["error"]('Não tem permissão para criar uma coluna', "Error - Permissão");
				}
			}
		});
	});

	$(document).on('keypress', 'input[name="addNewColunaOpenEnter"]', function (e) {
		if (e.which == 13) {
			$('.addColuna').click()
		}
	})

	//////////////// Edit Board

	function addTimes(startTime, endTime) {
		var times = [0, 0, 0]
		var max = times.length

		var a = (startTime || '').split(':')
		var b = (endTime || '').split(':')

		// normalize time values
		for (var i = 0; i < max; i++) {
			a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
			b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
		}

		// store time values
		for (var i = 0; i < max; i++) {
			times[i] = a[i] + b[i]
		}

		var hours = times[0]
		var minutes = times[1]
		var seconds = times[2]

		if (seconds >= 60) {
			var m = (seconds / 60) << 0
			minutes += m
			seconds -= 60 * m
		}

		if (minutes >= 60) {
			var h = (minutes / 60) << 0
			hours += h
			minutes -= 60 * h
		}

		return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
	}





	$(document).on('click', '.clickActiveBoardEdit', function () {
		var perm = 1
		$.ajax({
			url: 'ajax/verificarperm',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				arrayposition: 8
			}, success: function (data) {
				if (data == 0) {
					perm = 0
					toastr["error"]('Não pode editar a tarefa', "Error - Permissão");
				}
			}
		})
		if (perm != 0) {
			$(this).parent().find('div:eq(1) .modalEditBoard').click()
		}
	})

	$(document).on('click', '#removerTarefaEditTarefa', function () {
		var perm = 1
		$.ajax({
			url: 'ajax/verificarperm',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				arrayposition: 10
			}, success: function (data) {
				if (data == 0) {
					perm = 0
					toastr["error"]('Não pode apagar a tarefa', "Error - Permissão");
				}
			}
		})
		if (perm != 0) {
			var idtarefa = $('input[name="editBoardID"]').data('id-board')
			var idcoluna = $('input[name="editBoardColuna"]').data('board-coluna')

			$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] > divs div:eq(1) .apagarBoard').click()
		}
	})

	$(document).on('click', '.removerPagamento', function () {
		var id = $(this).parent().parent().attr('data-index')

		var um = $(this).parent().parent().find('td:eq(4)').html()
		

		var $this = $(this)

		if(confirm("Deseja apagar o pagamento?")) {
			var dois = $('input[name="edit_falta_pagar"]').val()
			var tres = $('input[name="edit_valor_pago"]').val()
			var pago = um.substring(0, um.length - 1)
			var falta_pagar = dois.substring(0, dois.length - 1)
			var valor_pago = tres.substring(0, tres.length - 1)

			var novo_falta_pagar = parseFloat(falta_pagar) + parseFloat(pago)
			var novo_valor_pago = parseFloat(valor_pago) - parseFloat(pago)

			var editBoardID = $('input[name="editBoardID"]').attr('data-id-board')

			if(novo_falta_pagar < 0) {
				$('input[name="edit_falta_pagar"]').css('border-color', 'red')
			} else {
				$('input[name="edit_falta_pagar"]').css('border-color', '')
			}

			$('input[name="edit_falta_pagar"]').val(novo_falta_pagar + '€')
			$('input[name="edit_valor_pago"]').val(novo_valor_pago + '€')
			
			$.ajax({
			url: 'ajax/removerPagamento',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				id: id,
				novo_falta_pagar: novo_falta_pagar,
				novo_valor_pago: novo_valor_pago,
				editBoardID: editBoardID
			}, success: function (data) {  
				if(data == 0){
					toastr["error"]('Não pode remover o pagamento', "Error - Permissão");		
				} else {
					$this.parent().parent().remove()
				}
			}
		})
		}
		
	})

	$(document).on('click', '.fa-file-pdf', function () {
		var index = $(this).attr('data-index-pdf')
		var href = $(this).attr('data-download-file')
		$('#pdfmodalVIEW').html('<iframe style="width: 100%;height: 65vh;" src="' + href + '#view=VFit&toolbar=0&navpanes=0"></iframe>')
		//$('#pdfmodalVIEW').attr("src", href + "#view=VFit" + "&toolbar=0" + "&navpanes=0");
		$('#pdfmodalPDFdelete').attr('data-id-pdf', index)
		$('#pdfmodalPDFtransferir').attr('href', href)
	})

	$(document).on('click', '#tab1click', function () {
		$('#saveBoardEditTarefa').css('display', 'block')
	})

	$(document).on('click', '#tab2click', function () {
		$('#saveBoardEditTarefa').css('display', 'none')
	})

	$(document).on('click', '#tab3click', function () {
		$('#saveBoardEditTarefa').css('display', 'none')
	})

	$(document).on('click', '#tab4click', function () {
		$('#saveBoardEditTarefa').css('display', 'none')
	})

	$(document).on('focusout', 'input[name="edit_prazo_entraga"]', function () {
		var data = $(this).val()
		var idboardatual = $('input[name="editBoardID"]').attr('data-id-board')

		$.ajax({
			url: 'ajax/updatedataprazoentrega',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				data: data,
				idboardatual: idboardatual
			}, success: function (data) {
				if (data == 0) {
					toastr["error"]('Não pode alterar o prazo de entrega', "Error - Permissão");
					$('input[name="edit_prazo_entraga"]').val('')
				}
			}
		})
	})

	$(document).on('focusout', 'input[name="edit_fatura"]', function () {
		var fatura = $(this).val()
		var idboardatual = $('input[name="editBoardID"]').attr('data-id-board')
		
		$.ajax({
			url: 'ajax/updatedatafatura',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				fatura: fatura,
				idboardatual: idboardatual
			}, success: function (data) {
				if (data == 0) {
					toastr["error"]('Não pode alterar o prazo de entrega', "Error - Permissão");
					$('input[name="edit_prazo_entraga"]').val('')
				}
			}
		})
	})

	$(document).on('click', '#closeMODALpdf', function () {
		$('#modalEditBoard').css({
			'overflow-y': 'auto',
			'overflow-x': 'hidden'
		})
	})

	$(document).on('hidden.bs.modal', '#pdfmodal', function (e) {
		$('#modalEditBoard').css({
			'overflow-y': 'auto',
			'overflow-x': 'hidden'
		})
	})

	$(document).on('click', '#pdfmodalPDFdelete', function () {
		var id = $(this).attr('data-id-pdf')
		$('#closeMODALpdf').click()

		$.ajax({
			url: 'ajax/removepdfgaleriaimagens',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				id: id
			}, success: function (data) {  
				if(data == 0){
					toastr["error"]('Não pode remover o pdf', "Error - Permissão");		
				}
			}
		})

		$('[data-index-pdf="' + id + '"]').parent().parent().remove()
	})

	///////////////////////////



	///////////////////////////

	$("#tabs").tabs();

	$(document).on('click', '#criarComentarioInBoard', function () {
		var comment = $(this).parent().find('input').val()
		var index = $('input[name="editBoardID"]').attr('data-id-board')
		var prepare = $(this).parent().find('input').val('').focus()

		if (comment != '') {
			$.ajax({
				url: 'ajax/boardaddcomentario',
				method: 'POST',
				dataType: 'json',
				data: {
					update: 1,
					comment: comment,
					index: index
				}, success: function (data) {
					var commentAdd = {};
					$.each(data, function (i, value) {
						commentAdd[i] = value;
					});
					var darkmodecheck = '';
					var darkmodestyle = '';
					if ($('input[name="darkmode"]').val() == 1) { darkmodecheck = 'darkmode'; darkmodestyle = '-webkit-box-shadow: 0px 0px 1px 1px rgba(255,255,255,1); -moz-box-shadow: 0px 0px 1px 1px rgba(255,255,255,1);box-shadow: 0px 0px 1px 1px rgba(255,255,255,1);' }

					if (commentAdd[0] != '0') {
						$('.comentarios').append('' +
							'<div class="card mb-2 body-class ' + darkmodecheck + '" data-id-comentario="' + commentAdd[3] + '" style="' + darkmodestyle + '">' +
							'<div class="card-body d-flex p-2 mt-2" style="padding-bottom: 0px !important;margin-bottom: 0px !important;">' +
							'<div class="ml-3">' +
							'<img id="imgEstiloConta" src="' + commentAdd[0] + '" title="Utilizador: ' + commentAdd[1] + ' | Email: ' + commentAdd[2] + '" alt="Pedimos desculpa pelo o erro" class="mr-2">' +
							'</div>' +
							'<div class="col">' +
							'<input type="text" class="form-control border-0 comentarioAlterarInBoard body-class ' + darkmodecheck + '" value="' + comment + '">' +
							'</div>' +
							'<div class="mr-3 mt-2">' +
							'<i class="fas fa-trash text-secondary apagarTarefaInBoard"></i>' +
							'</div>' +
							'</div>' +
							'<div class="" style="/* margin: 32px 0px 0px 19%; */width:;justify-content: center;align-items: center;display: flex;"><small>Data de criação: ' + commentAdd[4] + '</small></div>' +
							'</div>')
						prepare

						$('.addtarefa').append('' +
							'<tr data-index="' + commentAdd[3] + '" data-position="' + commentAdd[6] + '" class="tableCharge Sem cor">' +
							'<td><i class="far fa-check-circle" style="font-size: 24px;padding: 1%;margin-top: -2px;color:gray"></i><a id="nomeEdit">' + comment + '</a></td>' +
							'<td><img id="imgEstiloConta" src="' + commentAdd[0] + '" title="Utilizador: ' + commentAdd[1] + ' | Email: ' + commentAdd[2] + '" data-index="' + commentAdd[5] + '" alt="Pedimos desculpa pelo o erro"></td>' +
							'<td style="text-align: center;" id="dataVencimentoEdit">Sem dados</td>' +
							'<td><i class="fas fa-circle" id="corEdit" style="color: #DDD;width: 100%;text-align: center;"></i></td>' +
							'<td style="text-align: center;">' +
							'<div style="display: inline-block;margin-left: -19px;margin-right: 10px;">' +
							'<a data-toggle="popover" id="descricaoEdit" data-trigger="hover" data-content="Sem descrição">' +
							'<i class="far fa-eye fa-lg opacityFA" style="width: 21%;text-align: center;padding-left: 7px;padding-top: 12px;"></i>' +
							'</a>' +
							'</div>' +
							'<i class="far fa-edit fa-lg opacityFA modalEdittarefa" data-toggle="modal" data-target="#modalEdittarefa" style="margin-left: 4px;margin-right: 4px;"></i>' +
							'<i class="far fa-trash-alt fa-lg opacityFA removeTarefa"></i>' +
							'</td>' +
							'</tr>');
						$('[data-toggle="popover"]').popover();
						var commentAdd = {};
					} else {
						toastr["error"]('Não tem permissão para alterar/criar', "Error - Permissão");
					}
				}
			});
		}
	})

	$(document).on('keypress', 'input[name="comentarioINPUT"]', function (e) {
		if (e.which == 13) {
			$('#criarComentarioInBoard').click()
		}
	})

	$(document).on('click', '.apagarTarefaInBoard', function () {
		escolha = $(this).parent().parent().parent()
		var idcomment = escolha.attr('data-id-comentario')

		$.ajax({
			url: 'ajax/boardsremovetarefainboard',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				idcomment: idcomment
			}, success: function (data) {  
				if(data == 0){
					toastr["error"]('Não pode apagar a sub-tarefa', "Error - Permissão");		
				} else {
					escolha.remove()
				}
			}
		});

		$('tr[data-index="' + idcomment + '"]').remove()
		var positions = [];

		$('.addtarefa').children().each(function (index) {
			positions.push([$(this).attr('data-index'), $(this).attr('data-position')]);
			$(this).attr('data-position', index + 1)
		});

		$.ajax({
			type: "POST",
			url: "ajax/deletetabelalista",
			dataType: "text",
			data: {
				deltabelaset: 1,
				index: idcomment,
				positions: positions
			}
		});
	})

	$(document).on('focusout', '.comentarioAlterarInBoard', function () {
		var comment = $(this).val();
		var idcomment = $(this).parent().parent().parent().attr('data-id-comentario')

		if (comment != '') {
			$.ajax({
				url: 'ajax/boardsedittarefainboard',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					idcomment: idcomment,
					comment: comment
				}, success: function (data) {
					if (data == 1) {
						$('tr[data-index="' + idcomment + '"]').find('#nomeEdit').text(comment);
					} else {
						toastr["error"]('Não pode alterar o comentário', "Error - Permissão");
					}
				}
			});
		}
	})

	$(document).on('click', '.checkBoardAddEditTarefas', function () {
		var idtarefa = $('input[name="editBoardID"]').attr('data-id-board')
		//var idcoluna = $('input[name="editBoardColunaID"]').attr('data-id-coluna')

		var idcoluna = $('input[name="editBoardColuna"]').attr('data-board-coluna')

		var iduser = $(this).attr('data-index')
		var src = $(this).attr('src')
		var perfil = $(this).attr('title')
		var perfilarray = perfil.split(" ")

		var username = perfilarray[1]
		var email = perfilarray[4]



		if ($(this).css('opacity') == 1) {
			$(this).css({ 'opacity': '50%' })
			$(this).parent().find('i').css('display', 'block')
			$(this).attr('data-ativo', '1')

			$.ajax({
				url: 'ajax/boardprofileassociacao',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					atribuido: iduser
				}, success: function (data) {
					if (data == 1) {
						var escolha_quant = 0
						console.log($('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"] > div:eq(0)').css('display'))
						if ($('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"] > div:eq(0)').css('display') == 'none') {
							$('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"]  > div:eq(1)').switchClass('col-md-11', 'col-md-12')
							escolha_quant = 8
						} else {
							$('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"]  > div:eq(1)').switchClass('col-md-12', 'col-md-11')
							escolha_quant = 6
						}

						var lenghtIMG = $('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils > div:eq(1) > img').length
						$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] > .imgBoardEditAddPerfils').css('display', 'flex')
						if (lenghtIMG != escolha_quant) {
							$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils div:eq(1)').append('<img src="' + src + '" class="imgPerfilTarefa ml-1" data-index="' + iduser + '" title="Utilizador: ' + username + ' | Email: ' + email + '" alt="Pedimos desculpa pelo o erro">')
						}
					} else {
						toastr["error"]('Não pode alterar os membros', "Error - Permissão");
					}
				}
			});
		} else {
			$.ajax({
				url: 'ajax/boardprofileassociacaoremover',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					atribuido: iduser
				}, success: function (data) {
					if (data == 1) {
						$('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"] > div:last-child img[data-index="' + iduser + '"]').remove()
						var lenghtIMG = $('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils .estiloTarefaPerfilAndPlus:eq(1) > img').length
						if (lenghtIMG == 0 && $('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"] > div:eq(0)').css('display') == 'none') {
							$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils .estiloTarefaPerfilAndPlus:eq(1)').css('display', 'none')
							$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils').css('display', 'none')
						}
					} else {
						toastr["error"]('Não pode alterar os membros', "Error - Permissão");
					}
				}
			});
			$(this).css({ 'opacity': '100%' })
			$(this).parent().find('i').css('display', 'none')
			$(this).attr('data-ativo', '0')
		}
	});

	$(document).on('click', '.fa-check', function () {
		$(this).css('display', 'none')
		$(this).parent().parent().find('img').css('opacity', '100%')
		$(this).parent().parent().find('img').attr('data-ativo', '0')

		var idtarefa = $('input[name="editBoardID"]').attr('data-id-board')
		//var idcoluna = $('input[name="editBoardColunaID"]').attr('data-id-coluna')
		var idcoluna = $('input[name="editBoardColuna"]').attr('data-board-coluna')
		var iduser = $(this).parent().parent().find('img').attr('data-index')

		$.ajax({
			url: 'ajax/boardprofileassociacaoremover',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				atribuido: iduser
			}, success: function (data) {
				if (data == 1) {
					$('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"] > div:last-child img[data-index="' + iduser + '"]').remove()
					var lenghtIMG = $('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils .estiloTarefaPerfilAndPlus:eq(1) > img').length
					if (lenghtIMG == 0 && $('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"] > div:eq(0)').css('display') == 'none') {
						$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils .estiloTarefaPerfilAndPlus:eq(1)').css('display', 'none')
						$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils').css('display', 'none')
					}
				} else {
					toastr["error"]('Não pode alterar os membros', "Error - Permissão");
				}
			}
		});
	});

	var prioridadeColor = 0
	var corAtual = ''
	$(document).on('click', '.prioridadeColor', function () {
		var idcoluna = $('input[name="editBoardColuna"]').attr('data-board-coluna')
		var idtarefa = $('input[name="editBoardID"]').attr('data-id-board')

		if (prioridadeColor == 0) {
			$(this).css({ 'height': '40px', 'width': '40px', 'opacity': '0.8' });
			prioridadeColor = 1
			corAtual = $(this).css('background-color')

			//var idcoluna = $('input[name="editBoardColunaID"]').attr('data-id-coluna')


			//Travis J   https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
			var rgb2hex = str => "#" + str.split(',').map(s => (s.replace(/\D/g, '') | 0).toString(16)).map(s => s.length < 2 ? "0" + s : s).join('');
			//
			var corAtualSend = rgb2hex(corAtual)
			var corInfo = ''
			if (corAtualSend == '#eb5a46') { corInfo = 'Emergente' } else if (corAtualSend == '#ff9f1a') { corInfo = 'Urgente' } else if (corAtualSend == '#f2d600') { corInfo = 'Pouco urgente' } else if (corAtualSend == '#519839') { corInfo = 'Normal' }
			$(this).parent().parent().find('a').text(corInfo)

			$.ajax({
				url: 'ajax/boardeditcoloroftarefa',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					corAtual: corAtualSend
				}, success: function (data) {
					if (data != 1) {
						toastr["error"]('Não pode alterar a cor/prioridade', "Error");
					} else {
						var corAtualShow = 'solid 6px ' + corAtual
						$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"]').css('border-left', corAtualShow)
					}
				}
			});
		} else if (prioridadeColor == 1 && $(this).css('background-color') == corAtual) {
			$(this).css('opacity', '1');
			prioridadeColor = 0
			corAtual = ''
			$.ajax({
				url: 'ajax/boardeditcoloroftarefa',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					corAtual: ''
				}, success: function (data) {
					if (data == 1) {
						$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"]').css('border-left', '')
						$(this).parent().parent().find('a').text('Sem prioridade')
					} else {
						toastr["error"]('Não pode alterar a cor/prioridade', "Error");
					}
				}
			});

		}
	})
	$(document).on('mouseover', '.prioridadeColor', function () {
		if (prioridadeColor != 1) {
			$(this).animate({ 'height': '40px', 'width': '40px' });
		}
	})
	$(document).on('mouseout', '.prioridadeColor', function () {
		if (prioridadeColor != 1) {
			$(this).animate({ 'height': '30px', 'width': '30px' });
		}
	})

	$(document).on('click', '#dataEncerramentoEditTarefa', function () {
		if ($(this).text() == 'Retomar tarefa') {
			$.ajax({
				url: 'ajax/boardeditterminartarefachange',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1
				}, success: function (data) {
					if (data == 1) {
						$('#tab3click').click()
						$('.periodosDeTrabalhoEditBoard:eq(0)').switchClass('col-md-4', 'col-md-6')
						$('.periodosDeTrabalhoEditBoard:eq(2)').switchClass('col-md-4', 'col-md-6')
						$('.periodosDeTrabalhoEditBoard:eq(1)').css('display', 'none')
						$('#dataEncerramentoEditTarefa').text('Terminar tarefa')
					} else {
						toastr["error"]('Não pode retomar a tarefa', "Error - Permissão");
					}
				}
			});
		} else {
			$.ajax({
				url: 'ajax/boardeditterminartarefa',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1
				}, success: function (data) {
					if (data != 0) {
						$('#tab3click').click()
						$('.periodosDeTrabalhoEditBoard:eq(0)').switchClass('col-md-6', 'col-md-4')
						$('.periodosDeTrabalhoEditBoard:eq(2)').switchClass('col-md-6', 'col-md-4')
						$('.periodosDeTrabalhoEditBoard:eq(1)').css('display', 'block').find('h4 span').text(data)
						$('#dataEncerramentoEditTarefa').text('Retomar tarefa')
					} else {
						toastr["error"]('Não pode terminar a tarefa', "Error - Permissão");
					}
				}
			});

		}


	})

	/*$(document).on('click', '#dataEncerramentoEditTarefa', function(){
		//$('.periodosDeTrabalhoEditBoard:eq(0)').switchClass('col-md-4', 'col-md-6')
		if($(this).text() == 'Retomar tarefa'){
			$('.periodosDeTrabalhoEditBoard:eq(0)').removeClass('col-md-4')
			//$('.periodosDeTrabalhoEditBoard:eq(0)').switchClass('col-md-4', 'col-md-6')
			//$('.periodosDeTrabalhoEditBoard:eq(2)').switchClass('col-md-4', 'col-md-6')
			//$('.periodosDeTrabalhoEditBoard:eq(1)').css('display','none')
		}
	})*/

	//////////////// UPLOAD FILES

	$(function () {
		var files = $("#files");

		$("#fileupload").fileupload({
			url: 'ajax/uploaddropzonetarefas.php',
			dropZone: '#dropZone',
			dataType: 'json',
			autoUpload: false
		}).on('fileuploadadd', function (e, data) {
			/*var fileTypeAllowed = /.\.(gif|jpg|png|jpeg|docx|pptx|pdf|txt|zip|rar|7z|xlsx)$/i;
			var fileName = data.originalFiles[0]['name'];
			var fileSize = data.originalFiles[0]['size'];

			if (!fileTypeAllowed.test(fileName))
				console.log('ERROR TYPE')
			else if (fileSize > 5000000)
				console.log('ERROR BIG SIZE')
			else {*/
			data.submit();
			//}
		}).on('fileuploaddone', function (e, data) {
			var status = data.jqXHR.responseJSON.status;
			var msg = data.jqXHR.responseJSON.msg;

			if (status == 1) {
				var typePermitImage = ['jpg', 'jpeg', 'png', 'gif'];
				var path = data.jqXHR.responseJSON.path;
				var id = data.jqXHR.responseJSON.id;
				var tipo = data.jqXHR.responseJSON.tipo;
				var filename = data.jqXHR.responseJSON.filename

				/*if($(".ficheirosOFgalaria:eq(1)").length == 0){
					$(".ficheirosOFgalaria:eq(0)").after('<hr class="hr" style="border: 1.2px dashed #0088cc;">')
				}*/

				if ($.inArray(tipo, typePermitImage) >= 0) {
					$('.filesDesignEstrutura').css('display', 'block')
				}

				if ($.inArray(tipo, typePermitImage) != -1) {
					$(".ficheirosOFgalaria:eq(0)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><img style="width: 8pc; height: 8pc;border-top-right-radius: 6px;border-top-left-radius: 6px;" class="modalIMG" src="' + path + '" /><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
				} else if (tipo == 'docx') {
					$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-word text-secondary" data-download-file="' + path + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
				} else if (tipo == 'pdf') {
					$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-pdf text-secondary" data-download-file="' + path + '" data-index-pdf="' + id + '" data-toggle="modal" data-target="#pdfmodal"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a></div></div>');
				} else if (tipo == 'pptx') {
					$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-powerpoint text-secondary" data-download-file="' + path + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
				} else if (tipo == 'xlsx') {
					$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-excel text-secondary" data-download-file="' + path + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
				} else if (tipo == 'zip' || tipo == 'rar' || tipo == '7z') {
					$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-archive text-secondary" data-download-file="' + path + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
				} else {
					$(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-alt text-secondary"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
				}
			} else {
				toastr["error"](msg, "Error - Permissão");
			}
		});
	});

	$(document).on('click', '.divIMGestilo', function () {
		if ($(this).parent().find('button').css('display') == 'none') {
			$(this).parent().find('button').css('display', 'block')
		} else {
			$(this).parent().find('button').css('display', 'none')
		}
	})

	//data-toggle="modal" data-target="#modalIMG"
	/*$(document).on('click', '.modalIMG', function(){
	   var imagem = $(this).attr('src')
	   var id = $(this).attr('data-index-imagem')

	   $('.modalIMGadd').attr('src', imagem)
	   $('.modalIMGadd').attr('data-index-imagem', id)
	})*/

	$(document).on('click', '.apagarIMGbtn', function () {
		var id = $(this).attr('data-index-imagem')
		$(this).parent().parent().remove()
		$.ajax({
			url: 'ajax/apagarimagemboard',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				id: id
			}, success: function (data) {  
				if(data == 0){
					toastr['error']("Não de apagar a imagem","Error - Permissão")
				}
			}
		});
	})

    /*$('#datepickerADD, #datepickerEDIT').keyup(function() {
	   $(this).val('');
	});*/

	$(document).on('click', '.btnEditBoard', function () {
		var filterVal1px = 'blur(1px)';
		var filterVal0px = 'blur(0px)';
		$('.dropdown-menu').css('filter', filterVal1px)
		$('.dropdown-menu').css('filter', filterVal0px)
	})

	$(document).on('focusout', 'textarea[name="task_descricao"]', function () {
		var editboard = $('input[name="editBoardID"]').attr('data-id-board')
		var idtarefa = $('input[name="editBoardID"]').attr('data-id-board')
		var idcoluna = $('input[name="editBoardColuna"]').attr('data-board-coluna')
		
		var descricao = $(this).val()

		if (descricao != '') {

			$.ajax({
				url: 'ajax/updatedescricaoboard',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					descricao: descricao,
					editboard: editboard
				}, success: function (data) {
					if (data == 1) {
						$('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"]').css('display', 'flex')

						$('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"]  > div:eq(1)').switchClass('col-md-12', 'col-md-11')
						$('.imgBoardEditAddPerfils[data-index="' + idtarefa + '"]  > div:eq(0)').css('display', 'block')

						$('.clickActiveDescricaoBoardAumentar[data-index="' + idtarefa + '"] > a').text('').text(descricao)
					} else {
						toastr["error"]('Não pode editar a descrição', "Error - Permissão");
					}
				}
			})


		} else {

			$.ajax({
				url: 'ajax/updatedescricaoboard',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					descricao: descricao,
					editboard: editboard
				}, success: function (data) {
					if (data == 1) {
						if($('.imgBoardEditAddPerfils[data-index="'+idtarefa+'"] > div:eq(1)').css('display') == 'none' || $('.imgBoardEditAddPerfils[data-index="'+idtarefa+'"] > div:eq(1) img').length == 0){
							$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] .imgBoardEditAddPerfils').css('display','none')
						}
			
			
						$('.imgBoardEditAddPerfils[data-index="'+idtarefa+'"]  > div:eq(1)').switchClass('col-md-11','col-md-12')
						$('.imgBoardEditAddPerfils[data-index="'+idtarefa+'"]').find('div:eq(0)').attr('style','margin: 0px;padding-top: 0px;display: none !important;')
						

						$('.clickActiveDescricaoBoardAumentar[data-index="' + idtarefa + '"] > a').text('')
					} else {
						toastr["error"]('Não pode editar a descrição', "Error - Permissão");
					}
				}
			})
		}
	})

	$(document).on('click', '.clickActiveDescricaoBoard', function () {
		if ($(this).parent().parent().find('.clickActiveDescricaoBoardAumentar').css('display') == 'none') {
			$(this).children().attr('src', 'img/board/descricao/minus.png')
			$(this).parent().parent().find('.clickActiveDescricaoBoardAumentar').css('display', 'block')
		} else {
			$(this).children().attr('src', 'img/board/descricao/plus.png')
			$(this).parent().parent().find('.clickActiveDescricaoBoardAumentar').css('display', 'none')
		}
	})

	///////////////////////// Pagamentos

	//qwertymk   https://stackoverflow.com/questions/10855791/javascript-jquery-add-a-character-at-the-end-of-an-input-field
	$.fn.setCursorPosition = function (pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
	//
	//T.J. Crowder   https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	/*function numberWithCommas(x) {
		return x.toString().replace(/\B(?<!\,\d*)(?=(\d{3})+(?!\d))/g, ".");
	}*/
	// Não funciona no Firefox

	var preco_total_value_geral = 0
	var despessas_geral = 0
	$(document).on('click', 'input[name="edit_precototal"], input[name="edit_despessas"]', function () {
		var um = $('input[name="edit_precototal"]').val()
		var dois = $('input[name="edit_despessas"]').val()
		preco_total_value_geral = um.substring(0, um.length - 1)
		despessas_geral = dois.substring(0, dois.length - 1)
	})

	$(document).on('keyup', 'input[name="edit_precototal"]', function () {
		if ($(this).val().split('').pop() !== '€') {
			$(this).val($(this).val() + "€");
			$(this).setCursorPosition($(this).val().length - 1)
		} else if ($(this).val() != '€') {
			$('input[name="edit_pagamento_data"]').removeAttr('disabled')
			$('select[name="edit_pagamento_metodo"]').removeAttr('disabled')
			$('select[name="edit_pagamento_tipo"]').removeAttr('disabled')
			$('input[name="edit_pagamento_valor"]').removeAttr('disabled')
			$('textarea[name="edit_pagamento_observacao"]').removeAttr('disabled')

			$('.limpar_pagamento').removeAttr('disabled')

			if ($('input[name="edit_despessas"]').val() != '' || $('input[name="edit_despessas"]').val() != '€') {
				var um = $(this).val()
				var dois = $('input[name="edit_despessas"]').val()
				var valor_total = um.substring(0, um.length - 1)
				var despesas = dois.substring(0, dois.length - 1)

				var valor_final = parseFloat(valor_total) - parseFloat(despesas)
				if(valor_final < 0) {
					$('input[name="edit_lucro"]').css('border-color', 'red')
				} else {
					$('input[name="edit_lucro"]').css('border-color', '')
				}
				$('input[name="edit_lucro"]').val(valor_final + '€')

				var editboard = $('input[name="editBoardID"]').attr('data-id-board')

				$.ajax({
					url: 'ajax/updatelucroinprecototal',
					method: 'POST',
					dataType: 'text',
					data: {
						update: 1,
						total: valor_total,
						lucro: valor_final,
						editboard: editboard
					}, success: function (data) {  
						if(data == 0){
							[toastr]("Não pode alterar este campo", "Error - Permissão")
						}
					}
				});
			}
		} else if ($(this).val() == '') {
			$(this).val('0€')
			$('input[name="edit_falta_pagar"]').val('0€').css('border-color', '')
			$('input[name="edit_precototal"]').val('0€')
			$('input[name="edit_pagamento_data"]').attr('disabled', 'disabled')
			$('select[name="edit_pagamento_metodo"]').attr('disabled', 'disabled')
			$('select[name="edit_pagamento_tipo"]').attr('disabled', 'disabled')
			$('input[name="edit_pagamento_valor"]').attr('disabled', 'disabled')
			$('textarea[name="edit_pagamento_observacao"]').attr('disabled', 'disabled')
		}
	});

	$(document).on('focusout', 'input[name="edit_precototal"]', function () {
		var um = $(this).val()
		var valor_total = um.substring(0, um.length - 1)

		if ($(this).val() == '0€' || $(this).val() == '0' || $(this).val() == '€') {
			$('input[name="edit_pagamento_data"]').attr('disabled', 'disabled')
			$('select[name="edit_pagamento_metodo"]').attr('disabled', 'disabled')
			$('select[name="edit_pagamento_tipo"]').attr('disabled', 'disabled')
			$('input[name="edit_pagamento_valor"]').attr('disabled', 'disabled')
			$('textarea[name="edit_pagamento_observacao"]').attr('disabled', 'disabled')
			$(this).val('0€')
			$('input[name="edit_falta_pagar"]').val('0€').css('border-color', '')
		} else if (preco_total_value_geral != valor_total) {
			var tres = $('input[name="edit_falta_pagar"]').val()
			var falta_pagar = tres.substring(0, tres.length - 1)

			var editboard = $('input[name="editBoardID"]').attr('data-id-board')

			if (valor_total > preco_total_value_geral) {
				var subida = parseFloat(valor_total) - parseFloat(preco_total_value_geral)
				var soma = parseFloat(falta_pagar) + parseFloat(subida)
				if(soma < 0) {
					$('input[name="edit_falta_pagar"]').css('border-color', 'red')
				} else {
					$('input[name="edit_falta_pagar"]').css('border-color', '')
				}
				$('input[name="edit_falta_pagar"]').val(soma + '€')

				$.ajax({
					url: 'ajax/updateprecototal',
					method: 'POST',
					dataType: 'text',
					data: {
						update: 1,
						total: valor_total,
						falta_pagar: soma,
						editboard: editboard
					}, success: function (data) {
						if (data == 0) {
							toastr["error"]('Não pode alterar preço total', "Error - Permissão");
						}
					}
				});
			} else {
				var descer = parseFloat(preco_total_value_geral) - parseFloat(valor_total)

				var divisao = parseFloat(falta_pagar) - parseFloat(descer)
				if(divisao < 0) {
					$('input[name="edit_falta_pagar"]').css('border-color', 'red')
				} else {
					$('input[name="edit_falta_pagar"]').css('border-color', '')
				}
				$('input[name="edit_falta_pagar"]').val(divisao + '€')

				$.ajax({
					url: 'ajax/updateprecototal',
					method: 'POST',
					dataType: 'text',
					data: {
						update: 1,
						total: valor_total,
						falta_pagar: divisao,
						editboard: editboard
					}, success: function (data) {
						if (data == 0) {
							toastr["error"]('Não pode alterar preço total', "Error - Permissão");
						}
					}
				});
			}
		}
	})

	$(document).on('keyup', 'input[name="edit_pagamento_valor"]', function () {
		if ($(this).val().split('').pop() !== '€') {
			$(this).val($(this).val() + "€");
			$(this).setCursorPosition($(this).val().length - 1)
		}
	})

	$(document).on('keyup', 'input[name="edit_despessas"]', function () {
		if ($(this).val().split('').pop() !== '€') {
			$(this).val($(this).val() + "€");
			$(this).setCursorPosition($(this).val().length - 1)
		} else if ($(this).val() != '€') {
			var um = $(this).val()
			var dois = $('input[name="edit_precototal"]').val()
			var valor_total = dois.substring(0, dois.length - 1)
			var despesas = um.substring(0, um.length - 1)

			var valor_final = valor_total - despesas
			if(valor_final < 0) {
				$('input[name="edit_lucro"]').css('border-color', 'red')
			} else {
				$('input[name="edit_lucro"]').css('border-color', '')
			}
			$('input[name="edit_lucro"]').val(valor_final + '€')

			var editboard = $('input[name="editBoardID"]').attr('data-id-board')

			$.ajax({
				url: 'ajax/updatelucroindespessas',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					lucro: valor_final,
					despesas: despesas,
					editboard: editboard
				}, success: function (data) {
					if (data == 0) {
						toastr["error"]('Não pode alterar as despessas', "Error - Permissão");
					}
				}
			});
		} else if ($(this).val() == '') {
			$(this).val('0€')
		}
	})

	$(document).on('focusout', 'input[name="edit_despessas"]', function () {
		if ($(this).val() == '€') {
			$(this).val('0€')
		}
	})

	$(document).on('keyup', 'input[name="edit_lucro"]', function () {
		if ($(this).val().split('').pop() !== '€') {
			$(this).val($(this).val() + "€");
			$(this).setCursorPosition($(this).val().length - 1)
		}
	})

	$(document).on('keyup', 'input[name="edit_pagamento_valor"]', function () {
		if ($(this).val() != '') {
			$('.add_pagamento').removeAttr('disabled')
			$('.limpar_pagamento').removeAttr('disabled')
		} else {
			$('.add_pagamento').attr('disabled', 'disabled')
			$('.limpar_pagamento').attr('disabled', 'disabled')
		}
	})

	$(document).on('click', '.limpar_pagamento', function () {
		$('input[name="edit_pagamento_data"]').val('')
		$('input[name="edit_pagamento_valor"]').val('')
		$('textarea[name="edit_pagamento_observacao"]').val('')
	})

	$(document).on('click', '.add_pagamento', function () {
		if ($('input[name="edit_pagamento_data"]').val() == '') {
			$('input[name="edit_pagamento_data"]').focus()
		} else if ($('input[name="edit_pagamento_valor"]').val() == '€' || $('input[name="edit_pagamento_valor"]').val() == '0€') {
			$('input[name="edit_pagamento_valor"]').focus()
		} else {
			var data = $('input[name="edit_pagamento_data"]').val()
			var metodo_pagamento = $('select[name="edit_pagamento_metodo"] option:selected').text()
			var tipo_pagamento = $('select[name="edit_pagamento_tipo"] option:selected').text()
			var valor = $('input[name="edit_pagamento_valor"]').val()
			var observacao = $('textarea[name="edit_pagamento_observacao"]').val()

			var um = $('input[name="edit_valor_pago"]').val()
			var dois = $('input[name="edit_precototal"]').val()
			var valor_pago = um.substring(0, um.length - 1)
			var valor_done = valor.substring(0, valor.length - 1)
			var valor_total = dois.substring(0, dois.length - 1)

			var pago = parseFloat(valor_pago) + parseFloat(valor_done)

			var falta_pagar = parseFloat(valor_total) - parseFloat(pago)

			if(falta_pagar < 0) {
				$('input[name="edit_falta_pagar"]').css('border-color', 'red')
			} else {
				$('input[name="edit_falta_pagar"]').css('border-color', '')
			}

			$('input[name="edit_valor_pago"]').val(pago + '€')
			$('input[name="edit_falta_pagar"]').val(falta_pagar + '€')

			$('.limpar_pagamento').click()

			var idboardatual = $('input[name="editBoardID"]').attr('data-id-board')

			//perfil dados

			var imageurl = $('.perfilContaTopMenu').attr('src')
			var iduser = $('.perfilContaTopMenu').attr('data-index')
			var titlePerfil = $('.perfilContaTopMenu').attr('title')
			var titlesplit = titlePerfil.split(" ")

			var username = titlesplit[1]
			var email = titlesplit[4]

			$('.pagamento_tabela_inicio').css('display', 'block')

			$.ajax({
				url: 'ajax/addpagamentos',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					idboardatual: idboardatual,
					data: data,
					metodo_pagamento: metodo_pagamento,
					tipo_pagamento: tipo_pagamento,
					valor: valor,
					observacao: observacao,
					pago: pago,
					falta_pagar: falta_pagar
				}, success: function (index) {
					if (index != 0) {
						$('.pagamento_tabela').append('' +
							'<tr data-index="' + index + '">' +
							'<td><img id="imgEstiloConta" src="' + imageurl + '" class="perfilContaTopMenu"" data-index="' + iduser + '" title="Utilizador: ' + username + ' | Email: ' + email + '" alt="Pedimos desculpa pelo o erro"></td>' +
							'<td style="width:8pc;">' + data + '</td>' +
							'<td>' + metodo_pagamento + '</td>' +
							'<td style="style="word-break: normal">' + tipo_pagamento + '</td>' +
							'<td>' + valor + '</td>' +
							'<td nowrap style="white-space: normal;word-break: break-all;">' + observacao + '</td>' +
							'<td><i class="fas fa-trash removerPagamento text-secondary fa-lg d-flex justify-content-center align-items-center"></i></td>' +
							'</tr>')
					} else {
						toastr["error"]('Não pode adicionar um novo pagamento', "Error - Permissões");
					}
				}
			});
			pago = 0
		}
	})

	$(document).on('focusout', '#addBoardName', function () {
		var nometarefa = $(this).val()
		var idtarefa = $('input[name="editBoardID"]').attr('data-id-board')
		//var idcoluna = $('input[name="editBoardColunaID"]').attr('data-id-coluna')
		var idcoluna = $('input[name="editBoardColuna"]').attr('data-board-coluna')

		$.ajax({
			url: 'ajax/updatetarefanome',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				idboardatual: idtarefa,
				nometarefa: nometarefa
			}, success: function (data) {
				if (data == 0) {
					toastr["error"]('Não tem permissão para alterar o nome da tarefa', "Error");
				} else {
					$('.style_boards:eq(' + (idcoluna - 1) + ')').find('#sortable' + idcoluna + ' > div[data-index="' + idtarefa + '"] > divs > div > span').text(nometarefa)
				}
			}
		});
	})




	$(document).on("click", ".addBoardInColuna", function () {
		var takeBoardName = $(this).parent().parent().find('input[type="text"]').val()
		var categoria = $(this).parent().parent().parent().find('.editBoardClick').data('board-categoria')
		var id = $(this).parent().parent().parent().find('.editBoardClick').data('index')
		var lengthMax = ($('.addBoardInColuna:eq(' + (categoria - 1) + ')').parent().parent().parent().find('#sortable' + categoria + ' > div').length) + 1

		$.ajax({
			url: 'ajax/boardsadd',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				takeBoardName: takeBoardName,
				lengthMax: lengthMax,
				id: id
			}, success: function (data) {
				var splitboard = data.split(" ")
				var deleteShow = ''
				var bloquearboard = ''
				console.log(splitboard)
				if (splitboard[1] == 1) { deleteShow = '<button class="ml-1" style="background-color:#ebecf0;border:#ebecf0;outline: none;padding: 0 !important;"><i class="fas fa-trash opacityFA apagarBoard"></i></button>' }
				if (splitboard[2] == 0) { bloquearboard = 'ui-state-disabled' }
				if (splitboard[0] != 0) {
					$('.addBoardInColuna:eq(' + (categoria - 1) + ')').parent().parent().parent().find('#sortable' + categoria).append('' +
						'<div class="ui-state-default selectDesactive ' + bloquearboard + '" data-index="' + splitboard[0] + '" data-categoria="' + categoria + '" data-position="' + lengthMax + '" style="border-radius: 7px 7px 7px 7px;">' +
							'<divs style="display: block;">' +
								'<div class="clickActiveBoardEdit" style="display: inline-flex;">' +
									'<span style="margin-left: 6px;" class="boardTakeName">' + takeBoardName + '</span>' +
								'</div>' +
								'<div style="display: inline-flex;padding: 0;float: right;margin-right: 10px;margin-top: 8px;">' +
									'<button style="background-color:#ebecf0;border:#ebecf0;outline: none;padding: 0!important;"><i class="fas fa-edit opacityFA modalEditBoard" data-toggle="modal" data-target="#modalEditBoard"></i></button>' +
									deleteShow +
									'<i class="fas fa-play ml-2 playTimeBoard" style="display: flex;justify-content: center;align-items: center;margin-top: 2px;color: #696969;"></i>' +
								'</div>' +
							'</divs>' +
							'<div class="row imgBoardEditAddPerfils" data-index="' + splitboard[0] + '" style="margin: 0;padding-top: 0;display:none;">'+
                              '<div class="col-md-1 estiloTarefaPerfilAndPlus clickActiveDescricaoBoard" style="margin: 0;padding-top: 0;display:none !important;">'+
							  '<img class="imgPlusMinusBoard" src="img/board/descricao/plus.png">'+
								  ' </div>'+
							  ' <div class="col-md-12 estiloTarefaPerfilAndPlus d-inline-flex justify-content-end" style="margin: 0;padding-top: 0;display:none;"></div>'+
							  '</div>'+
							'<div class="clickActiveDescricaoBoardAumentar mt-0" data-index="' + splitboard[0] + '" style="font-size: 14px;margin: 0;display:none">'+
							'<a></a>'+
							'</div>'+
						'</div>')
					$('.addBoardInColuna:eq(' + (categoria - 1) + ')').parent().parent().find('input[type="text"]').val('')
					$('.addBoardInColuna:eq(' + (categoria - 1) + ')').parent().parent().css('display', 'none')
				} else {
					toastr["error"]('Não tem permissão para adicionar a tarefa', "Error - Permissão");
				}
			}
		});
	});

	$(document).on('keypress', 'input[name="enterAddBoardInColuna"]', function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			$(this).parent().find('span button').click()
		}
	});

	$(document).on("click", ".apagarBoard", function () {
		var escolha = $(this).parent().parent().parent().parent().parent().parent()
		var categoria = escolha.find('.editBoardClick').data('board-categoria')
		var lengthMax = (escolha.find('#sortable' + categoria + ' > div').length) - 1
		var idBoard = $(this).parent().parent().parent().parent().data('index')
		var id = $(this).parent().parent().parent().parent().parent().parent().find('.editBoardClick').data('index')

		if(confirm('Deseja apagar a tarefa?')){
			var positions = []
			var count = 1
			escolha.find('#sortable' + categoria + ' > div').each(function (index) {
				var id = $(this).data('index');
				$(this).attr('data-position', count)
				positions.push([id, count]);
				if ($(this).attr('data-categoria') != categoria) $(this).attr('data-categoria', categoria)
				++count
			});

			$.ajax({
				url: 'ajax/boardsremoveboard',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					categoria: categoria,
					lengthMax: lengthMax,
					idBoard: idBoard,
					positions: positions,
					id: id
				}, success: function (data) {
					if (data == 0) {
						toastr["error"]('Não tem permissão para apagar a tarefa', "Error - Permissão");
					} else {
						$('.style_boards:eq(' + (categoria - 1) + ') > #sortable' + categoria + ' > [data-index="' + idBoard + '"]').remove();
					}
				}
			});
		}
	})

	/////////////////////////

	var timerON = 0;
	var timer = new Timer();
	var currentParaGlobal = '';

	$(document).on('click', '.playTimeBoard', function () {
		if ($(this).hasClass('fa-play')) {
			var perm = 1
			timerON = 1
			$.ajax({
				url: 'ajax/verificarperm',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					arrayposition: 9
				}, success: function (data) {
					if (data == 0) {
						perm = 0
						toastr["error"]('Não tem permissão para contabilizar o seu tempo', "Error - Permissão");
					}
				}
			})

			if (perm != 0) {
				$('.playTimeBoard').css('display', 'none').parent().css('margin-left', '16px')
				$(this).css({
					'display': 'block',
					'margin-top': '6px',
				}).switchClass("fa-play", "fa-pause").parent().css('margin-left', '0px')

				// Top menu time
				var name = $(this).parent().parent().parent().find('span').text()
				var idtarefa = $(this).parent().parent().parent().attr('data-index')

				timer.start();

				var currentTime = new Date();
				var currentYear = currentTime.getFullYear();
				var currentMonth = ("0" + (currentTime.getMonth() + 1)).slice(-2)
				var currentDay = currentTime.getDate();
				var currentHours = currentTime.getHours();
				var currentMinutes = currentTime.getMinutes();
				//var currentSeconds = currentTime.getSeconds();
				currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
				//currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;    
				/*var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";    
				currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;    
				currentHours = ( currentHours == 0 ) ? 12 : currentHours;*/
				var currentDia = currentDay + "-" + currentMonth + "-" + currentYear;
				var currentHora = currentHours + ":" + currentMinutes;
				currentParaGlobal = currentDia + ' ' + currentHora;

				$('.playTimeTopMenu').find('bname').text(name)
				$('.playTimeTopMenu').find('time').attr('data-index-tarefa', idtarefa)
				$('.playTimeTopMenu').fadeIn()
			}
		} else {
			timer.stop();
			timerON = 0
			var timeAtual = $('.playTimeTopMenu').find('time').text()
			var idtarefa = $('.playTimeTopMenu').find('time').attr('data-index-tarefa')
			var imageUrl = $('.perfilContaTopMenu').attr('data-imageurl')


			var currentTime = new Date();
			var currentYear = currentTime.getFullYear();
			var currentMonth = ("0" + (currentTime.getMonth() + 1)).slice(-2)
			var currentDay = currentTime.getDate();
			var currentHours = currentTime.getHours();
			var currentMinutes = currentTime.getMinutes();
			//var currentSeconds = currentTime.getSeconds();
			currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
			//currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;    
			/*var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";    
			currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;    
			currentHours = ( currentHours == 0 ) ? 12 : currentHours;*/
			var currentDia = currentDay + "-" + currentMonth + "-" + currentYear;
			var currentHora = currentHours + ":" + currentMinutes;
			var currentTimeAll = currentDia + ' ' + currentHora;

			$.ajax({
				url: 'ajax/addtimeintable',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					idtarefa: idtarefa,
					timeAtual: timeAtual,
					imageUrl: imageUrl,
					currentDe: currentTimeAll,
					currentPara: currentParaGlobal
				}, success: function(data){
					console.log(data)
				}, error: function(data){
					console.log('teste: '+data)
				}
			})

			$(this).switchClass("fa-pause", "fa-play").parent().css('margin-left', '0px')
			$('.playTimeBoard').css({
				'display': 'block',
				'margin-top': '6px'
			}).parent().css('margin-left', '0')

			// Top menu time
			$('.playTimeTopMenu').fadeOut()
		}
	})

	$(document).on('click', '.playTimeBoardTopMenuPause', function () {
		timer.stop();
		timerON = 0
		var timeAtual = $('.playTimeTopMenu').find('time').text()
		var idtarefa = $('.playTimeTopMenu').find('time').attr('data-index-tarefa')
		var imageUrl = $('.perfilContaTopMenu').attr('data-imageurl')


		var currentTime = new Date();
		var currentYear = currentTime.getFullYear();
		var currentMonth = ("0" + (currentTime.getMonth() + 1)).slice(-2)
		var currentDay = currentTime.getDate();
		var currentHours = currentTime.getHours();
		var currentMinutes = currentTime.getMinutes();
		//var currentSeconds = currentTime.getSeconds();
		currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
		//currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;    
		/*var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";    
		currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;    
		currentHours = ( currentHours == 0 ) ? 12 : currentHours;*/
		var currentDia = currentDay + "-" + currentMonth + "-" + currentYear;
		var currentHora = currentHours + ":" + currentMinutes;
		var currentTimeAll = currentDia + ' ' + currentHora;

		$.ajax({
			url: 'ajax/addtimeintable',
			method: 'POST',
			dataType: 'JSON',
			data: {
				update: 1,
				idtarefa: idtarefa,
				timeAtual: timeAtual,
				imageUrl: imageUrl,
				currentDe: currentTimeAll,
				currentPara: currentParaGlobal
			}
		})

		//$(this).switchClass("fa-pause", "fa-play").parent().css('margin-left','0px')
		$('.playTimeBoard').css({
			'display': 'block',
			'margin-top': '6px'
		}).switchClass("fa-pause", "fa-play").parent().css('margin-left', '0')

		// Top menu time
		$('.playTimeTopMenu').fadeOut()
	})

	timer.addEventListener('secondsUpdated', function (e) {
		$('.playTimeTopMenu').find('time').html(timer.getTimeValues().toString());
	});

	timer.addEventListener('started', function (e) {
		$('.playTimeTopMenu').find('time').html(timer.getTimeValues().toString());
	});


	window.onscroll = function () { myFunction() };
	var header = document.getElementById("adjustMenuTOPTime");
	var sticky = header.offsetTop;

	function myFunction() {
		if (window.pageYOffset > sticky) {
			header.classList.add("timeAdjust");
		}
		else {
			header.classList.remove("timeAdjust");
		}
	}

	//Gestor de salário

	$(document).on('change', '#tipoTrabalhador', function () {
		var tipoTrabalhador = $('#tipoTrabalhador option:selected').text()

		if (tipoTrabalhador == 'Externo') {
			$('input[name="salarioGestorSalario"]').parent().find('label').text('Salário (0€/h)')
		} else {
			$('input[name="salarioGestorSalario"]').parent().find('label').text('Salário (€)')
		}
	})

	$(document).on('click', '.edittrabalhador', function () {
		var index = $(this).parent().parent().parent().parent().data('index')
		//limpar campos
		$('#tipoTrabalhador option:eq(0)').prop('selected', true)
		$('input[name="salarioGestorSalario"]').val('0€')
		$('#editActiveCliente').prop('checked', false)
		$('#infoGestorSalario').html('')
		//
		if ($('input[name="iniciogestaosalarios"]').val() != '' || $('input[name="fimgestaosalarios"]').val() != '') {
			//limpar campos
			$('#tipoTrabalhador option:eq(0)').prop('selected', true)
			$('input[name="salarioGestorSalario"]').val('0€')
			$('#editActiveCliente').prop('checked', false)
			$('#infoGestorSalario').html('')
			//
			$('input[name="indexgestorsalario"]').attr('data-index', index)

			$.ajax({
				url: 'ajax/editgestorsalariotake',
				method: 'POST',
				dataType: 'JSON',
				data: {
					update: 1,
					index: index
				}, success: function (data) {
					var gestaoSalarioShow = {};
					$.each(data, function (i, value) {
						gestaoSalarioShow[i] = value;
					});

					$('#tipoTrabalhador option:eq(' + gestaoSalarioShow[0] + ')').prop('selected', true)
					if (gestaoSalarioShow[0] == 1) { $('input[name="salarioGestorSalario"]').parent().find('label').text('Salário (0€/h)') } else { $('input[name="salarioGestorSalario"]').parent().find('label').text('Salário (€)') }
					$('input[name="salarioGestorSalario"]').val((gestaoSalarioShow[1] == '' || gestaoSalarioShow[1] == null) ? '0€' : gestaoSalarioShow[1] + '€')

				}
			})
		} else {
			toastr["error"]('Precisa de existir dias úteis', "Error");
		}
	})

	$(document).on('keyup', 'input[name="salarioGestorSalario"]', function () {
		if ($(this).val().split('').pop() !== '€') {
			$(this).val($(this).val() + "€");
			$(this).setCursorPosition($(this).val().length - 1)
		} else if ($(this).val() == '') {
			$(this).val('0€')
		}
	});

	$(document).on('focusout', 'input[name="salarioGestorSalario"]', function () {
		if ($(this).val() == '€') {
			$(this).val('0€')
		}
	});

	$(document).on('click', '#gestorSalarioEdit', function () {
		if ($('input[name="iniciogestaosalarios"]').val() != '' || $('input[name="fimgestaosalarios"]').val() != '') {
			var tipoTrabalhador = $('#tipoTrabalhador option:selected').text()
			var salarioIn = $('input[name="salarioGestorSalario"]').val()
			var salario = salarioIn.substring(0, salarioIn.length - 1)
			var editActiveCliente = $('#editActiveCliente').prop('checked')
			var index = $('input[name="indexgestorsalario"]').attr('data-index')

			if (salario == '' || salario == '0') {
				$('#infoGestorSalario').html('<p style="color: #ff7274">Campo incorrecto</p>')
				$('input[name="salarioGestorSalario"]').val('').focus()
			} else if (editActiveCliente) {
				$('#infoGestorSalario').html('<p style="color: green">Confirmado</p>')
				var salarioGeral = ''
				var salarioGeralTrate = ''
				var aspetoSalario = ''
				var tipoTrabalhadorDepende = ''
				var diasuteis = null
				if (tipoTrabalhador == 'Interno') {
					tipoTrabalhadorDepende = '1'
					salarioGeral = 'salario_mensal'
					salarioGeralTrate = 'salario_semanal'
					aspetoSalario = salario + '€'
					diasuteis = $('.diasuteisshow').text()

				} else {
					tipoTrabalhadorDepende = '2'
					salarioGeral = 'salario_semanal'
					salarioGeralTrate = 'salario_mensal'
					aspetoSalario = salario + '€/h'
				}

				$.ajax({
					url: 'ajax/editgestorsalario',
					method: 'POST',
					dataType: 'text',
					data: {
						update: 1,
						salarioGeral: salarioGeral,
						salarioGeralTrate: salarioGeralTrate,
						tipoTrabalhadorDepende: tipoTrabalhadorDepende,
						index: index,
						tipoTrabalhador: tipoTrabalhador,
						salario: salario,
						diasuteis: diasuteis
					}, success: function () {
						$('.gestorSalario[data-index="' + index + '"] > div:eq(1) > label:eq(1)').text(tipoTrabalhador)
						$('.gestorSalario[data-index="' + index + '"] > div:eq(2) div label').text(aspetoSalario)
						if (tipoTrabalhador == 'Interno') {
							$('.gestorSalario[data-index="' + index + '"] > div:eq(3) label:eq(1)').text((diasuteis == '1') ? diasuteis + ' dia' : diasuteis + ' dias')
						}
					}
				})
				$('.btnClose').click()
			} else {
				$('#infoGestorSalario').html('<p style="color: #ff7274">Precisa de permitir a gestão de membros</p>')
			}
		} else {
			toastr["error"]('Precisa de existir dias úteis', "Error");
		}
	})

	$(document).on('click', '.edittrabalhadorClean', function () {
		var $this = $(this)
		$this.parent().parent().parent().parent().find('div:eq(2) label:eq(1)').text('Sem dados')
		$this.parent().parent().parent().parent().find('div:eq(3) div label').text('Sem dados')
		$this.parent().parent().parent().parent().find('div:eq(4) label').text('Sem dados')
		$this.parent().parent().parent().parent().find('div:eq(5) div label').text('Sem dados')
		$this.parent().parent().parent().parent().find('div:eq(8) label').text('Sem dados')
		$this.parent().parent().parent().parent().find('div:eq(7) label:eq(1)').text('Sem dados')
		var index = $this.parent().parent().parent().parent().attr('data-index')

		$.ajax({
			url: 'ajax/cleangestorsalarioone',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				index: index
			}
		})
	})

	$(document).on('focusout', 'input[name="iniciogestaosalarios"]', function () {
		if ($(this).val() != '' && $('input[name="fimgestaosalarios"]').val() != '') {
			$.ajax({
				url: 'ajax/diasuteis',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					data1: $(this).val(),
					date2: $('input[name="fimgestaosalarios"]').val(),
					feriados: ($('input[name="feriadosgestaosalarios"]').val() == '') ? 0 : $('input[name="feriadosgestaosalarios"]').val()
				}, success: function (data) {
					$('.diasuteisshow').text(data)
				}
			})
		}
	})
	$(document).on('focusout', 'input[name="fimgestaosalarios"]', function () {
		if ($(this).val() != '' && $('input[name="iniciogestaosalarios"]').val() != '') {
			$.ajax({
				url: 'ajax/diasuteis',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					data1: $('input[name="iniciogestaosalarios"]').val(),
					date2: $(this).val(),
					feriados: ($('input[name="feriadosgestaosalarios"]').val() == '') ? 0 : $('input[name="feriadosgestaosalarios"]').val()
				}, success: function (data) {
					$('.diasuteisshow').text(data)
				}
			})
		}
	})
	$(document).on('focusout', 'input[name="feriadosgestaosalarios"]', function () {
		if ($('input[name="fimgestaosalarios"]').val() != '' && $('input[name="iniciogestaosalarios"]').val() != '') {
			$.ajax({
				url: 'ajax/diasuteis',
				method: 'POST',
				dataType: 'text',
				data: {
					update: 1,
					data1: $('input[name="iniciogestaosalarios"]').val(),
					date2: $('input[name="fimgestaosalarios"]').val(),
					feriados: ($(this).val() == '') ? 0 : $(this).val()
				}, success: function (data) {
					$('.diasuteisshow').text(data)
				}
			})
		}
	})

	$(document).on('click', '.reiniciarSalarios', function () {
		var positions = [];
		$('.gestorSalario').each(function () {
			positions.push($(this).attr('data-index'))
			$(this).find('div:eq(2) label:eq(1)').text('Sem dados')
			$(this).find('div:eq(3) div label').text('Sem dados')
			$(this).find('div:eq(4) label').text('Sem dados')
			$(this).find('div:eq(5) div label').text('Sem dados')
			$(this).find('div:eq(7) label:eq(1)').text('Sem dados')
			$(this).find('div:eq(8) label').text('Sem dados')
		});

		$('input[name="iniciogestaosalarios"]').val('')
		$('input[name="fimgestaosalarios"]').val('')
		$('input[name="feriadosgestaosalarios"]').val('')
		$('.diasuteisshow').text('0')

		$.ajax({
			url: 'ajax/limparsalarios',
			method: 'POST',
			dataType: 'text',
			data: {
				update: 1,
				positions: positions
			}
		})
	})
});