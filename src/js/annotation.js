annotationViewer = function(args){

var multiString = function(f) {
  return f.toString().split('\n').slice(1, -1).join('\n');
}

var annotationHtml = multiString(function() {/**
<div id="annotation" class="annotation ui-draggable" style="visibility: hidden; position: absolute; right: 75px; top: 100px;">
  <header class="annotation-header">
  <span id="annotation-move" class="annotation-header-move">
    <i class="fa fa-arrows"></i>
  </span>
  <span id="annotation-header-text" class="annotation-header-text">
    Header
  </span> 
  <span class="annotation-header-close" class="annotation-header-close">
    <i class="fa fa-times"></i>
  </span>
  <div id="annotation-description" class="annotation-description">
    <h2>description</h2>
  </div>
  </header>
  <span class="annotation-items-container" class="annotation-items-container">
    <ul id="annotation-items-container">
      <!-- List items inside this ul element are generated automatically by JavaScript.
      Each item will be composed of a title and text. The text can be set to be an href.
      You can edit the styling of the title by editing CSS class "annotation-item-title"
      and the styling of the text by editing CSS class "annotation-item-text.
      -->
    </ul>
  </span>
</div>
**/});



  function init(args) {
    var targetElement = document.querySelector(args.target);
    targetElement.innerHTML = annotationHtml;

    var annotationIcon = d3.select(args.icon)
    .on('click', function() {
      return annotationViewer.render(args.annotationData);
    })
  }

  function render(annotationData) {
    console.log('annotationData');
    console.log(annotationData);


    var annotation = d3.select('#annotation')
    .data([annotationData]);

    var annotationHeaderText = annotation.select('#annotation-header-text')
    .text(function(d) { return d.header; });

    var annotationIconMove = annotation.select('i.icon-move')
    .on("drag", function(d, i){
      // I think I need to play with absolute positioning for this
      // it doesn't currently work.
      //annotation.attr('transform', 'translate(10 10)');
    });

    var annotationIconRemove = annotation.select('i.icon-remove')
    .on("click", function(d, i){
      annotation.attr('style', 'visibility: hidden;');
    });

    var annotationDescription = annotation.select('#annotation-description')
    .text(function(d) { return d.description; });

    var annotationListItemsContainer = annotation.selectAll('#annotation-items-container')
    .data(function(d) {
      return [d.listItems];
    });

    // Update
    var annotationListItems = annotationListItemsContainer.selectAll('li')
    .data(function(d) {
      console.log('d annotationListItems');
      console.log(d);
      return d;
    });

    // Enter
    annotationListItems.enter().append('li');

    // Exit…
    annotationListItems.exit().remove();

    var annotationItemTitles = annotationListItems.selectAll('.annotation-item-title')
    .data(function(d) {
      console.log('d annotationListItems');
      console.log(d);
      return [d.key];
    })
    .enter().append('span')
    .attr('class', 'annotation-item-title')
    .text(function(d) {return d + ': ';});

    // Update
    var annotationItemPlainTextElements = annotationListItems.selectAll('span.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (!element.hasOwnProperty('uri')) {
          console.log('annotationItemPlainTextElement');
          console.log(element);
          return element; 
        }
      });
    })
    .text(function(d) { return ' ' + d.text; });

    // Enter
    annotationItemPlainTextElements.enter()
    .append('span')
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });

    // Exit…
    annotationItemPlainTextElements.exit().remove();

    // Update
    var annotationItemLinkedTextElements = annotationListItems.selectAll('a.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (element.hasOwnProperty('uri')) {
          //console.log('annotationItemLinkedTextElement');
          //console.log(element);
          return element; 
        }
      }); 
    })
    .text(function(d) { return ' ' + d.text; });

    // Enter
    annotationItemLinkedTextElements.enter()
    .append('a')
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });

    // Exit…
    annotationItemLinkedTextElements.exit().remove();

    annotation[0][0].style.visibility = 'visible';

  }
      
  return {
    init:init,
    render:render
  };
}();
