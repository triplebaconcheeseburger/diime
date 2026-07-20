import {parallaxLayer} from './objects/parallaxLayer'
import {openHoursWindow} from './objects/openHoursWindow'
import {adUnit} from './documents/adUnit'
import {award} from './documents/award'
import {contributor} from './documents/contributor'
import {department} from './documents/department'
import {drop} from './documents/drop'
import {edition} from './documents/edition'
import {event} from './documents/event'
import {shop} from './documents/shop'
import {story} from './documents/story'

export const schemaTypes = [
  // objects
  parallaxLayer,
  openHoursWindow,
  // documents
  story,
  edition,
  department,
  contributor,
  shop,
  drop,
  event,
  adUnit,
  award,
]
