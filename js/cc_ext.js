;(function(){


	var currLevel = 0;

	var bgLevel = [
		 450,
		 800,
		1800,  // 256
		4000,  // 512
		5800,  // 512+256
		7000,  // mid
		9000,  // 1024  
		12000,
		14000,
		16000,
		20000,
	];


	/* 顯示效果
	 */
	function runParticle(tiles){
		tiles.forEach(function(element, index, array){ });
	}
	
	
	function switchBgByScore(score){
	
		undo_var.total = 1+ Math.floor(score / 5000);
		undo_var.avail = undo_var.total - undo_var.used;
		$('.-action-undo .val').text(undo_var.avail);
		if(undo_var.avail > 0) $('.-action-undo').addClass('-lightup');
		else $('.-action-undo').removeClass('-lightup');
	
		$w = $("#cc_bg_wrapper");
	
		$w.removeClass("bg-450 bg-900 bg-1800 bg-4000 bg-5800")
			.removeClass("bg-7000 bg-9000 bg-12000 bg-14000")
			.removeClass("bg-16000 bg-20000 bg-22000 bg-24000")
			.removeClass("bg-26000 bg-28000 bg-30000 bg-33000")
			.removeClass("bg-35000 bg-38000 bg-45000");
		
		var c = '';
		
		if(score > 450)  {c = "bg-450";}
		if(score > 900)  {c = "bg-900";}
		if(score > 1800) {c = "bg-1800";}
		if(score > 4000) {c = "bg-4000";}
		if(score > 5800) {c = "bg-5800";}
		if(score > 7000) {c = "bg-7000";}
		if(score > 9000) {c = "bg-9000";}
		if(score > 12000){c = "bg-12000";}
		if(score > 14000){c = "bg-14000";}
		if(score > 16000){c = "bg-16000";}
		if(score > 20000){c = "bg-20000";}
		if(score > 22000){c = "bg-22000";}
		if(score > 24000){c = "bg-24000";}
		if(score > 26000){c = "bg-26000";}
		if(score > 28000){c = "bg-28000";}
		if(score > 30000){c = "bg-30000";}
		if(score > 33000){c = "bg-33000";}
		if(score > 35000){c = "bg-33000";}
		if(score > 38000){c = "bg-38000";}
		if(score > 45000){c = "bg-45000";}
		
		$w.addClass(c);
	
	}
	
	
	/* chu
	 */
	var ci   = Math.floor(Math.random() * 8 + 1);
	var cmax = 8;
	 
	function chu(){
		var a = $("#cc_clairetalk").hasClass("-ani");
		if(a == false){
		    if(++ci > cmax) ci = 1;
			$("#cc_clairetalk").addClass("-ani");
			$("#cc_clairetalk").addClass("t" + ci);
			setTimeout(function(){
				$("#cc_clairetalk").removeClass("-ani");
				$("#cc_clairetalk").removeClass("t" + ci);
			}, 3900);
		}
		
		// console.log(gm.serialize());
		// console.log(gm.storageManager.getUndoState());
	}
	
	$("#cc_claire").click(function(){chu();});
	
	
	/* 顯示 / 隱藏
	 */
	
	function showColor(){}
	
	function toggleNum(){}
	 
	$(".-action-showcolor").click(function(){
		if($(this).hasClass('-active')){
			$(this).removeClass('-active');
			$('body').addClass('cc_c');
		}else{
			$(this).addClass('-active');
			$('body').removeClass('cc_c');
		}
	});
	
	$(".-action-shownum").click(function(){
		if($(this).hasClass('-active')){
			$(this).removeClass('-active');
			$('body').addClass('cc_hn');
		}else{
			$(this).addClass('-active');
			$('body').removeClass('cc_hn');
		}
	});
	
	
	/* CC 儲存設定
	 */
	function config_save(){
	
	}
	
	function config_load(){
	
	}
	
	
	/* CC 遊戲高分榜
	 */
	function config_save(){
	
	}
	
	function config_load(){
	
	}
	
	/* CC 背景瀏覽器
	 */
	function config_save(){
	
	}
	
	function config_load(){
	
	}
	
	
	/* 記錄點
	 */
	var checkpoint;
	
	function checkpoint_set(){
	}
	
	function checkpoint_use(){
	}
	
	
	/* CC undo
	 */
	var undo_var = {
		total : 1,
		used  : 0,
		avail : 0
	};
	var undo_max_step = 5;
	var undo_steps = [];
	var undo_stat  = null;
	
	function undo_setstat(undo_var2){
		undo_var = undo_var2;
	}
	
	function undo_getstat(){
		return undo_stat;
	}
	
	function undo_reset(){
		undo_var.total = 1;
		undo_var.used  = 0;
		undo_var.avail = 0;
		undo_max_step = 5;
		undo_steps = [];
		undo_stat  = null;
		undo_var.avail = undo_var.total - undo_var.used;
		$('.-action-undo .val').text(undo_var.avail);
		if(undo_var.avail > 0) $('.-action-undo').addClass('-lightup');
		else $('.-action-undo').removeClass('-lightup');
		gm.storageManager.setUndoState(undo_var);
	}
	
	function undo_add(status){
		undo_steps.push(status);
		if(undo_steps.length > undo_max_step) undo_steps.shift();
		undo_var.avail = undo_var.total - undo_var.used;
		$('.-action-undo .val').text(undo_var.avail);
		if(undo_var.avail > 0) $('.-action-undo').addClass('-lightup');
		else $('.-action-undo').removeClass('-lightup');
		gm.storageManager.setUndoState(undo_var);
	}
	
	function undo_use(){
		if(undo_steps.length == 0) return;
		if(undo_var.avail == 0) return;
		undo_stat = undo_steps.pop();
		gm.storageManager.clearGameState();
		gm.actuator.continueGame();
		gm.setup();
		undo_stat = null;
		++undo_var.used;
		undo_var.avail = undo_var.total - undo_var.used;
		$('.-action-undo .val').text(undo_var.avail);
		if(undo_var.avail > 0) $('.-action-undo').addClass('-lightup');
		else $('.-action-undo').removeClass('-lightup');
		gm.storageManager.setUndoState(undo_var);
	}
	
	$('.-action-undo').click(function(){ undo_use(); });

	
	window.cc_ext = {
		runParticle     : runParticle,
		switchBgByScore : switchBgByScore,
		
		undo : {
		    setstat : undo_setstat,
		    stat    : undo_getstat,
			reset   : undo_reset,
			add     : undo_add,
			use     : undo_use
		}
	};

})(jQuery);