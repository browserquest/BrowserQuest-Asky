
define(['jquery', 'app'], function($, App) {
    var app, game;

    var initApp = function() {
        $(document).ready(function() {
        	app = new App();
            app.center();

            $('#container').bind("contextmenu", function(e){
                e.preventDefault();
            });
        
            if(Detect.isWindows()) {
                // Workaround for graphical glitches on text
                $('body').addClass('windows');
            }
            
            if(Detect.isOpera()) {
                // Fix for no pointer events
                $('body').addClass('opera');
            }
        
            $('body').click(function(event) {
                if($('#parchment').hasClass('credits')) {
                    app.toggleCredits();
                }
                
                if($('#parchment').hasClass('about')) {
                    game.textWindowHandler.toggleTextWindow();
                    game.toggleItemInfo();
                }
            });
	
        	$('.barbutton').click(function() {
        	    $(this).toggleClass('active');
        	});
	
        	$('#chatbutton').click(function() {
        	    if($('#chatbutton').hasClass('active')) {
        	        app.showChat();
        	    } else {
                    app.hideChat();
        	    }
        	});
	
        	$('#helpbutton').click(function() {
                app.hideWindows();
                game.textWindowHandler.toggleTextWindow();
                game.toggleItemInfo();
        	});
        	$('#achievementsbutton').click(function() {
                app.toggleAchievements();
        	});
	
        	$('#instructions').click(function() {
                app.hideWindows();
        	});
        	
        	$('#playercount').click(function() {
        	    app.togglePopulationInfo();
        	});
        	
        	$('#population').click(function() {
        	    app.togglePopulationInfo();
        	});
	
        	$('.clickable').click(function(event) {
                event.stopPropagation();
        	});
	
        	$('#toggle-credits').click(function() {
        	    app.toggleCredits();
        	});
	
        	$('#create-new span').click(function() {
        	    app.animateParchment('loadcharacter', 'confirmation');
        	});
	
        	$('.delete').click(function() {
        	    app.animateParchment('confirmation', 'createcharacter');
        	});
	
        	$('#cancel span').click(function() {
        	    app.animateParchment('confirmation', 'loadcharacter');
        	});
        	
            $('#nameinput').bind("keyup", function() {
                app.toggleButton();
            });
            $('#pwinput').bind("keyup", function() {
                app.toggleButton();
            });
            $('#pwinput2').bind("keyup", function() {
                app.toggleButton();
            });
            $('#emailinput').bind("keyup", function() {
                app.toggleButton();
            });
    
            $('#notifications div').bind(TRANSITIONEND, app.resetMessagesPosition.bind(app));
    
            $('.close').click(function() {
                app.hideWindows();
            });
        
            $('.twitter').click(function() {
                var url = $(this).attr('href');

               app.openPopup('twitter', url);
               return false;
            });

            $('.facebook').click(function() {
                var url = $(this).attr('href');

               app.openPopup('facebook', url);
               return false;
            });
        
    		$('.play div').click(function(event) {
                var name = $('#nameinput').attr('value');
                var pw = $('#pwinput').attr('value');
                var pw2 = $('#pwinput2').attr('value');
                var email = $('#emailinput').attr('value');
                var loginname = $('#loginnameinput').attr('value');
                var loginpw = $('#loginpwinput').attr('value');

                if(loginpw === undefined || loginpw === ''){
                    if(pw2 !== '' && pw2 !== undefined && pw === pw2){
                        app.tryStartingGame(name, pw, email);
                    }
                } else{
                    app.tryStartingGame(loginname, loginpw, email);
                }
            });
        
            document.addEventListener("touchstart", function() {},false);
            
            $('#resize-check').bind("transitionend", app.resizeUi.bind(app));
            $('#resize-check').bind("webkitTransitionEnd", app.resizeUi.bind(app));
            $('#resize-check').bind("oTransitionEnd", app.resizeUi.bind(app));
        
            log.info("App initialized.");
        
            initGame();
        });
    };
    
    var initGame = function() {
        require(['game'], function(Game) {
            
            var canvas = document.getElementById("entities"),
        	    background = document.getElementById("background"),
        	    foreground = document.getElementById("foreground"),
        	    input = document.getElementById("chatinput");

    		game = new Game(app);
    		game.setup('#bubbles', canvas, background, foreground, input);
    		app.setGame(game);
    		
    		if(app.isDesktop && app.supportsWorkers) {
    		    game.loadMap();
    		}
	
    		game.onGameStart(function() {
                app.initEquipmentIcons();
    		});
    		
    		game.onDisconnect(function(message) {
    		    $('#death').find('p').html(message+"<em>Please reload the page.</em>");
    		    $('#respawn').hide();
    		});
	
    		game.onPlayerDeath(function() {
    		    if($('body').hasClass('credits')) {
    		        $('body').removeClass('credits');
    		    }
                $('body').addClass('death');
    		});
	
    		game.onPlayerEquipmentChange(function() {
    		    app.initEquipmentIcons();
    		});
	
    		game.onPlayerInvincible(function() {
    		    $('#hitpoints').toggleClass('invincible');
    		});

    		game.onNbPlayersChange(function(worldPlayers, totalPlayers) {
    		    var setWorldPlayersString = function(string) {
        		        $("#instance-population").find("span:nth-child(2)").text(string);
        		        $("#playercount").find("span:nth-child(2)").text(string);
        		    },
        		    setTotalPlayersString = function(string) {
        		        $("#world-population").find("span:nth-child(2)").text(string);
        		    };
    		    
    		    $("#playercount").find("span.count").text(worldPlayers);
    		    
    		    $("#instance-population").find("span").text(worldPlayers);
    		    if(worldPlayers == 1) {
    		        setWorldPlayersString("player");
    		    } else {
    		        setWorldPlayersString("players");
    		    }
    		    
    		    $("#world-population").find("span").text(totalPlayers);
    		    if(totalPlayers == 1) {
    		        setTotalPlayersString("player");
    		    } else {
    		        setTotalPlayersString("players");
    		    }
    		});
	
    		game.onNotification(function(message) {
    		    app.showMessage(message);
    		});
	
            app.initHealthBar();
            app.initTargetHud();
            app.initExpBar();
	
            $('#nameinput').attr('value', '');
            $('#pwinput').attr('value', '');
            $('#pwinput2').attr('value', '');
            $('#emailinput').attr('value', '');
    		$('#chatbox').attr('value', '');
    		
        	if(game.renderer.mobile || game.renderer.tablet) {
                $('#foreground').bind('touchstart', function(event) {
                    app.center();
                    app.setMouseCoordinates(event.originalEvent.touches[0]);
                	game.click();
                	app.hideWindows();
                });
            } else {
                $('#foreground').click(function(event) {
                    app.center();
                    app.setMouseCoordinates(event);
                    if(game) {
                	    game.click();
                	}
                	app.hideWindows();
                    // $('#chatinput').focus();
                });
            }

            $('body').unbind('click');
            $('body').click(function(event) {
                var hasClosedParchment = false;
                
                if($('#parchment').hasClass('credits')) {
                    if(game.started) {
                        app.closeInGameCredits();
                        hasClosedParchment = true;
                    } else {
                        app.toggleCredits();
                    }
                }
                
                if($('#parchment').hasClass('about')) {
                    if(game.started) {
                        app.closeInGameAbout();
                        hasClosedParchment = true;
                    } else {
//                        app.toggleAbout();
                        game.textWindowHandler.toggleTextWindow();
                        game.toggleItemInfo();
                    }
                }
                
                if(game.started && !game.renderer.mobile && game.player && !hasClosedParchment) {
                    game.click();
                }
            });
            
            $('#respawn').click(function(event) {
                game.audioManager.playSound("revive");
                game.restart();
                $('body').removeClass('death');
            });
            
            $(document).mousemove(function(event) {
            	app.setMouseCoordinates(event);
            	if(game.started) {
            	    game.movecursor();
            	}
            });

            $(document).keydown(function(e) {
            	var key = e.which,
                    $chat = $('#chatinput');

                if(key === 13) {
                    if($('#chatbox').hasClass('active')) {
                        app.hideChat();
                    } else {
                        app.showChat();
                    }
                }
            });
            
            $('#chatinput').keydown(function(e) {
                var key = e.which,
                    $chat = $('#chatinput');

                if(key === 13) {
                    if($chat.attr('value') !== '') {
                        if(game.player) {
                            game.say($chat.attr('value'));
                        }
                        $chat.attr('value', '');
                        app.hideChat();
                        $('#foreground').focus();
                        return false;
                    } else {
                        app.hideChat();
                        return false;
                    }
                }
                
                if(key === 27) {
                    app.hideChat();
                    return false;
                }
            });

            $('#nameinput').keypress(function(event) {
                var $name = $('#nameinput'),
                    name = $name.attr('value');
                var $pw = $('#pwinput'),
                    pw = $pw.attr('value');
                var $pw2 = $('#pwinput2'),
                    pw2 = $pw2.attr('value');
                var $email = $('#emailinput'),
                    email = $email.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        if(pw2 !== '' && pw2 !== undefined && pw === pw2)
                            app.tryStartingGame(name, pw, email, function() {
                                $name.blur(); // exit keyboard on mobile
                            });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });
            $('#pwinput').keypress(function(event) {
                var $name = $('#nameinput'),
                    name = $name.attr('value');
                var $pw = $('#pwinput'),
                    pw = $pw.attr('value');
                var $pw2 = $('#pwinput2'),
                    pw2 = $pw2.attr('value');
                var $email = $('#emailinput'),
                    email = $email.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        if(pw2 !== '' && pw2 !== undefined && pw === pw2)
                            app.tryStartingGame(name, pw, email, function() {
                                $name.blur(); // exit keyboard on mobile
                            });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });
            $('#pwinput2').keypress(function(event) {
                var $name = $('#nameinput'),
                    name = $name.attr('value');
                var $pw = $('#pwinput'),
                    pw = $pw.attr('value');
                var $pw2 = $('#pwinput2'),
                    pw2 = $pw2.attr('value');
                var $email = $('#emailinput'),
                    email = $email.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        if(pw2 !== '' && pw2 !== undefined && pw === pw2)
                            app.tryStartingGame(name, pw, email, function() {
                                $name.blur(); // exit keyboard on mobile
                            });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });
            $('#loginpwinput').keypress(function(event) {
                var $name = $('#nameinput'),
                    name = $name.attr('value');
                var $loginpw = $('#loginpwinput'),
                    loginpw = $loginpw.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        app.tryStartingGame(name, loginpw, "", function() {
                            $name.blur(); // exit keyboard on mobile
                        });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });
            
            $('#mutebutton').click(function() {
                game.audioManager.toggle();
            });
            
            $(document).bind("keydown", function(e) {
            	var key = e.which,
            	    $chat = $('#chatinput');

                if($('#chatinput:focus').size() == 0 && $('#nameinput:focus').size() == 0 && game.ready) {
                    if(key === 13) { // Enter
                        $chat.focus();
                        return false;
                    } else if(key === 8 ) { // BackSpace
                        return false;
                    } else if(key === 49){ // 1
                        game.keyDown(key);
                        return false;
                    } else if(key === 107){ // +
                        game.chathandler.incChatWindow();
                    } else if(key === 109){ // -
                        game.chathandler.decChatWindow();
                    }
                } else {
                    if(key === 13 && game.ready) {
                        $chat.focus();
                        return false;
                    }
                }
            });
            
            if(game.renderer.tablet) {
                $('body').addClass('tablet');
            }
        });
    };
    
    initApp();
});
