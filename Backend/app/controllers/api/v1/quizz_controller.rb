module Api
  module V1
    class QuizzController < Api::V1::ApiController
      def show
        words =  current_user.playlists.find(resource_params[:playlist_id]).words.order(:id => :desc)
        if resource_params[:words_option] == "x_words" && (resource_params[:words_value] != "undefined" && !(resource_params[:words_value].to_i > words.length))
          words=words[(words.length - resource_params[:words_value].to_i)..words.length]
        end
        render json: words.shuffle
      end

      private

      def resource_params
        params.permit(:playlist_id, :words_option, :words_value)
      end
    end
  end
end
