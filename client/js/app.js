
define(['jquery'], function($) {

    var App = Class.extend({
        init: function() {
            this.currentPage = 1;
            this.blinkInterval = null;
            this.previousState = null;
            this.isParchmentReady = true;
            this.ready = false;
            this.watchNameInputInterval = setInterval(this.toggleButton.bind(this), 100);
            this.$playButton = $('.play'),
            this.$playDiv = $('.play div');

            this.inventoryNumber = 0;
            this.dropDialogPopuped = false;

            var self = this;
            $('#boardbutton').click(function(event){
              if(self.game && self.ready){
                self.game.chathandler.hide();
                self.game.boardhandler.show();
              }
            });
            $('#gamebutton').click(function(event){
              if(self.game && self.ready){
                self.game.chathandler.show();
                self.game.boardhandler.hide();
              }
            });
        },
        
        setGame: function(game) {
            this.game = game;
            this.isMobile = this.game.renderer.mobile;
            this.isTablet = this.game.renderer.tablet;
            this.isDesktop = !(this.isMobile || this.isTablet);
            this.supportsWorkers = !!window.Worker;
            this.ready = true;
        },
    
        center: function() {
            window.scrollTo(0, 1);
        },
        
        canStartGame: function() {
            if(this.isDesktop) {
                return (this.game && this.game.map && this.game.map.isLoaded);
            } else {
                return this.game;
            }
        },
        
        tryStartingGame: function(username, userpw, email, starting_callback) {
            var self = this,
                $play = this.$playButton;
            
            if(username !== '') {
                if(!this.ready || !this.canStartGame()) {
                    if(!this.isMobile) {
                        // on desktop and tablets, add a spinner to the play button
                        $play.addClass('loading');
                    }
                    this.$playDiv.unbind('click');
                    var watchCanStart = setInterval(function() {
                        log.debug("waiting...");
                        if(self.canStartGame()) {
                            setTimeout(function() {
                                if(!self.isMobile) {
                                    $play.removeClass('loading');
                                }
                            }, 1500);
                            clearInterval(watchCanStart);
                            self.startGame(username, userpw, email, starting_callback);
                        }
                    }, 100);
                } else {
                    this.$playDiv.unbind('click');
                    this.startGame(username, userpw, email, starting_callback);
                }      
            }
        },
        
        startGame: function(username, userpw, email, starting_callback) {
            var self = this;
            
            if(starting_callback) {
                starting_callback();
            }
            this.hideIntro(function() {
                if(!self.isDesktop) {
                    // On mobile and tablet we load the map after the player has clicked
                    // on the PLAY button instead of loading it in a web worker.
                    self.game.loadMap();
                }
                self.start(username, userpw, email);
            });
        },

        start: function(username, userpw, email) {
            var self = this;
            
            if(username && !this.game.started) {
                var optionsSet = false,
                    config = this.config;

                //>>includeStart("devHost", pragmas.devHost);
                if(config.local) {
                    log.debug("Starting game with local dev config.");
                    this.game.setServerOptions(config.local.host, config.local.port, username, userpw, email);
                } else {
                    log.debug("Starting game with default dev config.");
                    this.game.setServerOptions(config.dev.host, config.dev.port, username, userpw, email);
                }
                optionsSet = true;
                //>>includeEnd("devHost");
                
                //>>includeStart("prodHost", pragmas.prodHost);
                if(!optionsSet) {
                    log.debug("Starting game with build config.");
                    this.game.setServerOptions(config.build.host, config.build.port, username, userpw, email);
                }
                //>>includeEnd("prodHost");

                this.center();
                this.game.run(function() {
                    $('body').addClass('started');
            	});
            }
        },

        setMouseCoordinates: function(event) {
            var gamePos = $('#container').offset(),
                scale = this.game.renderer.getScaleFactor(),
                width = this.game.renderer.getWidth(),
                height = this.game.renderer.getHeight(),
                mouse = this.game.mouse;

            mouse.x = event.pageX - gamePos.left - (this.isMobile ? 0 : 5 * scale);
        	mouse.y = event.pageY - gamePos.top - (this.isMobile ? 0 : 7 * scale);

        	if(mouse.x <= 0) {
        	    mouse.x = 0;
        	} else if(mouse.x >= width) {
        	    mouse.x = width - 1;
        	}

        	if(mouse.y <= 0) {
        	    mouse.y = 0;
        	} else if(mouse.y >= height) {
        	    mouse.y = height - 1;
        	}
        },
        initTargetHud: function(){
            var self = this;
            var scale = self.game.renderer.getScaleFactor(),
                healthMaxWidth = $("#target .health").width() - (12 * scale),
                timeout;

            this.game.player.onSetTarget(function(target, name, mouseover){
                var el = '#target';
                if(mouseover) el = '#inspector';
                var sprite = target.sprite,
                    x = ((sprite.animationData.idle_down.length-1)*sprite.width),
                    y = ((sprite.animationData.idle_down.row)*sprite.height);
                $(el+' .name').text(name);
                if(el === '#inspector'){
                  $(el + ' .details').text("level." + Types.getMobLevel(Types.getKindFromString(name)));
                }
                $(el+' .headshot div').height(sprite.height).width(sprite.width);
                $(el+' .headshot div').css('margin-left', -sprite.width/2).css('margin-top', -sprite.height/2);
                $(el+' .headshot div').css('background', 'url(img/1/'+name+'.png) no-repeat -'+x+'px -'+y+'px');

                if(target.healthPoints){
                    $(el+" .health").css('width', Math.round(target.healthPoints/target.maxHp*100)+'%');
                } else{
                    $(el+" .health").css('width', '100%');
                }

                $(el).fadeIn('fast');
                if(mouseover){
                    clearTimeout(timeout);
                    timeout = null;
                    timeout = setTimeout(function(){
                        $('#inspector').fadeOut('fast');
                        self.game.player.inspecting = null;
                    }, 2000);
                }
            });

            self.game.onUpdateTarget(function(target){
                $("#target .health").css('width', Math.round(target.healthPoints/target.maxHp*100) + "%");
                if(self.game.player.inspecting && self.game.player.inspecting.id === target.id){
                    $("#inspector .health").css('width', Math.round(target.healthPoints/target.maxHp*100) + "%");
                }
            });

            self.game.player.onRemoveTarget(function(targetId){
                $('#target').fadeOut('fast');
                if(self.game.player.inspecting && self.game.player.inspecting.id === targetId){
                    $('#inspector').fadeOut('fast');
                    self.game.player.inspecting = null;
                }
            });
        },
        initExpBar: function(){
            var maxHeight = $("#expbar").height();

            this.game.onPlayerExpChange(function(expInThisLevel, expForLevelUp){
               var barHeight = Math.round((maxHeight / expForLevelUp) * (expInThisLevel > 0 ? expInThisLevel : 0));
               $("#expbar").css('height', barHeight + "px");
            });
        },

        initHealthBar: function() {
            var scale = this.game.renderer.getScaleFactor(),
                healthMaxWidth = $("#healthbar").width() - (12 * scale);

        	this.game.onPlayerHealthChange(function(hp, maxHp) {
        	    var barWidth = Math.round((healthMaxWidth / maxHp) * (hp > 0 ? hp : 0));
        	    $("#hitpoints").css('width', barWidth + "px");
        	});

        	this.game.onPlayerHurt(this.blinkHealthBar.bind(this));
        },

        blinkHealthBar: function() {
            var $hitpoints = $('#hitpoints');

            $hitpoints.addClass('white');
            setTimeout(function() {
                $hitpoints.removeClass('white');
            }, 500)
        },

        toggleButton: function() {
            var name = $('#parchment input').val(),
                $play = $('#createcharacter .play');
    
            if(name && name.length > 0) {
                $play.removeClass('disabled');
                $('#character').removeClass('disabled');
            } else {
                $play.addClass('disabled');
                $('#character').addClass('disabled');
            }
        },
        toggleAchievements: function(){
            if(this.game.textWindowHandler.textWindowOn){
                this.game.textWindowHandler.close();
                this.game.closeItemInfo();
            }
            $('#achievements').toggleClass('active');
        },

        hideIntro: function(hidden_callback) {
            clearInterval(this.watchNameInputInterval);
            $('body').removeClass('intro');
            setTimeout(function() {
                $('body').addClass('game');
                hidden_callback();
            }, 1000);
        },

        showChat: function() {
            if(this.game.started) {
                $('#chatbox').addClass('active');
                $('#chatbox .legend').fadeIn('fast');
                $('#chatinput').focus();
                $('#chatbutton').addClass('active');
            }
        },

        hideChat: function() {
            if(this.game.started) {
                $('#chatbox').removeClass('active');
                $('#chatbox .legend').fadeOut('fast');
                $('#chatinput').blur();
                $('#chatbutton').removeClass('active');
            }
        },

        showDropDialog: function(inventoryNumber) {
            if(this.game.started) {
                $('#dropDialog').addClass('active');
                $('#dropCount').focus();
                $('#dropCount').select();
                
                this.inventoryNumber = inventoryNumber;
                this.dropDialogPopuped = true;
            }
        },
        
        hideDropDialog: function() {
            if(this.game.started) {
                $('#dropDialog').removeClass('active');
                $('#dropCount').blur();

                this.dropDialogPopuped = false;
            }
        },

        initEquipmentIcons: function() {
            var scale = this.game.renderer.getScaleFactor();
            var getIconPath = function(spriteName) {
                    return 'img/'+ scale +'/item-' + spriteName + '.png';
                },
                weapon = this.game.player.getWeaponName(),
                armor = this.game.player.getArmorName(),
                weaponPath = getIconPath(weapon),
                armorPath = getIconPath(armor);

            $('#weapon').css('background-image', 'url("' + weaponPath + '")');
            $('#armor').css('background-image', 'url("' + armorPath + '")');
        },

        hideWindows: function() {
            if($('#achievements').hasClass('active')){
                this.toggleAchievements();
                $('#achievementsbutton').removeClass('active');
            }
            this.game.textWindowHandler.close();
            this.game.closeItemInfo();
        },

        togglePopulationInfo: function() {
            $('#population').toggleClass('visible');
        },

        openPopup: function(type, url) {
            var h = $(window).height(),
                w = $(window).width(),
                popupHeight,
                popupWidth,
                top,
                left;

            switch(type) {
                case 'twitter':
                    popupHeight = 450;
                    popupWidth = 550;
                    break;
                case 'facebook':
                    popupHeight = 400;
                    popupWidth = 580;
                    break;
            }

            top = (h / 2) - (popupHeight / 2);
            left = (w / 2) - (popupWidth / 2);

        	newwindow = window.open(url,'name','height=' + popupHeight + ',width=' + popupWidth + ',top=' + top + ',left=' + left);
        	if (window.focus) {newwindow.focus()}
        },

        animateParchment: function(origin, destination) {
            var self = this,
                $parchment = $('#parchment'),
                duration = 1;

            if(this.isMobile) {
                $parchment.removeClass(origin).addClass(destination);
            } else {
                if(this.isParchmentReady) {
                    if(this.isTablet) {
                        duration = 0;
                    }
                    this.isParchmentReady = !this.isParchmentReady;
        
                    $parchment.toggleClass('animate');
                    $parchment.removeClass(origin);

                    setTimeout(function() {
                        $('#parchment').toggleClass('animate');
                        $parchment.addClass(destination);
                    }, duration * 1000);
        
                    setTimeout(function() {
                        self.isParchmentReady = !self.isParchmentReady;
                    }, duration * 1000);
        	    }
            }
        },

        animateMessages: function() {
            var $messages = $('#notifications div');

            $messages.addClass('top');
        },

        resetMessagesPosition: function() {
            var message = $('#message2').text();

            $('#notifications div').removeClass('top');
            $('#message2').text('');
            $('#message1').text(message);
        },

        showMessage: function(message) {
            var $wrapper = $('#notifications div'),
                $message = $('#notifications #message2');

            this.animateMessages();
            $message.text(message);
            if(this.messageTimer) {
                this.resetMessageTimer();
            }

            this.messageTimer = setTimeout(function() {
                    $wrapper.addClass('top');
            }, 5000);
        },

        resetMessageTimer: function() {
            clearTimeout(this.messageTimer);
        },
        
        resizeUi: function() {
            if(this.game) {
                if(this.game.started) {
                    this.game.resize();
                    this.initHealthBar();
                    this.initTargetHud();
                    this.initExpBar();
                    this.game.updateBars();
                } else {
                    var newScale = this.game.renderer.getScaleFactor();
                    this.game.renderer.rescale(newScale);
                }
            } 
        },
        initAchievementList: function(achievements){
            var self = this,
                $lists = $('#lists'),
                $page = $('#page-tmpl'),
                $achievement = $('#achievement-tmpl'),
                page = 0,
                count = 0,
                $p = null;

            _.each(achievements, function(achievement){
                count++;

                var $a = $achievement.clone();
                $a.removeAttr('id');
                $a.addClass('achievement'+count);
                if(!achievement.hidden){
                    self.setAchievementData($a, achievement.name, achievement.desc);
                }
                $a.find('.twitter').attr('href', 'http://twitter.com/share?url=http%3A%2F%2Fasky.freethinker.kr&text=I%20unlocked%20the%20%27' + achievement.name);
                $a.show();
                $a.find('a').click(function(){
                    var url = $(this).attr('href');

                    self.openPopup('twitter', url);
                    return false;
                });

                if((count - 1) % 4 === 0){
                    page++;
                    $p = $page.clone();
                    $p.attr('id', 'page'+page);
                    $p.show();
                    $lists.append($p);
                }
                $p.append($a);
            });
//            $('#total-achievements').text($('#achievements').find('li').length);
            $('#total-achievements').text(8);
        },
        initUnlockedAchievements: function(achievements){
            var self = this,
                count = 0;
            _.each(achievements, function(achievement){
                if(achievement.completed){
                    self.displayUnlockedAchievement(achievement);
                    count++;
                }
            });
            $('#unlocked-achievements').text(count);
        },
        setAchievementData: function($el, name, desc){
            $el.find('.achievement-name').html(name);
            $el.find('.achievement-description').html(desc);
        },
        displayUnhiddenAchievement: function(achievement){
            var $achievement = $('#achievements li.achievement' + achievement.id);

            if(achievement && achievement.hidden){
                this.setAchievementData($achievement, achievement.name, achievement.desc);
                this.showAchievementNotification(achievement.id, achievement.name, "퀘스트 발견!");
                this.game.client.sendAchievement(achievement.id, "found");
            }
        },
        showAchievementNotification: function(id, name, title){
            var $notif = $('#achievement-notification'),
                $name = $notif.find('.name'),
                $title = $notif.find('.title'),
                $button = $('#achievementsbutton');

            $name.text(name);
            $title.text(title);
            $notif.removeClass().addClass('active achievement' + id);
            this.blinkInterval = setInterval(function(){
                $button.toggleClass('blink');
            }, 500);
            setTimeout(function(){
                $notif.removeClass('active');
                $button.removeClass('blink');
            }, 5000);
        },
        displayUnlockedAchievement: function(achievement){
            var $achievement = $('#achievements li.achievement' + achievement.id);
            if(achievement){
                this.setAchievementData($achievement, achievement.name, achievement.desc);
            }
            $achievement.addClass('unlocked');
            var nb = parseInt($('#unlocked-achievements').text());
            $('#unlocked-achievements').text(nb+1);
        }
    });

    return App;
});
