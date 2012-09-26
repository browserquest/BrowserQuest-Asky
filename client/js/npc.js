
define(['character'], function(Character) {

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            this.talkIndex = 0;
        },
    
        talk: function() {
            if(this.beforeQuestCompleteTalk){
                var msg = null;
                var talkCount = this.beforeQuestCompleteTalk.length;

                if(this.talkIndex > talkCount) {
                    this.talkIndex = 0;
                }
                if(this.talkIndex < talkCount) {
                    msg = this.beforeQuestCompleteTalk[this.talkIndex];
                }
                this.talkIndex += 1;

                return msg;
            } else{
                return "안생겨요";
            }
        }
    });
    
    return Npc;
});
