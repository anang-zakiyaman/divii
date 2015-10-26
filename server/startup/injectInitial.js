Meteor.startup(function(){

  // inject a css file, to style the loading screen
  Inject.rawHead('loadingScripts', '<link rel="stylesheet" href="/styles/loading-page.css">');

  // inject HTML into the body, to make up the screen
  Inject.rawBody('loadingBody', '<div class="inject-loading-container">'+ "\n" +
                                  '<div class="loading-box">'+ "\n" +
                                  '     <h1>'+ "\n" +
                                  '       Jangan bengong'+ "\n" +
                                  '     </h1>'+ "\n" +
                                  '     <h2>'+ "\n" +
                                  '       Loading'+ "\n" +
                                  '     </h2>'+ "\n" +
                                  '     <span class="loader"><span class="loader-inner"></span></span>'+ "\n" +
                                  '     <h3>'+ "\n" +
                                  '       Powered by Divi-i'+ "\n" +
                                  '     </h3></DIV>'+ "\n" +
                                  '</div>');

  /**
  Moves all javascripts to the end of the body, so we can inject the loading screen
  */
  Inject.rawModHtml('moveScriptsToBottom', function(html) {
      // get all scripts
      var scripts = html.match(/<script type="text\/javascript" src.*"><\/script>\n/g);

      // if found
      if(!_.isEmpty(scripts)) {
          // remove all scripts
          html = html.replace(/<script type="text\/javascript" src.*"><\/script>\n/g, '');
          // add scripts to the bottom
          html = html.replace(/<\/body>/, scripts.join('') + '\n</body>');
          return html.replace(/[\n]+/g,"\n").replace(/ +/g,' ');

      // otherwise pass the raw html through
      } else {
          return html.replace(/[\n]+/g,"\n").replace(/ +/g,' ');
      }
  });

});
