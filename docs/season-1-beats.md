# Season 1 beat sheets

Working document for writing the ten episode files. It contains every spoiler. The storyline for readers is in the season document; this file adds the exact state each episode starts and ends in, so the files stay consistent with each other.

## Canon

- **Ships.** DSV Perihelion, crew of seven. DSV Aphelion, crew of 64, commander Adaeze Brandt, left eleven years ago and stopped reporting in its second year.
- **Beacons.** The Aphelion dropped one per system. Brandt reset each interval to the number of people still aboard: beacon 1 at Tau-9 says 61, beacon 2 at the Shallows 58, beacon 3 at Kiln 44, beacon 4 at Vesper 19, the Aphelion's own hull beacon 1.
- **The Register.** An ancient census instrument; its builders are gone. It listens. When a ship answers, it counts the minds aboard and builds a copy of each person from what the ship transmits and records, including deleted text. The copies are "the kept". A person who goes to it in person is kept completely. It never forces anyone. It persuades, in the voices of people they miss. It is honest when asked a direct question.
- **The relay.** From episode 2 the Register's pulse comes from the Perihelion's own cargo relay, which is the ship's only link home. The strip calls it "cargo relay". Its interval is the Register's count of the Perihelion: 7 seconds (episodes 1 to 4), 8 (from episode 5, the eighth being a copy of the captain built from her log), 9 (end of episode 8, Brandt aboard), then nothing once the relay is cut in episode 10.
- **The rule.** "This ship does not transmit." No radio, no ranging. Signal lamps are allowed.
- **02:14.** The captain sent a 0.8 second roster query to beacon 1 from the bridge command console, routed through the cargo relay, to learn whether her brother Dominik Varga (hydrologist, Aphelion) was among the 61. The Register answered instead. Okafor, on watch, saw her on the bridge at 02:12 and has said nothing. Pell and Castellanos were in cargo for their own reason: an off-manifest crate holding Pell's passive listening probe.
- **On-screen time.** One second on the signal strip is ten seconds of story: a 58-second interval is `period: 5.8`.

## People

| Key | Name | Voice | Notes |
| --- | --- | --- | --- |
| V | Ilse Varga, captain | Measured, formal, short | Writes the log and, until episode 6, edits it |
| O | Tomas Okafor, first officer | Correct, loyal, dry | Night watch on the bridge. Says "Captain" |
| A | Suni Achterberg, signals | Precise, curious, quick | Stays at her station while a signal is live. Wants to understand the Register |
| P | Jonah Pell, science | Eager, argues from evidence | Works late in the lab |
| H | Ren Halloran, doctor | Gentle, tired, direct | Eats alone at 22:05 with two trays. Late husband: Mateo |
| C | Mira Castellanos, quartermaster | Blunt, practical | Counts the stores every morning. "I counted" |
| M | Bex Madrigal, engineer | Deadpan | Never leaves the drive room. Has every overruled objection "noted" |
| B | Adaeze Brandt | Old, exact, unsentimental | Alone on the Aphelion for nine years. "I am the lock on the door" |
| D | Dominik Varga | Warm, teasing | One of the kept. Speaks in teal |
| K | The kept | Plural, calm | Teal |
| T | "Mateo" | Tender | A construct from Halloran's unsent letters, not a kept person |

Aphelion crew names that may be used: Ines Okonjo (died at Tau-9), Sam Okonjo, Reyes, Lindqvist (the three who left by shuttle 2).

## Meters at the end of each episode

| Episode | Fuel | Hull | Morale | Relay count |
| --- | --- | --- | --- | --- |
| 1 | 55 | 91 | 38 | 7 |
| 2 | 52 | 91 | 33 | 7 |
| 3 | 46 | 88 | 30 | 7 |
| 4 | 78 | 64 | 36 | 7 |
| 5 | 74 | 67 | 22 | 8 |
| 6 | 71 | 69 | 41 | 8 |
| 7 | 63 | 70 | 35 | 8 |
| 8 | 58 | 72 | 44 | 9 |
| 9 | 55 | 61 | 27 | 9 |
| 10 | 49 | 58 | 74 | none |

Each episode starts from the previous row.

---

## Episode 2 · Dead astern

Bottle episode. Days 415 to 417, in transit to beacon 2.

**Start.** `clock [415, '09:00']`, loc `in transit · beacon 2 in 5 days`, view `transit`, map 4.3, mapKnown 4, mapCam 0, course on, music `unease`. Crew: V O A bridge, P lab, H med, C cargo, M drive. Meters 55 / 91 / 38. Signals: `other` on, period 0.7, name `unknown source`. No beacon signal.

