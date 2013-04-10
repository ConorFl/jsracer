class CreateTables < ActiveRecord::Migration
  def change
    create_table :players do |player|
      player.string :name
    end
    create_table :games do |game|
      game.string :outcome
      game.timestamps
    end
    create_table :games_players, :id => false do |t|
      t.references :game
      t.references :player
    end
  end
end

