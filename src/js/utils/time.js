import {Timestamp} from '../db/firestore'
import moment from 'moment'


export const createTimestamp = () =>
  Timestamp.now().toMillis().toString()

export const timeElapsedString = timestamp =>
  moment(parseInt(timestamp, 10)).fromNow() // radix for the 10s decimal system
