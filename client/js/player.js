
define(['character', 'exceptions'], function(Character, Exceptions) {

    var Player = Character.extend({
        MAX_LEVEL: 10,
    
        init: function(id, name, pw, kind) {
            this._super(id, kind);
        
            this.name = name;
            this.pw = pw;
        
            // Renderer
     		this.nameOffsetY = -10;
        
            // sprites
            this.spriteName = "clotharmor";
            this.armorName = "clotharmor";
            this.weaponName = "sword1";

            // Inventory
            this.inventory = [];
        
            // modes
            this.isLootMoving = false;
            this.isSwitchingWeapon = true;

            // PVP Flag
            this.pvpFlag = false;

            // Benef
            this.invincible = false; // Fire Benef
        },
    
        loot: function(item) {
            if(item) {
                var rank, currentRank, msg, currentArmorName;
            
                currentArmorName = this.spriteName;

                if(item.type === "weapon") {
                    rank = Types.getWeaponRank(item.kind);
                    currentRank = Types.getWeaponRank(Types.getKindFromString(this.weaponName));
                    msg = "You are wielding a better weapon";

                    if(rank && currentRank) {
                        if(rank === currentRank) {
                            throw new Exceptions.LootException("You already have this "+item.type);
                        } else if(rank <= currentRank) {
                            throw new Exceptions.LootException(msg);
                        }
                    }
                } else if(item.type === "armor"){
                    this.setInventory(item.kind, 0);
                }
            
                log.info('Player '+this.id+' has looted '+item.id);
                if(Types.isArmor(item.kind) && this.invincible) {
                    this.stopInvincibility();
                }
                item.onLoot(this);
            }
        },
        setInventory: function(itemKind, inventoryNumber){
            if(inventoryNumber === 0){
                if(this.inventory[0]){
                    this.inventory[1] = itemKind;
                } else{
                    this.inventory[0] = itemKind;
                }
            } else if(inventoryNumber === 1){
                this.inventory[1] = itemKind;
            }
        },
        makeEmptyInventory: function(inventoryNumber){
            if(inventoryNumber === 0 || inventoryNumber === 1){
                this.inventory[inventoryNumber] = null;
            }
        },
    
        /**
         * Returns true if the character is currently walking towards an item in order to loot it.
         */
        isMovingToLoot: function() {
            return this.isLootMoving;
        },
    
        getSpriteName: function() {
            return this.spriteName;
        },
    
        setSpriteName: function(name) {
            if(name){
                this.spriteName = name;
            }
        },
        
        getArmorName: function() {
            return this.armorName;
        },
        
        getArmorSprite: function() {
            return this.sprite;
        },
        setArmorName: function(name){
            this.armorName = name;
        },
    
        getWeaponName: function() {
            return this.weaponName;
        },
    
        setWeaponName: function(name) {
            this.weaponName = name;
        },
    
        hasWeapon: function() {
            return this.weaponName !== null;
        },
        setBenef: function(itemKind){
            if(itemKind === Types.Entities.FIREBENEF){
                this.startInvincibility();
            } else{
                this.stopInvincibility();
            }
        },
        equipFromInventory: function(type, inventoryNumber, sprites){
            var itemString = Types.getKindAsString(this.inventory[inventoryNumber]);

            if(itemString){
                var itemSprite = sprites[itemString];
                if(itemSprite){
                    if(type === "armor"){
                        this.inventory[inventoryNumber] = Types.getKindFromString(this.getArmorName());
                        this.setSpriteName(itemString);
                        this.setSprite(itemSprite);
                        this.setArmorName(itemString);
                    } else if(type === "avatar"){
                        this.inventory[inventoryNumber] = null;
                        this.setSpriteName(itemString);
                        this.setSprite(itemSprite);
                    }
                }
            }
        },
    
        switchWeapon: function(newWeaponName) {
            var count = 14, 
                value = false, 
                self = this;
        
            var toggle = function() {
                value = !value;
                return value;
            };
        
            if(newWeaponName !== this.getWeaponName()) {
                if(this.isSwitchingWeapon) {
                    clearInterval(blanking);
                }
            
                this.switchingWeapon = true;
                var blanking = setInterval(function() {
                    if(toggle()) {
                        self.setWeaponName(newWeaponName);
                    } else {
                        self.setWeaponName(null);
                    }

                    count -= 1;
                    if(count === 1) {
                        clearInterval(blanking);
                        self.switchingWeapon = false;
                    
                        if(self.switch_callback) {
                            self.switch_callback();
                        }
                    }
                }, 90);
            }
        },
    
        onSwitchItem: function(callback) {
            this.switch_callback = callback;
        },
        
        onInvincible: function(callback) {
            this.invincible_callback = callback;
        },

        startInvincibility: function() {
            var self = this;
        
            if(!this.invincible) {
                this.invincible = true;
                if(this.invincible_callback){
                    this.invincible_callback();      
                }
            } else {
                // If the player already has invincibility, just reset its duration.
                if(this.invincibleTimeout) {
                    clearTimeout(this.invincibleTimeout);
                }
            }
        
            this.invincibleTimeout = setTimeout(function() {
                self.stopInvincibility();
                self.idle();
            }, 15000);
        },
    
        stopInvincibility: function() {
            if(this.invincible_callback){
                this.invincible_callback();      
            }
            this.invincible = false;
        
            if(this.invincibleTimeout) {
                clearTimeout(this.invincibleTimeout);
            }
        },
        flagPVP: function(pvpFlag){
            this.pvpFlag = pvpFlag;
        }
    });

    return Player;
});
