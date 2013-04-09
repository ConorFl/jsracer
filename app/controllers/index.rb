get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/start' do
  @player1 = Player.find_or_create_by_name(params[:player1])
  @player2 = Player.find_or_create_by_name(params[:player2])
  @game = Game.create(players: [@player1, @player2])
  erb :raceway
end

get '/player/:name' do
  @games = Player.find_by_name(params[:name]).games
  @name = params[:name]
  erb :player_stats
end

post '/outcome' do
  @winner = params[:winner]
  @game = Game.last();
  @game.outcome = @winner;
  erb :game_stats;
end