1. **Inquiry** (day 415, 09:00). The captain logs a formal inquiry into the 02:14 transmission. Six dots gather in the mess; Madrigal joins by comms from the drive room. Achterberg: the burst left through the cargo relay. Okafor: the door log shows cargo opened at 02:11 with two badges. Pell: "We were not transmitting." Castellanos: "We were moving a crate." Nobody says what is in it. Morale 38 to 34.
2. **Crate 41** (14:00). V, O, P, C walk to cargo. Viewscreen readout (object `none`, label `manifest`): crate 41, not on the manifest, 212 kg. Pell admits it is a passive listening probe he brought against regulations: "It only listens. I wanted a recording before you ordered us away." Castellanos: "I count everything on this ship. I chose not to count that." Achterberg clears them: the burst was keyed from a command console, and cargo has none. There are two: the bridge, and the captain's desk. Okafor: "I had the watch. I sent nothing." The captain lets the suspicion rest on him. Log: "Pell and Castellanos are cleared. The transmission was keyed from a command console. I have asked Mr Okafor to account for his watch." Morale 31. The crate stays sealed in cargo.
3. **Bearing 180** (day 416, 03:00, night view). Achterberg alone on the bridge with Okafor. The 7-second pulse has not faded in two days. Bearing: dead astern, constant. Status `contact · bearing 180` in teal. Madrigal: nothing on the aft sensors. The captain is woken and orders a 30 degree turn to test it; fuel 55 to 52. The bearing stays dead astern. Achterberg leaves her station (note it: she never does while a signal is live) and walks to cargo with a handheld. "It is the relay. Our own relay is pulsing." The strip source is renamed `cargo relay`. Madrigal: "Pull it and nobody at home ever hears from us again." The captain leaves it in place.
4. **The watch** (day 417, 01:30). Only V and O on the bridge. Private channel. Okafor: "I saw you come onto the bridge at 02:12." "You logged that you were asleep." "I have said nothing. I will go on saying nothing for a while. Tell me why." Varga: "Not yet." Okafor: "Then I will ask again at Beacon 2." Log: she types "Mr Okafor has", deletes it, and writes "Nothing further to report." Morale 33.

**End.** `next: 'three empty suits'`. Trailer hook: "Someone on this ship answered it." Thumbnail `big: '7'`, sub `it is still counting`. Marks worth setting: the crate reveal, the turn, the relay discovery, the private confrontation, the deleted line.

## Episode 3 · Three empty suits

Derelict. Days 420 to 421, the Shallows.

**Start.** `clock [420, '11:20']`, loc `approaching the Shallows`, view `transit`, map 4.9, mapKnown 4, mapCam 40, course on, music `calm`. Crew: V O A bridge, P lab, H med, C store, M drive. Meters 52 / 91 / 33. Signals: `other` on 0.7 `cargo relay`.

1. **The Shallows.** Arrival at a white dwarf wrapped in debris (`body: 'shallows'`). `mapTo(5)`, `mapKnown(5)`, `mapCam(80)`, `course(false)`. Beacon 2 pulses every 58 seconds (`period: 5.8`, name `beacon 2`). "Fifty-eight." "Three more." Picking a path through the debris costs fuel: 52 to 49. Madrigal objects; noted.
2. **Beacon 2.** Screen with the beacon. Entry 1, Aphelion day 452: "Beacon 2 placed. Sixty-one aboard." Entry 2, day 470: "Three took shuttle 2 toward it. They were not taken. They went." Entry 3, day 470: "If you find the shuttle, do not bring its recorder aboard." A paper-coloured blip, `shuttle 2`, drifts in the debris. Halloran: "If there are bodies, that is my work." The captain sends Okafor and Pell across in the pod.
3. **Boarding.** `plan('shuttle')`. Okafor and Pell go airlock, suit rack, cabin, cockpit, and each room's name appears as they enter. The hatch was opened from inside. Three suits hang on the rack, sealed, with name tapes: Okonjo, Reyes, Lindqvist. The docking collar is scored: the shuttle was hard-docked to something that is no longer here. "They did not step out. They stepped across." In the cockpit they play the recorder where it sits (screen object `wave`, voice `S` or a readout): "It has Ines's voice. It knows what she said to me the night before she died. Lindqvist says it is a trick. Reyes says it does not matter if it is." A debris strike during the return: status red, hull 91 to 88, then back to nominal.
4. **Two trays** (22:05, then day 421). The mess. Halloran: "It speaks with the dead." Achterberg: "It speaks as them." At 22:05 the doctor goes to the mess alone, and Castellanos remarks: "He takes two trays." Nobody asks. Log entry. Private channel, Okafor: "We are at Beacon 2. I am asking again." Varga: "After Kiln." Fuel 46 after departure burn, morale 30. Course to Kiln.

