# RadioTransmitter

This package contains a backend of what would be the logic of a radio transmitter software, the architecture used is made in 3 layers


## Description

A radio station has asked you and your team to develop a web application that will
allows you to record the advertising campaigns that your advertisers broadcast in the different
programs. The application must be developed following the layered architecture style and
persist the information in a database.
Advertisers know their RUT, their name, their address and their telephone numbers. Each advertiser
you can contract multiple campaigns.
In turn, each campaign is linked to an advertiser. It is identified with a number
Self-generated id and also has a title, start date, end date, duration of the spot
(in seconds), and the amount of daily mentions (to be distributed between different programs). Is
It is important to mention that there are 2 types of campaigns: those of own production and those of
external production. For own production campaigns, the data is also known
common, the cost of their production; while for external production campaigns
saves the name of the advertising agency that produced it.
In turn, the programs that the radio broadcasts must be registered. Each program is identified
by name, knowing also what type it is (musical, variety or journalistic), what is its
producer and the price per second that each advertiser will have to pay when their campaign is broadcast
advertising.
Finally, you want to record the mentions that each campaign has in each program,
determining the date and time of the broadcasts.
The application must be able to calculate the price of the campaign, multiplying the duration of the spot by
the price per second of advertising (depends on the program (s) in which it is broadcast), for the
number of mentions registered for each program. Also, if it is a campaign of
own production, the cost of production must be added.

## Site Map

The pages that the site must present are described below, along with the functionalities
of each page:

#### Default: 

Shows the station logo, welcomes you and shows hyperlinks to
access the rest of the pages.

#### MaintenancePrograms:
Allows you to register, search, cancel and modify
programs.

#### MaintenanceAdvertiser: 
Allows you to register, search, cancel and modify
advertisers.

#### MaintenanceOwnCampaign: 
Allows you to register, search, cancel and modify
self-produced advertising campaigns. To access this page and the next you must
there is at least one registered advertiser.

#### MaintenanceExternalCampaign:
Allows you to register, search, cancel and modify
externally produced advertising campaigns.

#### AddMention:
Allows you to register a mention of a campaign in a program,
also indicating the date and time of the same. It should be checked that the date of the mention is
within the range corresponding to the campaign and that the amount of
daily mentions of the campaign for the indicated date.

#### ListofPrograms: 
Shows a TABLE with all the data of the programs.

#### CalculateCampaignPrice: 
Selecting a campaign through a control
DropDownList, its price is displayed.

## Usage

```Javascript
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
```

## See

https://cvcarlosr.herokuapp.com/




