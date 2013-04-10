class Player < ActiveRecord::Base
  has_and_belongs_to_many :games
  # Remember to create a migration!
end