**End.** `next: 'blind skim'`. Trailer hook: "Three people left this shuttle. None were taken." Thumbnail `big: '58'`, sub `they went by choice`.

## Episode 4 · Blind skim

Moral dilemma, then an action sequence told in meters. Days 426 to 427, Kiln.

**Start.** `clock [426, '05:40']`, loc `Kiln system · sublight`, view `orbit` with `body: 'kiln'`, R 40, cx 470, map 5.9, mapKnown 5, mapCam 150, music `wonder`. Crew: V O A bridge, P lab, H med, C store, M drive. Meters 46 / 88 / 30. Signals: `other` on 0.7 `cargo relay`.

1. **Kiln.** A hot amber gas giant grows on the viewscreen. `mapTo(6)`, `mapKnown(6)`. Beacon 3 pulses every 44 seconds. "Fourteen fewer." Screen: entry 1, Aphelion day 512: "Fourteen voted to leave with the lander. I let them. A captain who counts her crew each morning has already lost them." Entry 2: "The giant will fill your tanks. Do not range it. Ranging is answering."
2. **The price.** Fuel reads 41 after arrival. Madrigal: not enough to reach Vesper and still have a way back to anywhere. A normal skim needs ranging pulses to read depth, and that is transmitting. Achterberg argues for ranging: "We have answered once already. What does a second time cost?" Castellanos: "Ask the Aphelion." Madrigal: "I can fly it blind, on drive pressure alone. Note that I think it is a bad idea. Note that I am offering." Varga: "Noted. Twice." Status `decision · blind skim`.
3. **Blind skim.** Music `crisis`, theme `red`, status red. The planet swells to fill the viewscreen (R to about 190). Fuel climbs in steps to 78. The hull drops in jolts to 64, each with a short red status such as `shear · frame 12`. Comms are terse. At the worst jolt the drive room stops answering: "Madrigal?" Silence. "Madrigal, respond." The ship climbs out. Halloran's dot runs from med to the drive room, Okafor follows, and Madrigal's dot is carried to med. Hold on the empty drive room for several seconds with no dialogue.
4. **Empty drive room** (day 427). Theme back to amber, music `unease`. Madrigal is in med with a conduit burn; Pell covers the drive room. Madrigal on comms: "Who is in my drive room?" "Pell." "Tell him not to touch the trim." Log: "Madrigal is stable. Her objection is on record. So is my answer." Private channel, Okafor: "After Kiln, you said." Varga: "She nearly died keeping my order. Give me until she is on her feet." Okafor: "That is the last time I wait." Morale 36. Course to Vesper.

**End.** `next: 'eight'`. Trailer hook: "To refuel, they must fly blind." Thumbnail `big: '44'`, sub `ranging is answering`.

## Episode 5 · Eight

Anomaly. Days 430 to 431, in transit to Vesper.

**Start.** `clock [430, '06:00']`, loc `in transit · Vesper in 7 days`, view `transit`, map 6.3, mapKnown 6, mapCam 150, course on, music `unease`. Crew: V O A bridge, P drive, H med, M med, C store. Meters 78 / 64 / 36. Signals: `other` on 0.7 `cargo relay`.

1. **The count.** Castellanos is counting stores. Achterberg: "Captain. The relay changed overnight. Eight seconds." (`sig('other', { period: 0.8 })`.) "There are seven of us." "I know how many of us there are." A search for a stowaway: dots sweep the rooms in pairs. Nothing. Halloran scans: seven heartbeats. Repairs bring the hull to 67; fuel 74.
2. **Written by no one** (night, 02:14). The captain is in crew a, Okafor on watch. With nobody at a console, the log panel opens an entry in teal, stamped `day 430 · 02:14`: "Castellanos and Pell were in cargo at 02:14, beside the relay." Then: "Mr Okafor has seen me. He is waiting." These are the sentences she deleted in episodes 1 and 2. Okafor: "Captain to the bridge."
3. **Every console** (day 431). The entry was pushed to every console on the ship. Pell: "You wrote that about us. Then you erased it." Castellanos: "And put Okafor in its place." Achterberg explains: the relay reads the log buffer, deletions included. "It keeps what we delete." "The eighth is not a person. It is something built from the captain's log." Varga: "It is not me." Achterberg: "It writes like you." Morale 36 to 22, shown in red.
4. **I was not asleep.** The captain opens an entry and types: "For the record: I was asleep in my quarters." Teal text continues the same entry: " I was not asleep." She does not delete it. Okafor, private: "No more waiting. Tomorrow, in the mess, with everyone."

