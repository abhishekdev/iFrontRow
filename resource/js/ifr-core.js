/*var ifrList = function(selector){
	var $me = $(selector);
}*/



var ifr = {};
ifr.db = {
	trailers : null,
	url : {
		"1080p":"",
		"720p":"",
		"480p" : ""
	}

}

ifr.db.proc = {
	importTrailers : function(dbObj){
		//Create public trailer JS Object DB
		try{
			if(dbObj.query.results.records.movieinfo){
				ifr.db.trailers = dbObj.query.results.records.movieinfo;
			}
		}catch(ex){
			ifr.db.trailers = null;
		}
	}
}

ifr.buildTrailerUI = function(data){
    var items = [], $list ;
    
	ifr.db.proc.importTrailers(data);
	if(!ifr.db.trailers.length) {
		// Failed to build Trailer Database
		return;
	}
	
	//Prepare Menu List
    $.each(ifr.db.trailers , function(key, val) {
        items.push('<li><a class="trailerLink" href="#movTrailer" id="' + key + '">' + val.info.title + '</a></li>');
    });

	// Create the menu list, Mark the first item as selected and initialize the navigation
	$('<ul/>', {
		'class': 'sliderNav',
		html: items.join('')
	}).appendTo('.movieList')
	.find("li:first").addClass("selected")
	.end().eSlidenav({
		overlap : 0,
		resetin: null,
		onHover :{enter:function(liElem){
							console.log("Loading: ",$(liElem).children('a')[0].id);
							ifr.loadMovieInfo($(liElem).children('a')[0].id);
						}
				}
	});	
	
	
    $("a.trailerLink").bind("click.ifr",function(e){
        e.preventDefault();
        var movsrc = ifr.db.trailers[$(this).attr('id')].preview.large.content; // the trailer video source
        
		$("#movTrailer").attr("src",movsrc);	
    }).fancybox({
		padding:0,
		margin:0,
        'transitionIn'	:	'elastic',
        'transitionOut'	:	'elastic',
        'speedIn'		:	600, 
        'speedOut'		:	200, 
        'overlayShow'	:	true,
    });
};

ifr.loadMovieInfo = function(index){
	var $movInfo = $("#movieInfo"),
		movie = ifr.db.trailers[index];
	
	$("#movieInfo .poster").attr("src",movie.poster.location);
	$("#movTrailer").attr("poster",movie.poster.location);
	$("#movieInfo > .details > h3").text(movie.info.title);
	$("#movieInfo > .details > .summary").text(movie.info.description);
	$("#movieInfo > .details > cite").text(movie.info.copyright);
	$("#movieInfo .director").text(movie.info.director);
	$("#movieInfo .genre").text(movie.genre.name.toString());
	$("#movieInfo .releasedate").text(movie.info.releasedate);
	$("#movieInfo .cast").text(movie.cast ? movie.cast.name.toString(): "unlisted");
}

ifr.getTrailerList = function(){
    $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url=%22trailers.apple.com/trailers/home/xml/current_480p.xml%22&format=json&callback=?', ifr.buildTrailerUI);
};

$(function(){
    //ifr.prepareTrailerList();
    ifr.buildTrailerUI(ADB);
});



