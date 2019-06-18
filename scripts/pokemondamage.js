
// class PkmnDamage {
//   constructor() {


//   this.DamageValue = class {
//     constructor(name, value){
//       this.name = name;
//       this.value = value;
//     }
// }

//   this.PKMN_DAMAGE = {
//     "normal":
//       {
//         "damageTo":
//           {
//             "double": [],
//             "half": ["rock", " steel"],
//             "none": ["ghost"]
//           },
//         "damageFrom":
//           {
//             "double": ["fighting"],
//             "half": [],
//             "none": ["ghost"]
//           }
//       },
//     "fighting":
//       {
//         "damageTo":
//           {
//             "double": ["normal", "rock", "steel", "ice", "dark"],
//             "half": ["flying", "poison", "bug", "psychic", "fairy"],
//             "none": ["ghost"]
//           },
//         "damageFrom":
//           {
//             "double": ["flying", "psychic", "fairy"],
//             "half": ["rock", "bug", "dark"],
//             "none": []
//           }
//       },
//     "flying":
//       {
//         "damageTo":
//           {
//             "double": ["fighting", "bug", "grass"],
//             "half": ["rock", "steel", "electric"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["rock", "electric", "ice"],
//             "half": ["fighting", "bug", "grass"],
//             "none": ["ground"]
//           }
//       },
//     "poison":
//       {
//         "damageTo":
//           {
//             "double": ["grass", "fairy"],
//             "half": ["poison", "ground", "rock", "ghost"],
//             "none": ["steel"]
//           },
//         "damageFrom":
//           {
//             "double": ["ground", "psychic"],
//             "half": ["fighting", "poison", "bug", "grass", "fairy"],
//             "none": []
//           }
//       },
//     "ground":
//       {
//         "damageTo":
//           {
//             "double": ["poison", "rock", "steel", "fire", "electric"],
//             "half": ["bug", "grass"],
//             "none": ["flying"]
//           },
//         "damageFrom":
//           {
//             "double": ["water", "grass", "ice"],
//             "half": ["poison", "rock"],
//             "none": ["electric"]
//           }
//       },
//     "rock":
//       {
//         "damageTo":
//           {
//             "double": ["flying", "bug", "fire", "ice"],
//             "half": ["fighting", "ground", "steel"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["fighting", "ground", "steel", "water", "grass"],
//             "half": ["normal", "flying", "poison", "fire"],
//             "none": []
//           }
//       },
//     "bug":
//       {
//         "damageTo":
//           {
//             "double": ["grass", "psychic", "dark"],
//             "half": ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["flying", "rock", "fire"],
//             "half": ["fighting", "ground", "grass"],
//             "none": []
//           }
//       },
//     "ghost":
//       {
//         "damageTo":
//           {
//             "double": ["ghost", "psychic"],
//             "half": ["dark"],
//             "none": ["normal"]
//           },
//         "damageFrom":
//           {
//             "double": ["ghost", "dark"],
//             "half": ["poison", "bug"],
//             "none": ["normal", "fighting"]
//           }
//       },
//     "steel":
//       {
//         "damageTo":
//           {
//             "double": ["rock", "ice", "fairy"],
//             "half": ["steel", "fire", "water", "electric"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["fighting", "ground", "fire"],
//             "half": ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"],
//             "none": ["poison"]
//           }
//       },
//     "fire":
//       {
//         "damageTo":
//           {
//             "double": ["bug", "steel", "grass", "ice"],
//             "half": ["rock", "fire", "water", "dragon"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["ground", "rock", "water"],
//             "half": ["bug", "steel", "fire", "grass", "ice", "fairy"],
//             "none": []
//           }
//       },
//     "water":
//       {
//         "damageTo":
//           {
//             "double": ["ground", "rock", "fire"],
//             "half": ["water", "grass", "dragon"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["grass", "electric"],
//             "half": ["steel", "fire", "water", "ice"],
//             "none": []
//           }
//       },
//     "grass":
//       {
//         "damageTo":
//           {
//             "double": ["ground", "rock", "water"],
//             "half": ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["flying", "poison", "bug", "fire", "ice"],
//             "half": ["ground", "water", "grass", "electric"],
//             "none": []
//           }
//       },
//     "electric":
//       {
//         "damageTo":
//           {
//             "double": ["flying", "water"],
//             "half": ["grass", "electric", "dragon"],
//             "none": ["ground"]
//           },
//         "damageFrom":
//           {
//             "double": ["ground"],
//             "half": ["flying", "steel", "electric"],
//             "none": []
//           }
//       },
//     "psychic":
//       {
//         "damageTo":
//           {
//             "double": ["fighting", "poison"],
//             "half": ["steel", "psychic"],
//             "none": ["dark"]
//           },
//         "damageFrom":
//           {
//             "double": ["bug", "ghost", "dark"],
//             "half": ["fighting", "psychic"],
//             "none": []
//           }
//       },
//     "ice":
//       {
//         "damageTo":
//           {
//             "double": ["flying", "ground", "grass", "dragon"],
//             "half": ["steel", "fire", "water", "ice"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["fighting", "rock", "steel", "fire"],
//             "half": ["ice"],
//             "none": []
//           }
//       },
//     "dragon":
//       {
//         "damageTo":
//           {
//             "double": ["dragon"],
//             "half": ["steel"],
//             "none": ["fairy"]
//           },
//         "damageFrom":
//           {
//             "double": ["ice", "dragon", "fairy"],
//             "half": ["fire", "water", "grass", "electric"],
//             "none": []
//           }
//       },
//     "dark":
//       {
//         "damageTo":
//           {
//             "double": ["ghost", "psychic"],
//             "half": ["fighting", "dark", "fairy"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["fighting", "bug", "fairy"],
//             "half": ["ghost", "dark"],
//             "none": ["psychic"]
//           }
//       },
//     "fairy":
//       {
//         "damageTo":
//           {
//             "double": ["fighting", "dragon", "dark"],
//             "half": ["poison", "steel", "fire"],
//             "none": []
//           },
//         "damageFrom":
//           {
//             "double": ["poison", "steel"],
//             "half": ["fighting", "bug", "dark"],
//             "none": ["dragon"]
//           }
//       }
//   };
// };

//   calcuateDamage(type1, type2, isDefensivePokemon) => {
//       let candidates = {
//         quad:[],
//         double: [],
//         normal: [],
//         half: [],
//         quarter:[],
//         none: []
//       };
//       let convertedType1Data, convertedType2Data;

//       let type1Data, type2Data;
//       type1Data = this.PKMN_DAMAGE[type1];
//       type2Data = type2? this.PKMN_DAMAGE[type2] : null;



//       // candidates.double.push(type1Data[defensivePkmn? "damageFrom": "damageTo"].double);
//       // candidates.half.push(type1Data[defensivePkmn? "damageFrom": "damageTo"].half);
//       // candidates.none.push(type1Data[defensivePkmn? "damageFrom": "damageTo"].none);
//   };
// }

// module.exports = PkmnDamage;