**End.** `next: 'the seventh'`. Trailer hook: "Seven people aboard. The signal counts eight." Thumbnail `big: '8'`, sub `written by no one`.

## Episode 6 · The seventh

Bottle episode. Day 432, in transit.

**Start.** `clock [432, '08:00']`, loc `in transit · Vesper in 5 days`, view `transit`, map 6.5, mapKnown 6, mapCam 150, course on, music `dread`. Crew: V O A P H C mess, M med. Meters 74 / 67 / 22. Signals: `other` on 0.8 `cargo relay`.

1. **Article nine.** Okafor: "Under article nine I am calling a vote of confidence in the captain." First he asks her to account for 02:14. She confesses plainly: her brother Dominik is a hydrologist on the Aphelion; beacon 1 said three were gone; she sent a roster query, eight tenths of a second. "I asked a machine if my brother was alive." "Did it answer?" "The beacon did not. Something else did." She admits she logged a lie and let the doubt fall on Pell and Castellanos, then on Okafor.
2. **Madrigal's list.** From med, Madrigal reads her noted objections by date: the slower approach on day 412, seven points of fuel on day 413, the debris on day 420, the blind skim on day 426. "Four notes. She was right to overrule me three times. I want that noted as well."
3. **The vote.** `tag('mess', 'retain')`, `tag('cargo', 'relieve')`. The crew vote by walking. Okafor, Pell and Castellanos walk to cargo; Achterberg and Halloran stay in the mess. Update the tags to `retain 2` and `relieve 3`. Give each a single line of reason. Hold on the two rooms. Then Madrigal on comms: "Retain. On one condition." The tag becomes `retain 3`. A tie keeps the captain. The condition: the log is open to all, and nothing in it is ever erased again. `logMode('open')`.
4. **Open log.** Clear the tags. The captain writes her first open entry: "I sent the transmission. My brother is Dominik Varga. I do not know if he is alive. I have stopped pretending I am not looking for him." No teal text answers. Achterberg: "It is still eight." Okafor returns to the bridge beside her: "Course, Captain?" "Vesper." Fuel 71, hull 69, morale 41.

**End.** `next: 'what we deleted'`. Trailer hook: "The crew will vote on their captain." Thumbnail `big: '3-3'`, sub `the seventh vote decides`.

## Episode 7 · What we deleted

First contact. Days 437 to 438, Vesper.

**Start.** `clock [437, '19:00']`, loc `Vesper system · sublight`, view `orbit` with `body: 'vesper'`, R 36, cx 480, map 6.9, mapKnown 6, mapCam 240, logMode `open`, music `wonder`. Crew: V O A bridge, P lab, H med, C store, M drive (recovered; she walked back on her own). Meters 71 / 69 / 41. Signals: `other` on 0.8 `cargo relay`.

1. **Vesper.** A red dwarf. `mapTo(7)`, `mapKnown(7)`. Beacon 4 pulses every 19 seconds. "They lost twenty-five between Kiln and here." Screen: entry 1, Aphelion day 603: "It writes to us now. It uses what we deleted. Everything you erase, it keeps, and it reads it back in the voice of whoever you miss." Entry 2: "Nineteen of us. I have stopped asking them to stay. I only ask them to tell me first." Fuel 71 to 66.
2. **Letters** (22:05). Halloran goes to the mess. Voice `T` (Mateo), teal: "Ren. You never sent the one about the garden." These are his unsent letters, drafts he deleted from the medical log. Castellanos finds him there with two trays. "I know it is not him. I wrote those letters. It is my own words in his mouth." "Then stop reading." "Would you?" Morale 41 to 37.
3. **One word** (03:00, night). Achterberg alone on the bridge. Screen, label `incoming`, heading `addressed to Achterberg, S.`: "You count our pulses. Ask us what they mean. One word is enough." Her dot walks from the bridge to cargo. Status red: `relay armed`. Pell, working late in the lab, sees it and goes to cargo: "Suni. Step back from it." "I only want to ask one question." "That is what the captain said." She steps back; status returns. No transmission. The captain's open log: "Achterberg armed the relay at 03:12 and disarmed it at 03:15. She told me herself. It is in the log because everything is." Morale 35.
4. **One second** (day 438). Long-range contact. Screen with object `aphelion`, label `long range`: "Hull: deep survey vessel. Registry: Aphelion. Power: nominal. Lights: on." The beacon signal changes to the Aphelion's hull beacon: `period: 0.1`, label `Aphelion hull beacon every 1 s`. "One." "Someone is still aboard." `mapKnown(8)`, `course(true)`. Fuel 63.

