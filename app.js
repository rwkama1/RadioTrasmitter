const factory = require("./RadioTransmitter/logic/FactoryLogic").FactoryLogic;
const Advertiser = require("./RadioTransmitter/shared/entityshared/Advertiser").Advertiser;
//EXAMPLE ADVERTISERS----------------------------------------

factory.getLogicAdvertiser().getAdvertisers().then(data => {
        console.log(data)
    });
factory.getLogicAdvertiser().getAdvertiserByNameLetter("s").then(data => {
        console.log(data)
    });
factory.getLogicAdvertiser().getAdvertiser(89878).then(data => {
    console.log(data)

    });
let datatypeAdvertiser = new Advertiser(898788, "NewAdvertiser", "Vasd", "545556546");

factory.getLogicAdvertiser().addAdvertiser(datatypeAdvertiser).then(data => {
        console.log(data)
    });
factory.getLogicAdvertiser().deleteAdvertiser(datatypeAdvertiser).then(data => {
        console.log(data)
    });
factory.getLogicAdvertiser().updateAdvertiser(datatypeAdvertiser).then(data => {
        console.log(data)
    });

