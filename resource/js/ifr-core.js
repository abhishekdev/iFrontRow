// core application namespace
var ifr = {};

// global debug flag for the application
ifr.debug = 0;

// application db
ifr.db = {
    trailers : null,
    url : {
        "1080p": "",
        "720p" : "",
        "480p" : ""
    }
};


// application db procedures
ifr.db.proc = {
    importTrailers : function(dbObj){
        var localStore = window.localStorage;
        
        //Create public trailer JS Object DB
        try{
            
            if(dbObj.query.results.records.movieinfo){
                
                // cache db locally and load in app db if db object contains movieinfo
                if(localStore){
                    localStore.setItem("ifr-lastcheck",new Date());
                    localStore.setItem("ifr-offlineDB",JSON.stringify(dbObj));
                }
                
                ifr.db.trailers = dbObj.query.results.records.movieinfo;
            }
            
        }catch(ex){
            console.log("---->", ex);
            ifr.db.trailers = null;
        }
    }
};

var $appVideo;
// build the trailer UI from data. Populate UI with info. Initialize events
ifr.buildTrailerUI = function(data){
    var items = [],
    video = {
        width:854,
        height: 480
    },
    $list ;

    data && ifr.db.proc.importTrailers(data);
    if(!ifr.db.trailers.length) {
        // Failed to build Trailer Database
        return;
    }
    
    
    
    
	
    //Prepare Menu List
    $.each(ifr.db.trailers , function(key, val) {
        items.push('<li><a class="trailerLink" href="#movTrailer" id="' + key + '">' + val.info.title + '</a></li>');
    });
	
    $("#ifr-toggleConfig").bind("click.toggleConfig",function(e){
        $("#ifr > .config").toggleClass("visible");
    });

    // Create the menu list, Mark the first item as selected and initialize the navigation
    $('<ul/>', {
        'class': 'sliderNav',
        html: items.join('')
    }).appendTo('.movieList')
    .find("li:first").addClass("selected")
    .end().eSlidenav({
        bgcolor: "#000",
        overlap : 0,
        resetin: null,
        autoresizeSelector: true,
        onHover :{
            enter:function(liElem){
                console.log("Loading: ",$(liElem).children('a')[0].id);
                ifr.loadMovieInfo($(liElem).children('a')[0].id);
            }
        }
    });	
    
    $(".sliderNav > li:first > a").focus();
    
    _setPlaybackMode();
    
    function _resizePoster(){
        var $movInfo = $("#movieInfo"),
        $poster = $movInfo.find(".poster"),
        $detail = $movInfo.find(".details");
		
        $poster.height( $detail.position().top - parseInt($detail.css("bottom")) );
    }
    
    
    
    function _setPlaybackMode(){
        var $templateHolder = $("#ifr-templates"),
        $video = $('<video/>',{
            'class'     : "video", 
            type        : "video/mp4",
            'x-webkit-airplay': "allow",
            autoplay    : 'autoplay',
            controls    : 'controls',
            width       : video.width,
            height      : video.height
        }),
        $embed = $('<embed/>',{
            'volume'      : "100",
            'autostart'   : "true",
            'airplay'     : "allow",
            width       : video.width,
            height      : video.height
        });
        
        $video.bind('error', _videoErrorHandler);
        
        if(Modernizr.video && Modernizr.video.h264 === "probably"){
            $appVideo = $video;
        }else{
            $appVideo = $embed;
        }
        
        $appVideo.attr('id',"movTrailer");
    }
    
    function _videoErrorHandler(e){
        var that = this,
        $that = $(that),
        $embed;
        
        console.log('video error')
        
        /*
        * MEDIA_ERR_ABORTED: 1
        * MEDIA_ERR_NETWORK: 2
        * MEDIA_ERR_DECODE: 3
        * MEDIA_ERR_SRC_NOT_SUPPORTED: 4
        */
        if(that.error && that.error.code >= 3 && that.error.code <= 4){
           $embed = $('<embed/>',{
                volume      : "100",
                autostart   : "true",
                airplay     : "allow",
                width       : video.width,
                height      : video.height,
                src         : $that.attr('src')
            });
            
            $that.replaceWith($embed);
            
            $appVideo = $embed;
        }
    }
    
    
    
        
	
    // Dynamically resize poster
    $(window).bind("resize.ifr", _resizePoster);	
    _resizePoster();
    
    function _getMovieURL(key, mask){
        return key.replace(/_h[0-9]{3}/,"_480");
    }
    
    function _showTrailerOnLabelClick(e){
        e.preventDefault();
        
        var movie =  ifr.db.trailers[$(this).attr('id')],
        movsrc = _getMovieURL(movie.preview.large.content),
        $media = $('<a/>',{
            "class" : "media",
            "href" : movsrc
        }); // the trailer video source
        
        console.log("trying to play: ",movsrc, $appVideo);
        
        if($appVideo.is('video')){
            $appVideo.attr("poster", movie.poster.location );
        }
        
        $appVideo
        .detach()
        .attr("src",movsrc)
        .appendTo('#ifr-templates');
                        
        console.log($appVideo);
    }
	
    $("a.trailerLink")
    .bind("click.ifr", _showTrailerOnLabelClick)
    .fancybox({
        padding:0,
        margin:0,
        'transitionIn'	: 'elastic',
        'transitionOut'	: 'elastic',
        'speedIn'	: 600, 
        'speedOut'	: 200, 
        'overlayShow'	: true
    });
    
    $("#movieInfo .posterCache").bind('error',function(e){
        $(this).attr("src","cp.gif");
    });
};

