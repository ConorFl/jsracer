
function Game(player1, player2){
  this.player1 = player1;
  this.player2 = player2;
  this.gameover = false;
  this.total_positions = 10;
  this.winner = "";
}

function Player(name){
  this.name = name;
  this.position = 1;
}

Player.prototype.advancePlayer = function(){
  if(this.position == Game.current.total_positions - 1){
    Game.current.gameover = true;
    Game.current.winner = this.name;
  }else if(Game.current.gameover == false){
    this.position++;
  };
}

Game.TEMPLATE = '<table> '+
'   <tr class="player1_strip">'+
'   </tr> '+
'   <tr class="player2_strip"> '+
'   </tr> '+
' </table> ';


Game.initialize = function(data){
  myData = JSON.parse(data);
  // console.log(myData);
  var player1 = new Player(myData.player1.name);
  var player2 = new Player(myData.player2.name);
  
  Game.current = new Game(player1, player2);

  
  $(document).on('keyup', function(event){
    if(Game.current.gameover == false){
      if (event.keyCode == 77) { player1.advancePlayer(); };
      if (event.keyCode == 90) { player2.advancePlayer(); };
      console.log(Game.current.gameover);
    }; 
      Game.current.render();
  });

  $(document).ready(function () {
    Game.current.render();
  });
};

Game.prototype.render = function(){  
  var game = this;

  var content = $(Game.TEMPLATE);
  $('.racetrack').html(content);
  var trs = content.find('tr');

  for(var i=0; i < this.total_positions; i++){
    trs.append('<td>--</td>');
  }

  drawPlayerRow(trs[0], game.player1);
  drawPlayerRow(trs[1], game.player2);


  function drawPlayerRow(tr, player){
    var tds = $(tr).find('td');
    tds.first().text(player.name);
    var td = $(tds[player.position]);
    td.addClass('active');
  }

  if (Game.current.gameover == true) {
    // alert("Winner: "+Game.current.winner);
    $.ajax({
      url: '/outcome',
      type: 'GET',
      data: 'winner='+Game.current.winner,
      success: function(data) {
        $('body').html(data);
      }
    })
  }  
};

// Game.prototype.advancePlayer = function(player_number){
//   if (this.over) return;
//   var row  = $('#player'+player_number+"_strip");
//   var tds  = row.children();
//   var next = tds.filter('.active').removeClass("active").next();

//   if (next.index() + 1 === tds.length){
//     this.over = true;
//     row.addClass("winner");
//     next.text('WINNER! WINNER! Chicken dinner!');
//     var winner = tds.filter('.name').text();
//     alert("Winner: "+winner);
//     $.ajax({
//       url: '/outcome',
//       type: 'GET',
//       data: "winner="+winner,
//       success: function(data) {
//         $('body').html(data);
//       }
//     });
//   }else{
//     next.addClass("active");
//   }  
// };


