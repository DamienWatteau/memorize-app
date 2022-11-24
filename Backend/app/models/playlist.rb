# == Schema Information
#
# Table name: playlists
#
#  id         :bigint           not null, primary key
#  name       :string
#  visible    :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_playlists_on_user_id  (user_id)
#
class Playlist < ApplicationRecord
  belongs_to :user
  has_many :words, dependent: :destroy
  
  validates_presence_of :name
end
