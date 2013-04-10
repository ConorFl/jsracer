get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/raceway' do
  @player1 = Player.find_or_create_by_name(params[:player1])
  @player2 = Player.find_or_create_by_name(params[:player2])
  @game = Game.create(players: [@player1, @player2])
  Player.find_by_name(params[:player1]).games << @game
  Player.find_by_name(params[:player2]).games << @game
  erb :raceway
end

get '/player/:name' do
  redirect '/' unless Player.find_by_name(params[:name])
  @games = Player.find_by_name(params[:name]).games
  @name = params[:name]
  erb :player_stats
end

get '/outcome' do
  @winner = params[:winner]
  Game.last.update_attributes({ :outcome => @winner })
  Game.last.players.each {|x| @loser = x.name if @winner != x.name}
  erb :game_stats 
end

get '/game/:id' do
  redirect '/' unless Game.find_by_id(params[:id])
  @game = Game.find(params[:id])
  @game.players.each do |player|
    (player.name == @game.outcome) ? @winner = player.name : @loser = player.name
  end
  erb :game_stats
end
