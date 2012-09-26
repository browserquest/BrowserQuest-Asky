
define(['npc'], function(Npc) {
    var NPCs = {
        King: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.KING, 1);
                this.beforeQuestCompleteTalk = [
                    "크툴루가 맬 공주를 잡아갔다네.",
                    "제발, 공주를 구해주게."
                ];
            }
        }),
        VillageGirl: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGEGIRL, 1);
                this.beforeQuestCompleteTalk = [
                    "오빠, 마을에 쥐가 너무 많아",
                    "쥐 좀 10마리만 잡아줘"
                ];
                this.afterQuestCompleteTalk = [
                    "나 할 말있어.",
                    "오빠, 나 살쪘지?",
                    "오빤, 내가 왜 화났는지 몰라?",
                    "뭘 잘못했는지는 알아?",
                    "그걸 꼭 말을 해야 알아?",
                    "뭐가 미안한데?",
                    "미안할 짓을 왜 하는데?",
                    "누가 지금 그것때문에 화났데?",
                    "변했어..",
                    "됐어. 오빠도 다른 남자랑 똑같아."
                ];
            }
        }),
        Villager: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER, 1);
                this.beforeQuestCompleteTalk = [
                    "저...저겨.. 저도 검사가 되고 싶은데...",
                    "가죽갑옷 좀 구해주실 수 있나요?"
                ];
            }
        }),
        BeachNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.BEACHNPC, 1);
                this.beforeQuestCompleteTalk = [
                    "게가 너무 많아서 제대로 놀 수가 없네...",
                    "검사님, 그 검으로 게 5마리만 잡아주실 수 있나요?"
                ];
            }
        }),
        Agent: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.AGENT, 1);
                this.beforeQuestCompleteTalk = [
                    "아..여친 생일 케이크를 잃어버렸네...",
                    "혹시 이 근처에서 케이크 못 보셨나요?"
                ];
            }
        }),
        Nyan: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.NYAN, 1);
                this.idleSpeed = 50;
                this.beforeQuestCompleteTalk = [
                    "음악 시디 좀 찾아주겠냥?",
                ];
            }
        }),
        Rick: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.RICK, 1);
                this.beforeQuestCompleteTalk = [
                    "둠칫! 둠칫!",
                ];
            }
        }),
        Priest: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.PRIEST, 1);
                this.beforeQuestCompleteTalk = [
                    "해골왕에게 죽은 친구에게 기도를 하러 왔는데 스켈레톤이 너무 많아서 할 수가 없네요...",
                    "스켈레톤 좀 10마리만 잡아주실 수 있나요?",
                ];
            }
        }),
        Guard: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GUARD, 1);
                this.beforeQuestCompleteTalk = [
                    "아이템은 좀 모았는가? 그래도 안생겨요.",
                    "오늘도 사냥인가? 그래도 안생겨요.",
                    "득템을 원하는가. 안 생긴다네.",
                    "안될거야, 아마."
                ];
            }
        }),
        Scientist: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.SCIENTIST, 1);
                this.beforeQuestCompleteTalk = [
                    "어, 하필이면... 칼이... 영 좋지 않은 곳에 맞았어요.",
                    "어느 정도 완쾌된 뒤에 말해주려고 했는데...",
                    "잘 알아두세요. 아...선생은 앞으로... 아이를... 가질 수가 없습니다.",
                    "다시 말해서, 성관계를 할 수 없다는 것이오.",
                    "칼이 가장 중요한 곳을 지나갔단 말입니다.",
                    "안정을 취하세요. 흥분하면 다시 출혈을 할 수가 있어요.",
                    "그렇게 되면 완치 못합니다.",
                    "이보세요. 여긴 지금 중환자실입니다! 전화는 없어요.",
                    "당신은 다른 병원에서 안되가지고 이리로 왔어요.",
                    "전화는 해로우니까. 그냥 푹 쉬세요."
                ];
            }
        }),
        DesertNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.DESERTNPC, 1);
                this.beforeQuestCompleteTalk = [
                    "필경은 레벨의 4제곱이라네."
                ];
            }
        }),
        Sorcerer: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.SORCERER, 1);
                this.idleSpeed = 150;
                this.beforeQuestCompleteTalk = [
                    "나는 대마법사 우엨앙!",
                    "벌써 120년이 지났나...",
                    "마법사가 되고 싶다고?",
                    "자네는 이미 자격이 충분해 보이는구만.."
                ];
            }
        }),
        Coder: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.CODER, 1);
                this.beforeQuestCompleteTalk = [
                    "안녕! 안생겨요는 모바일이나 타블렛PC에서도 할 수 있는 거 알죠?"
                ];
            }
        }),
        LavaNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.LAVANPC, 1);
            }
        }),
        ForestNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.FORESTNPC, 1);
            }
        }),
        Octocat: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.OCTOCAT, 1);
            }
        })
    };
    
    return NPCs;
});