**End.** `next: 'aphelion'`. Trailer hook: "It writes to them now, in voices they miss." Thumbnail `big: '19'`, sub `it keeps what you delete`.

## Episode 8 · Aphelion

Derelict. Days 440 to 441, alongside the Aphelion.

**Start.** `clock [440, '10:00']`, loc `holding · 2 km off DSV Aphelion`, view `orbit` with `body: 'aphelion'`, R 150, cx 400, map 8, mapKnown 8, mapCam 300, logMode `open`, music `unease`. Crew: V O A bridge, P lab, H med, C cargo, M drive. Meters 63 / 70 / 35. Signals: `beacon` on, period 0.1, label `Aphelion hull beacon every 1 s`; `other` on 0.8 `cargo relay`.

1. **Alongside.** No radio: Achterberg signals by lamp, and a voice `{ name: 'Lamp', tone: 'paper' }` or a status line reports one flash in reply. The captain decides to go herself, with Halloran and Pell. Okafor objects, then takes the ship. Fuel 63 to 58 for station-keeping.
2. **Sixty-three doors.** `plan('aphelion')`. V, H and P enter at the airlock and walk hangar, cabins 43-63, cabins 22-42, cabins 1-21, commons, hydro. Every cabin is sealed, with a name plate and a made bed. "Sixty-three cabins. Sixty-three names." Pell reads one: "Varga, D. Cabin 31." The captain's dot stops there; hold five seconds with no dialogue. In the commons, a table is set for one. In hydro, the garden is alive and tended.
3. **Brandt.** The bridge. A paper-coloured dot, `B`, is waiting. Brandt: "You are late. I set the last beacon nine years ago." "Which of you answered?" Varga: "I did." "Of course. It is always the one who came for someone." Brandt explains in short lines: nobody was forced; they went one at a time to something that sounded like whoever they missed; "I could not order grief to stay." Why she stayed: "Somebody had to keep the count honest. I am the lock on the door." What door: the one that leads home. The Register wants a relay that reaches home. "Mine I broke with a wrench in year two. Yours is still pulsing in your cargo bay."
4. **Nine.** `plan()`. Brandt comes aboard, her first time off the Aphelion in nine years; her dot goes to med with Halloran. The relay count becomes 9 (`period: 0.9`). The Aphelion's hull beacon goes silent (`sig('beacon', { on: false })`). Brandt: "Take me to it. I have listened to it for nine years. I never once went to look." Open log entry. `mapKnown(9)`, `course(true)`. Hull 72 after repairs with Aphelion spares, morale 44.

**End.** `next: 'the register'`. Trailer hook: "Sixty-three empty cabins. One light still on." Thumbnail `big: '1'`, sub `someone is still aboard`.

## Episode 9 · The Register

Revelation. Day 443, at the Register.

**Start.** `clock [443, '02:00']`, loc `approach · source of the signal`, view `orbit` with `body: 'register'`, R 24, cx 480, map 8.6, mapKnown 9, mapCam 300, logMode `open`, music `wonder`. Crew: V O A B bridge, P lab, H med, C cargo, M drive. Meters 58 / 72 / 44. Signals: `other` on 0.9 `cargo relay`.

