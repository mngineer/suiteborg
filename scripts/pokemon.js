// Description:
//   Script to get info on Pokémon. Polls pokeapi.co.
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot pokemon|pkmn me  - A Wild Pokémon Appeared!
//   hubot pokemon|pkmn <number or name>  - Who's that Pokémon?
//   hubot pokemon|pkmn cache|clear - perform cache actions (see|clear)

let SlackHelper = require("./helpers/slack");

let API_BUCKET = 90; //should make more that 100 requests a minute.

// set this to the largest Pokemon index number supported by Pokéapi
// as of 3/4/19, that's Zeraora (807)
let MAX_POKEMON = 807;

let ALL_PKMN = Array.from(new Array(MAX_POKEMON), (x,i) => i +1);

//Pokéapi makes some weird decisions about names of pokemon with alternate Formes. This kludges them so the API returns something.
let OVERRIDES = {
  "deoxys" :"deoxys-normal",
  "giratina": "giratina-altered",
  "wormadam": "wormadam-plant",
  "shaymin": "shaymin-land",
  "basculin": "basculin-red-striped",
  "darmanitan": "darmanitan-standard",
  "meloetta": "meloetta-aria",
  "aegislash": "aegislash-shield",
  "pumpkaboo": "pumpkaboo-average",
  "gourgeist": "gourgeist-average",
  "tornadus": "tornadus-incarnate",
  "landorus": "landorus-incarnate",
  "thundurus": "thundurus-incarnate",
  "keldeo": "keldeo-ordinary",
  "oricorio":"oricorio-baile",
  "lycanroc": "lycanroc-midday",
  "wishiwashi": "wishiwashi-solo",
  "minior": "minior-red-meteor",
  "mimikyu": "mimikyu-disguised"
};


//Use The Pokémon Company's official resources instead of Bulbapedia
let USE_TPCI = true;


let refillBucket = () => {
  API_BUCKET = 90;
};

setInterval(refillBucket, 60000);

class PkmnCache{
  constructor(robot){
    this.robot = robot;
    this.cache = {};
    // this.robot.brain.on('loaded', () => {
    //   if(this.robot.brain.get("PKMN_CACHE")) {
    //     this.cache = this.robot.brain.get("PKMN_CACHE");
    //   }
    // });

  }

  put(pokemon){
    this.cache[pokemon.id] = pokemon;
  }
  get(pokemon){
    return this.cache[pokemon];
  }

  getByName(pkmn_name){
    for (let item in this.cache) {
      if (this.cache.hasOwnProperty(item) && this.cache[item].name.toLowerCase() === pkmn_name.toLowerCase()){
        return this.cache[item];
      }
    }
  }

  persist(){
    // this.robot.brain.put("PKMN_CACHE", this.cache);
  }

  clear(){
    this.cache = {};
    // this.robot.brain.put("PKMN_CACHE", this.cache);
  }
}

class Pokemon{
  constructor(name, id){
      this.id = id;
      this.name = name;
      this.genus = "";
      this.dex_entry = "";
      this.type = "";
      this.debut = "";
      this.icon = "";
      this.bulba_link = USE_TPCI? `https://www.pokemon.com/us/pokedex/${this.name}`: `https://bulbapedia.bulbagarden.net/wiki/${this.name}_(Pokémon)`;
  }
}

