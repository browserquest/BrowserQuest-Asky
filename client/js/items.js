
define(['item'], function(Item) {
    
    var Items = {
        
        Sword2: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SWORD2, "weapon");
                this.lootMessage = "강철검을 손에 얻었소!";
            },
        }),

        Axe: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.AXE, "weapon");
                this.lootMessage = "도끼 득템";
            },
        }),

        RedSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDSWORD, "weapon");
                this.lootMessage = "빨간 칼 득템";
            },
        }),

        BlueSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUESWORD, "weapon");
                this.lootMessage = "파란 칼 득템";
            },
        }),

        GoldenSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GOLDENSWORD, "weapon");
                this.lootMessage = "황금 칼 득템";
            },
        }),

        MorningStar: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.MORNINGSTAR, "weapon");
                this.lootMessage = "철퇴 득템";
            },
        }),
        SideSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SIDESWORD, "weapon");
                this.lootMessage = "사이드 소드 득템";
            },
        }),
        Spear: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SPEAR, "weapon");
                this.lootMessage = "경비병 창 득템";
            },
        }),
        Scimitar: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SCIMITAR, "weapon");
                this.lootMessage = "시미터 득템";
            },
        }),
        Trident: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.TRIDENT, "weapon");
                this.lootMessage = "삼지창 득템";
            },
        }),
        Bluescimitar: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUESCIMITAR, "weapon");
                this.lootMessage = "푸른 시미터 득템";
            },
        }),
        Hammer: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.HAMMER, "weapon");
                this.lootMessage = "망치 득템";
            },
        }),
        Greenlightsaber: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GREENLIGHTSABER, "weapon");
                this.lootMessage = "초록 형광등 득템";
            },
        }),
        Skylightsaber: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SKYLIGHTSABER, "weapon");
                this.lootMessage = "하늘색 형광등 득템";
            },
        }),
        Redlightsaber: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDLIGHTSABER, "weapon");
                this.lootMessage = "빨강 형광등 득템";
            },
        }),
        Redmetalsword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDMETALSWORD, "weapon");
                this.lootMessage = "레드 메탈 아머 득템";
            },
        }),
        Bastardsword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BASTARDSWORD, "weapon");
                this.lootMessage = "바스타드 소드 득템";
            },
        }),
        Halberd: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.HALBERD, "weapon");
                this.lootMessage = "핼버드 득템";
            },
        }),
        Rose: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.ROSE, "weapon");
                this.lootMessage = "장미 득템";
            },
        }),
        Icerose: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.ICEROSE, "weapon");
                this.lootMessage = "얼음 장미 득템";
            },
        }),
        Justicehammer: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.JUSTICEHAMMER, "weapon");
                this.lootMessage = "저스티스 해머 득템";
            },
        }),
        Firesword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FIRESWORD, "weapon");
                this.lootMessage = "불검 득템";
            },
        }),
        Whip: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.WHIP, "weapon");
                this.lootMessage = "채찍 득템";
            },
        }),
        Forestguardiansword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FORESTGUARDIANSWORD, "weapon");
                this.lootMessage = "포레스트 가디언 소드 득템";
            },
        }),
        Sickle: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SICKLE, "weapon");
                this.lootMessage = "낫 득템";
            },
        }),
        Plunger: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PLUNGER, "weapon");
                this.lootMessage = "뚫어뻥 득템";
            },
        }),
        Redsickle: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDSICKLE, "weapon");
                this.lootMessage = "붉은 낫 득템";
            },
        }),
        Daywalker: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.DAYWALKER, "weapon");
                this.lootMessage = "데이워커 득템";
            },
        }),
        Purplecloudkallege: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PURPLECLOUDKALLEGE, "weapon");
                this.lootMessage = "자운의 칼리지 득템";
            },
        }),
        Searage: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SEARAGE, "weapon");
                this.lootMessage = "바다의 격노 득템";
            },
        }),

        ClothArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CLOTHARMOR, "armor");
                this.lootMessage = "면 갑옷 득템";
            },
        }),

        LeatherArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.LEATHERARMOR, "armor");
                this.lootMessage = "가죽 갑옷 득템";
            },
        }),

        MailArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.MAILARMOR, "armor");
                this.lootMessage = "비늘 갑옷 득템";
            },
        }),

        PlateArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PLATEARMOR, "armor");
                this.lootMessage = "판금 갑옷 득템";
            },
        }),

        RedArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDARMOR, "armor");
                this.lootMessage = "루비 갑옷 득템";
            },
        }),

        GoldenArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GOLDENARMOR, "armor");
                this.lootMessage = "황금 갑옷 득템";
            },
        }),
        GreenArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GREENARMOR, "armor");
                this.lootMessage = "초록 갑옷 득템";
            },
        }),
        GreenWingArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GREENWINGARMOR, "armor");
                this.lootMessage = "초록 날개 갑옷 득템";
            },
        }),
        GuardArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GUARDARMOR, "armor");
                this.lootMessage = "경비병 갑옷 득템";
            },
        }),
        RedGuardArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDGUARDARMOR, "armor");
                this.lootMessage = "레드 가드 아머 득템";
            },
        }),
        WhiteArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.WHITEARMOR, "armor");
                this.lootMessage = "하얀 갑옷 득템";
            },
        }),
        RatArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.RATARMOR, "armor");
                this.lootMessage = "랫아머 득템";
            },
        }),
        BluepirateArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUEPIRATEARMOR, "armor");
                this.lootMessage = "푸른 해적 갑옷 득템";
            },
        }),
        CheoliArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CHEOLIARMOR, "armor");
                this.lootMessage = "철이 갑옷 득템";
            },
        }),
        DovakinArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.DOVAKINARMOR, "armor");
                this.lootMessage = "도바킨 아머 득템";
            },
        }),
        GbwingArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GBWINGARMOR, "armor");
                this.lootMessage = "청록 날개 갑옷 득템";
            },
        }),
        RedwingArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDWINGARMOR, "armor");
                this.lootMessage = "붉은 날개 갑옷 득템";
            },
        }),
        SnowfoxArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SNOWFOXARMOR, "armor");
                this.lootMessage = "눈여우 갑옷 득템";
            },
        }),
        WolfArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.WOLFARMOR, "armor");
                this.lootMessage = "늑대 갑옷 득템";
            },
        }),
        BluewingArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUEWINGARMOR, "armor");
                this.lootMessage = "파랑 날개 갑옷 득템";
            },
        }),
        ThiefArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.THIEFARMOR, "armor");
                this.lootMessage = "도둑옷 득템";
            },
        }),
        NinjaArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.NINJAARMOR, "armor");
                this.lootMessage = "닌자옷 갑옷 득템";
            },
        }),
        DragonArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.DRAGONARMOR, "armor");
                this.lootMessage = "드래곤 갑옷 득템";
            },
        }),
        FallenArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FALLENARMOR, "armor");
                this.lootMessage = "폴른 아머 득템";
            },
        }),
        PaladinArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PALADINARMOR, "armor");
                this.lootMessage = "팔라딘 갑옷 득템";
            },
        }),
        CrystalArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CRYSTALARMOR, "armor");
                this.lootMessage = "수정 갑옷 득템";
            },
        }),
        AdhererRobe: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.ADHERERROBE, "armor");
                this.lootMessage = "추종자 로브 득템";
            },
        }),
        FrostArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FROSTARMOR, "armor");
                this.lootMessage = "서리 갑옷 득템";
            },
        }),
        GayArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GAYARMOR, "armor");
                this.lootMessage = "들어올 땐 마음대로지만 나갈 땐 아니란다.";
            },
        }),
        SchoolUniform: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SCHOOLUNIFORM, "armor");
                this.lootMessage = "교복 득템";
            },
        }),
        BeautifulLife: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BEAUTIFULLIFE, "armor");
                this.lootMessage = "폐인옷 득템";
            },
        }),
        RegionArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REGIONARMOR, "armor");
                this.lootMessage = "레기온 아머 득템";
            },
        }),
        GhostRider: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GHOSTRIDER, "armor");
                this.lootMessage = "고스트라이더 아머 득템";
            },
        }),
        Taekwondo: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.TAEKWONDO, "armor");
                this.lootMessage = "태권도복 득템";
            },
        }),
        AdminArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.ADMINARMOR, "armor");
                this.lootMessage = "운영자 아머 득템";
            },
        }),
        RabbitArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.RABBITARMOR, "armor");
                this.lootMessage = "토끼 갑옷 득템";
            },
        }),
        PortalArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PORTALARMOR, "armor");
                this.lootMessage = "포탈 갑옷 득템";
            },
        }),
        PirateKing: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PIRATEKING, "armor");
                this.lootMessage = "해적왕 옷 득템";
            },
        }),
        SeadragonArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SEADRAGONARMOR, "armor");
                this.lootMessage = "해신린 득템";
            },
        }),

        Flask: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FLASK, "object");
                this.lootMessage = "헬스 포션 마시쩡!";
            },
        }),
        
        Cake: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CAKE, "object");
                this.lootMessage = "케이크 마시쩡!";
            },
        }),

        Burger: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BURGER, "object");
                this.lootMessage = "햄버거 마시쩡!";
            },
        }),

        FirePotion: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FIREPOTION, "object");
                this.lootMessage = "불여우 포션 마시쩡!";
            },
    
            onLoot: function(player) {
                player.startInvincibility();
            },
        }),
        Book: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BOOK, "object");
                this.lootMessage = "공부 재미쩡!";
            },
        }),
        Cd: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CD, "object");
                this.lootMessage = "둠칫! 둠칫!";
            },
        }),
    };

    return Items;
});
