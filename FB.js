//
//	Fretboard model 
//
//		FB_setNote(fb,color,note) = both parameters are color or note names (C- is C sharp)
//		FB_unSetNote(fb,color,note) = both parameters are color or note names (C- is C sharp)
//		FB_isSetNote(fb,color,note) = both parameters are color or note names (C- is C sharp)
//		FB_dumpFretBoard() - to see the state for debugging
//
//	Properties
//		You can iterate across FB_noteNames array for all notes
//		FB_colors as well. I have started with 6 but you can change these
//	
//
var FB_FretboardState =[ 	// static fretboards for now
			[
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Green
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Blue
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Red
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],					
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ]	//
			],
			[
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Green
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Blue
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Red
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],					
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ]	//
			],
			[
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Green
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Blue
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//Red
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],					
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ],	//
				[ 0,0,0,0,0,0,0,0,0,0,0,0 ]	//
			],
		];	
		
	function FB_flop() {
			console.log("flop");
			var f0=FB_FretboardState[0];
			var f1=FB_FretboardState[1];
			var f2=FB_FretboardState[2];
			FB_FretboardState[0]=f2;
			FB_FretboardState[1]=f0;
			FB_FretboardState[2]=f1;
		}
		
	function FB_isSet(fb,color,note) {
		//console.log("FB_isSet(fb="+fb+" color="+color+",note="+note+") state="+FB_FretboardState[fb][color][note]);

		if (fb>=0 && fb<FB_FretboardState.length && color >= 0 && color < FB_colors.length && note >=0 && note <= FB_noteNames.length) {
			return FB_FretboardState[fb][color][note];
		} 
		console.log("FB_isSet(fb="+fb+" color="+color+",note="+note+") called with bad fb, color or note");
		return -1;
	}
	
	function FB_set(fb,color,note) {
		console.log("FB_set(fb="+fb+" color="+color+",note="+note+") state="+FB_FretboardState[fb][color][note]);

		if (fb>=0 && fb<FB_FretboardState.length && color >= 0 && color < FB_colors.length && note >=0 && note <= FB_noteNames.length) {
			return FB_FretboardState[fb][color][note]=1;
		} 
		console.log("FB_set(fb="+fb+" color="+color+",note="+note+") called with bad fb, color or note");
		return -1;	
	}
	
	function FB_unSet(fb,color,note) {
		console.log("FB_unSet(fb="+fb+" color="+color+",note="+note+") state="+FB_FretboardState[fb][color][note]);

		if (fb>=0 && fb<FB_FretboardState.length && color >= 0 && color < FB_colors.length && note >=0 && note <= FB_noteNames.length) {
			return FB_FretboardState[fb][color][note]=0;
		} 
		console.log("FB_unSet(fb="+fb+" color="+color+",note="+note+") called with bad fb, color or note");
		return -1;	
	}	
	
	function FB_dump() {
		for (var fb=0; fb<FB_FretboardState.length; fb++) {
			for (var color=0; color<FB_colors.length; color++) {
				for (var note=0; note <=FB_noteNames.length; note++) {
					console.log("FB_FretboardState[fb="+fb+"][color="+color+"][note="+note+"]="+FB_FretboardState[fb][color][note]);
				}
			}
		}
	}
	
	//
	//	note name utility routines - A- is of course A#/Bflat
	//
	var FB_noteNames = ["A","A-","B","C","C-","D","D-","E","F","F-","G","G-"];

	function FB_noteNum(note) {
		return(FB_noteNames.indexOf(note));
	};
	
	function FB_noteName(note) {
		if (note>=0 && note <= FB_noteNames.length) {
			return FB_noteNames[note];
		}
		console.log("FB_noteName(note="+note+") called with bad note number");
		return "";
	}
	
	//
	//	color name utility routines
	//	
	var FB_colors = ["Green","Blue","Red","Grey","Purple","Orange"];
	
    function FB_colorNum(color) {
    	//console.log("FB_colorNum(color="+color+")");
    	return FB_colors.indexOf(color);
    };
    	
    function FB_colorName(colorNum) {
		if (colorNum >= 0 && colorNum <= FB_colors.length) {
			return FB_colors[colorNum];
		} else {
			console.log("FB_colorName(colorNum="+colorNum+"): bad color");
			return "";
		}
    }

	//
	//	Main API for FB_setting and unsetting and checking note state in the model
	//
	// All of these are using the notes, converted to numbers foir setting and unsetting and testing
	//
	function FB_setNote(fb,color,note) {
		//console.log("FB_setNote(fb="+fb+",color="+color+",note="+note+")");
		FB_set(fb,FB_colorNum(color),FB_noteNum(note));
	}
	function FB_unSetNote(fb,color,note) {
		//console.log("FB_unSetNote(fb="+fb+",color="+color+",note="+note+")"+FB_FretboardState[fb][color][note]);
		FB_unSet(fb,FB_colorNum(color),FB_noteNum(note));
		//console.log("AFTER   FB_unSetNote(fb="+fb+",color="+color+",note="+note+")="+FB_FretboardState[fb][color][note]);
	}
	function FB_isNoteSet(fb,color,note) {
		//console.log("FB_isNoteSet(fb="+fb+",color="+color+",note="+note+")");
		return(FB_isSet(fb,FB_colorNum(color),FB_noteNum(note)));
	}
	function FB_dumpFretBoard() {
		for (var fb=0; fb<FB_FretboardState.length; fb++) {
			for (var color=0; color<FB_colors.length; color++) {
				console.log("FB_FretboardState[fb="+fb+"][color="+color+"][note="+FB_FretboardState[fb][color] );
//				for (var note=0; note <=FB_noteNames.length; note++) {
//					console.log("FB_FretboardState[fb="+fb+"][color="+color+"][note="+note+"]="+FB_FretboardState[fb][color][note]);
//				};
			}
		}
	}
	//
	//	iterators
	//
	function FB_foreach(callback) {
		for (var fb=0; fb<FB_FretboardState.length; fb++) {
			for (var color=0; color<FB_colors.length; color++) {
				for (var note=0; note <=FB_noteNames.length; note++) {
					callback(fb,FB_colorName(color),FB_noteName(note),FB_FretboardState[fb][color][note]);
				}
			}
		}
	}

	//
	//	utility routines to clear out state
	//;
	function FB_clearFBcolorNotes(fb,color) {;
		for (var note=0; note <=FB_noteNames.length; note++) {
			//FB_FretboardState[fb][color][note]=0;
			FB_unSet(fb,color,note);  //this form uses only nyumbers;
			//console.log("FB_clearFBcolorNotes(): [fb="+fb+"][color="+color+"][note="+note+"]="+FB_FretboardState[fb][color][note]);
		}
	}
		
	function FB_clearFBnotes(fb) {
		for (var color=0; color<FB_colors.length; color++) {
			FB_clearFBcolorNotes(fb,color);
		}
	}
	
	function FB_clearAllNotes() {
		for (var fb=0; fb<FB_FretboardState.length; fb++) {
			FB_clearFBnotes(fb);
		}
	}
	
	//
	//	makeScale(key,mode)  - set the state for the appropriate scale using the theme of green root and blue others
	//						Note: we only manipulate the fretboad state, not GUI
	//
	function FB_makeScale(fb,key,mode) {
		console.log("makeScale(Fretboard="+fb+",key="+key+","+"mode="+mode+")");
		var notes = makeScaleArray(key,mode);
		var virgin=1;
		//
		//	colorNotes(note, index, array) - in this scheme (there may be others), color the root green and the rest blue
		//		
		function colorNotes(note, index, array) {
			console.log("colorNotes(note="+note+" index="+index+" array="+array+" virgin="+virgin);
  			if (virgin) {
  				virgin=0;
  				FB_setNote(fb,"Green",note);
  			} else {
	  			FB_setNote(fb,"Blue",note);
	  		}
	  	}
		//FB_clearFBnotes(fb);
		notes.forEach(colorNotes);
	}
	
	/*
	function FB_testFretboardModel() {	
		FB_setNote(0,"Blue","A");
		FB_setNote(0,"Grey","A");
		FB_setNote(1,"Red","A");
		FB_setNote(2,"Green","A");
		//set(0,0);
		console.log("isnoteSet(): "+FB_isNoteSet(0,"Blue","A"));
		console.log("isnoteSet(): "+FB_isNoteSet(2,"Green","C"));
	
		//dumpFretBoard();
		console.log("FB_FretboardState.length="+FB_FretboardState.length+" FB_colors.length="+FB_colors.length+" FB_noteNames.length="+FB_noteNames.length);
		for (var fb=0; fb<FB_FretboardState.length; fb++) {
			for (var color=0; color<FB_colors.length;color++) {
				for (var note=0; note < FB_noteNames.length; note++) {
					FB_setNote(fb,FB_colorName(color),FB_noteName(note));
					console.log("FB_isSet()="+FB_isSet(fb,color,note));
					FB_unSetNote(fb,FB_colorName(color),FB_noteName(note));
					console.log("after reset...FB_isSet()="+FB_isSet(fb,color,note));
				}
			}
		}
		FB_dumpFretBoard();
		console.log("Now make this another object.");
	}
	//FB_testFretboardModel();
	*/;