ifr.loadMovieInfo = function(index){
    var $movInfo = $("#movieInfo"),
    movie = ifr.db.trailers[index];
	
    $("#movieInfo .poster").attr("src",movie.poster.xlarge);
    $("#movieInfo > .details > h3").text(movie.info.title);
    $("#movieInfo > .details > #rating").removeAttr("class").addClass(movie.info.rating.toLowerCase());
    $("#movieInfo > .details > .summary").text(movie.info.description);
    $("#movieInfo > .details > cite").text(movie.info.copyright);
    $("#movieInfo .director").text(movie.info.director);
    $("#movieInfo .genre").text(movie.genre.name.toString());
    $("#movieInfo .releasedate").text(movie.info.releasedate);
    $("#movieInfo .cast").text(movie.cast ? movie.cast.name.toString(): "unlisted");
};

ifr.getTrailerList = function(resolution,forceMode){
    var localStore = window.localStorage,
    DB={};
    
    if(!forceMode && localStore){
        DB.timeStamp = localStore.getItem("ifr-lastcheck");
        _queryLocalTrailerList();
    }else{
        _queryExternalTrailerList();
    }
	
    function _queryLocalTrailerList(){
        var  currentTime, prevFetchTime;
        
        if(DB.timeStamp){
            currentTime  = new Date();
            prevFetchTime = new Date(DB.timeStamp);
            
            // if db staler than a day the re-fetch from DB else reload with cached data
            if(currentTime - prevFetchTime < 86400000){
                DB.view = localStore.getItem("ifr-offlineDB");
                try{
                    DB.view = JSON.parse(DB.view);
                    ifr.db.proc.importTrailers(DB.view);
                    ifr.buildTrailerUI();
                }catch(ex){
                    console.log(ex,DB.view);
                    _queryExternalTrailerList();	
                }
            }else{
                _queryExternalTrailerList();
            }
			
        }else{
            _queryExternalTrailerList();
        }
    }

    function _queryExternalTrailerList(){
        $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url=%22trailers.apple.com/trailers/home/xml/current_480p.xml%22&format=json&callback=?',
        ifr.buildTrailerUI);
    }
};

$(function main(){
        
    if(ifr.debug){
        /* * /
        Modernizr.load({
            test: ifr.debug,
            yep: ["offlineTestDB.js"],
            complete: function(){

            }
        });
        /* */
        ifr.buildTrailerUI(offlineTestDB);
    }else{
        ifr.getTrailerList();
    }
});