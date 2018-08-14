// import { point, polygon, booleanPointInPolygon } from '@turf/turf';
// import { point  } from '@turf/collect'
// import * as turf from '@turf/turf'

// import { point, polygon } from '@turf/turf';
import { point, polygon } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

const availableAreaPolygon = [
  [
    [
      -100.4340934753418,
      25.7760880771913
    ],
    [
      -100.4435348510742,
      25.756609256777935
    ],
    [
      -100.43323516845703,
      25.750734064600884
    ],
    [
      -100.43701171875,
      25.74764174146125
    ],
    [
      -100.43581008911133,
      25.745477067368604
    ],
    [
      -100.43134689331055,
      25.750115606412873
    ],
    [
      -100.41933059692383,
      25.74222998228013
    ],
    [
      -100.41177749633789,
      25.740529092773226
    ],
    [
      -100.41692733764647,
      25.734034563460273
    ],
    [
      -100.41315078735352,
      25.727848967542563
    ],
    [
      -100.40765762329102,
      25.731869641497564
    ],
    [
      -100.4050827026367,
      25.737436504026586
    ],
    [
      -100.40182113647461,
      25.733570654930197
    ],
    [
      -100.40885925292969,
      25.727075745424962
    ],
    [
      -100.40147781372069,
      25.72011652011695
    ],
    [
      -100.3904914855957,
      25.710836919640595
    ],
    [
      -100.37727355957031,
      25.69861767528034
    ],
    [
      -100.38654327392578,
      25.697225529877763
    ],
    [
      -100.3846549987793,
      25.69181147636029
    ],
    [
      -100.38105010986327,
      25.690728636119623
    ],
    [
      -100.3694200515747,
      25.675103702698426
    ],
    [
      -100.38165092468262,
      25.67359524672089
    ],
    [
      -100.38345336914062,
      25.67162262163718
    ],
    [
      -100.38122177124023,
      25.667677273538143
    ],
    [
      -100.38311004638672,
      25.660869307073987
    ],
    [
      -100.37040710449219,
      25.657000971157412
    ],
    [
      -100.3571891784668,
      25.653287250648194
    ],
    [
      -100.34809112548828,
      25.652049318120472
    ],
    [
      -100.33933639526367,
      25.647871201010304
    ],
    [
      -100.3343152999878,
      25.647909887950878
    ],
    [
      -100.33259868621826,
      25.643538184299736
    ],
    [
      -100.32740592956543,
      25.643267365531837
    ],
    [
      -100.3199815750122,
      25.639901423853132
    ],
    [
      -100.31762123107909,
      25.641255549733135
    ],
    [
      -100.31714916229248,
      25.64187457359053
    ],
    [
      -100.31925201416014,
      25.643189988628144
    ],
    [
      -100.31835079193115,
      25.645898150409597
    ],
    [
      -100.32933712005615,
      25.65282302745559
    ],
    [
      -100.33307075500487,
      25.656923603159374
    ],
    [
      -100.33993721008301,
      25.661333498952683
    ],
    [
      -100.34843444824219,
      25.663654431243906
    ],
    [
      -100.35212516784667,
      25.66740650956715
    ],
    [
      -100.35221099853516,
      25.66999808235069
    ],
    [
      -100.35229682922363,
      25.672396203992218
    ],
    [
      -100.35238265991211,
      25.673711282473864
    ],
    [
      -100.35221099853516,
      25.704804791228057
    ],
    [
      -100.37384033203124,
      25.732178918477516
    ],
    [
      -100.39134979248047,
      25.75104329248735
    ],
    [
      -100.40628433227539,
      25.762793355586627
    ],
    [
      -100.4344367980957,
      25.776860980309472
    ],
    [
      -100.4340934753418,
      25.7760880771913
    ],
  ]
];

function isPointAvailable(coor) {
  let pnt = point(coor);
  let zone = polygon(availableAreaPolygon);
  return booleanPointInPolygon(pnt, zone);
};

export { isPointAvailable, availableAreaPolygon };