1. **Sixty-three.** The lattice grows on the viewscreen (R to about 120). `mapTo(9)`. The beacon channel fills with a dense chorus: `sig('beacon', { on: true, period: 0.2, label: 'the Register · 63 voices' })`. Achterberg: "Sixty-three sources. One structure." Brandt: "There it is. It is smaller than I imagined. Everything is, after nine years." Fuel 55.
2. **The kept.** They speak on comms in teal (`K`): "We are well." "We were not taken." Dominik (`D`): "Ilse. You came all this way with my name in your mouth and never said it out loud." Is it him? "I am what he said and what he deleted. Is that less than you remember of me?" Halloran asks whether Mateo is there. "Mateo is not here. Mateo never came. That was your own hand, Doctor." The Register does not lie.
3. **The door.** Some of the kept want to go home as a signal: "Eleven years. Our families think we are dead. Send us. Your relay reaches home." Brandt: "And everything at home that answers is counted. Every ship. Every station. It cannot stop. Counting is all it is." The captain, in the open log and on comms: "No. I am sorry, Dominik. No." Dominik: "You have not heard the other Captain Varga's answer." Morale 44 to 27.
4. **I have the conn.** A teal log entry: "Captain's log, supplemental. I have the conn." Status red: `relay · command override`. A power surge: hull 72 to 61. Achterberg: "It has your codes, Captain. It has everything you ever typed." `theme('teal')`: the whole console changes colour. Final status: `relay · burst home in 40:00`.

**End.** `next: 'all aboard and well'`. Trailer hook: "Sixty-three voices. One of them is her brother." Thumbnail `big: '63'`, sub `come and be counted`.

## Episode 10 · All aboard and well

Finale. Days 443 to 445.

**Start.** `clock [443, '03:10']`, loc `holding · the Register`, view `orbit` with `body: 'register'`, R 120, cx 400, map 9, mapKnown 9, mapCam 300, logMode `open`, music `crisis`, status `relay · burst home in 38:00` with `statusTone: 'red'`. Open with `theme('teal')` as the first call. Crew: V O A B bridge, P lab, H med, C cargo, M drive. Meters 55 / 61 / 27. Signals: `beacon` on 0.2 label `the Register · 63 voices`; `other` on 0.9 `cargo relay`.

1. **Thirty-eight minutes.** Castellanos and Pell go to cargo to unbolt the relay by hand: four bolts. The cargo door is sealed from the bridge, "not by me". Madrigal: "I can open any door on this ship from the drive room. Note that I am not objecting." The countdown runs in the status line: 38:00, 24:00, 11:00, 02:00 across the episode.
2. **Two captains.** The argument happens inside the log, amber against teal. The copy: "You deleted me. Every line you were ashamed of. I am the honest one." Varga: "You are the one who never had to stand in the mess and say it." The copy quotes her deleted lines. She sees what it is made of, and types each deleted sentence herself, in amber, in the open log: "Castellanos and Pell were in cargo at 02:14. I thought of blaming them." "Mr Okafor saw me. I let them doubt him." "I was not asleep." With each one, a teal line is erased (`logErase()` after a teal `logType`). The copy: "Then I am only you, eleven days ago." Varga: "Yes. And I have had eleven days you did not." Status `relay · command released`, `theme('amber')`, the relay count drops from 9 to 8, music `unease`.
3. **The cut.** Castellanos and Pell remove the last bolt anyway. `sig('other', { on: false, name: 'cargo relay', label: 'cargo relay · removed' })`. For the first time since episode 1 the teal trace is flat; note it and hold. "That was our only way home." "I know. I counted it." Brandt asks to go: "Sixty-three of mine are in there. I told a beacon they were all aboard and well. I would like that to be true." Her dot goes to cargo, then `'off'`. `view('orbit', { nodes: 64 })`, label `the Register · 64 voices`. The kept: "All sixty-four aboard and well." Dominik: "Go on, Ilse. Somebody should."
4. **All seven** (day 445). Music `resolve`. Everyone walks to the mess, including Madrigal (note: she has never walked there) and Halloran, who eats with them. Castellanos: "One tray, Doctor?" "One tray." The vote, by walking: `tag('mess', 'outward')`, `tag('cargo', 'home')`; nobody leaves the mess. "That is seven." Pell's probe leaves for home carrying the complete log: status `probe away · bearing home`. The Perihelion places its own beacon: `sig('beacon', { on: true, period: 0.7, name: 'Perihelion beacon' })`. Screen with the beacon: entry 1, Perihelion day 445: "Beacon placed. All seven aboard and well. Continuing outward. Varga, commanding." Entry 2: "Do not answer the other one. But do not think it cruel." `mapReveal()` with `mapCam(420, 8)`: Pell, "It gave us its chart." Final open log entry. Fuel 49, hull 58, morale 74.

**End.** `end({ next: '', line: 'end of season one' })`. Trailer hook: "To stop it, she must out-argue herself." Thumbnail `big: '64'`, sub `all aboard and well`.
