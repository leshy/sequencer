import { each, find, intersection } from 'leshdash';
import { Map, List } from 'immutable';

// some bunch of values
class Event { }

// a specific event that we can play
interface Note {
    velocity: number;
    sustain: number;
    note: number;
}

type Time = number;

class TimeEvent {
    time: Time;
    event: Event;
    constructor(time: Time, event: Event) {
        this.time = time;
        this.event = event;
    }
}

// List of events with timestamps associated to them
class Sequence {
    timeEvents: Array<TimeEvent>;
    constructor(timeEvents) {
        this.timeEvents = timeEvents || [];
    }

    set(time, event): Sequence {
        return new Sequence([...this.timeEvents, new TimeEvent(time, Event)]);
    }
}

// Map of sequences to channels
class Sequencer {
    sequences: Map<number, Sequence>;
    constructor(sequences) {
        this.sequences = Map(sequences || {});
    }
    set(channel: number, sequence: Sequence): Sequencer {
        return new Sequencer(this.sequences.set(channel, sequence));
    }
}

// data we can interpret into a sequence of events
type DataCallback = (data: object) => any;
interface Interpretable {
    each: (DataCallback) => void;
}

// function that translates some data into a sequence of events
type Interpreter = (Interpretable) => Sequence;
