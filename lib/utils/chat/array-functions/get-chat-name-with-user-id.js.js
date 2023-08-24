Array.prototype.getChatNameWithUserId = function (id) {//bu fonksiyon kullanildigi yerde ancak 2 tane member 
    for (let i = 0; i < this.length; i++) {            //olabiliyor, burasi kendi kullanicimi ayirt ederek 
        if (this[i]._id !== id) {                      //diger kullanicinin adini donduruyor
            return this[i].name
        }
    }
    throw Meteor.Error("Obje icinde id veya name bulunmuyor")
}