module.exports = function (robot) {
  let slack = new SlackHelper(robot);
  let toSlackMsg = (pkmn) => {
    let mesg = new slack.AppMessage(`#${pkmn.id} ${pkmn.name}, the ${pkmn.genus}`, pkmn.dex_entry);
    mesg.color = "1365A3";
    mesg.title_link = pkmn.bulba_link;
    mesg.thumb_url = pkmn.icon;
    mesg.fields.push(new slack.AppMessageField("Type", pkmn.type));
    mesg.fields.push(new slack.AppMessageField("Debut", pkmn.debut));
    return mesg;
  };
  let pkmnCache = new PkmnCache(robot);

  let capitalize = (string, boolLowerOthers) => {
    return (boolLowerOthers ? string.toLowerCase() : string).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };

  let pkmnEngine = (msg, pkmnIdentifier) => {
    let candidatePkmn = (isNaN(pkmnIdentifier))?  pkmnCache.getByName(pkmnIdentifier): pkmnCache.get(pkmnIdentifier);
    if (candidatePkmn) {
      //post the cached version;
      slack.sendMessageToChannel(msg.envelope.room, toSlackMsg(candidatePkmn));
      return
    }
    if(API_BUCKET <= 0){
      msg.reply("WE ARE UNABLE TO QUERY API; WE ARE IN COOL DOWN.");
      return;
    }
    API_BUCKET--;

    // the base api call doesn't work from some pokemon with alternate formes.
    let rootPkmnIdentifier, beingOverridden;
    if(pkmnIdentifier in OVERRIDES){
      rootPkmnIdentifier = OVERRIDES[pkmnIdentifier];
      beingOverridden = true;
    } else {
      rootPkmnIdentifier = pkmnIdentifier;
      beingOverridden = false;
    }
    msg.http(`https://pokeapi.co/api/v2/pokemon/${rootPkmnIdentifier}`).get()((err, resp, body) => {
      if (err) {
        throw err;
      }
      if (resp.statusCode === 404){
        msg.reply("THAT SPECIES OF POKÉMON HAS NOT BEEN ASSIMILATED YET.");
        return;
      }
      if (resp.statusCode !== 200) {
        errorObj = {
          script: "pokemon.js",
          url: `https://pokeapi.co/api/v2/pokemon/${pkmnIdentifier}`,
          response: resp.statusCode,
          body: body
        };
        msg.reply("WE WERE UNABLE TO ASSIMILATE POKÉMON DATA.");
        msg.brain.data.borgerror = JSON.stringify(errorObj);
        msg.logger.error(JSON.stringify(errorObj));
        return;
      }
      let parsedPkmn = JSON.parse(body);
      API_BUCKET--;
      msg.http(`https://pokeapi.co/api/v2/pokemon-species/${pkmnIdentifier}`).get()((err, resp, body) => {
        if (err) {
          throw err;
        }
        if (resp.statusCode !== 200) {
          errorObj = {
            script: "pokemon.js",
            url: `https://pokeapi.co/api/v2/pokemon-species/${pkmnIdentifier}`,
            response: resp.statusCode,
            body: body
          };
          msg.reply("WE WERE UNABLE TO ASSIMILATE POKÉMON DETAILS.");
          msg.brain.data.borgerror = JSON.stringify(errorObj);
          msg.logger.error(JSON.stringify(errorObj));
          return;
        }
        let parsedPkmnSpecies = JSON.parse(body);
        //generate pokemon object
        let newPkmn = new Pokemon(capitalize( beingOverridden? pkmnIdentifier : parsedPkmn.name), parsedPkmn.id);

        if (USE_TPCI) {
          let cms_id = parsedPkmn.id;
          while (cms_id.length < 3){
            cms_id = "0" + cms_id;
          }
          newPkmn.icon =  `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${cms_id}.png`
        } else {
          newPkmn.icon = (parsedPkmn.sprites.front_default !== null) ? parsedPkmn.sprites.front_default :
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
        }
        if (parsedPkmn.types.length === 1) {
          newPkmn.type = capitalize(parsedPkmn.types[0].type.name);
        }
        else {
          newPkmn.type = `${capitalize(parsedPkmn.types[0].type.name)}/${capitalize(parsedPkmn.types[1].type.name)}`;

        }
        let debutArr = parsedPkmnSpecies.generation.name.split("-");
        newPkmn.debut = capitalize(debutArr[0])+ " " + debutArr[1].toUpperCase();
        for (let i = 0; i <parsedPkmnSpecies.genera.length; i++){
          let candidate = parsedPkmnSpecies.genera[i];
          if (candidate.language.name === "en"){
            newPkmn.genus = candidate.genus;
          }
        }
        //flavor text spans all generations and languages, so filter out the non-english ones and pick one.
        let english_dex = [];
        for (let i = 0; i <parsedPkmnSpecies.flavor_text_entries.length; i++){
          let candidate = parsedPkmnSpecies.flavor_text_entries[i];
          if (candidate.language.name === "en"){
            english_dex.push(candidate.flavor_text);
          }
        }
        newPkmn.dex_entry = msg.random(english_dex);
        //persist to cache
        pkmnCache.put(newPkmn);
        //send to Slack
        slack.sendMessageToChannel(msg.envelope.room, toSlackMsg(newPkmn));
      });

    });
  };
  robot.respond(/(pkmn|pokemon) (.*)/i, (msg) => {

    let pkmnIdentifier = msg.match[2].toLowerCase();
    if (pkmnIdentifier === "me") {
      pkmnIdentifier = msg.random(ALL_PKMN);
    }
    if (pkmnIdentifier === "cache"){
      msg.reply("```" + JSON.stringify(pkmnCache.cache) + "```");
      return;
    }
    if (pkmnIdentifier === "clear"){
      pkmnCache.clear();
      msg.reply("THE POKÉCACHE HAS BEEN ASSIMILATED.");
      return;
    }
    pkmnEngine(msg, pkmnIdentifier);
  });
};
