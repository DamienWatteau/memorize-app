# == Schema Information
#
# Table name: word_attributes
#
#  id          :bigint           not null, primary key
#  key         :string
#  key_lang    :string
#  value       :string
#  value_lang  :string
#  playlist_id :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_word_attributes_on_playlist_id  (playlist_id)
#
class WordAttribute < ApplicationRecord
  belongs_to :playlist
end
