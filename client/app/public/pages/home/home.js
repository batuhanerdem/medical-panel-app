Template.homePage.onCreated(function () {

    const patient = { tc: '50503650240', name: "Batuhan", surname: "Erdem", birhYear: '2001' }

    // Meteor.call("patient.createTest", patient, (error, res) => {

    //     if (error) {
    //         switch (error.message) {
    //             case "Tc failed regular expression validation [schema-error]":
    //                 throw new Meteor.Error("Lutfen gecerli bir tc giriniz")

    //             case "[Tc isim uyumsuzlugu]":
    //                 throw new Meteor.Error("Girilen Isim-tc-yas hatalidir")

    //             default:
    //                 console.log(error);
    //                 break;
    //         }
    //     }
    // })
});