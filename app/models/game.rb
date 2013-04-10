class Game < ActiveRecord::Base
  attr_accessible :outcome
  
  has_and_belongs_to_many :players
end