var ADB = {
    "query":{
        "count":1,
        "created":"2011-11-13T13:33:33Z",
        "lang":"en-US",
        "results":{
            "records":{
                "date":"Mon, 07 Nov 2011 01:00:25 -0800",
                "movieinfo":[{
                    "id":"4536",
                    "info":{
                        "title":"1911",
                        "runtime":"0:57",
                        "rating":"R",
                        "studio":"Well Go USA / Variance Films",
                        "postdate":"2011-09-20",
                        "releasedate":"2011-10-07",
                        "copyright":"© Copyright 2011 Well Go USA / Variance Films",
                        "director":"Zhang Li, Jackie Chan",
                        "description":"Jackie Chan’s 100th film is an epic war film that details the fall of the Qing Dynasty—and the violent rebellion that brought it down. With China split into warring factions and the starving citizens beginning to revolt, the ruling Qings are building a powerful army to quash any rebellion.  But revolutionary leader Huang Xing (Chan) decides he must act before the Qing army becomes too powerful… and leads an increasingly desperate series of violent uprisings against the powerful Qings."
                    },
                    "cast":{
                        "name":["Jackie Chan","Joan Chen","Lee Bing Bing","Jaycee Chan","Winston Chao"]
                        },
                    "genre":{
                        "name":"Action and Adventure"
                    },
                    "poster":{
                        "location":"http://trailers.apple.com/trailers/independent/1911/images/poster.jpg",
                        "xlarge":"http://trailers.apple.com/trailers/independent/1911/images/poster-xlarge.jpg"
                    },
                    "preview":{
                        "large":{
                            "filesize":"12446816",
                            "content":"http://trailers.apple.com/movies/independent/1911/1911-tlr1_h480p.mov"
                        }
                    }
                },{
            "id":"4325",
            "info":{
                "title":"50/50",
                "runtime":"1:16",
                "rating":"R",
                "studio":"Summit Entertainment",
                "postdate":"2011-08-16",
                "releasedate":"2011-09-30",
                "copyright":"© Copyright 2011 Summit Entertainment",
                "director":"Jonathan Levine",
                "description":"Inspired by a true story, 50/50 is an original story about friendship, love, survival and finding humor in unlikely places.  Joseph Gordon-Levitt and Seth Rogen star as best friends whose lives are changed by a cancer diagnosis in this new comedy directed by Jonathan Levine from a script by Will Reiser.  50/50 is the story of a guy’s transformative and, yes, sometimes funny journey to health - drawing its emotional core from Will Reiser’s own experience with cancer and reminding us that friendship and love, no matter what bizarre turns they take, are the greatest healers."
            },
            "cast":{
                "name":["Joseph Gordon-Levitt","Seth Rogen","Anna Kendrick","Bryce Dallas Howard","Anjelica Huston"]
                },
            "genre":{
                "name":["Comedy","Drama"]
                },
            "poster":{
                "location":"http://trailers.apple.com/trailers/summit/5050/images/poster.jpg",
                "xlarge":"http://trailers.apple.com/trailers/summit/5050/images/poster-xlarge.jpg"
            },
            "preview":{
                "large":{
                    "filesize":"19665177",
                    "content":"http://trailers.apple.com/movies/summit/5050/5050-tlr2_h480p.mov"
                }
            }
        },{
    "id":"4506",
    "info":{
        "title":"A Dangerous Method",
        "runtime":"1:48",
        "rating":"R",
        "studio":"Sony Pictures Classics",
        "postdate":"2011-08-31",
        "releasedate":"2011-11-23",
        "copyright":"© Copyright 2011 Sony Pictures Classics",
        "director":"David Cronenberg",
        "description":"Seduced by the challenge of an impossible case, the driven Dr. Carl Jung (Michael Fassbender) takes the unbalanced yet beautiful Sabina Spielrein (Keira Knightley) as his patient in A DANGEROUS METHOD. Jung’s weapon is the method of his master, the renowned Sigmund Freud (Viggo Mortensen). Both men fall under Sabina’s spell."
    },
    "cast":{
        "name":["Keira Knightley","Viggo Mortensen","Michael Fassbender","Vincent Cassel"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony/adangerousmethod/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony/adangerousmethod/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"28476222",
            "content":"http://trailers.apple.com/movies/sony/adangerousmethod/adangerousmethod-tlr1_h480p.mov"
        }
    }
},{
    "id":"4479",
    "info":{
        "title":"A Very Harold and Kumar 3D Christmas",
        "runtime":"2:28",
        "rating":"R",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-08-29",
        "releasedate":"2011-11-04",
        "copyright":"© Copyright 2011 Warner Bros. Pictures",
        "director":"Todd Strauss-Schulson",
        "description":"The new “Harold and Kumar” comedy picks up six years after the duo’s last adventure. After years of growing apart, Harold Lee (John Cho) and Kumar Patel (Kal Penn) have replaced each other with new friends and are preparing for their respective Yuletide celebrations. But when a mysterious package mistakenly arrives at Kumar’s door on Christmas Eve, his attempt to redirect it to Harold’s house ends with the “high grade” contents—and Harold’s father-in-law’s prize Christmas tree—going up in smoke. With his in-laws out of the house for the day, Harold decides to cover his tracks, rather than come clean. Reluctantly embarking on another ill-advised journey with Kumar through New York City, their search for the perfect replacement tree almost blows Christmas Eve sky high."
    },
    "cast":{
        "name":["John Cho","Kal Penn","Paula Garcés","Danneel Harris","Tom Lennon","Danny Trejo","Elias Koteas","Eddie Kaye Thomas","David Krumholtz","Patton Oswalt","Neil Patrick Harris"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/averyharoldandkumar3dchristmas/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/averyharoldandkumar3dchristmas/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44518088",
            "content":"http://trailers.apple.com/movies/wb/averyharoldandkumar3dchristmas/haroldkumarchristmas-tlr1_h480p.mov"
        }
    }
},{
    "id":"4267",
    "info":{
        "title":"Abduction",
        "runtime":"1:01",
        "rating":"PG-13",
        "studio":"Lionsgate",
        "postdate":"2011-08-11",
        "releasedate":"2011-09-23",
        "copyright":"© Copyright 2011 Lionsgate",
        "director":"John Singleton",
        "description":"Taylor Lautner stars as a young man unwittingly thrust into a deadly world of covert espionage in Lionsgate’s action-thriller, ABDUCTION, directed by John Singleton. "
    },
    "cast":{
        "name":["Taylor Lautner","Lily Collins","Alfred Molina","Jason Isaacs","Maria Bello","Sigourney Weaver","Denzel Whitaker","Michael Nyqvist"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/lions_gate/abduction/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/lions_gate/abduction/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"18468963",
            "content":"http://trailers.apple.com/movies/lionsgate/abduction/abduction-tlr2_h480p.mov"
        }
    }
},{
    "id":"4587",
    "info":{
        "title":"Act of Valor",
        "runtime":"2:38",
        "rating":"R",
        "studio":"Relativity Media",
        "postdate":"2011-10-20",
        "releasedate":"2012-02-17",
        "copyright":"© Copyright 2012 Relativity Media",
        "director":"Mike “Mouse” McCoy, Scott Waugh",
        "description":"An unprecedented blend of real-life heroism and original filmmaking, Act of Valor stars a group of active-duty Navy SEALs in a powerful story of contemporary global anti-terrorism. Inspired by true events, the film combines stunning combat sequences, up-to-the minute battlefield technology and heart-pumping emotion for the ultimate action adventure. Act of Valor takes audiences deep into the secretive world of the most elite, highly trained group of warriors in the modern world. When the rescue of a kidnapped CIA operative leads to the discovery of a deadly terrorist plot against the U.S., a team of SEALs is dispatched on a worldwide manhunt. As the valiant men of Bandito Platoon race to stop a coordinated attack that could kill and wound thousands of American civilians, they must balance their commitment to country, team and their families back home. Each time they accomplish their mission, a new piece of intelligence reveals another shocking twist to the deadly terror plot, which stretches from Chechnya to the Philippinesand from Ukraine to Somalia. The widening operation sends the SEALs across the globe as they track the terrorist ring to the U.S.-Mexico border, where they engage in an epic firefight with an outcome that has potentially unimaginable consequences for the future of America."
    },
    "cast":{
        "name":["Active Duty Navy SEALs","Roselyn Sanchez","Alex Veadov","Jason Cottle","Nestor Serrano"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/actofvalor/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/actofvalor/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"50008755",
            "content":"http://trailers.apple.com/movies/independent/actofvalor/actofvalor-tlr1_h480p.mov"
        }
    }
},{
    "id":"4607",
    "info":{
        "title":"Albert Nobbs",
        "runtime":"2:28",
        "rating":"R",
        "studio":"Roadside Attractions",
        "postdate":"2011-10-27",
        "releasedate":"2012-01-27",
        "copyright":"© Copyright 2012 Roadside Attractions",
        "director":"Rodrigo Garcia",
        "description":"Award winning actress Glenn Close (Albert Nobbs) plays a woman passing as a man in order to work and survive in 19th century Ireland. Some thirty years after donning men’s clothing, she finds herself trapped in a prison of her own making. Mia Wasikowska (Helen), Aaron Johnson (Joe) and Brendan Gleeson (Dr. Holloran) join a prestigious, international cast that includes Jonathan Rhys Meyers, Janet McTeer, Brenda Fricker and Pauline Collins. Rodrigo Garcia directs from a script that Glenn Close, along with Man Booker prize-winning novelist John Banville and Gabriella Prekop, adapted from a short story by Irish author George Moore."
    },
    "cast":{
        "name":["Glenn Close","Mia Wasikowska","Aaron Johnson","Brendan Gleeson","Janet McTeer","Jonathan Rhys Meyers","Pauline Collins","Brenda Fricker"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/albertnobbs/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/albertnobbs/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44563639",
            "content":"http://trailers.apple.com/movies/independent/albertnobbs/albertnobbs-tlr1_h480p.mov"
        }
    }
},{
    "id":"4372",
    "info":{
        "title":"Alvin and the Chipmunks - Chipwrecked!",
        "runtime":"1:10",
        "rating":"Not yet rated",
        "studio":"20th Century Fox",
        "postdate":"2011-07-28",
        "releasedate":"2011-12-16",
        "copyright":"© Copyright 2011 20th Century Fox",
        "director":"Mike Mitchell",
        "description":"The vacationing Chipmunks and Chipettes are turning a luxury cruise liner into their personal playground, until they become ‘chipwrecked’ on a remote island.  As the ‘Munks and Chipettes try various schemes to find their way home, they accidentally discover their new turf is not as deserted as it seems.  "
    },
    "cast":{
        "name":["Jason Lee","David Cross","Jenny Slate","Justin Long","Matthew Gray Gubler","Jesse McCartney","Amy Poehler","Anna Faris","Christina Applegate"]
        },
    "genre":{
        "name":["Comedy","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox/alvinandthechipmunkschipwrecked/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox/alvinandthechipmunkschipwrecked/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"17975575",
            "content":"http://trailers.apple.com/movies/fox/alvinandthechipmunkschipwrecked/alvin3-tlr2_h480p.mov"
        }
    }
},{
    "id":"4578",
    "info":{
        "title":"Angels Crest",
        "runtime":"2:14",
        "rating":"R",
        "studio":"Magnolia Pictures",
        "postdate":"2011-10-10",
        "releasedate":"2011-12-30",
        "copyright":"© Copyright 2011 Magnolia Pictures",
        "director":"Gaby Dellal",
        "description":"The small working-class town of Angels Crest is a tight-knit community resting quietly in one of the vast and stunningly beautiful valleys of the Rocky Mountains. Ethan (Thomas Dekker), one of the town’s residents, is a young father but not much more than a kid himself. He has no choice but to look after his three-year-old son Nate, since mom Cindy (Lynn Collins) is an alcoholic. But one snowy day, Ethan’s good intentions are thwarted by a moment of thoughtlessness, resulting in tragedy. A local prosecutor (Jeremy Piven) haunted by his past goes after Ethan, and the ensuing confusion and casting of blame begins to tear the town apart. Directed by Gaby Dellal and Based on the novel by Leslie Schwartz, ANGELS CREST also stars Elizabeth McGovern, Joseph Morgan, Mira Sorvino and Kate Walsh. "
    },
    "cast":{
        "name":["Thomas Dekker","Lynn Collins","Elizabeth McGovern","Jeremy Piven","Mira Sorvino","Kate Walsh","Joseph Morgan","Barbara Williams"]
        },
    "genre":{
        "name":["Drama","Foreign"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/magnolia/angelscrest/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/magnolia/angelscrest/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"41045034",
            "content":"http://trailers.apple.com/movies/magnolia_pictures/angelscrest/angeslcrest-tlr1_h480p.mov"
        }
    }
},{
    "id":"4259",
    "info":{
        "title":"Anonymous",
        "runtime":"1:56",
        "rating":"PG-13",
        "studio":"Sony Pictures",
        "postdate":"2011-04-13",
        "releasedate":"2011-10-28",
        "copyright":"© Copyright 2011 Sony Pictures",
        "director":"Roland Emmerich",
        "description":"Set in the political snake-pit of Elizabethan England, Anonymous speculates on an issue that has for centuries intrigued academics and brilliant minds ranging from Mark Twain and Charles Dickens to Henry James and Sigmund Freud, namely:  who was the author of the plays credited to William Shakespeare?  Experts have debated, books have been written, and scholars have devoted their lives to protecting or debunking theories surrounding the authorship of the most renowned works in English literature.  Anonymous poses one possible answer, focusing on a time when cloak-and-dagger political intrigue, illicit romances in the Royal Court, and the schemes of greedy nobles hungry for the power of the throne were exposed in the most unlikely of places: the London stage.  "
    },
    "cast":{
        "name":["Rhys Ifans","Vanessa Redgrave","Joely Richardson","David Thewlis","Xavier Samuel","Sebastian Armesto","Rafe Spall","Edward Hogg","Jamie Campbell Bower","Derek Jacobi"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/anonymous/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/anonymous/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"35366753",
            "content":"http://trailers.apple.com/movies/sony_pictures/anonymous/anonymous-tlr1_h480p.mov"
        }
    }
},{
    "id":"4598",
    "info":{
        "title":"Another Happy Day",
        "runtime":"2:03",
        "rating":"R",
        "studio":"Phase4 Films",
        "postdate":"2011-10-25",
        "releasedate":"2011-11-18",
        "copyright":"© Copyright 2011 Phase4 Films",
        "director":"Sam Levinson",
        "description":"Winner of the Sundance Film Festival’s prestigious Screenwriting Award, ANOTHER HAPPY DAY is the feature film debut of writer and director Sam Levinson.  The film is a powerful,  darkly comic story of a woman struggling to find her place in a volatile family dynamic and features an outstanding ensemble cast led by Ellen Barkin who also produced. A family weekend is fraught with emotional landmines for mercurial and sensitive Lynn (Barkin) as she arrives at her parents’ Annapolis estate for the marriage of her estranged eldest son Dylan (Michael Nardelli), accompanied by her three younger children (Ezra Miller, Kate Bosworth, Daniel Yelsky).  Lynn’s hopes for a joyful reunion are crushed as her wry but troubled middle son Elliot (Ezra Miller) lobs verbal grenades at his mother and her relatives while daughter Alice (Kate Bosworth), a fights valiantly to keep her longtime demons under control. The weekend quickly unravels as Lynn demands to be heard by her aloof, disdainful mother (Ellen Burstyn), ailing, distant father (George Kennedy) and ever-judgmental sisters (Siobhan Fallon, Diana Scarwid), but most especially by her ex-husband Paul (Thomas Hayden Church) and his hot-tempered second wife Patty (Demi Moore). Confronted, oftentimes hilariously, with the deeply painful, half-buried truths that have given rise to the family’s primal web ofresentments and recriminations, Lynn struggles to maintain her equilibrium as her best attempts at reconciliation veer quickly off-course."
    },
    "cast":{
        "name":["Ellen Barkin","Kate Bosworth","Ellen Burstyn","Thomas Hayden Church","George Kennedy","Ezra Miller","Demi Moore"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/anotherhappyday/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/anotherhappyday/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37035534",
            "content":"http://trailers.apple.com/movies/independent/anotherhappyday/anotherhappyday-tlr1_h480p.mov"
        }
    }
},{
    "id":"4591",
    "info":{
        "title":"Answer This",
        "runtime":"2:04",
        "rating":"PG-13",
        "studio":"Wrekin Hill and Neca Films",
        "postdate":"2011-10-25",
        "releasedate":"2011-10-13",
        "copyright":"© Copyright 2011 Wrekin Hill and Neca Films",
        "director":"Christopher Farah",
        "description":"A brilliant trivia whiz, Paul Tarson (Christopher Gorham) is great at answering life’s little questions, but horrible at answering the big ones - like what’s he going to do after grad school? Now he and his friends James (Nelson Franklin) and Izzy (Evan Jones) will finally get a shot at beer, women and nerdy redemption when they enter the biggest challenge of their lives… a citywide pub trivia tournament, hosted by one Brian Collins (Chris Parnell). But when Paul falls for Naomi (Arielle Kebbel) - a smart young undergrad who’s also his student - will he find out that the little things are bigger than he bargained for? Set at the University of Michigan in the world of competitive pub trivia, “Answer This!” is the story of a boy finally coming of age - when he’s 30. "
    },
    "cast":{
        "name":["Christopher Gorham ","Arielle Kebbel","Chris Parnell","Nelson Franklin","Evan Jones","Kip Pardue","Kali Hawk","Ralph Williams"]
        },
    "genre":{
        "name":["Comedy","Drama"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/answerthis/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/answerthis/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37168139",
            "content":"http://trailers.apple.com/movies/independent/answerthis/answerthis-tlr1b_h480p.mov"
        }
    }
},{
    "id":"4080",
    "info":{
        "title":"Arthur Christmas",
        "runtime":"1:25",
        "rating":"PG",
        "studio":"Sony Pictures",
        "postdate":"2011-08-04",
        "releasedate":"2011-11-23",
        "copyright":"© Copyright 2011 Sony Pictures",
        "director":"Sarah Smith",
        "description":"The 3D, CG-animated family comedy Arthur Christmas, an Aardman production for Sony Pictures Animation, at last reveals the incredible, never-before seen answer to every child’s question: ‘So how does Santa deliver all those presents in one night?’ The answer: Santa’s exhilarating, ultra-high-tech operation hidden beneath the North Pole. But at the heart of the film is a story with the ingredients of a Christmas classic - a family in a state of comic dysfunction and an unlikely hero, Arthur, with an urgent mission that must be completed before Christmas morning dawns. "
    },
    "cast":{
        "name":["James McAvoy","Hugh Laurie","Jim Broadbent","Bill Nighy","Imelda Staunton","Ashley Jensen"]
        },
    "genre":{
        "name":["Family","Comedy","Drama"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/arthurchristmas/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/arthurchristmas/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"21393381",
            "content":"http://trailers.apple.com/movies/sony_pictures/arthurchristmas/arthurchristmas-tlr2_h480p.mov"
        }
    }
},{
    "id":"4441",
    "info":{
        "title":"Battleship",
        "runtime":"2:12",
        "rating":"Not yet rated",
        "studio":"Universal Pictures",
        "postdate":"2011-07-28",
        "releasedate":"2012-05-18",
        "copyright":"© Copyright 2012 Universal Pictures",
        "director":"Peter Berg",
        "description":"Peter Berg (Hancock) produces and directs Battleship, an epic action-adventure that unfolds across the seas, in the skies and over land as our planet fights for survival against a superior force.  Based on Hasbro’s classic naval combat game, Battleship stars Taylor Kitsch as Lt. Alex Hopper, a Naval officer assigned to the USS John Paul Jones; Brooklyn Decker as Sam Shane, a physical therapist and Hopper’s fiancee; Alexander Skarsgard as Hopper’s older brother, Stone, Commanding Officer of the USS Sampson; Rihanna as Petty Officer Raikes, Hopper’s crewmate and a weapons specialist on the USS John Paul Jones; and international superstar Liam Neeson as Hopper and Stone’s superior (and Sam’s father), Admiral Shane."
    },
    "cast":{
        "name":["Taylor Kitsch","Brooklyn Decker","Alexander Skarsgard","Rihanna","Asano Tadanobu","Liam Neeson"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/battleship/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/battleship/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"39732836",
            "content":"http://trailers.apple.com/movies/universal/battleship/battleship-tlr1_h480p.mov"
        }
    }
},{
    "id":"4542",
    "info":{
        "title":"Benda Bilili!",
        "runtime":"1:17",
        "rating":"PG-13",
        "studio":"National Geographic Entertainment",
        "postdate":"2011-09-30",
        "releasedate":"2011-09-30",
        "copyright":"© Copyright 2011 National Geographic Entertainment",
        "director":"Renaud Barret, Florent de La Tullaye",
        "description":"In 2004, French film directors Florent de la Tullaye and Renaud Barret encountered this ragtag group of homeless and handicapped street musicians as they played their music on homemade instruments in the area around the Kinshasa Zoo and began documenting the band’s struggles to survive, through music, in the volatile city. The result is an exuberant film that follows the band’s journey from the streets to the world’s stages, culminating in the 2009 release of their acclaimed album “Tres Tres Fort.” "
    },
    "genre":{
        "name":["Documentary","Foreign"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/bendabilili/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/bendabilili/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"17212294",
            "content":"http://trailers.apple.com/movies/independent/bendabilili/bendabilili-tlr1_h480p.mov"
        }
    }
},{
    "id":"4530",
    "info":{
        "title":"Best Exotic Marigold Hotel",
        "runtime":"2:28",
        "rating":"PG-13",
        "studio":"Fox Searchlight Pictures",
        "postdate":"2011-09-15",
        "releasedate":"2012-03-09",
        "copyright":"© Copyright 2012 Fox Searchlight Pictures",
        "director":"John Madden",
        "description":"THE BEST EXOTIC MARIGOLD HOTEL follows a group of British retirees who decide to “outsource” their retirement to less expensive and seemingly exotic India.  Enticed by advertisements for the newly restored Marigold Hotel and bolstered with visions of a life of leisure, they arrive to find the palace a shell of its former self. Though the new environment is less luxurious than imagined, they are forever transformed by their shared experiences, discovering that life and love can begin again when you let go of the past."
    },
    "cast":{
        "name":["Judi Dench","Maggie Smith","Tom Wilkinson","Bill Nighy","Dev Patel"]
        },
    "genre":{
        "name":["Comedy","Drama"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox_searchlight/bestexoticmarigoldhotel/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox_searchlight/bestexoticmarigoldhotel/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"50426894",
            "content":"http://trailers.apple.com/movies/fox_searchlight/bestexoticmarigoldhotel/bestexoticmarigoldhotel-tlr1_h480p.mov"
        }
    }
},{
    "id":"4548",
    "info":{
        "title":"Big Miracle",
        "runtime":"2:29",
        "rating":"PG",
        "studio":"Universal Pictures",
        "postdate":"2011-09-22",
        "releasedate":"2012-02-03",
        "copyright":"© Copyright 2012 Universal Pictures",
        "director":"Ken Kwapis",
        "description":"Inspired by the true story that captured the hearts of people across the world, the rescue adventure Big Miracle tells the amazing tale of a small town news reporter (John Krasinski) and a Greenpeace volunteer (Drew Barrymore) who are joined by rival world superpowers to save a family of majestic gray whales trapped by rapidly forming ice in the Arctic Circle. Local newsman Adam Carlson (Krasinski) can’t wait to escape the northern tip of Alaska for a bigger market.  But just when the story of his career breaks, the world comes chasing it, too.  With an oil tycoon, heads of state and hungry journalists descending upon the frigid outpost, the one who worries Adam the most is Rachel Kramer (Barrymore).  Not only is she an outspoken environmentalist, she’s also his ex-girlfriend. With time running out, Rachel and Adam must rally an unlikely coalition of Inuit natives, oil companies and Russian and American military to set aside their differences and free the whales.  As the world’s attention turns to the top of the globe, saving these endangered animals becomes a shared cause for nations entrenched against one another and leads to a momentary thaw in the Cold War.  "
    },
    "cast":{
        "name":["Drew Barrymore","John Krasinski","Kristen Bell","Dermot Mulroney","Tim Blake Nelson","Ted Danson"]
        },
    "genre":{
        "name":["Drama","Romance"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/bigmiracle/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/bigmiracle/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44574663",
            "content":"http://trailers.apple.com/movies/universal/bigmiracle/bigmiracle-tlr1_h480p.mov"
        }
    }
},{
    "id":"4489",
    "info":{
        "title":"Blackthorn",
        "runtime":"2:21",
        "rating":"R",
        "studio":"Magnolia Pictures",
        "postdate":"2011-08-23",
        "releasedate":"2011-10-07",
        "copyright":"© Copyright 2011 Magnolia Pictures",
        "director":"Mateo Gil",
        "description":"It’s been said (but unsubstantiated) that Butch Cassidy and the Sundance Kid were killed in a standoff with the Bolivian military in 1908. In BLACKTHORN, Cassidy (Shepard) survived, and is quietly living out his years under the name James Blackthorn in a secluded Bolivian village. Tired of his long exile from the US and hoping to see his family again before he dies, Cassidy sets out on the long journey home. But when an unexpected encounter with an ambitious young criminal (Eduardo Noriega) derails his plans, he is thrust into one last adventure, the likes of which he hasn’t experienced since his glory days with the Sundance Kid."
    },
    "cast":{
        "name":["Sam Shepard","Eduardo Noriega","Stephen Rea","Magaly Solier"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/magnolia/blackthorn/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/magnolia/blackthorn/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44703170",
            "content":"http://trailers.apple.com/movies/magnolia_pictures/blackthorn/blackthorn-tlr1_h480p.mov"
        }
    }
},{
    "id":"4391",
    "info":{
        "title":"Brave",
        "runtime":"1:05",
        "rating":"Not yet rated",
        "studio":"Walt Disney Pictures",
        "postdate":"2011-06-29",
        "releasedate":"2012-06-22",
        "copyright":"© Copyright 2012 Walt Disney Pictures",
        "director":"Mark Andrews, Brenda Chapman",
        "description":"Since ancient times, stories of epic battles and mystical legends have been passed through the generations across the rugged and mysterious Highlands of Scotland. In “Brave,” a new tale joins the lore when the courageous Merida (voice of Kelly Macdonald) confronts tradition, destiny and the fiercest of beasts. Merida is a skilled archer and impetuous daughter of King Fergus (voice of Billy Connolly) and Queen Elinor (voice of Emma Thompson). Determined to carve her own path in life, Merida defies an age-old custom sacred to the uproarious lords of the land: massive Lord MacGuffin (voice of Kevin McKidd), surly Lord Macintosh (voice of Craig Ferguson) and cantankerous Lord Dingwall (voice of Robbie Coltrane). Merida’s actions inadvertently unleash chaos and fury in the kingdom, and when she turns to an eccentric old Wise Woman (voice of Julie Walters) for help, she is granted an ill-fated wish. The ensuing peril forces Merida to discover the meaning of true bravery in order to undo a beastly curse before it’s too late."
    },
    "cast":{
        "name":["Kelly MacDonald","Emma Thompson","Billy Connolly","Julie Walters","Kevin McKidd","Craig Ferguson","Robbie Coltrane"]
        },
    "genre":{
        "name":["Comedy","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/disney/brave/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/disney/brave/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"20347974",
            "content":"http://trailers.apple.com/movies/disney/brave/brave-tsr1_h480p.mov"
        }
    }
},{
    "id":"4588",
    "info":{
        "title":"Carnage",
        "runtime":"1:59",
        "rating":"R",
        "studio":"Sony Pictures Classics",
        "postdate":"2011-10-20",
        "releasedate":"2011-12-16",
        "copyright":"© Copyright 2011 Sony Pictures Classics",
        "director":"Roman Polanski",
        "description":"CARNAGE is a razor sharp, biting comedy centered on parental differences. After two boys duke it out on a playground, the parents of the “victim” invite the parents of the “bully” over to work out their issues. A polite discussion of childrearing soon escalates into verbal warfare, with all four parents revealing their true colors. None of them will escape the carnage."
    },
    "cast":{
        "name":["Jodie Foster","Kate Winslet","Christoph Waltz","John C. Reilly"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony/carnage/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony/carnage/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"35969010",
            "content":"http://trailers.apple.com/movies/sony/carnage/carnage-tlr1_h480p.mov"
        }
    }
},{
    "id":"4275",
    "info":{
        "title":"Chimpanzee",
        "runtime":"1:56",
        "rating":"Not yet rated",
        "studio":"Walt Disney Pictures",
        "postdate":"2011-04-22",
        "releasedate":"2012-04-20",
        "copyright":"© Copyright 2012 Walt Disney Pictures",
        "director":"Alastair Fothergill, Mark Linfield",
        "description":"Disneynature takes moviegoers deep into the forests of Africa with “Chimpanzee,” a new True Life Adventure introducing an adorable baby chimp named Oscar and his entertaining approach to life in a remarkable story of family bonds and individual triumph.  Oscar’s playful curiosity and zest for discovery showcase the intelligence and ingenuity of some of the most extraordinary personalities in the animal kingdom. Working together, Oscar’s chimpanzee family—including his mom and the group’s savvy leader — navigates the complex territory of the forest. The world is a playground for little Oscar and his fellow young chimps, who’d rather make mayhem than join their parents for an afternoon nap. But when Oscar’s family is confronted by a rival band of chimps, he is left to fend for himself until a surprising ally steps in and changes his life forever.  Directed by Alastair Fothergill (“African Cats” and “Earth”) and Mark Linfield (“Earth”), “Chimpanzee” swings into theaters on Earth Day 2012."
    },
    "genre":{
        "name":"Documentary"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/disney/chimpanzee/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/disney/chimpanzee/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"29176798",
            "content":"http://trailers.apple.com/movies/disney/chimpanzee/chimpanzee-tlr1_h480p.mov"
        }
    }
},{
    "id":"4596",
    "info":{
        "title":"Chronicle",
        "runtime":"2:13",
        "rating":"Not yet rated",
        "studio":"20th Century Fox",
        "postdate":"2011-10-25",
        "releasedate":"2012-02-03",
        "copyright":"© Copyright 2012 20th Century Fox",
        "director":"Joshua Trank",
        "description":"Three high school students make an incredible discovery, leading to their developing uncanny powers beyond their understanding.  Even as they learn to control their abilities and use them to their advantage, their lives start to spin out of control because their darker sides begin to take over.  "
    },
    "cast":{
        "name":["Alex Russell","Michael B. Jordan","Dane DeHaan","Ashley Hinshaw","Michael Kelly"]
        },
    "genre":{
        "name":["Drama","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox/chronicle/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox/chronicle/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"33342636",
            "content":"http://trailers.apple.com/movies/fox/chronicle/chronicle-tlr1_h480p.mov"
        }
    }
},{
    "id":"4581",
    "info":{
        "title":"Contraband",
        "runtime":"2:28",
        "rating":"R",
        "studio":"Universal Pictures",
        "postdate":"2011-10-18",
        "releasedate":"2012-01-13",
        "copyright":"© Copyright 2012 Universal Pictures",
        "director":"Baltasar Kormákur",
        "description":"Mark Wahlberg leads the cast of Contraband, a fast-paced thriller about a man trying to stay out of a world he worked so hard to leave behind and the family he’ll do anything to protect. Set in New Orleans, the film explores the cutthroat underground world of international smuggling—full of desperate criminals and corrupt officials, high-stakes and big payoffs—where loyalty rarely exists and death is one wrong turn away. Chris Farraday (Wahlberg) long ago abandoned his life of crime, but after his brother-in-law, Andy (Caleb Landry Jones), botches a drug deal for his ruthless boss, Tim Briggs (Giovanni Ribisi), Chris is forced back into doing what he does best— running contraband—to settle Andy’s debt. Chris is a legendary smuggler and quickly assembles a crew with the help of his best friend, Sebastian (Ben Foster), for one final run to Panama and back, hoping to return with millions in counterfeit bills. Things quickly fall apart and with only hours to reach the cash, Chris must use his rusty skills to successfully navigate a treacherous criminal network of brutal drug lords, cops and hit men before his wife, Kate (Kate Beckinsale), and sons become their target. "
    },
    "cast":{
        "name":["Mark Wahlberg","Kate Beckinsale","Ben Foster","Giovanni Ribisi","Lukas Haas","Caleb Landry Jones","Diego Luna","J.K. Simmons"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/contraband/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/contraband/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"46495339",
            "content":"http://trailers.apple.com/movies/universal/contraband/contraband-tlr1_h480p.mov"
        }
    }
},{
    "id":"4389",
    "info":{
        "title":"Courageous",
        "runtime":"2:19",
        "rating":"PG-13",
        "studio":"Sony Pictures",
        "postdate":"2011-06-28",
        "releasedate":"11-09-30",
        "copyright":"© Copyright 2011 Sony Pictures",
        "director":"Alex Kendrick",
        "description":"Four men, one calling: To serve and protect. As law enforcement officers, they are confident and focused, standing up to the worst the streets can offer. Yet at the end of the day, they face a challenge they’re ill prepared to tackle: fatherhood. When tragedy strikes home, these men are left wrestling with their hopes, their fears, their faith, and their fathering. Sherwood Pictures, creators of Fireproof, returns with this heartfelt, action-packed story. Protecting the streets is second nature to these law enforcement officers. Raising their children in a God-honoring way? That takes courage."
    },
    "cast":{
        "name":["Alex Kendrick","Kevin Downes","Ken Bevel","Robert Amaya","Ben Davies"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/courageous/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/courageous/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"45346920",
            "content":"http://trailers.apple.com/movies/sony_pictures/courageous/courageous-tlr1_h480p.mov"
        }
    }
},{
    "id":"4396",
    "info":{
        "title":"Dirty Girl",
        "runtime":"2:26",
        "rating":"R",
        "studio":"Weinstein Company",
        "postdate":"2011-07-22",
        "releasedate":"2011-10-07",
        "copyright":"© Copyright 2011 Weinstein Company",
        "director":"Abe Sylvia",
        "description":"“Dirty Girl” is the story of Danielle (Juno Temple), the dirty girl of Norman High School in Norman, Oklahoma, circa 1987. When Danielle’s misbehavior gets her banished to a remedial class, she is paired on a parenting project with Clarke (Jeremy Dozier), an innocent closet-case with no friends.  Danielle is determined to get to California to find the father she’s never met, and Clarke is desperate to escape being sent to military school by his homophobic dad.  Together, the mismatched misfits light out for California, and discover each other and themselves through a funny and serendipitous friendship."
    },
    "cast":{
        "name":["Juno Temple","Milla Jovovich","William H. Macy","Mary Steenburgen","Dwight Yoakam","Jeremy Dozier"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/weinstein/dirtygirl/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/weinstein/dirtygirl/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"43613064",
            "content":"http://trailers.apple.com/movies/weinstein/dirtygirl/dirtygirl-tlr1_h480p.mov"
        }
    }
},{
    "id":"4262",
    "info":{
        "title":"Dolphin Tale",
        "runtime":"2:28",
        "rating":"PG",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-07-21",
        "releasedate":"2011-09-23",
        "copyright":"© Copyright 2011 Warner Bros. Pictures",
        "director":"Charles Martin Smith",
        "description":"“Dolphin Tale” is inspired by the amazing true story of a brave dolphin and the compassionate strangers who banded together to save her life. Swimming free, a young dolphin is caught in a crab trap, severely damaging her tail. She is rescued and transported to the Clearwater Marine Hospital, where she is named Winter. But her fight for survival has just begun. Without a tail, Winter’s prognosis is dire. It will take the expertise of a dedicated marine biologist, the ingenuity of a brilliant prosthetics doctor, and the unwavering devotion of a young boy to bring about a groundbreaking miracle—a miracle that might not only save Winter but could also help scores of people around the world. The real Winter, who plays herself in “Dolphin Tale,” today serves as a symbol of courage, perseverance and hope to millions of people—both able and disabled—who have been touched by her remarkable story of recovery and rehabilitation."
    },
    "cast":{
        "name":["Morgan Freeman","Harry Connick Jr.","Ashley Judd","Kris Kristofferson","Nathan Gamble"]
        },
    "genre":{
        "name":["Family","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/dolphintale/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/dolphintale/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37088335",
            "content":"http://trailers.apple.com/movies/wb/dolphintale/dolphintale-tlr3_h480p.mov"
        }
    }
},{
    "id":"4611",
    "info":{
        "title":"Dr. Seuss' The Lorax",
        "runtime":"2:31",
        "rating":"Not yet rated",
        "studio":"Universal Pictures",
        "postdate":"2011-10-27",
        "releasedate":"2012-03-02",
        "copyright":"© Copyright 2012 Universal Pictures",
        "director":"Chris Renaud",
        "description":"From the creators of Despicable Me and the imagination of Dr. Seuss comes the 3D-CG feature Dr. Seuss’ The Lorax, an adaptation of the classic tale of a forest creature who shares the enduring power of hope. The animated adventure follows the journey of a 12-year-old as he searches for the one thing that will enable him to win the affection of the girl of his dreams. To find it he must discover the story of the Lorax, the grumpy yet charming creature who fights to protect his world. Danny DeVito will lend his vocal talents to the iconic title character of the Lorax, while Ed Helms will voice the enigmatic Once-ler. Also bringing their talents to the film are global superstars Zac Efron as Ted, the idealistic youth who searches for the Lorax, and Taylor Swift as Audrey, the girl of Ted’s dreams. Rob Riggle will play financial king O’Hare, and beloved actress Betty White will portray Ted’s wise Grammy Norma. Dr. Seuss’ The Lorax is the third feature created by Universal Pictures and Illumination Entertainment (Despicable Me, Hop)."
    },
    "cast":{
        "name":["Danny DeVito","Zac Efron","Ed Helms","Taylor Swift","Rob Riggle","Betty White"]
        },
    "genre":{
        "name":["Family","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/thelorax/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/thelorax/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"33563258",
            "content":"http://trailers.apple.com/movies/universal/thelorax/thelorax-tlr1_h480p.mov"
        }
    }
},{
    "id":"4415",
    "info":{
        "title":"Dream House",
        "runtime":"2:31",
        "rating":"PG-13",
        "studio":"Universal Pictures",
        "postdate":"2011-07-20",
        "releasedate":"2011-09-30",
        "copyright":"© Copyright 2011 Universal Pictures",
        "director":"Jim Sheridan",
        "description":"Some say that all houses have memories.  For one man, his home is the place he would kill to forget.  Daniel Craig, Naomi Watts and Rachel Weisz star in Dream House, a suspense thriller about a family that unknowingly moves into a home where grisly murders were committed…only to find themselves the killer’s next target. Successful publisher Will Atenton (Craig) quit a high power job in Manhattan to relocate his wife, Libby (Weisz), and two girls to a quaint New England town.  But as they settle into their new life, they discover their perfect home was the murder scene of a mother and her children.  And the entire city believes it was at the hands of the husband who survived. When Will investigates, he’s not sure if he’s starting to see ghosts or if the tragic story is just hitting too close to home.  His only clues come from Ann Paterson (Watts), a mysterious neighbor who knew those who were shot.  And as Will and Ann piece together the haunting puzzle, they must find out who murdered the family in Will’s dream house before he returns to kill again.  "
    },
    "cast":{
        "name":["Daniel Craig","Naomi Watts","Rachel Weisz","Marton Csokas","Elias Koteas","Jane Alexander"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/dreamhouse/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/dreamhouse/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44093765",
            "content":"http://trailers.apple.com/movies/universal/dreamhouse/dreamhouse-tlr1b_h480p.mov"
        }
    }
},{
    "id":"4469",
    "info":{
        "title":"Drive",
        "runtime":"2:28",
        "rating":"R",
        "studio":"FilmDistrict",
        "postdate":"2011-08-12",
        "releasedate":"2011-09-16",
        "copyright":"© Copyright 2011 FilmDistrict",
        "director":"Nicolas Winding Refn",
        "description":"Ryan Gosling stars as a Los Angeles wheelman for hire, stunt driving for movie productions by day and steering getaway vehicles for armed heists by night. Though a loner by nature, Driver can’t help falling in love with his beautiful neighbor Irene (Carey Mulligan), a vulnerable young mother dragged into a dangerous underworld by the return of her ex-convict husband Standard (Oscar Isaac). After a heist intended to pay off Standard’s protection money spins unpredictably out of control, Driver finds himself driving defense for the girl he loves, tailgated by a syndicate of deadly serious criminals (Albert Brooks and Ron Perlman). But when he realizes that the gangsters are after more than the bag of cash in his trunk-that they’re coming straight for Irene and her son-Driver is forced to shift gears and go on offense."
    },
    "cast":{
        "name":["Ryan Gosling","Carey Mulligan","Bryan Cranston","Christina Hendricks","Ron Perlman","Oscar Isaac","Albert Brooks"]
        },
    "genre":{
        "name":["Drama","Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/drive/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/drive/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"45957497",
            "content":"http://trailers.apple.com/movies/independent/drive/drive-tlr1_h480p.mov"
        }
    }
},{
    "id":"4585",
    "info":{
        "title":"Elevate",
        "runtime":"2:20",
        "rating":"PG",
        "studio":"Variance Films",
        "postdate":"2011-10-21",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Variance Films",
        "director":"Anne Buford",
        "description":"The SEEDS Academy gathers the best young basketball players from across West Africa for a strenuous program of academics and athletic training. Those that excel are rewarded with full scholarships to top US prep schools, where success can equal college, basketball at the NCAA level… and maybe even a shot at the NBA. ELEVATE follows four young men who make the cut and head off the USA, where their challenges are just beginning.  Heartwarming and packed with amazing basketball, ELEVATE is a wonderful film for the whole family. "
    },
    "genre":{
        "name":"Documentary"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/elevate/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/elevate/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"31147571",
            "content":"http://trailers.apple.com/movies/independent/elevate/elevate-tlr1_h480p.mov"
        }
    }
},{
    "id":"4554",
    "info":{
        "title":"Extremely Loud ",
        "runtime":"2:28",
        "rating":"Not yet rated",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-09-28",
        "releasedate":"2011-12-25",
        "copyright":"© Copyright 2011 Warner Bros. Pictures",
        "director":"Stephen Daldry",
        "description":"Based on the acclaimed novel of the same name, “Extremely Loud & Incredibly Close” tells the story of one young boy’s journey from heartbreaking loss to the healing power of self-discovery, set against the backdrop of the tragicevents of September 11. Eleven-year-old Oskar Schell is an exceptional child: amateur inventor, Francophile, pacifist.  And after finding a mysterious key that belonged to his father, who died in the World Trade Center on 9/11, he embarks on an exceptional journey—an urgent, secret search through the five boroughs of New York.  As Oskar roams the city, he encounters a motley assortment of humanity, who are all survivors in their own ways.  Ultimately, Oskar’s journey ends where it began, but with the solace of that most human experience: love."
    },
    "cast":{
        "name":["Tom Hanks","Sandra Bullock","Thomas Horn","Max von Sydow","Viola Davis","John Goodman","Jeffrey Wright"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/extremelyloudandincrediblyclose/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/extremelyloudandincrediblyclose/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"50061711",
            "content":"http://trailers.apple.com/movies/wb/extremelyloud/extremelyloud-tlr1_h480p.mov"
        }
    }
},{
    "id":"4481",
    "info":{
        "title":"Father of Invention",
        "runtime":"2:04",
        "rating":"PG-13",
        "studio":"Anchor Bay Films",
        "postdate":"2011-08-18",
        "releasedate":"2011-10-14",
        "copyright":"© Copyright 2011 Anchor Bay Films",
        "director":"Trent Cooper",
        "description":"Millionaire infomercial guru, Robert Axle (Kevin Spacey) loses everything when one of his inventions has a design flaw that accidentally chops off the fingers of thousands of customers. After serving eight years in prison, a disgraced Axle is released, and ready to redeem his name and rebuild his empire with a new innovation. However, Axle’s ex-wife (Virginia Madsen) has spent all of his money and moved into his house with her new husband (Craig Robinson). Out of desperation, he finds a part-time job as a janitor, and is forced to move in with his estranged daughter (Camilla Belle) and her over-protective roommates.  Despite these setbacks he is determined to pitch his newest gadget and rebuild his infomercial empire. But the world has changed in the last decade, and Axle finds himself out of step with current technology, his family, and the self-confidence that made him king of the infomercials in the past.  With all his wheels spinning, Axle soon realizes before he can be successful with his new creation, first he must reinvent himself."
    },
    "cast":{
        "name":["Kevin Spacey","Heather Graham","Camilla Belle","Johnny Knoxville","Craig Robinson","Virginia Madsen"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/fatherofinvention/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/fatherofinvention/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"39777974",
            "content":"http://trailers.apple.com/movies/independent/fatherofinvention/fatherofinvention-tlr1_h480p.mov"
        }
    }
},{
    "id":"4549",
    "info":{
        "title":"Fireflies in the Garden",
        "runtime":"2:27",
        "rating":"R",
        "studio":"FSI",
        "postdate":"2011-09-26",
        "releasedate":"2011-10-14",
        "copyright":"© Copyright 2011 FSI",
        "director":"Dennis Lee",
        "description":"To an outsider, the Taylors are the very picture of the successful American family: Charles (Willem Dafoe) is a tenured professor on track to become university president, son Michael (Ryan Reynolds) is a prolific and well-known romance novelist, daughter Ryne (Shannon Lucio) is poised to enter a prestigious law school, and on the day we are introduced to them, matriarch Lisa (Julia Roberts) will graduate from college—decades after leaving to raise her children. But when a serious accident interrupts the celebration, the far more nuanced reality of this Midwestern family’s history and relationships come to light."
    },
    "cast":{
        "name":["Ryan Reynolds","Julia Roberts","Willem Dafoe","Emily Watson","Carrie-Anne Moss","Ioan Gruffudd","Hayden Panettiere"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/firefliesinthegarden/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/firefliesinthegarden/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44708981",
            "content":"http://trailers.apple.com/movies/independent/firefliesinthegarden/firefliesinthegarden-tlr1_h480p.mov"
        }
    }
},{
    "id":"4386",
    "info":{
        "title":"Footloose",
        "runtime":"1:50",
        "rating":"PG-13",
        "studio":"Paramount Pictures",
        "postdate":"2011-08-25",
        "releasedate":"2011-10-14",
        "copyright":"© Copyright 2011 Paramount Pictures",
        "director":"Craig Brewer",
        "description":"Writer/Director Craig Brewer (“Hustle & Flow,” “Black Snake Moan”) delivers a new take of the beloved 1984 classic film, “Footloose.”  Ren MacCormack (played by newcomer Kenny Wormald) is transplanted from  Boston to the small southern town of Bomont where he experiences  a heavy dose of culture shock.  A few years prior, the community was rocked by a tragic accident that killed five teenagers after a night out and Bomont’s local councilmen and the beloved Reverend Shaw Moore (Dennis Quaid) responded by implementing ordinances that prohibit loud music and dancing. Not one to bow to the status quo, Ren challenges the ban, revitalizing the town and falling in love with the minister’s troubled daughter Ariel (Julianne Hough) in the process."
    },
    "cast":{
        "name":["Kenny Wormald","Julianne Hough","Andie MacDowell","Dennis Quaid"]
        },
    "genre":{
        "name":["Comedy","Drama"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/paramount/footloose/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/paramount/footloose/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"32234862",
            "content":"http://trailers.apple.com/movies/paramount/footloose/footloose-tlr2_h480p.mov"
        }
    }
},{
    "id":"4484",
    "info":{
        "title":"Ghost Rider: Spirit of Vengeance",
        "runtime":"1:47",
        "rating":"PG-13",
        "studio":"Sony Pictures",
        "postdate":"2011-08-19",
        "releasedate":"2012-02-17",
        "copyright":"© Copyright 2012 Sony Pictures",
        "director":"Brian Taylor, Mark Neveldine",
        "description":"Nicolas Cage returns as Johnny Blaze in Columbia Pictures’ and Hyde Park Entertainment’s Ghost Rider: Spirit of Vengeance.  In the successor to the worldwide hit Ghost Rider, Johnny - still struggling with his curse as the devil’s bounty hunter - is hiding out in a remote part of Eastern Europe when he is recruited by a secret sect of the church to save a young boy (Fergus Riordan) from the devil (Ciaran Hinds).  At first, Johnny is reluctant to embrace the power of the Ghost Rider, but it is the only way to protect the boy - and possibly rid himself of his curse forever.  Directed by Mark Neveldine and Brian Taylor.  Screenplay by Scott M. Gimple & Seth Hoffman and David S. Goyer.  Story by David S. Goyer.  Based on the Marvel Comic.  Produced by Steven Paul, Ashok Amritraj, Michael De Luca, Avi Arad, and Ari Arad."
    },
    "cast":{
        "name":["Nicolas Cage","Fergus Riordan","Ciaran Hinds"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/ghostriderspiritofvengeance/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/ghostriderspiritofvengeance/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"32263566",
            "content":"http://trailers.apple.com/movies/sony_pictures/ghostriderspiritofvengeance/ghostrider2-tlr1_h480p.mov"
        }
    }
},{
    "id":"4338",
    "info":{
        "title":"Happy Feet Two",
        "runtime":"2:22",
        "rating":"PG",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-10-28",
        "releasedate":"2011-11-18",
        "copyright":"© Copyright 2011 Warner Bros. Pictures",
        "director":"George Miller",
        "description":" The sequel to the Academy Award(R) winning animated smash hit, “Happy Feet Two” returns audiences to the magnificent landscape of Antarctica in superb 3D. Mumble, The Master of Tap, has a problem because his tiny son Erik is choreo-phobic. Reluctant to dance, Erik runs away and encounters The Mighty Sven - a penguin who can fly!! Mumble has no hope of competing with this charismatic new role model. But things get worse when the world is shaken by powerful forces. Erik learns of his father’s ‘guts and grit’ as Mumble brings together the penguin nations and all manner of fabulous creatures - from tiny Krill to giant Elephant Seals - to put things right."
    },
    "cast":{
        "name":["Elijah Wood","Robin Williams","Hank Azaria","Alecia Moore (P!nk)","Brad Pitt","Matt Damon","Sofia Vergara","Hugo Weaving","Richard Carter","Common","Magda Szubanski","Anthony LaPagila"]
        },
    "genre":{
        "name":["Family","Comedy","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/happyfeettwo/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/happyfeettwo/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"31704851",
            "content":"http://trailers.apple.com/movies/wb/happyfeet2/happyfeet2-tlr4_h480p.mov"
        }
    }
},{
    "id":"4423",
    "info":{
        "title":"Haywire",
        "runtime":"2:35",
        "rating":"R",
        "studio":"Relativity Media",
        "postdate":"2011-07-22",
        "releasedate":"2012-01-20",
        "copyright":"© Copyright 2012 Relativity Media",
        "director":"Steven Soderbergh",
        "description":"This dynamic action-thriller directed by Oscar(R) winner Steven Soderbergh (Traffic) boasts a talented cast that includes Channing Tatum (GI Joe: Rise of the Cobra), Ewan McGregor (The Ghost Writer), Michael Fassbender (X-Men: First Class), Antonio Banderas (The Legend of Zoro), Bill Paxton (“Big Love”), Michael Douglas (Wall Street: Money Never Sleeps), Michael Angarano (Almost Famous); and introduces mixed martial arts (MMA) superstar Gina Carano as Mallory Kane, in a demanding lead role that has her performing her own high-adrenaline stunts. Mallory Kane is a highly trained operative who works for a government security contractor in the dirtiest, most dangerous corners of the world. After successfully freeing a Chinese journalist held hostage, she is double crossed and left for dead by someone close to her in her own agency. Suddenly the target of skilled assassins who know her every move, Mallory must find the truth in order to stay alive. Using her black-ops military training, she devises an ingenious—and dangerous—trap. But when things go haywire, Mallory realizes she’ll be killed in the blink of an eye unless she finds a way to turn the tables on her ruthless adversary. "
    },
    "cast":{
        "name":["Gina Carano","Channing Tatum","Michael Fassbender","Ewan McGregor","Michael Angarano","Antonio Banderas","Michael Douglas","Bill Paxton"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/haywire/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/haywire/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"47906673",
            "content":"http://trailers.apple.com/movies/independent/haywire/haywire-tlr1_h480p.mov"
        }
    }
},{
    "id":"4412",
    "info":{
        "title":"Hugo",
        "runtime":"1:56",
        "rating":"PG",
        "studio":"Paramount Pictures",
        "postdate":"2011-10-24",
        "releasedate":"2011-11-23",
        "copyright":"© Copyright 2011 Paramount Pictures",
        "director":"Martin Scorsese",
        "description":"Throughout his extraordinary career, Academy Award-wining director Martin Scorsese has brought his unique vision and dazzling gifts to life in a series of unforgettable films. This holiday season the legendary storyteller invites you to join him on a thrilling journey to a magical world with his first-ever 3-D film, based on Brian Selznick’s award-winning, imaginative New York Times best-seller, “The Invention of Hugo Cabret.” HUGO is the astonishing adventure of a wily and resourceful boy whose quest to unlock a secret left to him by his father will transform Hugo and all those around him, and reveal a safe and loving place he can call home."
    },
    "cast":{
        "name":["Asa Butterfield","Chloe Grace Moretz","Sacha Baron Cohen","Ben Kingsley","Jude Law","Ray Winstone","Christopher Lee","Helen McCrory","Richard Griffiths","Frances de la Tour","Emily Mortimer","Michael Stuhlbarg"]
        },
    "genre":{
        "name":"Family"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/paramount/hugo/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/paramount/hugo/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"28194336",
            "content":"http://trailers.apple.com/movies/paramount/hugo/hugo-tlr2_h480p.mov"
        }
    }
},{
    "id":"4280",
    "info":{
        "title":"Immortals",
        "runtime":"2:33",
        "rating":"R",
        "studio":"Relativity Media",
        "postdate":"2011-08-22",
        "releasedate":"2011-11-11",
        "copyright":"© Copyright 2011 Relativity Media",
        "director":"Tarsem Singh",
        "description":"Visionary director Tarsem Singh (The Cell, The Fall) and producers Gianni Nunnari (300), Mark Canton (300) and Ryan Kavanaugh (The Fighter) unleash an epic tale of treachery, vengeance and destiny in Immortals, a stylish and spectacular 3-D adventure. As a power-mad king razes ancient Greece in search of a legendary weapon, a heroic young villager rises up against him in a thrilling quest as timeless as it is powerful. The brutal and bloodthirsty King Hyperion (Mickey Rourke) and his murderous Heraklion army are rampaging across Greece in search of the long lost Bow of Epirus. With the invincible Bow, the king will be able to overthrow the Gods of Olympus and become the undisputed master of his world. With ruthless efficiency, Hyperion and his legions destroy everything in their wake, and it seems nothing will stop the evil king’s mission. As village after village is obliterated, a stonemason named Theseus (Henry Cavill) vows to avenge the death of his mother in one of Hyperion’s raids. When Theseus meets the Sybelline Oracle, Phaedra (Freida Pinto), her disturbing visions of the young man’s future convince her that he is the key to stopping the destruction. With her help, Theseus assembles a small band of followers and embraces his destiny in a final desperate battle for the future of humanity."
    },
    "cast":{
        "name":["Henry Cavill","Stephen Dorff","Isabel Lucas","Freida Pinto","Luke Evans","Kellan Lutz","John Hurt","Mickey Rourke"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/immortals/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/immortals/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"38518575",
            "content":"http://trailers.apple.com/movies/independent/immortals/immortals-tlr3_h480p.mov"
        }
    }
},{
    "id":"4603",
    "info":{
        "title":"Into the Abyss",
        "runtime":"2:25",
        "rating":"PG-13",
        "studio":"IFC Films",
        "postdate":"2011-10-26",
        "releasedate":"2011-11-11",
        "copyright":"© Copyright 2011 IFC Films",
        "director":"Werner Herzog",
        "description":"Legendary filmmaker Werner Herzog (CAVE OF FORGOTTEN DREAMS, GRIZZLY MAN) returns with INTO THE ABYSS: A TALE OF DEATH, A TALE OF LIFE, a riveting examination of a horrible crime which probes the human psyche to explore why people kill—and why the state kills. In intimate conversations with those involved, including 28-year-old death row inmate Michael Perry (who was scheduled to die eight days after his interview with Herzog), the filmmaker achieves what he describes as “a gaze into the abyss of the human soul.” As he’s so often done before, Herzog’s investigation unveils layers of humanity, making an enlightening trip out of ominous territory."
    },
    "genre":{
        "name":"Documentary"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/intotheabyss/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/intotheabyss/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"34579193",
            "content":"http://trailers.apple.com/movies/ifc_films/intotheabyss/intotheabyss-tlr1_h480p.mov"
        }
    }
},{
    "id":"4541",
    "info":{
        "title":"J. Edgar",
        "runtime":"2:28",
        "rating":"R",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-09-19",
        "releasedate":"2011-11-09",
        "copyright":"© Copyright 2011 Warner Bros. Pictures",
        "director":"Clint Eastwood",
        "description":"During his lifetime, J. Edgar Hoover would rise to be the most powerful man in America.  As head of the Federal Bureau of Investigation for nearly 50 years, he would stop at nothing to protect his country.  Through eight presidents and three wars, Hoover waged battle against threats both real and perceived, often bending the rules to keep his countrymen safe.  His methods were at once ruthless and heroic, with the admiration of the world his most coveted, if ever elusive, prize. Hoover was a man who placed great value on secrets—particularly those of others—and was not afraid to use that information to exert authority over the leading figures in the nation.  Understanding that knowledge is power and fear poses opportunity, he used both to gain unprecedented influence and to build a reputation that was both formidable and untouchable. He was as guarded in his private life as he was in his public one, allowing only a small and protective inner circle into his confidence.  His closest colleague, Clyde Tolson, was also his constant companion.  His secretary, Helen Gandy, who was perhaps most privy to Hoover’s designs, remained loyal to the end…and beyond.  Only Hoover’s mother, who served as his inspiration and his conscience, would leave him, her passing truly crushing to the son who forever sought her love and approval. As seen through the eyes of Hoover himself, “J. Edgar” explores the personal and public life and relationships of a man who could distort the truth as easily as he upheld it during a life devoted to his own idea of justice, often swayed by the darker side of power. "
    },
    "cast":{
        "name":["Leonardo DiCaprio","Naomi Watts","Judi Dench","Armie Hammer","Josh Lucas","Ken Howard"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/jedgar/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/jedgar/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44196629",
            "content":"http://trailers.apple.com/movies/wb/jedgar/jedgar-tlr1_h480p.mov"
        }
    }
},{
    "id":"4461",
    "info":{
        "title":"Jack and Jill",
        "runtime":"2:29",
        "rating":"PG",
        "studio":"Sony Pictures",
        "postdate":"2011-08-05",
        "releasedate":"2011-11-11",
        "copyright":"© Copyright 2011 Sony Pictures",
        "director":"Dennis Dugan",
        "description":"Jack and Jill is a comedy focusing on Jack Sadelstein (Adam Sandler), a successful advertising executive in Los Angeles with a beautiful wife and kids, who dreads one event each year: the Thanksgiving visit of his identical twin sister Jill (also Adam Sandler). Jill’s neediness and passive-aggressiveness is maddening to Jack, turning his normally tranquil life upside down.  Katie Holmes plays Erin, Jack’s wife."
    },
    "cast":{
        "name":["Adam Sandler","Katie Holmes","Al Pacino"]
        },
    "genre":{
        "name":["Comedy","Romance"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/jackandjill/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/jackandjill/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37942255",
            "content":"http://trailers.apple.com/movies/sony_pictures/jackandjill/jackandjill-tlr1_h480p.mov"
        }
    }
},{
    "id":"4371",
    "info":{
        "title":"John Carter",
        "runtime":"1:43",
        "rating":"Not yet rated",
        "studio":"Walt Disney Pictures",
        "postdate":"2011-07-14",
        "releasedate":"2012-03-09",
        "copyright":"© Copyright 2012 Walt Disney Pictures",
        "director":"Andrew Stanton",
        "description":"From Academy Award(R)-winning filmmaker Andrew Stanton comes “John Carter”—a sweeping action-adventure set on the mysterious and exotic planet of Barsoom (Mars). “John Carter” is based on a classic novel by Edgar Rice Burroughs, whose highly imaginative adventures served as inspiration for many filmmakers, both past and present. The film tells the story of war-weary, former military captain John Carter (Taylor Kitsch), who is inexplicably transported to Mars where he becomes reluctantly embroiled in a conflict of epic proportions amongst the inhabitants of the planet, including Tars Tarkas (Willem Dafoe) and the captivating Princess Dejah Thoris (Lynn Collins). In a world on the brink of collapse, Carter rediscovers his humanity when he realizes that the survival of Barsoom and its people rests in his hands. "
    },
    "cast":{
        "name":["Taylor Kitsch","Lynn Collins","Samantha Morton","Mark Strong","Ciaran Hinds","Dominic West","James Purefoy","Daryl Sabara","Polly Walker","Bryan Cranston","Thomas Hayden Church","Willem Dafoe"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/disney/johncarter/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/disney/johncarter/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"31496477",
            "content":"http://trailers.apple.com/movies/disney/johncarter/johncarter-tlr1_h480p.mov"
        }
    }
},{
    "id":"4472",
    "info":{
        "title":"Johnny English Reborn",
        "runtime":"2:28",
        "rating":"PG",
        "studio":"Universal Pictures",
        "postdate":"2011-08-18",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Universal Pictures",
        "director":"Oliver Parker\t",
        "description":"Rowan Atkinson returns to the role of the accidental secret agent who doesn’t know fear or danger in the comedy spy-thriller Johnny English Reborn.  In his latest adventure, the most unlikely intelligence officer in Her Majesty’s Secret Service must stop a group of international assassins before they eliminate a world leader and cause global chaos. In the years since MI-7’s top spy vanished off the grid, he has been honing his unique skills in a remote region of Asia.  But when his agency superiors learn of an attempt against the Chinese premier’s life, they must hunt down the highly unorthodox agent.  Now that the world needs him once again, Johnny English is back in action. With one shot at redemption, he must employ the latest in hi-tech gadgets to unravel a web of conspiracy that runs throughout the KGB, CIA and even MI-7.  With mere days until a heads of state conference, one man must use every trick in his playbook to protect us all.  For Johnny English, disaster may be an option, but failure never is. "
    },
    "cast":{
        "name":["Rowan Atkinson","Gillian Anderson","Dominic West","Rosamund Pike","Daniel Kaluuya"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/johnnyenglishreborn/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/johnnyenglishreborn/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"45418177",
            "content":"http://trailers.apple.com/movies/universal/johnnyenglishreborn/johnnyenglish-tlr2_h480p.mov"
        }
    }
},{
    "id":"4388",
    "info":{
        "title":"Killer Elite",
        "runtime":"2:04",
        "rating":"R",
        "studio":"Open Road Films   ",
        "postdate":"2011-08-18",
        "releasedate":"2011-09-23",
        "copyright":"© Copyright 2011 Open Road Films   ",
        "director":"Gary McKendry",
        "description":"Based on a true story, Killer Elite races across the globe from Australia to Paris, London and the Middle East in the action-packed account of an ex-special ops agent (Jason Statham) who is lured out of retirement to rescue his mentor (Robert De Niro). To make the rescue, he must complete a near-impossible mission of killing three tough-as-nails assassins with a cunning leader (Clive Owen)."
    },
    "cast":{
        "name":["Jason Statham","Clive Owen","Robert De Niro","Yvonne Strahovski","Dominic Purcell","Adewale Akinnuoye-Agbaje"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/killerelite/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/killerelite/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"38445202",
            "content":"http://trailers.apple.com/movies/independent/killerelite/killerelite-tlr2_h480p.mov"
        }
    }
},{
    "id":"4556",
    "info":{
        "title":"Knuckle",
        "runtime":"2:18",
        "rating":"R",
        "studio":"ARC Entertainment",
        "postdate":"2011-09-29",
        "releasedate":"2011-12-02",
        "copyright":"© Copyright 2011 ARC Entertainment",
        "director":"Ian Palmer",
        "description":"Meet James Quinn Mcdonagh and Paddy “The Lurcher” Joyce. Related by blood and separated by a feud that dates back generations. As the heads of rival families, they train to represent their feuding travelling clans, in their long-standing history of violent bare-knuckle boxing. KNUCKLE is a rare chance to step inside one of the world’s most vibrant and elusive communities. Travellers are normally silent about certain parts of their lifestyle. Never before has such a portrayal of their fighting traditions been committed to film. Shot in an observational style, KNUCKLE presents a hard edged portrait of Traveller male culture and explores the bond of loyalty, the need for revenge and the pressures to fight for the honour of your family name. Prepare to witness the secretive world of travellers and their way of settling scores. No gloves, no padding, just Knuckle."
    },
    "cast":{
        "name":["James Quinn McDonagh","Paddy Joyce"]
        },
    "genre":{
        "name":["Drama","Documentary"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/knuckle/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/knuckle/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"31360974",
            "content":"http://trailers.apple.com/movies/independent/knuckle/knuckle-tlr1_h480p.mov"
        }
    }
},{
    "id":"4446",
    "info":{
        "title":"Like Crazy",
        "runtime":"2:21",
        "rating":"PG-13",
        "studio":"Paramount Vantage",
        "postdate":"2011-08-09",
        "releasedate":"2011-10-28",
        "copyright":"© Copyright 2011 Paramount Vantage",
        "director":"Drake Doremus",
        "description":"A love story is both a physical and emotional tale, one that can be deeply personal and heartbreaking for an audience to experience. Director Drake Doremus’ film Like Crazy beautifully illustrates how your first real love is as thrilling and blissful as it is devastating. When a British college student (Felicity Jones) falls for her American classmate (Anton Yelchin) they embark on a passionate and life-changing journey only to be separated when she violates the terms of her visa.Like Crazy explores how a couple faces the real challenges of being together and of being apart. Winner of the Grand Jury Prize for Best Picture at the 2011 Sundance Film Festival and of the Special Jury Prize for Best Actress for Felicity Jones, Like Crazydepicts both the hopefulness and the heartbreak of love."
    },
    "cast":{
        "name":["Anton Yelchin","Felicity Jones","Jennifer Lawrence","Charlie Bewley"]
        },
    "genre":{
        "name":["Drama","Romance"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/paramount_vantage/likecrazy/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/paramount_vantage/likecrazy/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37053005",
            "content":"http://trailers.apple.com/movies/paramount_vantage/likecrazy/likecrazy-tlr11_h480p.mov"
        }
    }
},{
    "id":"4478",
    "info":{
        "title":"Limelight",
        "runtime":"2:04",
        "rating":"NR",
        "studio":"Magnolia Pictures",
        "postdate":"2011-08-17",
        "releasedate":"2011-09-23",
        "copyright":"© Copyright 2011 Magnolia Pictures",
        "director":"Billy Corben",
        "description":"As the owner of legendary hotspots like Limelight, Tunnel, Palladium, and Club USA, Peter Gatien was the undisputed king of the 1980s New York City club scene. The eye-patch-sporting Ontario native built and oversaw a Manhattan empire that counted tens of thousands of patrons per night in its peak years, acting as a conduit for a culture that, for many, defined the image of an era in New York. Then years of legal battles and police pressure spearheaded by Mayor Giuliani’s determined crackdown on nightlife in the mid-’90s led to Gatien’s eventual deportation to Canada, and the shuttering of his glitzy kingdom. Featuring insider interviews with famous players in the club scene as well as key informants in Gatien’s high-profile trial, Billy Corben’s (Cocaine Cowboys) exuberant documentary aims to set the record straight about Gatien’s life as it charts his rise and fall against the transformation of New York, offering a wild ride through a now-closed chapter in the history of the city’s nightlife."
    },
    "genre":{
        "name":"Documentary"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/magnolia/limelight/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/magnolia/limelight/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"27824273",
            "content":"http://trailers.apple.com/movies/magnolia_pictures/limelight/limelight-tlr1_h480p.mov"
        }
    }
},{
    "id":"4485",
    "info":{
        "title":"Machine Gun Preacher",
        "runtime":"2:34",
        "rating":"R",
        "studio":"Relativity Media",
        "postdate":"2011-08-18",
        "releasedate":"2011-09-23",
        "copyright":"© Copyright 2011 Relativity Media",
        "director":"Marc Forster",
        "description":"Machine Gun Preacher is the inspirational true story of Sam Childers, a former drug-dealing criminal who undergoes an astonishing transformation and finds an unexpected calling as the savior of hundreds of kidnapped and orphaned children. Gerard Butler (300) delivers a searing performance as Childers, the impassioned founder of the Angels of East Africa rescue organization in Golden Globe-nominated director Marc Forster’s (Monster’s Ball, Finding Neverland) moving story of violence and redemption. When ex-biker-gang member Sam Childers (Butler) makes the life-changing decision to go to East Africa to help repair homes destroyed by civil war, he is outraged by the unspeakable horrors faced by the region’s vulnerable populace, especially the children. Ignoring the warnings of more experienced aide workers, Sam breaks ground for an orphanage where it’s most needed—in the middle of territory controlled by the brutal Lord’s Resistance Army (LRA), a renegade militia that forces youngsters to become soldiers before they even reach their teens. But for Sam, it is not enough to shelter the LRA’s intended victims. Determined to save as many as possible, he leads armed missions deep into enemy territory to retrieve kidnapped children, restoring peace to their lives—and eventually his own. The explosive, real-life tale of a man who has rescued over a thousand orphans from starvation, disease and enslavement, Machine Gun Preacher also stars Michelle Monaghan (Due Date), Kathy Baker (Cold Mountain), Madeline Carroll (Mr. Popper’s Penguins), Academy Award(R) nominated Michael Shannon (Revolutionary Road) and Souleymane Sy Savane (“Damages”)."
    },
    "cast":{
        "name":["Gerard Butler","Michelle Monaghan","Kathy Baker","Madeline Carroll","Michael Shannon","Souleymane Sy Savane"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/machinegunpreacher/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/machinegunpreacher/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"48158456",
            "content":"http://trailers.apple.com/movies/independent/machinegunpreacher/machinegunpreacher-tlr1b_h480p.mov"
        }
    }
},{
    "id":"4552",
    "info":{
        "title":"Man on a Ledge",
        "runtime":"2:26",
        "rating":"PG-13",
        "studio":"Summit Entertainment",
        "postdate":"2011-09-27",
        "releasedate":"2012-01-27",
        "copyright":"© Copyright 2012 Summit Entertainment",
        "director":"Asger Leth",
        "description":"An ex-cop and now wanted fugitive (Sam Worthington) stands on the ledge of a high-rise building while a hard-living New York Police Department hostage negotiator (Elizabeth Banks) tries to talk him down.  The longer they are on the ledge, the more she realizes that he might have an ulterior objective."
    },
    "cast":{
        "name":["Sam Worthington","Elizabeth Banks","Anthony Mackie","Jamie Bell","Billy Elliot","Ed Harris","Edward Burns","Genesis Rodriguez"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/summit/manonaledge/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/summit/manonaledge/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"43927187",
            "content":"http://trailers.apple.com/movies/summit/manonaledge/manonaledge-tlr1_h480p.mov"
        }
    }
},{
    "id":"4504",
    "info":{
        "title":"Margaret",
        "runtime":"2:16",
        "rating":"R",
        "studio":"Fox Searchlight Pictures",
        "postdate":"2011-09-01",
        "releasedate":"2011-09-30",
        "copyright":"© Copyright 2011 Fox Searchlight Pictures",
        "director":"Kenneth Lonergan",
        "description":"MARGARET centers on a 17-year-old New York City high-school student who feels certain that she inadvertently played a role in a traffic accident that has claimed a woman’s life. In her attempts to set things right she meets with opposition at every step.  Torn apart with frustration, she begins emotionally brutalizing her family, her friends, her teachers, and most of all, herself.  She has been confronted quite unexpectedly with a basic truth:  that her youthful ideals are on a collision course against the realities and compromises of the adult world."
    },
    "cast":{
        "name":["Anna Paquin","Matt Damon","Mark Ruffalo","J. Smith-Cameron","Matthew Broderick","Jean Reno"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox_searchlight/margaret/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox_searchlight/margaret/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"36549270",
            "content":"http://trailers.apple.com/movies/fox_searchlight/margaret/margaret-tlr1_h480p.mov"
        }
    }
},{
    "id":"4535",
    "info":{
        "title":"Margin Call",
        "runtime":"2:27",
        "rating":"R",
        "studio":"Roadside Attractions",
        "postdate":"2011-09-19",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Roadside Attractions",
        "director":"J.C. Chandor",
        "description":"Set in the high-stakes world of the financial industry, Margin Call is a thriller entangling the key players at an investment firm during one perilous 24-hour period in the early stages of the 2008 financial crisis. When an entry-level analyst unlocks information that could prove to be the downfall of the firm, a roller-coaster ride ensues as decisions both financial and moral catapult the lives of all involved to the brink of disaster."
    },
    "cast":{
        "name":["Kevin Spacey","Paul Bettany","Jeremy Irons","Zachary Quinto","Penn Badgley","Simon Baker","Mary McDonnell","Demi Moore","Stanley Tucci"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/margincall/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/margincall/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"38468993",
            "content":"http://trailers.apple.com/movies/independent/margincall/margincall-tlr1_h480p.mov"
        }
    }
},{
    "id":"4291",
    "info":{
        "title":"Martha Marcy May Marlene",
        "runtime":"2:28",
        "rating":"R",
        "studio":"Fox Searchlight Pictures",
        "postdate":"2011-05-04",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Fox Searchlight Pictures",
        "director":"Sean Durkin",
        "description":"MARTHA MARCY MAY MARLENE stars Elizabeth Olsen as Martha, a damaged woman haunted by painful memories and increasing paranoia, who struggles to reassimilate with her family after fleeing a cult."
    },
    "cast":{
        "name":["Elizabeth Olsen","Christopher Abbott","Brady Corbet","Hugh Dancy","Maria Dizzia","Julia Garner","John Hawkes","Louisa Krause","Sarah Paulson"]
        },
    "genre":{
        "name":["Drama","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox_searchlight/marthamarcymaymarlene/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox_searchlight/marthamarcymaymarlene/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"48679598",
            "content":"http://trailers.apple.com/movies/fox_searchlight/marthamarcymaymarlene/marthamarcymaymarlene-tlr1_h480p.mov"
        }
    }
},{
    "id":"4574",
    "info":{
        "title":"Marvel's The Avengers",
        "runtime":"2:03",
        "rating":"Not yet rated",
        "studio":"Marvel Studios",
        "postdate":"2011-10-11",
        "releasedate":"2012-05-04",
        "copyright":"© Copyright 2012 Marvel Studios",
        "director":"Joss Whedon",
        "description":"Marvel Studios presents in association with Paramount Pictures “Marvel’s The Avengers”—the Super Hero team up of a lifetime, featuring iconic Marvel Super Heroes Iron Man, The Incredible Hulk, Thor, Captain America, Hawkeye and Black Widow. When an unexpected enemy emerges that threatens global safety and security, Nick Fury, Director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins. Starring Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner and Samuel L. Jackson, and directed by Joss Whedon, “Marvel’s The Avengers” is based on the ever-popular Marvel comic book series “The Avengers,” first published in 1963 and a comics institution ever since. Prepare yourself for an exciting event movie, packed with action and spectacular special effects, when “Marvel’s The Avengers” assemble in summer 2012. In “Marvel’s The Avengers,” superheroes team up to pull the world back from the brink of disaster when an unexpected enemy threatens global security."
    },
    "cast":{
        "name":["Robert Downey Jr.","Chris Evans","Mark Ruffalo","Chris Hemsworth","Scarlett Johansson","Jeremy Renner","Tom Hiddleston","Stellan Skarsgård ","Samuel L. Jackson"]
        },
    "genre":{
        "name":["Science Fiction","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/marvel/avengers/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/marvel/avengers/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"30983708",
            "content":"http://trailers.apple.com/movies/marvel/theavengers/avengers-tlr1_h480p.mov"
        }
    }
},{
    "id":"4393",
    "info":{
        "title":"Mission: Impossible - Ghost Protocol",
        "runtime":"2:28",
        "rating":"Not yet rated",
        "studio":"Paramount Pictures",
        "postdate":"2011-11-01",
        "releasedate":"2011-12-16",
        "copyright":"© Copyright 2011 Paramount Pictures",
        "director":"Brad Bird",
        "description":"This is not just another mission. The IMF is shut down when it’s implicated in a global terrorist bombing plot. Ghost Protocol is initiated and Ethan Hunt and his rogue new team must go undercover to clear their organization’s name. No help, no contact, off the grid. You have never seen a mission grittier and more intense than this. "
    },
    "cast":{
        "name":["Tom Cruise","Jeremy Renner","Simon Pegg","Paula Patton","Josh Holloway","Michael Nyqvist","Vladimir Mashkov","Lea Seydoux","Anil Kapoor"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/paramount/missionimpossibleghostprotocol/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/paramount/missionimpossibleghostprotocol/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"45331867",
            "content":"http://trailers.apple.com/movies/paramount/missionimpossibleghostprotocol/migp-tlr2_h480p.mov"
        }
    }
},{
    "id":"4381",
    "info":{
        "title":"Moneyball",
        "runtime":"2:30",
        "rating":"PG-13",
        "studio":"Sony Pictures",
        "postdate":"2011-06-23",
        "releasedate":"2011-09-23",
        "copyright":"© Copyright 2011 Sony Pictures",
        "director":"Bennett Miller",
        "description":"Based on a true story, Moneyball is a movie for anybody who has ever dreamed of taking on the system.  Brad Pitt stars as Billy Beane, the general manager of the Oakland A’s and the guy who assembles the team, who has an epiphany: all of baseball’s conventional wisdom is wrong.  Forced to reinvent his team on a tight budget, Beane will have to outsmart the richer clubs.  The onetime jock teams with Ivy League grad Peter Brand (Jonah Hill) in an unlikely partnership, recruiting bargain players that the scouts call flawed, but all of whom have an ability to get on base, score runs, and win games.  It’s more than baseball, it’s a revolution - one that challenges old school traditions and puts Beane in the crosshairs of those who say he’s tearing out the heart and soul of the game."
    },
    "cast":{
        "name":["Brad Pitt","Jonah Hill","Philip Seymour Hoffman"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/moneyball/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/moneyball/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37278174",
            "content":"http://trailers.apple.com/movies/sony_pictures/moneyball/moneyball-tlr1_h480p.mov"
        }
    }
},{
    "id":"4502",
    "info":{
        "title":"Munger Road",
        "runtime":"1:46",
        "rating":"PG-13",
        "studio":"Freestyle Releasing",
        "postdate":"2011-08-29",
        "releasedate":"2011-09-30",
        "copyright":"© Copyright 2011 Freestyle Releasing",
        "director":"Nicholas Smith",
        "description":"On the eve of the annual Scarecrow Festival, two St. Charles police officers search for a return killer the same night four teenagers go missing on Munger Road."
    },
    "cast":{
        "name":["Bruce Davison","Randall Batinkoff","Trevor Morgan","Brooke Peoples","Hallock Beals","Lauren Storm"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/mungerroad/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/mungerroad/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"32745844",
            "content":"http://trailers.apple.com/movies/independent/mungerroad/mungerroad-tlr1_h480p.mov"
        }
    }
},{
    "id":"4616",
    "info":{
        "title":"My Week With Marilyn",
        "runtime":"2:04",
        "rating":"R",
        "studio":"Weinstein Company",
        "postdate":"2011-10-28",
        "releasedate":"2011-11-23",
        "copyright":"© Copyright 2011 Weinstein Company",
        "director":null,
        "description":"In the early summer of 1956, 23 year-old Colin Clark (Eddie Redmayne), just down from Oxford and determined to make his way in the film business, worked as a lowly assistant on the set of ‘The Prince and the Showgirl’. The film that famously united Sir Laurence Olivier (Kenneth Branagh) and Marilyn Monroe (Michelle Williams), who was also on honeymoon with her new husband, the playwright Aurthur Miller (Dougray Scott). Nearly 40 years on, his diary account The Prince, the Showgirl and Me was published, but one week was missing and this was published some years later as My Week with Marilyn - this is the story of that week.  When Arthur Miller leaves England, the coast is clear for Colin to introduce Marilyn to some of the pleasures of British life; an idyllic week in which he escorted a Monroe desperate to get away from her retinue of Hollywood hangers-on and the pressures of work. "
    },
    "genre":{
        "name":["Drama","Foreign"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/weinstein/myweekwithmarilyn/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/weinstein/myweekwithmarilyn/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"36970708",
            "content":"http://trailers.apple.com/movies/weinstein/myweekwithmarilyn/myweekwithmarilyn-tlr1_h480p.mov"
        }
    }
},{
    "id":"4553",
    "info":{
        "title":"New Year's Eve",
        "runtime":"2:29",
        "rating":"PG-13",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-09-27",
        "releasedate":"2011-12-09",
        "copyright":"© Copyright 2011 Warner Bros. Pictures",
        "director":"Garry Marshall",
        "description":"“New Year’s Eve” celebrates love, hope, forgiveness, second chances and fresh starts, in intertwining stories told amidst the pulse and promise of New York City on the most dazzling night of the year."
    },
    "cast":{
        "name":["Halle Berry","Jessica Biel","Jon Bon Jovi","Abigail Breslin","Chris “Ludacris” Bridges","Robert De Niro","Josh Duhamel","Zac Efron","Hector Elizondo","Katherine Heigl","Ashton Kutcher","Seth Meyers","Lea Michele","Sarah Jessica Parker","Michelle Pfeiffer","Til Schweiger","Hilary Swank","Sofia Vergara"]
        },
    "genre":{
        "name":["Comedy","Romance"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/newyearseve/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/newyearseve/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"34545638",
            "content":"http://trailers.apple.com/movies/wb/newyearseve/newyearseve-tlr1_h480p.mov"
        }
    }
},{
    "id":"4557",
    "info":{
        "title":"Norman",
        "runtime":"2:27",
        "rating":"R",
        "studio":"AMC Independent",
        "postdate":"2011-09-29",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 AMC Independent",
        "director":"Jonathan Segal",
        "description":"Norman Long is a high school loner, a self-aware and darkly funny teen who’s just trying to handle his daily existence. In the wake of his mother’s sudden death, Norman must now also deal with the reality that his father is starting to lose his battle with stomach cancer. Norman, depressed and angry, unintentionally gets caught in a lie that he, in fact, has stomach cancer. Soon his complete distortion of the facts spirals out of control. Part coping mechanism, partially as a way to feel closer to his father, and to a certain degree to prepare others for his possible suicide, Norman begins to imitate his father’s debilitating physical symptoms, dramatically affecting his life and the world around him. Emily, a magnetic girl with one of those rare enchanting smiles, gets caught up in Norman’s fabrication and struggles with her deep rooted romantic feelings in the face of Norman’s “impending” death. Ultimately, Norman must confront a burning set of conflicting emotions as he struggles to define his relationship with his father, his love for Emily, and ultimately who he will be as a young man."
    },
    "cast":{
        "name":["Dan Byrd","Emily VanCamp","Richard Jenkins"]
        },
    "genre":{
        "name":["Comedy","Drama"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/norman/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/norman/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"32744631",
            "content":"http://trailers.apple.com/movies/independent/norman/norman-tlr1_h480p.mov"
        }
    }
},{
    "id":"4560",
    "info":{
        "title":"One For The Money",
        "runtime":"2:29",
        "rating":"PG-13",
        "studio":"Lionsgate",
        "postdate":"2011-09-30",
        "releasedate":"2012-01-27",
        "copyright":"© Copyright 2012 Lionsgate",
        "director":"Julie Anne Robinson",
        "description":"Katherine Heigl brings Stephanie Plum - the popular heroine of Janet Evanovich’s worldwide best-selling seventeenth-book mystery series - to vibrant life in Lionsgate and Lakeshore Entertainment’s ONE FOR THE MONEY.  A proud, born-and-bred Jersey girl, Stephanie Plum’s got plenty of attitude, even if she’s been out of work for the last six months and just lost her car to a debt collector. Desperate for some fast cash, Stephanie turns to her last resort: convincing her sleazy cousin to give her a job at his bail bonding company…as a recovery agent.  True, she doesn’t even own a pair of handcuffs and her weapon of choice is pepper spray, but that doesn’t stop Stephanie from taking on Vinny’s biggest bail-jumper: former vice cop and murder suspect Joe Morelli - yup, the same sexy, irresistible Joe Morelli who seduced and dumped her back in high school. Nabbing Morelli would be satisfying payback - and a hefty payday - but as Stephanie learns the ins and outs of becoming a recovery agent from Ranger, a hunky colleague who’s the best in the business, she also realizes the case against Morelli isn’t airtight. Add to the mix her meddling family, a potentially homicidal boxer, witnesses who keep dying and the problem of all those flying sparks when she finds Morelli himself…well, suddenly Stephanie’s new job isn’t nearly as easy as she thought. "
    },
    "cast":{
        "name":["Katherine Heigl","Jason O’Mara","Daniel Sunjata","John Leguizamo","Sherri Shepherd","Debbie Reynolds"]
        },
    "genre":{
        "name":["Comedy","Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/lions_gate/oneforthemoney/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/lions_gate/oneforthemoney/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44816068",
            "content":"http://trailers.apple.com/movies/lionsgate/oneforthemoney/oneforthemoney-tlr1_h480p.mov"
        }
    }
},{
    "id":"4526",
    "info":{
        "title":"Outrage",
        "runtime":"1:51",
        "rating":"R",
        "studio":"Magnet Releasing",
        "postdate":"2011-09-14",
        "releasedate":"2011-12-02",
        "copyright":"© Copyright 2011 Magnet Releasing",
        "director":"Takeshi Kitano",
        "description":"In a ruthless battle for power, several yakuza clans vie for the favor of their head family in the Japanese underworld. The rival bosses seek to rise through the ranks by scheming and making allegiances sworn over sake. Long-time yakuza Otomo has seen his kind go from elaborate body tattoos and severed fingertips to becoming important players on the stock market. Theirs is a never-ending struggle to end up on top, or at least survive, in a corrupt world where there are no heroes but constant betrayal and vengeance. "
    },
    "cast":{
        "name":["Takeshi Kitano","Kippei Shiina","Ryo Kase"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/outrage/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/outrage/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"36032492",
            "content":"http://trailers.apple.com/movies/independent/outrage/outrage-tlr1_h480p.mov"
        }
    }
},{
    "id":"4418",
    "info":{
        "title":"Paranormal Activity 3",
        "runtime":"1:43",
        "rating":"R",
        "studio":"Paramount Pictures",
        "postdate":"2011-09-28",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Paramount Pictures",
        "director":"Ariel Schulman, Henry Joost",
        "description":"No synopsis available."
    },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/paramount/paranormalactivity3/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/paramount/paranormalactivity3/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"23742334",
            "content":"http://trailers.apple.com/movies/paramount/paranormalactivity3/paranormalactivity3-tlr2b_h480p.mov"
        }
    }
},{
    "id":"4614",
    "info":{
        "title":"ParaNorman",
        "runtime":"1:33",
        "rating":"Not yet rated",
        "studio":"Focus Features",
        "postdate":"2011-10-31",
        "releasedate":"2012-08-17",
        "copyright":"© Copyright 2012 Focus Features",
        "director":"Sam Fell, Chris Butler",
        "description":"The new 3D stop-motion comedy thriller from animation company LAIKA, reteaming the company with Focus Features after the groundbreaking Academy Award-nominated “Coraline.” “ParaNorman” is, following “Coraline,” the company’s second stop-motion animated feature to be made in 3D. In “ParaNorman,” a small town comes under siege by zombies. Who can it call? Only misunderstood local boy Norman (voiced by Kodi Smit-McPhee), who is able to speak with the dead. In addition to the zombies, he’ll have to take on ghosts, witches and, worst, of all, grown-ups, to save his town from a centuries-old curse. But this young ghoul whisperer may find his paranormal activities pushed to their otherworldly limits."
    },
    "cast":{
        "name":["Kodi Smit-McPhee","Tucker Albrizzi","Casey Affleck","Anna Kendrick","Christopher Mintz-Plasse","Leslie Mann","Jeff Garlin","John Goodman","Elaine Stritch","Bernard Hill","Alex Borstein","Tempestt Bledsoe","Hannah Noyes"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/focus_features/paranorman/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/focus_features/paranorman/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"28839140",
            "content":"http://trailers.apple.com/movies/focus_features/paranorman/paranorman-tlr1_h480p.mov"
        }
    }
},{
    "id":"4367",
    "info":{
        "title":"Pariah",
        "runtime":"2:02",
        "rating":"R",
        "studio":"Focus Features",
        "postdate":"2011-06-09",
        "releasedate":"2011-12-28",
        "copyright":"© Copyright 2011 Focus Features",
        "director":"Dee Rees",
        "description":"A rousing success at its world premiere at the 2011 Sundance Film Festival, this deeply felt human drama is the feature debut of writer/director Dee Rees. Adepero Oduye portrays Alike (pronounced “ah-lee-kay”), a 17-year-old African-American woman who lives with her parents (Kim Wayans and Charles Parnell) and younger sister (Sahra Mellesse) in Brooklyn’s Fort Greene neighborhood. A gifted student, Alike is quietly but firmly embracing her identity as a lesbian. With the support of her best friend Laura (Pernell Walker), she is especially eager to find a girlfriend. Wondering how much she can confide in her family, Alike strives to get through adolescence with grace, humor, and tenacity."
    },
    "cast":{
        "name":["Adepero Oduye","Pernell Walker","Aasha Davis","Charles Parnell","Sahra Mellesse","Kim Wayans"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/focus_features/pariah/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/focus_features/pariah/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"29928606",
            "content":"http://trailers.apple.com/movies/independent/pariah/pariah-tlr1_h480p.mov"
        }
    }
},{
    "id":"4569",
    "info":{
        "title":"Premium Rush",
        "runtime":"2:20",
        "rating":"Not yet rated",
        "studio":"Sony Pictures",
        "postdate":"2011-10-03",
        "releasedate":"2012-01-13",
        "copyright":"© Copyright 2012 Sony Pictures",
        "director":"David Koepp",
        "description":"Dodging speeding cars, crazed cabbies, open doors, and eight million cranky pedestrians is all in a day’s work for Wilee (Joseph Gordon-Levitt), the best of New York’s agile and aggressive bicycle messengers. It takes a special breed to ride the fixie - super lightweight, single-gear bikes with no brakes and riders who are equal part skilled cyclists and suicidal nutcases who risk becoming a smear on the pavement every time they head into traffic. But a guy who’s used to putting his life on the line is about to get more than even he is used to when a routine delivery turns into a life or death chase through the streets of Manhattan. When Wilee picks up his last envelope of the day on a premium rush run, he discovers this package is different. This time, someone is actually trying to kill him. "
    },
    "cast":{
        "name":["Joseph Gordon-Levitt","Michael Shannon","Dania Ramirez","Jamie Chung"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/premiumrush/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/premiumrush/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"41031993",
            "content":"http://trailers.apple.com/movies/sony_pictures/premiumrush/premiumrush-tlr1_h480p.mov"
        }
    }
},{
    "id":"4622",
    "info":{
        "title":"Project X",
        "runtime":"1:35",
        "rating":"R",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-11-02",
        "releasedate":"2012-03-02",
        "copyright":"© Copyright 2012 Warner Bros. Pictures",
        "director":"Nima Nourizadeh",
        "description":"No synopsis available."
    },
    "cast":{
        "name":["Thomas Mann","Oliver Cooper,","Jonathan Daniel Brown"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/projectx/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/projectx/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"21132984",
            "content":"http://trailers.apple.com/movies/wb/projectx/projectx-tlr1_h480p.mov"
        }
    }
},{
    "id":"4487",
    "info":{
        "title":"Puncture",
        "runtime":"1:43",
        "rating":"R",
        "studio":"Millennium Entertainment",
        "postdate":"2011-09-02",
        "releasedate":"2011-09-23",
        "copyright":"© Copyright 2011 Millennium Entertainment",
        "director":"Adam Kassen, Mark Kassen",
        "description":"Mike Weiss (Chris Evans) is a talented young Houston lawyer and a functioning drug addict. Paul Danziger (co-director Mark Kassen), his longtime friend and partner, is the straightlaced and responsible yin to Mike’s yang. Their mom-and-pop personal-injury law firm is getting by, but things really get interesting when they decide to take on a case involving Vicky (Vinessa Shaw), a local ER nurse, who is pricked by a contaminated needle on the job. As Weiss and Danziger dig deeper into the case, a health care and pharmaceutical conspiracy teeters on exposure and heavyweight attorneys move in on the defense. Out of their league but invested in their own principles, the mounting pressure of the case pushes the two underdog lawyers and their business to the breaking point. Brothers and directors Mark and Adam Kassen bring this real-life story to the screen with all the urgency and passion of the subjects themselves. The result is an effective issue-driven drama that finds its footing in a contemporary David and Goliath story. Produced and co-directed by Adam Kassen and Mark Kassen, PUNCTURE stars Chris Evans, Mark Kassen, Brett Cullen, Marshall Bell, Michael Biehn, Jesse L. Martin, Roxanna Hope, Tess Parker, Kate Burton and Vinessa Shaw. The film was written by Chris Lopata from story by Ela Thier and Paul Danziger and was executive-produced by Jeffrey Gou and Joan Huang, Paul Danziger and Rod de Llano and Craig Cohen. "
    },
    "cast":{
        "name":["Chris Evans","Mark Kassen","Brett Cullen","Marshall Bell","Michael Biehn","Jesse L. Martin","Roxanna Hope","Tess Parker","Kate Burton","Vinessa Shaw"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/puncture/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/puncture/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"32726991",
            "content":"http://trailers.apple.com/movies/independent/puncture/puncture-tlr1_h480p.mov"
        }
    }
},{
    "id":"4182",
    "info":{
        "title":"Puss in Boots",
        "runtime":"2:18",
        "rating":"PG",
        "studio":"DreamWorks",
        "postdate":"2011-10-20",
        "releasedate":"2011-10-28",
        "copyright":"© Copyright 2011 DreamWorks",
        "director":"Chris Miller",
        "description":"Way before Puss ever met Shrek, our suave and furry feline hero goes on a swashbuckling ride, as he teams with mastermind Humpty Dumpty and the street-savvy Kitty to steal the famed Goose that lays the Golden Eggs."
    },
    "cast":{
        "name":["Antonio Banderas","Salma Hayek","Zach Galifianakis","Billy Bob Thornton","Amy Sedaris"]
        },
    "genre":{
        "name":["Family","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/dreamworks/pussinboots/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/dreamworks/pussinboots/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44056570",
            "content":"http://trailers.apple.com/movies/dreamworks/pussinboots/pussinboots-tlr3-5ch_h480p.mov"
        }
    }
},{
    "id":"4058",
    "info":{
        "title":"Real Steel",
        "runtime":"2:33",
        "rating":"PG-13",
        "studio":"DreamWorks",
        "postdate":"2011-05-12",
        "releasedate":"2011-10-07",
        "copyright":"© Copyright 2011 DreamWorks",
        "director":"Shawn Levy",
        "description":"A gritty, white-knuckle, action ride set in the near-future where the sport of boxing has gone high-tech, Real Steel stars Hugh Jackman as Charlie Kenton, a washed-up fighter who lost his chance at a title when 2000-pound, 8-foot-tall steel robots took over the ring. Now nothing but a small-time promoter, Charlie earns just enough money piecing together low-end bots from scrap metal to get from one underground boxing venue to the next. When Charlie hits rock bottom, he reluctantly teams up with his estranged son Max (Dakota Goyo) to build and train a championship contender. As the stakes in the brutal, no-holds-barred arena are raised, Charlie and Max, against all odds, get one last shot at a comeback. "
    },
    "cast":{
        "name":["Hugh Jackman","Evangeline Lilly","Dakota Goyo","Kevin Durand","Anthony Mackie"]
        },
    "genre":{
        "name":["Drama","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/dreamworks/realsteel/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/dreamworks/realsteel/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"45232041",
            "content":"http://trailers.apple.com/movies/dreamworks/realsteel/realsteel-tlr2_h480p.mov"
        }
    }
},{
    "id":"4447",
    "info":{
        "title":"Red Tails",
        "runtime":"1:34",
        "rating":"Not yet rated",
        "studio":"20th Century Fox",
        "postdate":"2011-08-22",
        "releasedate":"2012-01-20",
        "copyright":"© Copyright 2012 20th Century Fox",
        "director":"Anthony Hemingway",
        "description":"1944. As the war in Europe continues to take its toll on Allied forces, the Pentagon brass has no recourse but to consider unorthodox options - including the untried and untested African-American pilots of the experimental Tuskegee training program. Just as the young Tuskegee men are on the brink of being shut down and shipped back home, they are given the ultimate chance to show their courage. Against all the odds, with something to prove and everything to lose, these intrepid young airmen take to the skies to fight for their country - and the fate of the free world."
    },
    "cast":{
        "name":["Bryan Cranston","Cuba Gooding Jr.","Terrence Howard","David Oyelowo","Kevin Phillips","Nate Parker","Daniela Ruah","Michael B. Jordan","Tristan Wilds","Cliff Smith","Rick Otto"]
        },
    "genre":{
        "name":["Drama","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox/redtails/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox/redtails/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"31783520",
            "content":"http://trailers.apple.com/movies/fox/redtails/redtails-tlr2_h480p.mov"
        }
    }
},{
    "id":"4570",
    "info":{
        "title":"Revenge of the Electric Car",
        "runtime":"2:03",
        "rating":"PG-13",
        "studio":"Area23a",
        "postdate":"2011-10-03",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Area23a",
        "director":"Chris Paine",
        "description":"In Revenge of the Electric Car,  director Chris Paine takes his film crew behind the closed doors of Nissan,  GM,  and the Silicon Valley start-up Tesla Motors to chronicle the story of the global resurgence of electric cars. Without using a single drop of foreign oil,  this new generation of car is America’s future: fast,  furious,  and cleaner than ever. With almost every major car maker now jumping to produce new electric models,  Revenge follows the race to be the first,  the best,  and to win the hearts and minds of the public around the world. It’s not just the next generation of green cars that’s on the line. It’s the future of the automobile itself.  "
    },
    "cast":{
        "name":["Elon Musk","Bob Lutz","Greg Abbott","Carlos Ghosn"]
        },
    "genre":{
        "name":"Documentary"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/revengeoftheelectriccar/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/revengeoftheelectriccar/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"27610759",
            "content":"http://trailers.apple.com/movies/independent/revengeoftheelectriccar/revengeoftheelectriccar-tlr1_h480p.mov"
        }
    }
},{
    "id":"4602",
    "info":{
        "title":"Roadie",
        "runtime":"2:09",
        "rating":"R",
        "studio":"Magnolia Pictures",
        "postdate":"2011-10-28",
        "releasedate":"2012-01-06",
        "copyright":"© Copyright 2012 Magnolia Pictures",
        "director":"Michael Cuesta",
        "description":"Canned from a 20-year job as roadie for Blue Oyster Cult, Jimmy is broke and desperate. With nowhere else to go, he returns home to Forest Hills, Queens to visit his aging mother, where a wild night with some hard-partying high school friends shows him that some things never change. From director Michael Cuesta, ROADIE features powerful performances from Ron Eldard, Bobby Cannavale, Jill Hennessy and a refreshingly eclectic 70s hard rock soundtrack. "
    },
    "cast":{
        "name":["Ron Eldard","Jill Hennessy","Bobby Cannavale","Lois Smith","David Marguiles","Catherine Wolf","Suzette Gunn"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/magnolia/roadie/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/magnolia/roadie/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"28901507",
            "content":"http://trailers.apple.com/movies/magnolia_pictures/roadie/roadie-tlr1_h480p.mov"
        }
    }
},{
    "id":"4623",
    "info":{
        "title":"Safe House",
        "runtime":"2:33",
        "rating":"Not yet rated",
        "studio":"Universal Pictures",
        "postdate":"2011-11-03",
        "releasedate":"2012-02-10",
        "copyright":"© Copyright 2012 Universal Pictures",
        "director":"Daniel Espinosa",
        "description":"Oscar(R) winner Denzel Washington and Ryan Reynolds star in the action-thriller Safe House. Washington plays the most dangerous renegade from the CIA, who comes back onto the grid after a decade on the run. When the South African safe house he’s remanded to is attacked by mercenaries, a rookie operative (Reynolds) escapes with him. Now, the unlikely allies must stay alive long enough to uncover who wants them dead. For the past year, Matt Weston has been frustrated by his inactive, backwater post in Cape Town. A “housekeeper” who aspires to be a full-fledged agent, the loyal company man has been waiting for an opportunity to prove himself. When the first and only occupant he’s had proves to be the most dangerous man he’s ever met, Weston readies for duty. Tobin Frost has eluded capture for almost a decade. One of the best ops men that the CIA’s known, the ex-intelligence officer has given up assets and sold military intel to anyone with cash since he turned. From trading secrets to North Korea to aiding splinter cells, the damage he’s done to the U.S. is immeasurable. And he’s now back on the reservation with a secret. As soon as Frost is brought in for debriefing, mercenaries come and tear apart Weston’s safe house. Barely escaping, the unlikely partners must discover if their attackers have been sent by terrorists or someone on the inside who will kill anyone standing in the way. Now it’s up to Weston to figure out who he can trust before they’re both eliminated from the game. "
    },
    "cast":{
        "name":["Denzel Washington","Ryan Reynolds","Brendan Gleeson","Sam Shepard","Vera Farmiga","Fares Fares","Robert Patrick","Nora Arnezeder","Liam Cunningham","Joel Kinnaman","Ruben Blades"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/safehouse/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/safehouse/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"48490854",
            "content":"http://trailers.apple.com/movies/universal/safehouse/safehouse-tlr1_h480p.mov"
        }
    }
},{
    "id":"4621",
    "info":{
        "title":"Shame",
        "runtime":"1:51",
        "rating":"NC-17",
        "studio":"Fox Searchlight Pictures",
        "postdate":"2011-11-01",
        "releasedate":"2011-12-02",
        "copyright":"© Copyright 2011 Fox Searchlight Pictures",
        "director":"Steve McQueen",
        "description":"Brandon (Michael Fassbender) is a New Yorker who shuns intimacy with women but feeds his desires with a compulsive addiction to sex. When his wayward younger sister (Carey Mulligan) moves into his apartment stirring memories of their shared painful past, Brandon’s insular life spirals out of control. "
    },
    "cast":{
        "name":["Michael Fassbender","Carey Mulligan"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox_searchlight/shame/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox_searchlight/shame/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"31651120",
            "content":"http://trailers.apple.com/movies/fox_searchlight/shame/shame-tlr1b_h480p.mov"
        }
    }
},{
    "id":"4406",
    "info":{
        "title":"Sherlock Holmes: A Game of Shadows",
        "runtime":"2:28",
        "rating":"Not yet rated",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-10-19",
        "releasedate":"2011-12-16",
        "copyright":"© Copyright 2011 Warner Bros. Pictures",
        "director":"Guy Ritchie",
        "description":"Robert Downey Jr. reprises his role as the world’s most famous detective, Sherlock Holmes, and Jude Law returns as his formidable colleague, Dr. Watson, in “Sherlock Holmes: A Game of Shadows.” Sherlock Holmes has always been the smartest man in the room…until now. There is a new criminal mastermind at large—Professor Moriarty (Jared Harris)—and not only is he Holmes’ intellectual equal, but his capacity for evil, coupled with a complete lack of conscience, may actually give him an advantage over the renowned detective. When the Crown Prince of Austria is found dead, the evidence, as construed by Inspector Lestrade (Eddie Marsan), points to suicide. But Sherlock Holmes deduces that the prince has been the victim of murder—a murder that is only one piece of a larger and much more portentous puzzle, designed by one Professor Moriarty. Mixing business with pleasure, Holmes tracks the clues to an underground gentlemen’s club, where he and his brother, Mycroft Holmes (Stephen Fry) are toasting Dr. Watson on his last night of bachelorhood. It is there that Holmes encounters Sim (Noomi Rapace), a Gypsy fortune teller, who sees more than she is telling and whose unwitting involvement in the prince’s murder makes her the killer’s next target. Holmes barely manages to save her life and, in return, she reluctantly agrees to help him. The investigation becomes ever more dangerous as it leads Holmes, Watson and Sim across the continent, from England to France to Germany and finally to Switzerland. But the cunning Moriarty is always one step ahead as he spins a web of death and destruction—all part of a greater plan that, if he succeeds, will change the course of history. Filmmaker Guy Ritchie returns to direct “Sherlock Holmes: A Game of Shadows,” the follow-up to the smash hit “Sherlock Holmes.” The sequel also reunites producers Joel Silver, Lionel Wigram, Susan Downey and Dan Lin. Bruce Berman serves as executive producer, with Steve Clark-Hall co-producing. Jared Harris (TV’s “Mad Men,” “The Curious Case of Benjamin Button”) joins the cast as the notorious Professor Moriarty. Also joining the cast, in her first English-speaking role, is Swedish actress Noomi Rapace, who gained international attention in the Swedish film “The Girl with the Dragon Tattoo.” Stephen Fry (“Alice in Wonderland,” “Harry Potter and the Goblet of Fire”) plays Mycroft Holmes, Sherlock’s older brother. Additional cast members returning from the first film include Eddie Marsan as Inspector Lestrade; Kelly Reilly as Watson’s bride, Mary Morstan; and Geraldine James as Holmes’s long-suffering landlady, Mrs. Hudson. “Sherlock Holmes: A Game of Shadows” is written by Michele Mulroney and Kieran Mulroney. Sherlock Holmes and Dr. Watson were created by the late Sir Arthur Conan Doyle, and appear in stories and novels by him."
    },
    "cast":{
        "name":["Robert Downey Jr.","Jude Law","Noomi Rapace","Jared Harris","Eddie Marsan","Stephen Fry","Gilles Lellouche"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/sherlockholmesagameofshadows/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/sherlockholmesagameofshadows/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"46530651",
            "content":"http://trailers.apple.com/movies/wb/sherlockholmes2/sherlockholmes-tlr2_h480p.mov"
        }
    }
},{
    "id":"4340",
    "info":{
        "title":"Take Shelter",
        "runtime":"2:02",
        "rating":"R",
        "studio":"Sony Pictures Classics",
        "postdate":"2011-05-24",
        "releasedate":"2011-09-30",
        "copyright":"© Copyright 2011 Sony Pictures Classics",
        "director":"Jeff Nichols",
        "description":"Plagued by a series of apocalyptic visions, a young husband and father questions whether to shelter his family from a coming storm, or from himself."
    },
    "cast":{
        "name":["Michael Shannon","Jessica Chastain","Shea Whigham","Katy Mixon","Kathy Baker"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony/takeshelter/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony/takeshelter/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"36674251",
            "content":"http://trailers.apple.com/movies/sony/takeshelter/takeshelter-tlr1_h480p.mov"
        }
    }
},{
    "id":"4499",
    "info":{
        "title":"Texas Killing Fields",
        "runtime":"2:09",
        "rating":"R",
        "studio":"Anchor Bay Films",
        "postdate":"2011-08-29",
        "releasedate":"2011-10-14",
        "copyright":"© Copyright 2011 Anchor Bay Films",
        "director":"Ami Canaan Mann",
        "description":"Inspired by true events, this tense and haunting thriller follows Detective Souder (Sam Worthington), a homicide detective in a small Texan town, and his partner, transplanted New York City cop DetectiveHeigh (Jeffrey Dean Morgan) as they track a sadistic serial killer dumping his victims’ mutilated bodies in a nearby marsh locals call “The Killing Fields.” Though the swampland crime scenes are outside their jurisdiction, Detective Heigh is unable to turn his back on solving the gruesome murders. Despite his partner’s warnings, he sets out to investigate the crimes. Before long, the killer changes the game and begins hunting thedetectives, teasing them with possible clues at the crime scenes while always remaining one step ahead. When familiar local girl Anne (Chloe Grace Moretz) goes missing, the detectives find themselves racing against time to catch the killer and save the young girl’s life."
    },
    "cast":{
        "name":["Jeffrey Dean Morgan","Sam Worthington","Chloe Grace Moretz","Jessica Chastain","Jason Clarke","Stephen Graham"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/texaskillingfields/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/texaskillingfields/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"39402813",
            "content":"http://trailers.apple.com/movies/independent/texaskillingfields/texaskillingfields-tlr1_h480p.mov"
        }
    }
},{
    "id":"4316",
    "info":{
        "title":"The Adventures of Tintin",
        "runtime":"2:31",
        "rating":"PG",
        "studio":"Paramount Pictures",
        "postdate":"2011-10-17",
        "releasedate":"2011-12-21",
        "copyright":"© Copyright 2011 Paramount Pictures",
        "director":"Steven Spielberg",
        "description":"Paramount Pictures and Columbia Pictures Present “The Adventures of Tintin” directed by Steven Spielberg from a screenplay by Steven Moffat and Edgar Wright & Joe Cornish. Starring Jamie Bell (“Billy Elliot,” “Defiance”) as Tintin, the intrepid young reporter whose relentless pursuit of a good story thrusts him into a world of high adventure, and Daniel Craig (“Quantum of Solace,” “Defiance”) as the nefarious Red Rackham. "
    },
    "cast":{
        "name":["Jamie Bell","Andy Serkis","Daniel Craig","Simon Pegg","Nick Frost","Gad Elmaleh","Toby Jones","Mackenzie Crook"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/paramount/theadventuresoftintin/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/paramount/theadventuresoftintin/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"45506775",
            "content":"http://trailers.apple.com/movies/paramount/adventuresoftintin/tintin-tlr2_h480p.mov"
        }
    }
},{
    "id":"4462",
    "info":{
        "title":"The Amazing Spider-Man",
        "runtime":"2:27",
        "rating":"Not yet rated",
        "studio":"Sony Pictures",
        "postdate":"2011-09-07",
        "releasedate":"2012-07-03",
        "copyright":"© Copyright 2012 Sony Pictures",
        "director":"Marc Webb",
        "description":"The film, which is now in production and is being shot entirely in 3D, will be released on July 3, 2012. The film stars Andrew Garfield, Emma Stone, Rhys Ifans, Denis Leary, Campbell Scott, Irrfan Khan, Martin Sheen, and Sally Field. The film is directed by Marc Webb from a screenplay by James Vanderbilt and Alvin Sargent and Steve Kloves based on the Marvel Comic Book by Stan Lee and Steve Ditko. Laura Ziskin, Avi Arad, and Matt Tolmach are producing the Marvel Entertainment production for Columbia Pictures. The executive producers are Stan Lee, Kevin Feige, and Michael Grillo."
    },
    "cast":{
        "name":["Andrew Garfield","Emma Stone","Rhys Ifans","Denis Leary","Campbell Scott","Irrfan Khan","Martin Sheen","Sally Field"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/theamazingspiderman/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/theamazingspiderman/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"45298626",
            "content":"http://trailers.apple.com/movies/sony_pictures/theamazingspiderman/amazingspiderman-tlr1_h480p.mov"
        }
    }
},{
    "id":"4493",
    "info":{
        "title":"The Artist",
        "runtime":"2:31",
        "rating":"PG-13",
        "studio":"Weinstein Company",
        "postdate":"2011-08-25",
        "releasedate":"2011-11-23",
        "copyright":"© Copyright 2011 Weinstein Company",
        "director":"Michel Hazanavicius",
        "description":"Hollywood 1927. George Valentin (Jean Dujardin) is a silent movie superstar. The advent of the talkies will sound the death knell for his career and see him fall into oblivion. For young extra Peppy Miller (Berenice Bejo), it seems the sky’s the limit - major movie stardom awaits. THE ARTIST tells the story of their interlinked destinies. "
    },
    "cast":{
        "name":["Jean Dujardin","Berenice Bejo","John Goodman","James Cromwell","Penelope Ann Miller","Missi Pyle"]
        },
    "genre":{
        "name":["Drama","Foreign","Musical"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/weinstein/theartist/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/weinstein/theartist/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"39544809",
            "content":"http://trailers.apple.com/movies/weinstein/theartist/artist-tlr1_h480p.mov"
        }
    }
},{
    "id":"4511",
    "info":{
        "title":"The Big Year",
        "runtime":"2:12",
        "rating":"PG",
        "studio":"20th Century Fox",
        "postdate":"2011-09-06",
        "releasedate":"2011-10-14",
        "copyright":"© Copyright 2011 20th Century Fox",
        "director":"David Frankel",
        "description":"Steve Martin, Jack Black and Owen Wilson are at a crossroads — one is experiencing a mid-life crisis, another a late-life crisis, and the third, a far from ordinary no-life crisis.  From David Frankel, the director of The Devil Wears Prada and Marley & Me, comes a sophisticated comedy about three friendly rivals who, tired of being ruled by obligations and responsibilities, dedicate a year of their lives to following their dreams. Their big year takes them on a cross-country journey of wild and life-changing adventures."
    },
    "cast":{
        "name":["Steve Martin","Jack Black","Owen Wilson","Brian Dennehy","Rashida Jones","Rosamund Pike","Dianne Wiest"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox/thebigyear/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox/thebigyear/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"39422356",
            "content":"http://trailers.apple.com/movies/fox/thebigyear/thebigyear-tsr_h480p.mov"
        }
    }
},{
    "id":"4448",
    "info":{
        "title":"The Dark Knight Rises",
        "runtime":"1:31",
        "rating":"Not yet rated",
        "studio":"Warner Bros. Pictures",
        "postdate":"2011-08-01",
        "releasedate":"2012-07-20",
        "copyright":"© Copyright 2012 Warner Bros. Pictures",
        "director":"Christopher Nolan",
        "description":"Warner Bros. Pictures’ and Legendary Pictures’ “The Dark Knight Rises” is the epic conclusion to filmmaker Christopher Nolan’s Batman trilogy, Leading an all-star international cast, Oscar(R) winner Christian Bale (“The Fighter”) again plays the dual role of Bruce Wayne/Batman. The film also stars Anne Hathaway, as Selina Kyle; Tom Hardy, as Bane; Oscar(R) winner Marion Cotillard (“La Vie en Rose”), as Miranda Tate; and Joseph Gordon-Levitt, as John Blake. Returning to the main cast, Oscar(R) winner Michael Caine (“The Cider House Rules”) plays Alfred; Gary Oldman is Commissioner Gordon; and Oscar(R) winner Morgan Freeman (“Million Dollar Baby”) reprises the role of Lucius Fox. The screenplay is written by Christopher Nolan and Jonathan Nolan, story by Christopher Nolan & David S. Goyer.  The film is produced by Emma Thomas, Christopher Nolan and Charles Roven, who previously teamed on “Batman Begins” and the record-breaking blockbuster “The Dark Knight.”  The executive producers are Benjamin Melniker, Michael E. Uslan, Kevin De La Noy and Thomas Tull, with Jordan Goldberg serving as co-producer. The film is based upon characters appearing in comic books published by DC Comics.  Batman was created by Bob Kane."
    },
    "cast":{
        "name":["Christian Bale","Anne Hathaway","Tom Hardy","Marion Cotillard","Joseph Gordon-Levitt","Michael Caine","Gary Oldman","Morgan Freeman"]
        },
    "genre":{
        "name":["Fantasy","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/wb/thedarkknightrises/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/wb/thedarkknightrises/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"27717311",
            "content":"http://trailers.apple.com/movies/wb/thedarkknightrises/darkknightrises-tsr1_h480p.mov"
        }
    }
},{
    "id":"4450",
    "info":{
        "title":"The Darkest Hour",
        "runtime":"2:28",
        "rating":"PG-13",
        "studio":"Summit Entertainment",
        "postdate":"2011-08-03",
        "releasedate":"2011-12-25",
        "copyright":"© Copyright 2011 Summit Entertainment",
        "director":"Chris Gorak",
        "description":"The DARKEST HOUR is the story of five young people who find themselves stranded in Moscow, fighting to survive in the wake of a devastating alien attack. The 3D thriller highlights the classic beauty of Moscow alongside mind-blowing special effects."
    },
    "cast":{
        "name":["Emile Hirsch","Olivia Thirlby","Max Minghella","Rachael Taylor"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/summit/thedarkesthour/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/summit/thedarkesthour/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44357062",
            "content":"http://trailers.apple.com/movies/summit/thedarkesthour/thedarkesthour-tlr1_h480p.mov"
        }
    }
},{
    "id":"4335",
    "info":{
        "title":"The Descendants",
        "runtime":"1:07",
        "rating":"R",
        "studio":"Fox Searchlight Pictures",
        "postdate":"2011-10-17",
        "releasedate":"2011-11-18",
        "copyright":"© Copyright 2011 Fox Searchlight Pictures",
        "director":"Alexander Payne",
        "description":"From Alexander Payne, the creator of the Oscar-winning SIDEWAYS, set in Hawaii, THE DESCENDANTS is a sometimes humorous, sometimes tragic journey for Matt King (George Clooney) an indifferent husband and father of two girls, who is forced to re-examine his past and embrace his future when his wife suffers a boating accident off of Waikiki.  The event leads to a rapprochement with his young daughters while Matt wrestles with a decision to sell the family’s land handed down from Hawaiian royalty and missionaries."
    },
    "cast":{
        "name":["George Clooney","Shailene Woodley","Beau Bridges","Robert Forster","Judy Greer","Matthew Lillard","Nick Krause","Amara Miller","Mary Birdsong","Rob Huebel","Patricia Hastie"]
        },
    "genre":{
        "name":["Comedy","Drama"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox_searchlight/thedescendants/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox_searchlight/thedescendants/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"20362513",
            "content":"http://trailers.apple.com/movies/fox_searchlight/thedescendants/descendants-tlr2_h480p.mov"
        }
    }
},{
    "id":"4580",
    "info":{
        "title":"The Devil Inside",
        "runtime":"2:29",
        "rating":"Not yet rated",
        "studio":"Paramount Pictures",
        "postdate":"2011-10-17",
        "releasedate":"2012-01-06",
        "copyright":"© Copyright 2012 Paramount Pictures",
        "director":"William Brent Bell",
        "description":"Not currently available."
    },
    "cast":{
        "name":["Fernanda Andrade","Simon Quarterman","Evan Helmuth"]
        },
    "genre":{
        "name":["Horror","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/paramount/thedevilinside/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/paramount/thedevilinside/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"39337688",
            "content":"http://trailers.apple.com/movies/paramount/thedevilinside/thedevilinside-tlr1_h480p.mov"
        }
    }
},{
    "id":"4507",
    "info":{
        "title":"The Double",
        "runtime":"2:25",
        "rating":"PG-13",
        "studio":"Image Entertainment",
        "postdate":"2011-08-30",
        "releasedate":"2011-10-28",
        "copyright":"© Copyright 2011 Image Entertainment",
        "director":"Michael Brandt",
        "description":"In THE DOUBLE, the mysterious murder of a US senator bearing the distinctive trademark of the legendary Soviet assassin “Cassius,” forces Paul Shepherdson (Richard Gere), a retired CIA operative, to team with rookie FBI agent, Ben Geary (Topher Grace), to solve the crime. Having spent his career chasing Cassius, Shepherdson is convinced his nemesis is long dead, but is pushed to take on the case by his former supervisor, Tom Highland (Martin Sheen).  Meanwhile, Agent Geary, who wrote his Master’s thesis on Shepherdson’s pursuit of the Soviet killer, is certain that Cassius has resurfaced.  As Shepherdson and Geary work their way through crimes both past and present, they discover that Cassius may not be the person they always thought him to be, forcing both to re-examine everything and everyone around them."
    },
    "cast":{
        "name":["Richard Gere","Topher Grace","Stana Katic","Stephen Moyer","Martin Sheen","Odette Annable"]
        },
    "genre":{
        "name":["Drama","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/thedouble/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/thedouble/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"43656351",
            "content":"http://trailers.apple.com/movies/independent/thedouble/thedouble-tlr1_h480p.mov"
        }
    }
},{
    "id":"4352",
    "info":{
        "title":"The Girl with the Dragon Tattoo",
        "runtime":"3:45",
        "rating":"Not yet rated",
        "studio":"Sony Pictures",
        "postdate":"2011-09-22",
        "releasedate":"2011-12-21",
        "copyright":"© Copyright 2011 Sony Pictures",
        "director":"David Fincher",
        "description":"The Girl with the Dragon Tattoo is the first film in Columbia Pictures’ three-picture adaptation of Stieg Larsson’s literary blockbuster The Millennium Trilogy.  Directed by David Fincher and starring Daniel Craig and Rooney Mara, the film is based on the first novel in the trilogy, which altogether have sold 50 million copies in 46 countries and become a worldwide phenomenon.  The screenplay is by Steven Zaillian."
    },
    "cast":{
        "name":["Daniel Craig","Rooney Mara","Christopher Plummer","Stellan Skarsgård ","Steven Berkoff","Robin Wright","Yorick van Wageningen","Joely Richardson"]
        },
    "genre":{
        "name":["Drama","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/thegirlwiththedragontattoo/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/thegirlwiththedragontattoo/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"70476394",
            "content":"http://trailers.apple.com/movies/sony_pictures/girlwiththedragontattoo/dragontattoo-tlr2b_h480p.mov"
        }
    }
},{
    "id":"4563",
    "info":{
        "title":"The Grey",
        "runtime":"1:25",
        "rating":"Not yet rated",
        "studio":"Open Road Films   ",
        "postdate":"2011-09-29",
        "releasedate":"2012-01-27",
        "copyright":"© Copyright 2012 Open Road Films   ",
        "director":"Joe Carnahan",
        "description":"In The Grey, Liam Neeson leads an unruly group of oil-rig roughnecks when their plane crashes into the remote Alaskan wilderness. Battling mortal injuries and merciless weather, the survivors have only a few days to escape the icy elements and a vicious pack of rogue wolves on the hunt before their time runs out."
    },
    "cast":{
        "name":"Liam Neeson"
    },
    "genre":{
        "name":["Drama","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/thegrey/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/thegrey/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"25004510",
            "content":"http://trailers.apple.com/movies/independent/thegrey/thegrey-tlr1_h480p.mov"
        }
    }
},{
    "id":"4601",
    "info":{
        "title":"The Hammer",
        "runtime":"1:05",
        "rating":"PG-13",
        "studio":"D",
        "postdate":"2011-10-24",
        "releasedate":"2011-10-27",
        "copyright":"© Copyright 2011 D",
        "director":"Oren Kaplan",
        "description":"Based on the life of the UFC fighter, Matt Hamill, The Hammer is a coming of age drama about the first deaf wrestler’s journey to win a National Collegiate Championship.  Raised among those with the ability to hear, Matt finds himself no less an outsider amidst the Deaf community.  But through sheer determination, he turns what could be a disability into an asset and in the process serves as an inspiration for both those who can hear and those who cannot. "
    },
    "cast":{
        "name":["Russell Harvard","Baymond J. Barry","Shoshannah Stern","Michael Spady","Courtney Halverson"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/thehammer/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/thehammer/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"19510625",
            "content":"http://trailers.apple.com/movies/independent/thehammer/thehammer-tlr1_h480p.mov"
        }
    }
},{
    "id":"3859",
    "info":{
        "title":"The Help",
        "runtime":"2:30",
        "rating":"PG-13",
        "studio":"DreamWorks",
        "postdate":"2011-04-20",
        "releasedate":"2011-08-10",
        "copyright":"© Copyright 2011 DreamWorks",
        "director":"Tate Taylor",
        "description":"Based on one of the most talked about books in years and a #1 New York Times best-selling phenomenon, “The Help” stars Emma Stone (“Easy A”) as Skeeter, Academy Award(R)-nominated Viola Davis (“Doubt”) as Aibileen and Octavia Spencer as Minny—three very different, extraordinary women in Mississippi during the 1960s, who build an unlikely friendship around a secret writing project that breaks societal rules and puts them all at risk. From their improbable alliance a remarkable sisterhood emerges, instilling all of them with the courage to transcend the lines that define them, and the realization that sometimes those lines are made to be crossed—even if it means bringing everyone in town face-to-face with the changing times. Deeply moving, filled with poignancy, humor and hope, “The Help” is a timeless and universal story about the ability to create change."
    },
    "cast":{
        "name":["Viola Davis","Bryce Dallas Howard","Octavia Spencer","Emma Stone","Jessica Chastain","Allison Janney","Chris Lowell","Sissy Spacek","Cicely Tyson","Mike Vogel"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/dreamworks/thehelp/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/dreamworks/thehelp/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"38273646",
            "content":"http://trailers.apple.com/movies/dreamworks/thehelp/thehelp-tlr1_h480p.mov"
        }
    }
},{
    "id":"4503",
    "info":{
        "title":"The Hunger Games",
        "runtime":":59",
        "rating":"Not yet rated",
        "studio":"Lionsgate",
        "postdate":"2011-08-29",
        "releasedate":"2012-03-23",
        "copyright":"© Copyright 2012 Lionsgate",
        "director":"Gary Ross",
        "description":"Every year in the ruins of what was once North America, the nation of Panem forces each of its twelve districts to send a teenage boy and girl to compete in the Hunger Games. Part twisted entertainment, part government intimidation tactic, the Hunger Games are a nationally televised event in which “Tributes” must fight with one another until one survivor remains. Pitted against highly-trained Tributes who have prepared for these Games their entire lives, Katniss is forced to rely upon her sharp instincts as well as the mentorship of drunken former victor Haymitch Abernathy. If she’s ever to return home to District 12, Katniss must make impossible choices in the arena that weigh survival against humanity and life against love. THE HUNGER GAMES is directed by Gary Ross, with a screenplay by Gary Ross and Suzanne Collins and Billy Ray, and produced by Nina Jacobson’s Color Force in tandem with producer Jon Kilik. Suzanne Collins’ best-selling novel, the first in a trilogy published by Scholastic that has over 12 million copies in print in the United States alone, has developed a massive global following. It has spent more than 157 consecutive weeks/more than three consecutive years to date on The New York Times bestseller list since its publication in September 2008, and has also appeared consistently on USA Today and Publishers Weekly bestseller lists. "
    },
    "cast":{
        "name":["Jennifer Lawrence","Josh Hutcherson","Liam Hemsworth","Woody Harrelson","Elizabeth Banks","Stanley Tucci","Donald Sutherland","Wes Bentley","Toby Jones","Amandla Stenberg","Alexander Ludwig","Isabelle Fuhrman","Jacqueline Emerson","Paula Malcomson","Dayo Okeniyi","Jack Quaid","Leven Rambin","Willow Shields","Lenny Kravitz"]
        },
    "genre":{
        "name":["Drama","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/lions_gate/thehungergames/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/lions_gate/thehungergames/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"17319481",
            "content":"http://trailers.apple.com/movies/lionsgate/thehungergames/thehungergames-tlr1a_h480p.mov"
        }
    }
},{
    "id":"4460",
    "info":{
        "title":"The Ides of March",
        "runtime":"2:26",
        "rating":"R",
        "studio":"Sony Pictures",
        "postdate":"2011-08-04",
        "releasedate":"2011-10-07",
        "copyright":"© Copyright 2011 Sony Pictures",
        "director":"George Clooney",
        "description":"The Ides of March takes place during the frantic last days before a heavily contested Ohio presidential primary, when an up-and-coming campaign press secretary (Ryan Gosling) finds himself involved in a political scandal that threatens to upend his candidate’s shot at the presidency."
    },
    "cast":{
        "name":["Ryan Gosling","George Clooney","Philip Seymour Hoffman","Paul Giamatti","Marisa Tomei","Jeffrey Wright","Evan Rachel Wood"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/theidesofmarch/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/theidesofmarch/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"42969905",
            "content":"http://trailers.apple.com/movies/sony_pictures/idesofmarch/idesofmarch-tlr1_h480p.mov"
        }
    }
},{
    "id":"4619",
    "info":{
        "title":"The Innkeepers",
        "runtime":"2:02",
        "rating":"Not yet rated",
        "studio":"Magnolia Pictures",
        "postdate":"2011-10-28",
        "releasedate":"2012-02-03",
        "copyright":"© Copyright 2012 Magnolia Pictures",
        "director":"Ti West",
        "description":"After over one hundred years of service, The Yankee Pedlar Inn is shutting its doors for good. The last remaining employees -Claire  and Luke - are determined to uncover proof of what many believe to be one of New England’s most haunted hotels. As the Inn’s final days draw near, odd guests check in as the pair of minimum wage “ghost hunters” begin to experience strange and alarming events that may ultimately cause them to be mere footnotes in the hotel’s long unexplained history."
    },
    "cast":{
        "name":["Sara Paxton","Pat Healy","Kelly McGillis"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/magnolia/theinnkeepers/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/magnolia/theinnkeepers/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37390058",
            "content":"http://trailers.apple.com/movies/magnolia_pictures/theinnkeepers/innkeepers-tlr1_h480p.mov"
        }
    }
},{
    "id":"4615",
    "info":{
        "title":"The Iron Lady",
        "runtime":"1:09",
        "rating":"PG-13",
        "studio":"Weinstein Company",
        "postdate":"2011-10-27",
        "releasedate":"2011-12-16",
        "copyright":"© Copyright 2011 Weinstein Company",
        "director":"Phyllida Lloyd",
        "description":"THE IRON LADY is a surprising and intimate portrait of Margaret Thatcher (Meryl Streep), the first and only female Prime Minister of The United Kingdom.  One of the 20th century’s most famous and influential women, Thatcher came from nowhere to smash through barriers of gender and class to be heard in a male dominated world."
    },
    "cast":{
        "name":["Meryl Streep","Jim Broadbent","Richard E. Grant"]
        },
    "genre":{
        "name":["Drama","Foreign"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/weinstein/theironlady/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/weinstein/theironlady/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"19419279",
            "content":"http://trailers.apple.com/movies/weinstein/ironlady/ironlady-tlr1_h480p.mov"
        }
    }
},{
    "id":"4561",
    "info":{
        "title":"The Last Ride",
        "runtime":"2:32",
        "rating":"PG-13",
        "studio":"Mozark Productions, Live Bait Entertainment",
        "postdate":"2011-09-29",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Mozark Productions, Live Bait Entertainment",
        "director":"Harry Thomason",
        "description":"Hank Williams pioneered and pretty much invented what we know today as country music. At the peak of his career, he was acknowledged to be the greatest singer-songwriter in American history.   But after a meteoric rise to record and radio super-stardom in the late 1940’s, the man had made a train wreck of his life. Drugs, alcohol, and a hair-trigger temper had ended two marriages, ruined a host of friendships and made the tortured genius a virtual untouchable in the music business. So at the end of 1952, Hank Williams gathered what was left of his physical strength to make things right, and begin the long road back. He booked New Years shows in West Virginia and Ohio, and hired a local kid who didn’t even own a radio, much less know who this legend was, to drive him there from Montgomery Alabama. Inspired by the mysterious final days Hank Williams’ mercurial life, THE LAST RIDE is the story of that final drive through the bleak Appalachian countryside of 1950’s America. A lonely two-man odyssey; a boy coming of age, and a man leaving this world way before his time, a victim of his own abuses. "
    },
    "cast":{
        "name":["Henry Thomas","Jesse James","Fred Dalton Thompson","Kaley Cuoco","Stephen Tobolowsky","Ray McKinnon"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/thelastride/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/thelastride/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"35256552",
            "content":"http://trailers.apple.com/movies/independent/thelastride/thelastride-tlr1_h480p.mov"
        }
    }
},{
    "id":"4537",
    "info":{
        "title":"The Lie",
        "runtime":"2:12",
        "rating":"R",
        "studio":"Screen Media Films",
        "postdate":"2011-09-19",
        "releasedate":"2011-11-18",
        "copyright":"© Copyright 2011 Screen Media Films",
        "director":"Joshua Leonard",
        "description":"When they first met, Lonnie and Clover were young idealists, but an unplanned baby forced them to flip the script. Lonnie put his music on hold and got a shitty job. And now Clover is abandoning her activism for an “opportunity” in the corporate world. Drowning in disappointments, Lonnie decides he needs some time off work to reexamine his life. He calls in sick, but his abusive boss demands he show up or get fired. Lonnie panics and tells a shocking lie to justify his absence - and once the lie if out, there’s no going back. Now it’s only a matter of time before the grenade he’s thrown on his life explodes and Lonnie is suddenly pushed to figure out who he is, what he wants, and just maybe, what it means to be a father. "
    },
    "cast":{
        "name":["Joshua Leonard","Jess Wexler","Mark Webber"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/thelie/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/thelie/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"40612087",
            "content":"http://trailers.apple.com/movies/independent/thelie/thelie-tlr1b_h480p.mov"
        }
    }
},{
    "id":"4582",
    "info":{
        "title":"The Mighty Macs",
        "runtime":"2:05",
        "rating":"G",
        "studio":"Quaker Media",
        "postdate":"2011-10-20",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Quaker Media",
        "director":"Tim Chambers",
        "description":"She Dared to Dream. They Dared to Believe. It’s 1971. Cathy Rush is a woman ahead of her time … and she’s about to embark on an adventure for the ages. Recently hired as the coach of tiny Immaculata College, Cathy’s challenges are as imposing as the big-school teams her Macs will face. There is no gymnasium, no fan support and no money. To top it off, Cathy may not even have enough players for a team! While it appears the Macs don’t have a prayer, all hope is not lost. With the help of Sister Sunday—a spunky assistant coach—and the support of a booster club of elderly nuns, Coach Rush creates a new game plan that just might bring the team—and the school—together. Will this pioneer buck cultural norms and spur her rag-tag team to unexpected heights? Or will her hard-driving ways create a wedge between the coach and everyone around her? One thing’s for certain: there’s never been anyone like Cathy Rush at Immaculata! "
    },
    "cast":{
        "name":["Carla Gugino","David Boreanaz"," Marley Shelton","Ellen Burstyn"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/themightymacs/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/themightymacs/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37140227",
            "content":"http://trailers.apple.com/movies/independent/mightymacs/mightymacs-tlr1_h480p.mov"
        }
    }
},{
    "id":"4342",
    "info":{
        "title":"The Muppets",
        "runtime":"2:31",
        "rating":"PG",
        "studio":"Walt Disney Pictures",
        "postdate":"2011-10-21",
        "releasedate":"2011-11-23",
        "copyright":"© Copyright 2011 Walt Disney Pictures",
        "director":"James Bobin",
        "description":"On vacation in Los Angeles, Walter, the world’s biggest Muppet fan, and his friends Gary (Jason Segel) and Mary (Amy Adams) from Smalltown, USA, discover the nefarious plan of oilman Tex Richman (Chris Cooper) to raze the Muppet Theater and drill for the oil recently discovered beneath the Muppets’ former stomping grounds. To stage The Greatest Muppet Telethon Ever and raise the $10 million needed to save the theater, Walter, Mary and Gary help Kermit reunite the Muppets, who have all gone their separate ways: Fozzie now performs with a Reno casino tribute band called the Moopets, Miss Piggy is a plus-size fashion editor at Vogue Paris, Animal is in a Santa Barbara clinic for anger management, and Gonzo is a high-powered plumbing magnate."
    },
    "cast":{
        "name":["Kermit the Frog","Miss Piggy","Fozzie Bear","Gonzo","Animal","Jason Segel","Amy Adams","Chris Cooper","Walter","Rashida Jones"]
        },
    "genre":{
        "name":["Family","Comedy"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/disney/themuppets/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/disney/themuppets/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"38627860",
            "content":"http://trailers.apple.com/movies/disney/themuppets/muppets-tlr5_h480p.mov"
        }
    }
},{
    "id":"4475",
    "info":{
        "title":"The Odd Life of Timothy Green",
        "runtime":"1:49",
        "rating":"PG",
        "studio":"Walt Disney Pictures",
        "postdate":"2011-08-16",
        "releasedate":"2012-08-15",
        "copyright":"© Copyright 2012 Walt Disney Pictures",
        "director":"Peter Hedges",
        "description":"Academy Award(R)-nominated director/writer Peter Hedges (“Dan in Real Life,” What’s Eating Gilbert Grape?”) brings enchantment to the screen with “The Odd Life of Timothy Green,” an inspiring, magical story about a happily married couple, Cindy and Jim Green (Jennifer Garner and Joel Edgerton), who can’t wait to start a family but can only dream about what their child would be like. When young Timothy (CJ Adams) shows up on their doorstep one stormy night, Cindy and Jim—and their small town of Stanleyville—learn that sometimes the unexpected can bring some of life’s greatest gifts."
    },
    "cast":{
        "name":["Jennifer Garner","Joel Edgerton","Dianne Wiest","CJ Adams","Rosemarie DeWitt","Ron Livingston","M. Emmet Walsh","Odeya Rush","Lin-Manuel Miranda","Lois Smith","Common"]
        },
    "genre":{
        "name":"Fantasy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/disney/theoddlifeoftimothygreen/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/disney/theoddlifeoftimothygreen/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"34696770",
            "content":"http://trailers.apple.com/movies/disney/theoddlifeoftimothygreen/theoddlifeoftimothygreen-tlr1_h480p.mov"
        }
    }
},{
    "id":"4408",
    "info":{
        "title":"The Pirates! Band of Misfits",
        "runtime":"1:57",
        "rating":"Not yet rated",
        "studio":"Sony Pictures",
        "postdate":"2011-07-14",
        "releasedate":"2012-03-30",
        "copyright":"© Copyright 2012 Sony Pictures",
        "director":"Peter Lord",
        "description":"In The Pirates! Band of Misfits, Hugh Grant stars in his first animated role as the luxuriantly bearded Pirate Captain - a boundlessly enthusiastic, if somewhat less-than-successful, terror of the High Seas.  With a rag-tag crew at his side (Martin Freeman, Brendan Gleeson, Russell Tovey, and Ashley Jensen), and seemingly blind to the impossible odds stacked against him, the Captain has one dream: to beat his bitter rivals Black Bellamy (Jeremy Piven) and Cutlass Liz (Salma Hayek) to the much coveted Pirate Of The Year Award.  It’s a quest that takes our heroes from the shores of exotic Blood Island to the foggy streets of Victorian London.  Along the way they battle a diabolical queen (Imelda Staunton) and team up with a haplessly smitten young scientist (David Tennant), but never lose sight of what a pirate loves best: adventure!"
    },
    "cast":{
        "name":["Hugh Grant","David Tennant","Imelda Staunton","Martin Freeman","Jeremy Piven"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/thepiratesbandofmisfits/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/thepiratesbandofmisfits/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"34951793",
            "content":"http://trailers.apple.com/movies/sony_pictures/thepirates/pirates-tlr1_h480p.mov"
        }
    }
},{
    "id":"4575",
    "info":{
        "title":"The Raven",
        "runtime":"2:11",
        "rating":"Not yet rated",
        "studio":"Relativity Media",
        "postdate":"2011-10-07",
        "releasedate":"2012-03-09",
        "copyright":"© Copyright 2012 Relativity Media",
        "director":"James McTeigue",
        "description":"In this gritty thriller, Edgar Allan Poe (John Cusack, Being John Malkovich) joins forces with a young Baltimore detective (Luke Evans, Immortals) to hunt down a mad serial killer who’s using Poe’s own works as the basis in a string of brutal murders. Directed by James McTeigue (V for Vendetta, Ninja Assassin), the film also stars Alice Eve (Sex and the City 2), Brendan Gleeson (In Bruges) and Oliver Jackson-Cohen (Faster). When a mother and daughter are found brutally murdered in 19th century Baltimore, Detective Emmett Fields (Luke Evans) makes a startling discovery: the crime resembles a fictional murder described in gory detail in the local newspaper—part of a collection of stories penned by struggling writer and social pariah Edgar Allan Poe. But even as Poe is questioned by police, another grisly murder occurs, also inspired by a popular Poe story. Realizing a serial killer is on the loose using Poe’s writings as the backdrop for his bloody rampage, Fields enlists the author’s help in stopping the attacks. But when it appears someone close to Poe may become the murderer’s next victim, the stakes become even higher and the inventor of the detective story calls on his own powers of deduction to try to solve the case before it’s too late. "
    },
    "cast":{
        "name":["John Cusack","Luke Evans","Alice Eve","Brendan Gleeson","Oliver Jackson-Cohen"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/theraven/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/theraven/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"41986233",
            "content":"http://trailers.apple.com/movies/independent/theraven/theraven-tlr1_h480p.mov"
        }
    }
},{
    "id":"4540",
    "info":{
        "title":"The Rum Diary",
        "runtime":"2:29",
        "rating":"R",
        "studio":"FilmDistrict",
        "postdate":"2011-09-21",
        "releasedate":"2011-10-28",
        "copyright":"© Copyright 2011 FilmDistrict",
        "director":"Bruce Robinson",
        "description":"Based on the debut novel by Hunter S. Thompson, “The Rum Diary” tells the increasingly unhinged story of itinerant journalist Paul Kemp (Johnny Depp). Tiring of the noise and madness of New York and the crushing conventions of late Eisenhower-era America, Kemp travels to the pristine island of Puerto Rico to write for a local newspaper, The San Juan Star, run by downtrodden editor Lotterman (Richard Jenkins). Adopting the rum-soaked life of the island, Paul soon becomes obsessed with Chenault (Amber Heard), the wildly attractive Connecticut-born fiancee of Sanderson (Aaron Eckhart). Sanderson, a businessman involved in shady property development deals, is one of a growing number of American entrepreneurs who are determined to convert Puerto Rico into a capitalist paradise in service of the wealthy. When Kemp is recruited by Sanderson to write favorably about his latest unsavory scheme, the journalist is presented with a choice: to use his words for the corrupt businessmen’s financial benefit, or use them to take the bastards down."
    },
    "cast":{
        "name":["Johnny Depp","Aaron Eckhart","Amber Heard","Michael Rispoli","Richard Jenkins","Giovanni Ribisi","Marshall Bell"]
        },
    "genre":{
        "name":["Comedy","Drama"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/therumdiary/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/therumdiary/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"34562175",
            "content":"http://trailers.apple.com/movies/independent/rumdiary/therumdiary-tlr1_h480p.mov"
        }
    }
},{
    "id":"4600",
    "info":{
        "title":"The Secret World of Arrietty",
        "runtime":"2:31",
        "rating":"G",
        "studio":"Walt Disney Pictures",
        "postdate":"2011-10-25",
        "releasedate":"2012-02-17",
        "copyright":"© Copyright 2012 Walt Disney Pictures",
        "director":"Hiromasa Yonebayashi",
        "description":"Residing quietly beneath the floorboards are little people who live undetected in a secret world to be discovered, where the smallest may stand tallest of all.  From the legendary Studio Ghibli (“Spirited Away,” “Ponyo”) comes “The Secret World of Arrietty,” an animated adventure based on Mary Norton’s acclaimed children’s book series “The Borrowers.”"
    },
    "cast":{
        "name":["Bridgit Mendler","Amy Poehler","Carol Burnett","Will Arnett","David Henrie","Moises Arias"]
        },
    "genre":{
        "name":"Action and Adventure"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/disney/thesecretworldofarrietty/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/disney/thesecretworldofarrietty/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"38334572",
            "content":"http://trailers.apple.com/movies/disney/arrietty/arrietty-tlr2_h480p.mov"
        }
    }
},{
    "id":"4625",
    "info":{
        "title":"The Sitter",
        "runtime":"2:14",
        "rating":"R",
        "studio":"20th Century Fox",
        "postdate":"2011-11-03",
        "releasedate":"2012-12-09",
        "copyright":"© Copyright 2012 20th Century Fox",
        "director":"David Gordon Green",
        "description":"When the world’s worst babysitter takes three of the world’s worst kids on an unforgettable overnight adventure through the streets of New York City, it’s anyone’s guess who’s going to make it home in one piece.  THE SITTER is a new level of twisted and debauched hilarity from the director of Pineapple Express.”  "
    },
    "cast":{
        "name":["Jonah Hill","Max Records","Ari Graynor","JB Smoove","Sam Rockwell"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox/thesitter/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox/thesitter/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"34720844",
            "content":"http://trailers.apple.com/movies/fox/thesitter/thesitter-tlr1_h480p.mov"
        }
    }
},{
    "id":"4510",
    "info":{
        "title":"The Skin I Live In",
        "runtime":"2:11",
        "rating":"R",
        "studio":"Sony Pictures Classics",
        "postdate":"2011-09-01",
        "releasedate":"2011-10-14",
        "copyright":"© Copyright 2011 Sony Pictures Classics",
        "director":"Pedro Almodovar",
        "description":"Ever since his wife was burned in a car crash, Dr. Robert Ledgard, an eminent plastic surgeon, has been interested in creating a new skin with which he could have saved her. After twelve years, he manages to cultivate a skin that is a real shield against every assault. In addition to years of study and experimentation, Robert needed three more things: no scruples, an accomplice and a human guinea pig. Scruples were never a problem. Marilia, the woman who looked after him from the day he was born, is his most faithful accomplice. And as for the human guinea pig…"
    },
    "cast":{
        "name":["Antonio Banderas","Elena Anaya","Marisa Paredes"]
        },
    "genre":{
        "name":["Drama","Science Fiction","Foreign"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony/theskinilivein/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony/theskinilivein/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"32147892",
            "content":"http://trailers.apple.com/movies/sony/theskinilivein/theskinilivein_h480p.mov"
        }
    }
},{
    "id":"4572",
    "info":{
        "title":"The Son Of No One",
        "runtime":"2:26",
        "rating":"R",
        "studio":"Anchor Bay",
        "postdate":"2011-10-05",
        "releasedate":"2011-11-04",
        "copyright":"© Copyright 2011 Anchor Bay",
        "director":"Dito Montiel",
        "description":"A young cop is assigned to a precinct in the neighborhood where he grew up, and an old secret threatens to destroy his life and his family."
    },
    "cast":{
        "name":["Al Pacino","Channing Tatum","Ray Liotta","Katie Holmes","Tracy Morgan"]
        },
    "genre":{
        "name":["Action and Adventure","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/thesonofnoone/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/thesonofnoone/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44509109",
            "content":"http://trailers.apple.com/movies/independent/thesonofnoone/sonofnoone-tlr1_h480p.mov"
        }
    }
},{
    "id":"4416",
    "info":{
        "title":"The Thing",
        "runtime":"2:31",
        "rating":"R",
        "studio":"Universal Pictures",
        "postdate":"2011-07-20",
        "releasedate":"2011-10-14",
        "copyright":"© Copyright 2011 Universal Pictures",
        "director":"Matthijs van Heijningen",
        "description":"Antarctica: an extraordinary continent of awesome beauty. It is also home to an isolated outpost where a discovery full of scientific possibility becomes a mission of survival when an alien is unearthed by a crew of international scientists. The shape-shifting creature, accidentally unleashed at this marooned colony, has the ability to turn itself into a perfect replica of any living being. It can look just like you or me, but inside, it remains inhuman. In the thriller The Thing, paranoia spreads like an epidemic among a group of researchers as they’re infected, one by one, by a mystery from another planet. Paleontologist Kate Lloyd (Mary Elizabeth Winstead) has traveled to the desolate region for the expedition of her lifetime. Joining a Norwegian scientific team that has stumbled across an extraterrestrial ship buried in the ice, she discovers an organism that seems to have died in the crash eons ago. But it is about to wake up. When a simple experiment frees the alien from its frozen prison, Kate must join the crew’s pilot, Carter (Joel Edgerton), to keep it from killing them off one at a time. And in this vast, intense land, a parasite that can mimic anything it touches will pit human against human as it tries to survive and flourish. The Thing serves as a prelude to John Carpenter’s classic 1982 film of the same name. "
    },
    "cast":{
        "name":["Mary Elizabeth Winstead","Joel Edgerton"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/thething/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/thething/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44870454",
            "content":"http://trailers.apple.com/movies/universal/thething/thething-tlr1_h480p.mov"
        }
    }
},{
    "id":"4226",
    "info":{
        "title":"The Three Musketeers",
        "runtime":"2:08",
        "rating":"PG-13",
        "studio":"Summit Entertainment",
        "postdate":"2011-07-05",
        "releasedate":"2011-10-21",
        "copyright":"© Copyright 2011 Summit Entertainment",
        "director":"Paul W.S. Anderson",
        "description":"Based on Alexandre Dumas’ classic novel comes a big-screen action adventure update of The Three Musketeers, conceived and shot in state-of-the-art 3D. They are known as Porthos, Athos, and Aramis—three elite warriors who serve the King of France as his best Musketeers.  After discovering an evil conspiracy to overthrow the King, the Musketeers come across a young, aspiring hero — D’Artagnan — and take him under their wing.  Together, the four embark on a dangerous mission to foil the plot that not only threatens the Crown, but the future of Europe itself."
    },
    "cast":{
        "name":["Logan Lerman","Milla Jovovich","Matthew Macfadyen","Ray Stevenson","Luke Evans","Mads Mikkelson","Gabriella Wilde","Juno Temple","Orlando Bloom","Christoph Waltz"]
        },
    "genre":{
        "name":["Romance","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/summit/thethreemusketeers/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/summit/thethreemusketeers/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37974906",
            "content":"http://trailers.apple.com/movies/summit/threemusketeers/threemusketeers-tlr2_h480p.mov"
        }
    }
},{
    "id":"4361",
    "info":{
        "title":"The Twilight Saga: Breaking Dawn - Part 1",
        "runtime":"2:30",
        "rating":"PG-13",
        "studio":"Summit Entertainment",
        "postdate":"2011-09-20",
        "releasedate":"2011-11-18",
        "copyright":"© Copyright 2011 Summit Entertainment",
        "director":"Bill Condon",
        "description":"The highly anticipated next chapter of The Twilight Saga, directed by Academy Award winner Bill Condon."
    },
    "cast":{
        "name":["Kristen Stewart","Robert Pattinson","Taylor Lautner","Billy Burke","Peter Facinelli","Elizabeth Reaser","Jackson Rathbone","Nikki Reed","Ashley Greene","Kellan Lutz"]
        },
    "genre":{
        "name":["Drama","Romance"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/summit/thetwilightsagabreakingdawnpart1/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/summit/thetwilightsagabreakingdawnpart1/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"44516979",
            "content":"http://trailers.apple.com/movies/summit/twilightbreakingdawn1/breakingdawn-tlr2_h480p.mov"
        }
    }
},{
    "id":"4353",
    "info":{
        "title":"The Vow",
        "runtime":"1:55",
        "rating":"Not yet rated",
        "studio":"Sony Pictures",
        "postdate":"2011-06-03",
        "releasedate":"2012-02-10",
        "copyright":"© Copyright 2012 Sony Pictures",
        "director":"Michael Sucsy",
        "description":"A newlywed couple recovers from a car accident that puts the wife in a coma. Waking up with severe memory loss, her husband endeavors to win her heart again."
    },
    "cast":{
        "name":["Rachel McAdams","Channing Tatum","Sam Neill","Scott Speedman","Wendy Crewson","Jessica Lange"]
        },
    "genre":{
        "name":["Drama","Romance"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/sony_pictures/thevow/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/sony_pictures/thevow/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"33788047",
            "content":"http://trailers.apple.com/movies/sony_pictures/thevow/thevow-tlr1_h480p.mov"
        }
    }
},{
    "id":"4482",
    "info":{
        "title":"The Way",
        "runtime":"2:31",
        "rating":"PG-13",
        "studio":"Producers Distribution Agency",
        "postdate":"2011-08-22",
        "releasedate":"2011-10-07",
        "copyright":"© Copyright 2011 Producers Distribution Agency",
        "director":"Emilio Estevez",
        "description":"“The Way” is an inspirational story about family, friends, and the challenges of navigating a complicated world. Martin Sheen plays Tom, an American doctor who comes to France to collect the remains of his adult son (played by Emilio Estevez), who died while walking the Camino de Santiago, also known as The Way of Saint James. Embarking on the historical pilgrimage to honor his sonÃ¢ï¿½ï¿½s memory, Tom meets other pilgrims from around the world: a Dutchman (Yorick van Wageningen), a Canadian (Deborah Kara Unger) and an Irishman (James Nesbitt). Eventually, Tom discovers the difference between “the life we live and the life we choose.” THE WAY, written and directed by Emilio Estevez, was filmed along the actual Camino de Santiago."
    },
    "cast":{
        "name":["Martin Sheen","Emilio Estevez","Deborah Kara Unger"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/theway/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/theway/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"37615922",
            "content":"http://trailers.apple.com/movies/independent/theway/theway-tlr1_h480p.mov"
        }
    }
},{
    "id":"4494",
    "info":{
        "title":"The Woman in Black",
        "runtime":"1:43",
        "rating":"PG-13",
        "studio":"CBS Films",
        "postdate":"2011-08-25",
        "releasedate":"2012-02-03",
        "copyright":"© Copyright 2012 CBS Films",
        "director":"James Watkins",
        "description":"A young lawyer (Radcliffe) travels to a remote village where he discovers the vengeful ghost of a scorner woman is terrorizing the locals."
    },
    "cast":{
        "name":["Daniel Radcliffe","Ciarán Hinds","Janet McTeer","Shaun Dooley"]
        },
    "genre":{
        "name":["Drama","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/thewomaninblack/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/thewomaninblack/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"30219492",
            "content":"http://trailers.apple.com/movies/independent/thewomaninblack/thewomaninblack-tlr1_h480p.mov"
        }
    }
},{
    "id":"4579",
    "info":{
        "title":"This Means War",
        "runtime":"2:29",
        "rating":"Not yet rated",
        "studio":"20th Century Fox",
        "postdate":"2011-10-13",
        "releasedate":"2012-02-17",
        "copyright":"© Copyright 2012 20th Century Fox",
        "director":"McG",
        "description":"The world’s deadliest CIA operatives are inseparable partners and best friends until they fall for the same woman.  Having once helped bring down entire enemy nations, they are now employing their incomparable skills and an endless array of high-tech gadgetry against their greatest nemesis ever - each other."
    },
    "cast":{
        "name":["Reese Witherspoon","Chris Pine","Tom Hardy"]
        },
    "genre":{
        "name":["Comedy","Action and Adventure"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox/thismeanswar/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox/thismeanswar/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"47745623",
            "content":"http://trailers.apple.com/movies/fox/thismeanswar/thismeanswar-tlr1_h480p.mov"
        }
    }
},{
    "id":"4285",
    "info":{
        "title":"Thunder Soul",
        "runtime":"2:26",
        "rating":"PG",
        "studio":"Roadside Attractions",
        "postdate":"2011-05-02",
        "releasedate":"2011-09-23",
        "copyright":"© Copyright 2011 Roadside Attractions",
        "director":"Mark Landsman",
        "description":"Presented by Jamie Foxx, THUNDER SOUL follows the extraordinary alumni from Houston’s storied Kashmere High School Stage Band, who return home after 35 years to play a tribute concert for the 92-year-old “Prof,” their beloved band leader who broke the color barrier and transformed the school’s struggling jazz band into a world-class funk powerhouse in the early 1970s."
    },
    "genre":{
        "name":"Documentary"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/thundersoul/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/thundersoul/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"31992813",
            "content":"http://trailers.apple.com/movies/independent/thundersoul/thundersoul-tlr1_h480p.mov"
        }
    }
},{
    "id":"4551",
    "info":{
        "title":"Tinker, Tailor, Soldier, Spy",
        "runtime":"2:04",
        "rating":"R",
        "studio":"Focus Features",
        "postdate":"2011-09-26",
        "releasedate":"2011-12-09",
        "copyright":"© Copyright 2011 Focus Features",
        "director":"Tomas Alfredson",
        "description":"Tinker, Tailor, Soldier, Spy is the long-awaited feature film version of John le Carre’s classic bestselling novel. The thriller is directed by Tomas Alfredson (Let the Right One In). The screenplay adaptation is by the writing team of Bridget O’Connor & Peter Straughan.  The time is 1973. The Cold War of the mid-20th Century continues to damage international relations. Britain’s Secret Intelligence Service (SIS), a.k.a. MI6 and code-named the Circus, is striving to keep pace with other countries’ espionage efforts and to keep the U.K. secure. The head of the Circus, known as Control (John Hurt), personally sends dedicated operative Jim Prideaux (Mark Strong) into Hungary. But Jim’s mission goes bloodily awry, and Control is forced out of the Circus - as is his top lieutenant, George Smiley (Gary Oldman), a career spy with razor-sharp senses.  Estranged from his absent wife Ann, Smiley is soon called in to see undersecretary Oliver Lacon (Simon McBurney); he is to be rehired in secret at the government’s behest, as there is a gnawing fear that the Circus has long been compromised by a double agent, or mole, working for the Soviets and jeopardizing England. Supported by younger agent Peter Guillam (Benedict Cumberbatch), Smiley parses Circus activities past and present. In trying to track and identify the mole, Smiley is haunted by his decades-earlier interaction with the shadowy Russian spy master Karla.  The mole’s trail remains cold until maverick field agent Ricki Tarr (Tom Hardy) unexpectedly contacts Lacon. While undercover in Turkey, Ricki has fallen for a betrayed married woman, Irina (Svetlana Khodchenkova), who claims to possess crucial intelligence. Separately, Smiley learns that Control narrowed down the list of mole suspects to five men. They are the ambitious Percy Alleline (Toby Jones), whom he had code-named Tinker; suavely confident Bill Haydon (Colin Firth), dubbed Tailor; stalwart Roy Bland (Ciaran Hinds), called Soldier; officious Toby Esterhase (David Dencik), dubbed Poor Man; and - Smiley himself.  Even before the startling truth is revealed, the emotional and physical tolls on the players enmeshed in the deadly international spy game will escalate…  "
    },
    "cast":{
        "name":["Gary Oldman","Colin Firth","Tom Hardy","Mark Strong","Benedict Cumberbatch","Toby Jones","David Dencik","Svetlana Khodchenkova","Stephen Graham","Kathy Burke","Ciarán Hinds"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/focus_features/tinkertailorsoldierspy/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/focus_features/tinkertailorsoldierspy/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"36273590",
            "content":"http://trailers.apple.com/movies/independent/tinkertailorsoldierspy/tinkertailorsoldierspy-tlr1_h480p.mov"
        }
    }
},{
    "id":"4471",
    "info":{
        "title":"Tower Heist",
        "runtime":"2:01",
        "rating":"PG-13",
        "studio":"Universal Pictures",
        "postdate":"2011-10-06",
        "releasedate":"2011-11-04",
        "copyright":"© Copyright 2011 Universal Pictures",
        "director":"Brett Ratner",
        "description":"Ben Stiller and Eddie Murphy lead an all-star cast in Tower Heist, a comedy caper about working stiffs who seek revenge on the Wall Street swindler who stiffed them. After the workers at a luxury Central Park condominium discover the penthouse billionaire has stolen their retirement, they plot the ultimate revenge: a heist to reclaim what he took from them. Queens native Josh Kovacs (Stiller) has managed one of the most luxurious and well-secured residences in New York City for more than a decade. Under his watchful eye, nothing goes undetected. In the swankiest unit atop Josh’s building, Wall Street titan Arthur Shaw (Alan Alda) is under house arrest after being caught stealing two billion from his investors. The hardest hit among those he defrauded? The tower staffers whose pensions he was entrusted to manage. With only days before Arthur gets away with the perfect crime, Josh’s crew turns to petty crook Slide (Murphy) to plan the nearly impossible…to steal what they are sure is hidden in Arthur’s guarded condo. Though amateurs, these rookie thieves know the building better than anyone. Turns out they’ve been casing the place for years, they just didn’t know it. "
    },
    "cast":{
        "name":["Ben Stiller","Eddie Murphy","Matthew Broderick","Téa Leoni","Gabourey Sidibe","Casey Affleck","Stephen Henderson","Judd Hirsch","Michael Peña","Alan Alda"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/universal/towerheist/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/universal/towerheist/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"36616757",
            "content":"http://trailers.apple.com/movies/universal/towerheist/towerheist-tlr2_h480p.mov"
        }
    }
},{
    "id":"4501",
    "info":{
        "title":"Trespass",
        "runtime":"1:58",
        "rating":"R",
        "studio":"Millennium Films",
        "postdate":"2011-08-29",
        "releasedate":"2011-10-14",
        "copyright":"© Copyright 2011 Millennium Films",
        "director":null,
        "description":"In a private, wealthy community, priority is placed on security and no exception is made for the Miller family’s estate.  Behind their pristine walls and manicured gardens, Kyle (Nicolas Cage), a fast-talking businessman, has entrusted the mansion’s renovation to his stunning wife, Sarah (Nicole Kidman). But between making those big decisions and keeping tabs on their defiant teenage daughter (Liana Liberato), Sarah often finds herself distracted by a young, handsome worker (Cam Gigandet) at their home. Nothing is what it seems, and it will take a group of cold-blooded criminals led by Elias (Ben Mendelsohn), who have been planning a vicious home invasion for months, to bring the Miller family together. When they storm the manor, everyone is tangled up in betrayal, deception, temptation and scheming. Kyle, Sarah and Avery will take the ultimate risk to make it out with their lives - and their family - intact."
    },
    "cast":{
        "name":["Nicolas Cage","Nicole Kidman","Ben Mendelsohn","Cam Gigandet","Liana Liberato","Jordana Spiro","Dash Mihok","Emily Meade","Nico Tortorella"]
        },
    "genre":{
        "name":["Drama","Thriller"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/trespass/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/trespass/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"35433118",
            "content":"http://trailers.apple.com/movies/independent/trespass/trespass-tlr1_h480p.mov"
        }
    }
},{
    "id":"4444",
    "info":{
        "title":"Tucker and Dale vs Evil",
        "runtime":"2:29",
        "rating":"R",
        "studio":"Magnet Releasing",
        "postdate":"2011-08-02",
        "releasedate":"2011-09-30",
        "copyright":"© Copyright 2011 Magnet Releasing",
        "director":"Eli Craig",
        "description":"TUCKER & DALE VS EVIL is a hilariously gory, good-spirited horror comedy, doing for killer rednecks what Shaun of the Dead did for zombies. Tucker and Dale are two best friends on vacation at their dilapidated mountain house, who are mistaken for murderous backwoods hillbillies by a group of obnoxious, preppy college kids. When one of the students gets separated from her friends, the boys try to lend a hand, but as the misunderstanding grows, so does the body count. TUCKER AND DALE VS EVIL has been a hit on the festival circuit, debuting at Sundance, and winning the Midnight Audience Award at SXSW, the Jury Prize for First Feature at Fantasia, the Best Director award at Fantaspoa, and the Best Motion Picture Award at Sitges."
    },
    "cast":{
        "name":["Alan Tudyk","Tyler Labine","Katrina Bowden"]
        },
    "genre":{
        "name":["Comedy","Horror"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/tuckeranddalevsevil/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/tuckeranddalevsevil/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"48878414",
            "content":"http://trailers.apple.com/movies/independent/tuckeranddalevsevil/tuckeranddalevsevil-tlr1_h480p.mov"
        }
    }
},{
    "id":"4313",
    "info":{
        "title":"War Horse",
        "runtime":"2:32",
        "rating":"PG-13",
        "studio":"DreamWorks",
        "postdate":"2011-10-04",
        "releasedate":"2011-12-25",
        "copyright":"© Copyright 2011 DreamWorks",
        "director":"Steven Spielberg",
        "description":"DreamWorks Pictures’ “War Horse,” director Steven Spielberg’s epic adventure, is a tale of loyalty, hope and tenacity set against a sweeping canvas of rural England and Europe during the First World War. “War Horse” begins with the remarkable friendship between a horse named Joey and a young man called Albert, who tames and trains him. When they are forcefully parted, the film follows the extraordinary journey of the horse as he moves through the war, changing and inspiring the lives of all those he meets—British cavalry, German soldiers, and a French farmer and his granddaughter—before the story reaches its emotional climax in the heart of No Man’s Land. The First World War is experienced through the journey of this horse—an odyssey of joy and sorrow, passionate friendship and high adventure. “War Horse” is one of the great stories of friendship and war— a successful book, it was turned into a hugely successful international theatrical hit that is arriving on Broadway next year. It now comes to screen in an epic adaptation by one of the great directors in film history. "
    },
    "cast":{
        "name":["Emily Watson","David Thewlis","Peter Mullan","Niels Arestrup","Tom Hiddleston","Jeremy Irvine","Benedict Cumberbatch","Toby Kebbell"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/dreamworks/warhorse/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/dreamworks/warhorse/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"47306928",
            "content":"http://trailers.apple.com/movies/dreamworks/warhorse/warhorse-tlr2_h480p.mov"
        }
    }
},{
    "id":"4527",
    "info":{
        "title":"We Bought A Zoo",
        "runtime":"2:26",
        "rating":"Not yet rated",
        "studio":"20th Century Fox",
        "postdate":"2011-09-14",
        "releasedate":"2011-12-23",
        "copyright":"© Copyright 2011 20th Century Fox",
        "director":"Cameron Crowe",
        "description":"This holiday season, acclaimed filmmaker Cameron Crowe (Jerry Maguire, Almost Famous) directs an amazing and true story about a single dad who decides his family needs a fresh start, so he and his two children move to the most unlikely of places: a zoo.  With the help of an eclectic staff, and with many misadventures along the way, the family works to return the dilapidated zoo to its former wonder and glory. "
    },
    "cast":{
        "name":["Matt Damon","Scarlett Johansson","Thomas Haden Church","Patrick Fugit","Elle Fanning","John Michael Higgins"]
        },
    "genre":{
        "name":"Drama"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox/weboughtazoo/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox/weboughtazoo/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"40545495",
            "content":"http://trailers.apple.com/movies/fox/weboughtazoo/weboughtazoo-tlr1_h480p.mov"
        }
    }
},{
    "id":"4620",
    "info":{
        "title":"We Need To Talk About Kevin",
        "runtime":"1:47",
        "rating":"R",
        "studio":"Oscilloscope Laboratories",
        "postdate":"2011-10-31",
        "releasedate":"2011-12-09",
        "copyright":"© Copyright 2011 Oscilloscope Laboratories",
        "director":"Lynne Ramsay",
        "description":"A suspenseful and gripping psychological thriller, Lynne Ramsay’s WE NEED TO TALK ABOUT KEVIN explores the fractious relationship between a mother and her evil son. Tilda Swinton, in a bracing, tour-de-force performance, plays the mother, Eva, as she contends for 15 years with the increasing malevolence of her first-born child, Kevin (Ezra Miller). Based on the best-selling novel of the same name, WE NEED TO TALK ABOUT KEVIN explores nature vs. nurture on a whole new level as Eva’s own culpability is measured against Kevin’s innate evilness. Ramsay’s masterful storytelling simultaneously combines a provocative moral ambiguity with a satisfying and compelling narrative, which builds to a chilling, unforgettable climax."
    },
    "cast":{
        "name":["Tilda Swinton","John C. Reilly","Ezra Miller"]
        },
    "genre":{
        "name":"Thriller"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/independent/weneedtotalkaboutkevin/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/independent/weneedtotalkaboutkevin/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"31961142",
            "content":"http://trailers.apple.com/movies/independent/weneedtotalkaboutkevin/weneedtotalkaboutkevin-tlr1_h480p.mov"
        }
    }
},{
    "id":"4310",
    "info":{
        "title":"What's Your Number?",
        "runtime":"2:30",
        "rating":"R",
        "studio":"20th Century Fox",
        "postdate":"2011-05-13",
        "releasedate":"2011-09-30",
        "copyright":"© Copyright 2011 20th Century Fox",
        "director":"Mark Mylod",
        "description":"Anna Faris is Ally Darling, who after reading a magazine article that leads her to believe she’s going to be forever alone, begins a wild search for the best “ex” of her life.   Ally’s hunky new neighbor Colin (Chris Evans) helps her track down her exes, in exchange for Ally helping Colin avoid his."
    },
    "cast":{
        "name":["Anna Faris","Chris Evans","Ari Graynor","Blythe Danner"]
        },
    "genre":{
        "name":"Comedy"
    },
    "poster":{
        "location":"http://trailers.apple.com/trailers/fox/whatsyournumber/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/fox/whatsyournumber/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"39541113",
            "content":"http://trailers.apple.com/movies/fox/whatsyournumber/whatsyournumber-tlr1_h480p.mov"
        }
    }
},{
    "id":"4573",
    "info":{
        "title":"Young Adult",
        "runtime":"1:59",
        "rating":"Not yet rated",
        "studio":"Paramount Pictures",
        "postdate":"2011-10-06",
        "releasedate":"2011-12-09",
        "copyright":"© Copyright 2011 Paramount Pictures",
        "director":"Jason Reitman",
        "description":"Academy Award(R) winner Charlize Theron plays Mavis Gary, a writer of teen literature who returns to her small hometown to relive her glory days and attempt to reclaim her happily married high school sweetheart (Patrick Wilson).  When returning home proves more difficult than she thought, Mavis forms an unusual bond with a former classmate (Patton Oswalt) who hasn’t quite gotten over high school, either"
    },
    "cast":{
        "name":["Charlize Theron","Patton Oswalt","Patrick Wilson","Elizabeth Reaser"]
        },
    "genre":{
        "name":["Comedy","Drama"]
        },
    "poster":{
        "location":"http://trailers.apple.com/trailers/paramount/youngadult/images/poster.jpg",
        "xlarge":"http://trailers.apple.com/trailers/paramount/youngadult/images/poster-xlarge.jpg"
    },
    "preview":{
        "large":{
            "filesize":"30919514",
            "content":"http://trailers.apple.com/movies/paramount/youngadult/youngadult-tlr1_h480p.mov"
        }
    }
}]
}
}
}
}
