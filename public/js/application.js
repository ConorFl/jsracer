var game = {};

game.over = false;



game.advancePlayer = function(player_number){
  if (this.over) return;
  var row  = $('#player'+player_number+"_strip");
  var tds  = row.children();
  var next = tds.filter('.active').removeClass("active").next();

  if (next.index() + 1 === tds.length){
    this.over = true;
    row.addClass("winner");
    next.text('WINNER! WINNER! Chicken dinner!');
    var winner = tds.filter('.name').text();
    alert("Winner: "+winner);
    $.ajax({
      url: '/outcome',
      type: 'POST',
      data: {winner: winner},
      success: function(data) {
        $('body').html(data);
      }
    });
  }else{
    next.addClass("active");
  }
};

$(document).ready(function () {
  $(document).on('keydown', function(event){
    if (event.keyCode == 77) { game.advancePlayer(1); };
    if (event.keyCode == 90) { game.advancePlayer(2); };
  });

  $("#restart").click(function(e){
    e.preventDefault();

    game.reset();
  });
  game.reset = function(){
    game.over = false ;
    $("#player1_strip").removeClass("winner");
    $("#player2_strip").removeClass("winner");
    $("#player1_strip td:last").text("");
    $("#player2_strip td:last").text("");

    $("#player1_strip td").each(function(){
      $(this).removeClass("active");
    });
    $("#player2_strip td").each(function(){
      $(this).removeClass("active");
    });
    $("#player1_strip td:first").next().addClass("active");
    $("#player2_strip td:first").next().addClass("active");
  };
});
