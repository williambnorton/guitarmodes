//
//	Music javascript subroutines
//
//	noteList(Root) - create a chromatic list of notes starting at the Root
//	modeIndex(name) - returns the index of the mode ("Ionian"" returns 0)
//	modeArray(mode) - returns a list of "notes" based on a mode #
//	makeScaleArray(key,mode) - take a key and mode and return an array of notes to be played

	function modeIndex(name) {
		switch(name) {
			case "Ionian": return 0; break;
			case "Dorian": return 1; break;
			case "Phrygian": return 2; break;
			case "Lydian": return 3; break;
			case "Mixolydian": return 4; break;
			case "Aeolian": return 5; break;
			case "Locrian": return 6; break;
			case "Pentatonic": return 7;break;
			case "Arpeggio": return 8;break;
			
			default: return -1;
		}
	}
	
	//
	//	modeArray - return the sequence of whole and half steps for each mode
	//
	function modeArray(index) {
		var modeStepArray = [
		/* 0  Ionian */ [1,0,1,0,1,1,0,1,0,1,0,1,1],
		/* 1  Dorian  */   [1,0,1,1,0,1,0,1,0,1,1,0,1],
		/* 2  Phrygian */       [1,1,0,1,0,1,0,1,1,0,1,0,1],
		/* 3  Lydian   */         [1,0,1,0,1,0,1,1,0,1,0,1,1],
		/* 4 Mixolydian */           [1,0,1,0,1,1,0,1,0,1,1,0,1],
		/* 5 Aeolian   */                [1,0,1,1,0,1,0,1,1,0,1,0,1],
		/* 6 Locrian    */  			      [1,1,0,1,0,1,1,0,1,0,1,0,1],
			/* 7 Pentatonic    */  			      		[1,0,0,1,0,1,0,1,0,0,1,0,1],
													/*      A       C#    E     G  */
			/* 8 Arpeggio    */  			      		   [1,0,0,0,1,0,0,1,0,0,1,0,1]

		];
		if (index>=0 && index<modeStepArray.length) {
			return modeStepArray[index];
		} else {
			console.log("modeArray(): called for unavailable mode #:"+index);
		}
	};
	
	//
	//	noteList - create a chromatic list of notes starting at the Root
	//
	function noteList(Root) {
		var Notes = ["C","C-","D","D-","E","F","F-","G","G-","A","A-","B"];
		for (var thisNote = Notes.shift(), i=0; thisNote!=Root; thisNote = Notes.shift()) {
			//console.log("Checking "+thisNote+" equality with Root "+Root);
			Notes.push(thisNote);
			if (i++ >12) {
				console.log("shiftRoot(): Error - infinite loop looking for "+Root);
				return(null);
			}
		}
		Notes.unshift(thisNote);	//put the root back in the front of the chain
		var Scale=Notes.shift
		return Notes;	//returning something like ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
	}
	
	//
	//	makeScaleArray - take a key and mode and return an array of notes to be played
	//
	function makeScaleArray(key,mode) {
		var outputArray=[];
		var maskArray=modeArray(modeIndex(mode));

		function addIfInMode(element, index, array) {
  			if (maskArray[index] == 1) {
  				outputArray.push(element);
  			}
		}

		var allNotes=noteList(key);
		allNotes.forEach(addIfInMode);
		//console.log("outputArray="+outputArray);
		return outputArray;
	}
	