// import { point, polygon, booleanPointInPolygon } from '@turf/turf';
// import { point  } from '@turf/collect'
// import * as turf from '@turf/turf'

// import { point, polygon } from '@turf/turf';
import { point, polygon } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

const availableAreaPolygon = [
  [
    [
      -100.43014526367188,
      25.750424835909385
    ],
    [
      -100.36920547485352,
      25.704804791228057
    ],
    [
      -100.3626823425293,
      25.71315688761512
    ],
    [
      -100.37023544311522,
      25.726766455170058
    ],
    [
      -100.3681755065918,
      25.727848967542563
    ],
    [
      -100.37195205688477,
      25.73341601835119
    ],
    [
      -100.36731719970703,
      25.737281872476796
    ],
    [
      -100.36405563354492,
      25.739292066931647
    ],
    [
      -100.3652572631836,
      25.742539232302107
    ],
    [
      -100.35907745361328,
      25.745940929423043
    ],
    [
      -100.36422729492188,
      25.75104329248735
    ],
    [
      -100.3707504272461,
      25.762947953929974
    ],
    [
      -100.38654327392578,
      25.777943036216094
    ],
    [
      -100.40645599365234,
      25.76263875704196
    ],
    [
      -100.42207717895508,
      25.770986790341
    ],
    [
      -100.43014526367188,
      25.750424835909385
    ]
  ]
];

function isPointAvailable(coor) {
  let pnt = point(coor);
  let zone = polygon(availableAreaPolygon);
  return booleanPointInPolygon(pnt, zone);
};

export { isPointAvailable, availableAreaPolygon };