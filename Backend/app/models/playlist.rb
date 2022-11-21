# == Schema Information
#
# Table name: playlists
#
#  id         :bigint           not null, primary key
#  name       :string
#  visible    :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Playlist < ApplicationRecord
  has_many :words, dependent: :destroy
  validates_presence_of :name
end
